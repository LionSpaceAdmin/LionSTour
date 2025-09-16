// src/components/common/ai-image.tsx
'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { generateImage } from '@/ai/flows/image-generator';
import { use, Suspense } from 'react';

type AIImageProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> & {
  imageId: string;
};

function GeneratedImage({ imageId, ...props }: AIImageProps) {
  const imageConfig = PlaceHolderImages.find((p) => p.id === imageId);
  
  if (!imageConfig) {
    return <Skeleton className="w-full h-full" />;
  }

  // Generate the image on the server and stream the result.
  const { imageUrl } = use(generateImage({ id: imageId }));

  if (!imageUrl) {
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

export function AIImage(props: AIImageProps) {
  return (
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
      <GeneratedImage {...props} />
    </Suspense>
  );
}
