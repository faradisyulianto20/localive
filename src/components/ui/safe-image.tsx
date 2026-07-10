export function SafeImage({ src, alt = '', fallback = '/images/placeholder-img-not-found.jpg', className, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }) {
  const safeSrc = src || fallback
  return (
    <img
      src={safeSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        if (e.currentTarget.src !== fallback) {
          e.currentTarget.src = fallback;
        }
      }}
      {...props}
    />
  );
}
