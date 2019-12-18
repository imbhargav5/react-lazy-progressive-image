import { FC, ReactNode } from "react";

export interface ShapeVisiblitySensor {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface VisibilitySensorProps {
  onChange?: (isVisible: boolean) => void;
  active?: boolean;
  partialVisibility?: boolean;
  offset?: ShapeVisiblitySensor;
  minTopValue?: number;
  intervalCheck?: boolean;
  intervalDelay?: number;
  scrollCheck?: boolean;
  scrollDelay?: number;
  scrollThrottle?: number;
  resizeCheck?: boolean;
  resizeDelay?: number;
  resizeThrottle?: number;
  containment?: any;
  delayedCall?: boolean;
  children?:
    | ReactNode
    | ((args: { isVisible: boolean; visibilityRect?: ShapeVisiblitySensor }) => ReactNode);
}

declare const LazyImage: FC<{
  children: (image: string, loading: boolean, isVisible: boolean) => ReactNode;
  placeholder: string;
  src: string;
  visibilitySensorProps?: VisibilitySensorProps;
  onError?: (ev: ErrorEvent) => void;
}>;

export default LazyImage;
