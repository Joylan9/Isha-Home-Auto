import type { ImgHTMLAttributes } from 'react';
import { unsplashSrcSet, unsplashUrl } from '../lib/unsplash';

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & {
  /** Unsplash photo id, e.g. "1750271329214-a7dbce880e85" */
  photo: string;
  alt: string;
  priority?: boolean;
};

/** Photo with a 640px → 3840px (4K) responsive srcset. */
export function Img({ photo, alt, sizes = '100vw', priority = false, ...rest }: ImgProps) {
  return (
    <img
      src={unsplashUrl(photo, 1600)}
      srcSet={unsplashSrcSet(photo)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      {...rest}
    />
  );
}
