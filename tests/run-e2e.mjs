import { spawn } from 'node:child_process';

const host = '127.0.0.1';
const port = '4173';
const url = `http://${host}:${port}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', host, '--port', port], {
  cwd: process.cwd(),
  stdio: 'inherit'
});

let cleanedUp = false;

const stopProcessTree = (child) => {
  if (!child.pid) return Promise.resolve();
  if (process.platform === 'win32') {
    return new Promise((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        resolve();
      };
      const killer = spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], {
        stdio: 'ignore',
        windowsHide: true
      });
      killer.once('exit', finish);
      killer.once('error', finish);
      setTimeout(finish, 2_000);
    });
  }
  child.kill('SIGTERM');
  return Promise.resolve();
};

const stopServer = async () => {
  if (cleanedUp) return;
  cleanedUp = true;
  await stopProcessTree(server);
};

const waitForServer = async () => {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for Vite at ${url}`);
};

try {
  await waitForServer();
  const testProcess = spawn(
    process.execPath,
    ['node_modules/@playwright/test/cli.js', 'test', ...process.argv.slice(2)],
    { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'], env: process.env }
  );

  let output = '';
  let summaryHandled = false;
  const handleOutput = (chunk) => {
    const text = chunk.toString();
    output += text;
    process.stdout.write(text);

    // Playwright on Windows can retain a Chrome/Vite handle after printing its
    // final summary. Reap the test tree once the result is authoritative so
    // `npm run test:e2e` returns instead of waiting for the orphaned handle.
    if (!summaryHandled && /\b(?:\d+ passed|\d+ failed)\b/.test(output)) {
      summaryHandled = true;
      const failed = /\b\d+ failed\b/.test(output);
      setTimeout(() => {
        void (async () => {
          await stopProcessTree(testProcess);
          await stopServer();
          process.exit(failed ? 1 : 0);
        })();
      }, 250);
    }
  };
  testProcess.stdout.on('data', handleOutput);
  testProcess.stderr.on('data', handleOutput);

  const exitCode = await new Promise((resolve, reject) => {
    testProcess.once('error', reject);
    testProcess.once('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)));
  });

  if (!summaryHandled) {
    await stopServer();
    process.exitCode = exitCode;
  }
} catch (error) {
  await stopServer();
  console.error(error);
  process.exitCode = 1;
}

process.on('SIGINT', () => {
  void stopServer();
  process.exitCode = 130;
});
