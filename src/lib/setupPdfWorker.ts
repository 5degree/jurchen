import { pdfjs } from 'react-pdf';

// Configure pdf.js worker for react-pdf with Vite/ESM
// Using ?url to ensure the worker file is resolved correctly by Vite
// Falls back silently if resolution fails
try {
  // @ts-ignore - Vite will transform this import into an URL string
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-nocheck
  import('pdfjs-dist/build/pdf.worker.min.mjs?url').then((mod: any) => {
    const workerUrl = (mod && (mod.default || mod)) as string;
    if (workerUrl) {
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
    }
  });
} catch {
  // noop
}


