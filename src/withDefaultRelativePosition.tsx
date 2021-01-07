import React, { ComponentType, ReactNode, useRef } from "react";
import { useParentSize } from "./hooks/useParentSize";
import { Props } from "../lib";
import { useSizeInPixels } from "./hooks/useSizeInPixels";

type ExtendedDefault = {
  x?: number;
  y?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
} & {
  width: string;
  height: string;
};
type ReturnedComponent = (_: Omit<Props, "default"> & {default: ExtendedDefault}) => ReactNode;
type WithDefaultRelativePosition = (_: ComponentType<Props>) => ReturnedComponent;

export const withDefaultRelativePosition: WithDefaultRelativePosition = (WrappedComponent) => {
  return ({
            default: defaultValue,
            parentNodeRef,
            ...restProps
  }) => {
    const nodeRef = useRef<HTMLElement>();

    const processedWidth = useSizeInPixels(nodeRef, defaultValue.width, "width");
    const processedHeight = useSizeInPixels(nodeRef, defaultValue.height, "height");

    const parentSize = useParentSize(nodeRef);

    const needsWindowSize = defaultValue.right || defaultValue.bottom;

    if (needsWindowSize && !parentSize || !processedWidth || !processedHeight) {
      return (
        <div ref={nodeRef} style={{ height: "100%" }}>
          <WrappedComponent {...restProps} default={defaultValue} style={{ visible: false }}/>
        </div>
      );
    }

    const processedDefaultX = defaultValue.x !== undefined
      ? defaultValue.x
      : defaultValue.left || (parentSize!.width - (processedWidth + defaultValue.right));
    const processedDefaultY = defaultValue.y !== undefined
      ? defaultValue.y
      : defaultValue.top || (parentSize!.height - (processedHeight + defaultValue.bottom));

    const processedDefault = {
      ...defaultValue,
      x: processedDefaultX,
      y: processedDefaultY,
    };

    return (
       <WrappedComponent {...restProps} default={processedDefault} />
    );
  }
};
