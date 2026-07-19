"use client";

import { Rotate3d, Maximize2, Zap } from "lucide-react";
import { useState, type ElementType } from "react";

interface Machine3DViewerProps {
  modelUrl?: string;
  posterUrl?: string;
}

export default function Machine3DViewer({ modelUrl, posterUrl }: Machine3DViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const ModelViewerTag = "model-viewer" as unknown as ElementType;

  const src = modelUrl || "https://modelviewer.dev/shared-assets/models/Astronaut.glb";

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-2xl">
      <ModelViewerTag
        src={src}
        poster={posterUrl}
        alt="Modèle 3D d'équipement Mashal"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        ar
        style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
        onLoad={() => setIsLoading(false)}
      >
        <div slot="progress-bar" className="hidden"></div>
      </ModelViewerTag>

      {/* Overlays */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-background shadow-lg shadow-primary/20">
          <Rotate3d className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-white">Vue Interactive 3D</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Prototype AR activé</p>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-2">
        <button className="flex h-10 items-center gap-2 rounded-xl bg-white/10 px-4 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white/20">
          <Maximize2 className="h-4 w-4" />
          Plein écran
        </button>
        <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-background shadow-lg shadow-primary/20 transition-all hover:scale-105">
          <Zap className="h-4 w-4" />
          Voir en AR
        </button>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">Chargement du modèle 3D...</p>
        </div>
      )}

      {/* Pro-Tip */}
      <div className="absolute bottom-6 left-6 max-w-[200px]">
        <p className="text-[10px] leading-relaxed text-white/40 italic">
          Scrollez pour zoomer, cliquez-glissez pour pivoter la machine.
        </p>
      </div>
    </div>
  );
}
