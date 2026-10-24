/** Responsive widths served for every photo — the largest is true 4K (3840px). */
export const IMAGE_WIDTHS = [640, 1080, 1600, 2400, 3840] as const;

export function unsplashUrl(id: string, width: number, quality = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export function unsplashSrcSet(id: string): string {
  return IMAGE_WIDTHS.map((w) => `${unsplashUrl(id, w)} ${w}w`).join(', ');
}
