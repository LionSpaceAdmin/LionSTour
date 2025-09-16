// src/components/common/ai-image.tsx
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

type AIImageProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> & {
  imageId: string;
};

async function ImageComponent({ imageId, ...props }: AIImageProps) {
  const imageConfig = PlaceHolderImages.find((p) => p.id === imageId);

  if (!imageConfig) {
    return <Skeleton className="w-full h-full" />;
  }

  // Reverted to using placeholder URLs to avoid cache size limits and improve performance.
  // The AI generation flow is preserved for future use (e.g., on-demand generation).
  const imageUrl = `https://picsum.photos/seed/${imageId}/${props.width || 800}/${props.height || 600}`;

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
  // Although generation is disabled, Suspense is kept for good UX when fetching remote images.
  return (
    <Suspense fallback={<Skeleton className="w-full h-full" />}>
      <ImageComponent {...props} />
    </Suspense>
  );
}
