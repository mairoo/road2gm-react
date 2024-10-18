import React, { useCallback, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const InfiniteSwipeSlide = ({
  images,
}: {
  images: { width: number; height: number; color: string }[];
}) => {
  const [slides, setSlides] = useState<
    { width: number; height: number; color: string }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length > 1) {
      // 마지막 슬라이드 + 슬라이드 전체 + 첫 슬라이드
      setSlides([images[images.length - 1], ...images, images[0]]);
    } else {
      setSlides(images);
    }
  }, [images]);

  const goToSlide = useCallback(
    (index: number) => {
      if (!isTransitioning) {
        // 화면전환 중에 재진입 불가
        setIsTransitioning(true);
        setCurrentIndex((_) => {
          if (index < 0) return slides.length - 2;
          if (index >= slides.length) return 1;
          return index;
        });
      }
    },
    [slides.length, isTransitioning],
  );

  const nextSlide = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prevIndex) => {
          if (prevIndex === 0) return slides.length - 2;
          if (prevIndex === slides.length - 1) return 1;
          return prevIndex;
        });
      }, 300); // 트랜지션 `duration-xxx` 값과 일치해야 한다.
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning, slides.length]);

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (slides.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto h-64 bg-gray-200 flex items-center justify-center text-gray-500">
        이미지가 없습니다
      </div>
    );
  }

  return (
    <div
      className="relative w-full max-w-2xl mx-auto overflow-hidden"
      {...handlers}
    >
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-300 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={`https://placehold.co/${image.width}x${image.height}/${image.color}/white`}
              alt={`슬라이드 ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LuChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LuChevronRight className="w-6 h-6 text-gray-800" />
          </button>
          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex items-center justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index + 1)}
                  className={`w-3 h-3 rounded-full focus:outline-none ${
                    index === (currentIndex - 1 + images.length) % images.length
                      ? "bg-white"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InfiniteSwipeSlide;
