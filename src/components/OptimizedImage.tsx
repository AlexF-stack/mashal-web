import Image, { ImageProps } from "next/image";
import { CSSProperties } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "alt"> {
  alt: string;
  ratio?: "square" | "video" | "portrait" | "landscape";
  containerClassName?: string;
  priority?: boolean;
}

const ratioMap: Record<string, number> = {
  square: 1,
  video: 16 / 9,
  portrait: 2 / 3,
  landscape: 4 / 3,
};

export default function OptimizedImage({
  alt,
  ratio = "video",
  containerClassName = "",
  width,
  height,
  ...props
}: OptimizedImageProps) {
  // Calculate dimensions based on ratio if not provided
  let w = width as number;
  let h = height as number;

  if (!w && !h) {
    w = 1200;
    h = Math.round(1200 / ratioMap[ratio]);
  } else if (w && !h) {
    h = Math.round((w as number) / ratioMap[ratio]);
  } else if (h && !w) {
    w = Math.round((h as number) * ratioMap[ratio]);
  }

  const paddingBottom = `${((h as number) / (w as number)) * 100}%`;

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-white/5 ${containerClassName}`}
      style={
        {
          "--aspect-ratio": paddingBottom,
          paddingBottom,
        } as CSSProperties
      }
    >
      <Image
        {...props}
        alt={alt}
        width={w}
        height={h}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        quality={85}
      />
    </div>
  );
}
