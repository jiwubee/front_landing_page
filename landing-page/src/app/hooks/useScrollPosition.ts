"use client";
import { useState, useEffect } from "react";

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  isScrollingUp: boolean;
  previousScrollY: number;
}

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    isScrollingUp: false,
    previousScrollY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition((prevState) => ({
        scrollY: window.scrollY,
        scrollX: window.scrollX,
        isScrollingUp: prevState.scrollY > window.scrollY,
        previousScrollY: prevState.scrollY,
      }));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};
