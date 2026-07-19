import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  poster?: string;
  alt?: string;
  "shadow-intensity"?: string;
  "camera-controls"?: boolean;
  "auto-rotate"?: boolean;
  ar?: boolean;
};

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": ModelViewerProps;
  }
}
