"use client";

import { useState, useEffect } from 'react';

interface ProgressiveImageProps {
  src: string;
  placeholder: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function ProgressiveImage({ src, placeholder, alt, className, loading = 'lazy' }: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-500`}
    />
  );
}
