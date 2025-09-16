"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ProgressiveImageProps {
  src: string;
  placeholder: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
}

export function ProgressiveImage({ src, placeholder, alt, className = '', loading = 'lazy', sizes = '100vw' }: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`${className} relative overflow-hidden`}
      style={{
        backgroundImage: `url(${placeholder})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      aria-label={alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={loading}
        className={`object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        priority={loading === 'eager'}
      />
    </div>
  );
}
