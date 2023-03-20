import { useEffect } from "react";
import type { RefObject } from "react";

type EventHandler = (event: MouseEvent | TouchEvent) => void;

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: EventHandler
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (ref.current === null || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mouseup", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mouseup", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
