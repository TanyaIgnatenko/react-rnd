import { useState, useEffect, RefObject } from "react";

type Size = {width: number, height: number}
type UseParentSize = (_: RefObject<HTMLElement>) => Size | undefined;

export const useParentSize: UseParentSize = (nodeRef) => {
  const [parentSize, setParentSize] = useState<Size>();

  useEffect(() => {
    if (!nodeRef.current) return;

    const parentNode = nodeRef.current.parentNode as HTMLElement;
    const { width, height } = parentNode.getBoundingClientRect();

    setParentSize({ width, height });
  }, [nodeRef]);

  return parentSize;
};
