"use client";

import Image from "next/image";
import { useState } from "react";

interface MachineHeroImageProps {
  src: string;
  fallbackSrc: string;
  alt: string;
}

/** Photo réelle de la machine — pas de viewer 3D / AR factice. */
export default function MachineHeroImage({ src, fallbackSrc, alt }: MachineHeroImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_22px_60px_rgba(15,23,42,0.1)]">
      {!failed ? (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
          onError={() => {
            if (imgSrc !== fallbackSrc) {
              setImgSrc(fallbackSrc);
            } else {
              setFailed(true);
            }
          }}
        />
      ) : (
        <div className="flex h-full min-h-[240px] items-center justify-center px-6 text-center">
          <p className="text-sm text-foreground/55">
            Photo catalogue à confirmer — demandez la fiche visuelle à notre équipe.
          </p>
        </div>
      )}
    </div>
  );
}
