import { useEffect, useState } from "react";
import BrandLogo from "./BrandLogo";

const HOLD_MS = 2000;
const FADE_MS = 450;

export default function WelcomeSplash() {
  const [phase, setPhase] = useState("show");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const restore = () => {
      document.body.style.overflow = previousOverflow;
    };

    const hold = window.setTimeout(() => setPhase("leave"), HOLD_MS);
    const hide = window.setTimeout(() => {
      restore();
      setPhase("gone");
    }, HOLD_MS + (reduce ? 0 : FADE_MS));

    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(hide);
      restore();
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`welcome-splash fixed inset-0 z-[80] flex flex-col text-ink ${phase === "leave" ? "welcome-splash-leave" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex h-1" aria-hidden="true">
        <span className="flex-1 bg-uae-green" />
        <span className="w-10 bg-white" />
        <span className="flex-1 bg-black" />
        <span className="flex-1 bg-uae-red" />
      </div>
      <div className="relative flex flex-1 items-center justify-center px-6">
        <span className="welcome-orb welcome-orb-green" aria-hidden="true" />
        <span className="welcome-orb welcome-orb-red" aria-hidden="true" />
        <span className="welcome-orb welcome-orb-dark" aria-hidden="true" />
        <span className="welcome-ring" aria-hidden="true" />
        <BrandLogo className="welcome-logo relative h-20 w-auto sm:h-24" />
      </div>
    </div>
  );
}
