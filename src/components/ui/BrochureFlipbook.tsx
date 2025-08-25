import { useEffect, useMemo, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Ensure worker is configured
import '../../lib/setupPdfWorker';
import './BrochureFlipbook.css';

type BrochureFlipbookProps = {
  pdfUrl: string;
  className?: string;
};

const BrochureFlipbook = ({ pdfUrl, className = 'w-full' }: BrochureFlipbookProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [_, setCurrentPage] = useState<number>(0);
  const [bookState, setBookState] = useState<string>('read');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const flipRef = useRef<any>(null);

  // Responsive sizing: keep a sensible page aspect ratio
  const { pageWidth, pageHeight } = useMemo(() => {
    const maxWidth = Math.min(1000, containerWidth || 800);
    // Two pages visible: flipbook width is ~ 2 * pageWidth
    const computedPageWidth = Math.max(280, Math.floor(maxWidth / 2));
    const ratio = 1.414; // A-series paper ratio (approx sqrt(2))
    const computedPageHeight = Math.floor(computedPageWidth * ratio);
    return { pageWidth: computedPageWidth, pageHeight: computedPageHeight };
  }, [containerWidth]);

  useEffect(() => {
    const handleResize = () => setContainerWidth(document.getElementById('brochure-container')?.clientWidth || 0);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onLoadSuccess = ({ numPages: nextNumPages }: { numPages: number }) => {
    setNumPages(nextNumPages);
  };

  const nextButtonClick = () => {
    flipRef.current?.pageFlip().flipNext();
  };
  const prevButtonClick = () => {
    flipRef.current?.pageFlip().flipPrev();
  };

  const [isPortraitMode, setIsPortraitMode] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Example: below 768px = portrait mode
      setIsPortraitMode(window.innerWidth < 768);
    };
  
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (!pdfUrl) return null;

  return (
    <div id="brochure-container" className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Product Brochure</h3>
        <a
          href={pdfUrl}
          download
          className="text-blue-600 hover:underline"
        >
          Download Brochure
        </a>
      </div>
      <div className="flex w-full justify-center">
        <Document
          file={pdfUrl}
          onLoadSuccess={onLoadSuccess}
          onLoadError={(e) => console.error('PDF load error:', e)}
          loading={<div className="py-12">Loading brochure…</div>}
        >
          <HTMLFlipBook
            width={pageWidth}
            height={pageHeight}
            minWidth={240}
            maxWidth={1200}
            minHeight={300}
            maxHeight={1536}
            drawShadow
            className="shadow-md"
            maxShadowOpacity={0.5}
            showCover
            usePortrait={isPortraitMode}
            mobileScrollSupport
            orientation={orientation}
            bookState={bookState}
            onFlip={(e: any) => setCurrentPage(e.data)}
            onChangeOrientation={(e: any) => setOrientation(e.data)}
            onChangeState={(e: any) => setBookState(e.data)}
            ref={(el: any) => (flipRef.current = el)}
          >
            {Array.from(new Array(numPages), (_el, index) => (
              <div
                key={`page_${index + 1}`}
                className="page bg-white"
                style={{ width: pageWidth, height: pageHeight }}
              >
                <Page
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderMode="canvas"
                  loading={<div className="py-8">Loading page…</div>}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </Document>
      </div>
      {/* Controls & Status */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="inline-flex">
          <button type="button" onClick={prevButtonClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4">Previous page</button>
          <button type="button" onClick={nextButtonClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4">Next page</button>
        </div>
      </div>
    </div>
  );
};

export default BrochureFlipbook;


