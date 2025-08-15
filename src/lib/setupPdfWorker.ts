import { pdfjs } from 'react-pdf';
// Static URL import so Vite emits the asset and we reference it reliably in prod
// @ts-ignore - Vite resolves this to a string URL at build time
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

if (typeof pdfWorkerUrl === 'string' && pdfWorkerUrl.length > 0) {
  pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl as string;
} else {
  // Fallback: attempt common public path (ensure you copy worker if using this)
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}