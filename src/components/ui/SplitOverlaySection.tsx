import React from 'react';

type SideProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonHref: string;
  buttonLabel?: string;
  ariaLabel?: string;
};

interface SplitOverlaySectionProps {
  left?: SideProps;
  right?: SideProps;
  className?: string;
  /**
   * Height classes applied to each side box.
   * Defaults to a fixed 620px height for both mobile and desktop.
   */
  heightClassName?: string;
}

const Side: React.FC<SideProps & { heightClassName: string }> = ({ imageUrl, title, subtitle, buttonHref, buttonLabel = 'Read more', ariaLabel, heightClassName }) => {
  return (
    <div className={`relative w-full md:flex-1 group overflow-hidden ${heightClassName}`}>
      <img
        src={imageUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center transform transition-transform duration-300 origin-center group-hover:scale-110"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/50 rounded-lg p-6 w-[300px] h-[250px] flex flex-col items-center justify-center text-center shadow-md">
          <h3 className="text-3xl font-bold text-blue-800">{title}</h3>
          <p className="mt-2 text-lg font-semibold text-blue-700">{subtitle}</p>
          <a
            href={buttonHref}
            aria-label={ariaLabel || `${title} - ${buttonLabel}`}
            className="mt-6 inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white/50"
          >
            {buttonLabel}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M13.293 4.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L17.586 12l-4.293-4.293a1 1 0 010-1.414z" />
              <path d="M3 12a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const SplitOverlaySection: React.FC<SplitOverlaySectionProps> = ({ left, right, className = '', heightClassName = 'h-[520px]' }) => {
  const sides: React.ReactNode[] = [];
  if (left) sides.push(<Side key="left" {...left} heightClassName={heightClassName} />);
  if (right) sides.push(<Side key="right" {...right} heightClassName={heightClassName} />);

  if (sides.length === 0) return null;

  return (
    <section className={`w-full ${className}`}>
      <div className={`flex flex-col md:flex-row`}>
        {sides}
      </div>
    </section>
  );
};

export default SplitOverlaySection;


