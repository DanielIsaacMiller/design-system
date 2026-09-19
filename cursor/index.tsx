"use client";

import { useEffect, useRef } from "react";

import { createCursor } from "./engine";

const PULSE = {
  startSize: 8,
  endSize: 32,
  duration: 600,
  strokeWidth: 1,
};

export function Cursor({
  color = "var(--cursor-color, currentColor)",
  size = 8,
  pulse = PULSE,
  strikeEvent,
}: {
  color?: string;
  size?: number;
  pulse?: {
    startSize: number;
    endSize: number;
    duration: number;
    strokeWidth: number;
  };
  strikeEvent?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const { startSize, endSize, duration, strokeWidth } = pulse;

  useEffect(() => {
    const svg = svgRef.current;
    const dot = dotRef.current;
    if (!svg || !dot) return;

    const cursor = createCursor(svg, dot, {
      color,
      pulseStartSize: startSize,
      pulseEndSize: endSize,
      pulseDuration: duration,
      pulseStrokeWidth: strokeWidth,
    });

    const root = document.documentElement;
    root.setAttribute("data-custom-cursor", "");

    const isOverControl = (event: PointerEvent) =>
      event.target instanceof Element &&
      event.target.closest("button, a") !== null;

    const onPointerMove = (event: PointerEvent) => {
      cursor.moveTo(event.clientX, event.clientY);
      if (event.pointerType !== "touch") {
        cursor.setVisible(!isOverControl(event));
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      cursor.moveTo(event.clientX, event.clientY);
      if (isOverControl(event)) return;
      cursor.setVisible(true);
      cursor.pulse(event.clientX, event.clientY);
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType === "touch") cursor.setVisible(false);
    };

    const onLeaveViewport = () => cursor.setVisible(false);

    const onStrike = (event: Event) => {
      const detail = (event as CustomEvent<{ x: number; y: number }>).detail;
      cursor.pulse(detail.x, detail.y);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    document.documentElement.addEventListener("pointerleave", onLeaveViewport);
    if (strikeEvent) window.addEventListener(strikeEvent, onStrike);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.removeEventListener(
        "pointerleave",
        onLeaveViewport,
      );
      if (strikeEvent) window.removeEventListener(strikeEvent, onStrike);
      cursor.destroy();
      root.removeAttribute("data-custom-cursor");
    };
  }, [color, startSize, endSize, duration, strokeWidth, strikeEvent]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    >
      <circle
        ref={dotRef}
        data-cursor-dot
        r={size / 2}
        cx={-100}
        cy={-100}
        className="opacity-0"
        style={{ fill: color }}
      />
    </svg>
  );
}
