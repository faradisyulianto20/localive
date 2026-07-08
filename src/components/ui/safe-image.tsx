export function SafeImage({ src, alt = '', fallback = '/placeholder-img-not-found.jpg', className, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fallback?: string }) {
  return (
    <img
      src={src}
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
