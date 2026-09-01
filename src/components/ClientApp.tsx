import { StrictMode, Suspense } from 'react';
import App from '../App';

const appLoader = (
  <div className="app-loading" role="status" aria-live="polite" aria-label="Loading The AI Almanac">
    <div className="app-loading-mark" aria-hidden="true">
      <div className="app-loading-title">The AI Almanac</div>
      <div className="app-loading-rule" />
    </div>
  </div>
);

export function ClientApp() {
  return (
    <StrictMode>
      <Suspense fallback={appLoader}>
        <App />
      </Suspense>
    </StrictMode>
  );
}

export default ClientApp;
