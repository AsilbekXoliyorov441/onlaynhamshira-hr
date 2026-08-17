"use client";

import { useEffect, useState, type ReactNode } from "react";
import OnlaynHamshiraLoader from "./OnlaynHamshiraLaoding";

export default function PageLoadGate({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (document.readyState === "complete") {
      setLoaded(true);
      return;
    }
    const onLoad = () => setLoaded(true);
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    document.body.style.overflow = "hidden";
    const hide = window.setTimeout(() => setVisible(false), 450);
    return () => window.clearTimeout(hide);
  }, [loaded]);

  useEffect(() => {
    if (visible) return;
    document.body.style.overflow = "";
  }, [visible]);

  return (
    <>
      {visible && (
        <div
          className={`transition-opacity duration-500 ease-out ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <OnlaynHamshiraLoader progress={loaded ? 100 : undefined} fullscreen />
        </div>
      )}
      {children}
    </>
  );
}
