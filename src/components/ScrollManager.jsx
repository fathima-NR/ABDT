import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
