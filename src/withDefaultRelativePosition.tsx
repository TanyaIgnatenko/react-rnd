import React, { ComponentType, ReactNode, useRef } from "react";
import { useParentSize } from "./hooks/useParentSize";
import { Props } from "../lib";

type ExtendedDefault = {
  x?: number;
  y?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
} & {
  width: number;
  height: number;
};
type ReturnedComponent = (_: Omit<Props, "default"> & {default: ExtendedDefault}) => ReactNode;
type WithDefaultRelativePosition = (_: ComponentType<Props>) => ReturnedComponent;

export const withDefaultRelativePosition: WithDefaultRelativePosition = (WrappedComponent) => {
  return ({ default: defaultValue, ...restProps }) => {
   const wrapperNodeRef = useRef(null);
    const parentSize = useParentSize(wrapperNodeRef);

    if (!defaultValue) {
      return <WrappedComponent {...restProps} />;
    }

    const needsWindowSize = defaultValue.right || defaultValue.bottom;

    if (needsWindowSize && !parentSize) {
      return (
        <div ref={wrapperNodeRef} style={{ height: "100%" }}>
          <WrappedComponent {...restProps} default={defaultValue} style={{ visible: false }}/>
        </div>
      );
    }

    const processedDefaultX = defaultValue.x !== undefined
      ? defaultValue.x
      : defaultValue.left || (parentSize!.width - (defaultValue.width + defaultValue.right));
    const processedDefaultY = defaultValue.y !== undefined
      ? defaultValue.y
      : defaultValue.top || (parentSize!.height - (defaultValue.height + defaultValue.bottom));

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
