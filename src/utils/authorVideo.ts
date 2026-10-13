// Bump when public/author-video.mp4 or its poster changes: both are served with
// immutable caching, so the query string is the only cache invalidation.
const AUTHOR_VIDEO_VERSION = '2';
const publicBase = import.meta.env.BASE_URL || '/';

export const authorVideoUrl = `${publicBase}author-video.mp4?v=${AUTHOR_VIDEO_VERSION}`;
// First frame of the clip, so the popup shows the face immediately and the
// handoff to the playing video is invisible.
export const authorVideoPosterUrl = `${publicBase}author-video-poster.webp?v=${AUTHOR_VIDEO_VERSION}`;

let videoSource: Promise<string> | null = null;

function prefersReducedData(): boolean {
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  return Boolean(
    connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
  );
}

// Downloads the clip once per page load and hands every player a blob: URL, so
// the hover preview never waits on the network, range requests or a cold cache.
// Falls back to the network URL if the fetch fails.
export function precacheAuthorVideo(): Promise<string> {
  if (!videoSource) {
    const poster = new Image();
    poster.decoding = 'async';
    poster.src = authorVideoPosterUrl;

    videoSource = fetch(authorVideoUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Author video request failed: ${response.status}`);
        return response.blob();
      })
      .then((blob) => URL.createObjectURL(blob))
      .catch(() => authorVideoUrl);
  }
  return videoSource;
}

// Warms the clip once the browser is idle so the first hover is already local.
export function scheduleAuthorVideoPrecache(): () => void {
  if (typeof window === 'undefined' || videoSource || prefersReducedData()) return () => {};

  const start = () => {
    void precacheAuthorVideo();
  };
  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };
  if (idleWindow.requestIdleCallback) {
    const handle = idleWindow.requestIdleCallback(start, { timeout: 2500 });
    return () => idleWindow.cancelIdleCallback?.(handle);
  }
  const handle = window.setTimeout(start, 1200);
  return () => window.clearTimeout(handle);
}
