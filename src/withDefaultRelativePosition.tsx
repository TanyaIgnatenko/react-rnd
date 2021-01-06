// @ts-nocheck
import React, { useRef } from "react";
import { useParentSize } from "./hooks/useParentSize";

export const withDefaultRelativePosition = (WrappedComponent) => {
  return ({ default: defaultValue, ...restProps }) => {
   const wrapperNodeRef = useRef(null);
    const parentSize = useParentSize(wrapperNodeRef);

    if (!defaultValue) return <WrappedComponent {...restProps} />;

    const needsWindowSize = defaultValue.right || defaultValue.bottom;
    const parentSizeIsAbsent = !parentSize.width || !parentSize.height;

    if (needsWindowSize && parentSizeIsAbsent) {
      return (
        <div ref={wrapperNodeRef} style={{ height: "100%" }}/>
      );
    }

    const processedDefaultX = defaultValue.x !== undefined
      ? defaultValue.x
      : defaultValue.left || (parentSize.width - (defaultValue.width + defaultValue.right));
    const processedDefaultY = defaultValue.y !== undefined
      ? defaultValue.y
      : defaultValue.top || (parentSize.height - (defaultValue.height + defaultValue.bottom));

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
