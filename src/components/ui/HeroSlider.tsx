import { useState, useEffect } from 'react';
import type { HeroSlider as HeroSliderType } from '../../types';

interface HeroSliderProps {
  sliders: HeroSliderType[];
}

const HeroSlider = ({ sliders }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    if (sliders.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [sliders.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliders.length);
  };

  if (!sliders || sliders.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden h-[250px] sm:h-[400px] md:h-[500px] lg:h-[550px]">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliders.map((slider, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="relative w-full h-full">
            <a
                href="https://play.google.com/store/apps/details?id=com.jurchentechnology.user"
                target="_blank"
                rel="noopener noreferrer">
                <img
                  src={slider.image}
                  alt={slider.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-1 sm:p-2 md:p-3"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-1 sm:p-2 md:p-3"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {sliders.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition ${
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            } h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
