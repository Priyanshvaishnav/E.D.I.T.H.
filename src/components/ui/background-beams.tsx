
"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const beams = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!beams.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;

      beams.current!.style.setProperty("--x", `${x}%`);
      beams.current!.style.setProperty("--y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={beams}
      className={cn(
        "absolute inset-0 overflow-hidden [--x:50%] [--y:50%]",
        className
      )}
    >
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(600px_circle_at_var(--x)_var(--y),transparent_20%,black)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-50" />
    </div>
  );
};
