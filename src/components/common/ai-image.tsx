// src/components/common/ai-image.tsx
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { generateImage } from '@/ai/flows/image-generator';
import { useEffect, useState } from 'react';

type AIImageProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> & {
  imageId: string;
};

export function AIImage({ imageId, ...props }: AIImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  const imageConfig = PlaceHolderImages.find((p) => p.id === imageId);

  useEffect(() => {
    let isMounted = true;
    
    async function loadImage() {
      try {
        const result = await generateImage({ id: imageId });
        if (isMounted && result.imageUrl) {
          setImageUrl(result.imageUrl);
        }
      } catch (err) {
        console.error(`Failed to generate image for id: ${imageId}`, err);
        if (isMounted) {
          setError(true);
        }
      }
    }

    if (imageId) {
      loadImage();
    }

    return () => {
      isMounted = false;
    };
  }, [imageId]);

  if (error || !imageConfig) {
    // Show a fallback or skeleton on error or if config is missing
    return <Skeleton className="w-full h-full" />;
  }

  if (!imageUrl) {
    // Show skeleton while loading
    return <Skeleton className="w-full h-full" />;
  }

  return (
    <Image
      src={imageUrl}
      alt={imageConfig.description}
      data-ai-hint={imageConfig.imageHint}
      {...props}
    />
  );
}
