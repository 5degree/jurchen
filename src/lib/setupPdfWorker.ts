import { pdfjs } from 'react-pdf';
// Prefer module Worker to avoid MIME/module resolution issues in prod
try {
  // Some bundlers (Vite) support resolving module worker via URL
  // eslint-disable-next-line no-new
  const worker = new Worker(new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url), {
    type: 'module',
  }) as unknown as Worker;
  // @ts-ignore - pdfjs typing may not include workerPort
  pdfjs.GlobalWorkerOptions.workerPort = worker;
} catch {
  // Fallback to URL string if Worker fails
  // @ts-ignore - Vite resolves this to a string URL at build time
  import('pdfjs-dist/build/pdf.worker.min.mjs?url').then((mod: any) => {
    const workerUrl = (mod && (mod.default || mod)) as string;
    if (workerUrl) {
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
    }
  }).catch(() => {
    // As a last resort, rely on public path (must be served as a static asset)
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  });
}