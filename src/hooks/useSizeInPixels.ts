import { RefObject, useEffect, useState } from "react";

type UsePercentageWidthInPixels = (
  nodeRef: RefObject<HTMLElement | undefined>,
  width: string | number,
  sizeType: "width" | "height",
) => number;


export const useSizeInPixels: UsePercentageWidthInPixels = (nodeRef, size, sizeType) => {
  const [sizeInPixels, setWidthInPixels] = useState();

  useEffect(() => {
      const measurementUnit = typeof size === "string" ? size.match(/\w+$/)[0] : "px";
      const sizeValue = typeof size === "string" ? size.match(/^\d+/)[0] : size;


      switch (measurementUnit) {
        case "%": {
          const parentNode = nodeRef.current.parentNode as HTMLElement;
          const sizeInPixels = parentNode.getBoundingClientRect()[sizeType] * sizeValue / 100;

          setWidthInPixels(sizeInPixels);
          break;
        }
        case "px": {
          setWidthInPixels(sizeValue);
          break;
        }
        default: {
        }
      }
    }
    , [size]);

  return sizeInPixels;
};
