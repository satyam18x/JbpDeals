import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: 'Epic Jabalpur Deals',
    subtitle: 'Unlock 70% Off Best Dining & Lifestyle',
    image: '/assets/hero-banner.png',
    cta: 'Claim Voucher',
    link: '/offers?category=c1'
  },
  {
    id: 2,
    title: 'Elite Fitness Pass',
    subtitle: 'Premium Gyms starting at ₹999/month',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    cta: 'View Offers',
    link: '/offers?category=c3'
  },
  {
    id: 3,
    title: 'Luxury Makeover',
    subtitle: 'Elite Salons at Half the Price',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80',
    cta: 'Grab Coupon',
    link: '/offers?category=c2'
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const timeoutRef = useRef(null);

  const length = slides.length;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => resetTimeout();
  }, [current]);

  // Touch handlers for swipe support
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <div 
      className="relative h-[320px] md:h-[520px] w-full overflow-hidden bg-background"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Sliding Container */}
      <div 
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover" 
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-text-primary/40 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
              <div className="inline-flex items-center gap-2 bg-primary text-card px-3 py-1.5 rounded-full text-[10px] md:text-sm font-black uppercase tracking-widest mb-3 animate-bounce shadow-lg">
                <Sparkles size={14} className="fill-current" /> Limited Time Offer
              </div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-card mb-2 leading-tight drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg text-card/90 mb-5 max-w-xl font-medium drop-shadow-sm line-clamp-1">
                {slide.subtitle}
              </p>
              <Link 
                to={slide.link} 
                className="inline-flex items-center gap-2 bg-card text-primary font-bold py-2.5 px-8 rounded-full shadow-xl hover:bg-primary hover:text-card transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm md:text-base border-2 border-transparent hover:border-card/50 group"
              >
                {slide.cta}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls (Only on Desktop) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-card/10 text-card hover:bg-card hover:text-primary backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-90 border border-card/20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-card/10 text-card hover:bg-card hover:text-primary backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-90 border border-card/20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Modern Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.preventDefault(); setCurrent(index); }}
            className="group py-2"
          >
            <div className={`h-1.5 rounded-full transition-all duration-300 ${
              current === index ? 'bg-card w-10' : 'bg-card/30 group-hover:bg-card/60 w-3'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
