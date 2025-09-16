"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GuideReview } from "@/lib/mock-guides";
import { Star } from "lucide-react";

type GuideReviewsProps = {
  reviews: GuideReview[];
  rating: number;
};

export function GuideReviews({ reviews, rating }: GuideReviewsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-2xl">
            Reviews ({reviews.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold">{rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={review.avatarUrl} alt={review.author} />
                  <AvatarFallback>
                    {review.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{review.author}</p>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                   <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} />
                        ))}
                    </div>
                  <p className="mt-2 text-sm text-foreground/90">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No reviews yet.</p>
            <p className="text-sm">Be the first to share your experience!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
