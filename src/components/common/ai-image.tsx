// src/components/common/ai-image.tsx
import { generateImage } from '@/ai/flows/image-generator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { unstable_cache as cache } from 'next/cache';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

type AIImageProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> & {
  imageId: string;
};

const cachedGenerateImage = cache(
  async (imageId: string) => {
    console.log(`[AIImage] Calling generateImage for ${imageId}`);
    const result = await generateImage({ id: imageId });
    return result.imageUrl;
  },
  ['ai-images'], // Cache key prefix
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['ai-image-generation'], // Cache tag
  }
);

async function ImageComponent({ imageId, ...props }: AIImageProps) {
  const imageConfig = PlaceHolderImages.find((p) => p.id === imageId);

  if (!imageConfig) {
    return <Skeleton className="w-full h-full" />;
  }

  const imageUrl = await cachedGenerateImage(imageId);

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
      <ImageComponent {...props} />
    </Suspense>
  );
}
