"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";

type Point = { x: number; y: number };

type Lamp = {
  id: number;
  x: number;
  y: number;
  size: number;
};

/** Åtta lampor — delay styrs av x (vänster → höger). */
const LAMPS: Lamp[] = [
  { id: 0, x: 12, y: 18, size: 7 },
  { id: 1, x: 26, y: 42, size: 5.5 },
  { id: 2, x: 34, y: 68, size: 5.5 },
  { id: 3, x: 40, y: 16, size: 8 },
  { id: 4, x: 52, y: 55, size: 6 },
  { id: 5, x: 66, y: 28, size: 7.5 },
  { id: 6, x: 78, y: 48, size: 5 },
  { id: 7, x: 88, y: 20, size: 6.5 },
];

const INFLUENCE = 22;
const STEP_MS = 160;
const BLINK_MS = 720;
const WAVE_MS = STEP_MS * (LAMPS.length - 1) + BLINK_MS + 100;

/**
 * Site-wide lampor: L→R-blink vid varje sidinträde/refresh/navigering,
 * sedan hover-tändning nära musen.
 */
export function SiteLamps() {
  const pathname = usePathname();
  const reduceMotion = usePrefersReducedMotion();

  const [waveId, setWaveId] = useState(0);
  const [lastPath, setLastPath] = useState(pathname);
  const [finishedWaveId, setFinishedWaveId] = useState<number | null>(null);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setWaveId((id) => id + 1);
  }

  const waving = !reduceMotion && finishedWaveId !== waveId;

  const [active, setActive] = useState(false);
  const [cursor, setCursor] = useState<Point | null>(null);
  const [lit, setLit] = useState<Record<number, number>>({});

  const ordered = useMemo(
    () => [...LAMPS].sort((a, b) => a.x - b.x),
    [],
  );

  useEffect(() => {
    if (reduceMotion) {
      setFinishedWaveId(waveId);
      return;
    }

    setActive(false);
    setCursor(null);
    setLit({});

    const t = window.setTimeout(() => setFinishedWaveId(waveId), WAVE_MS);
    return () => window.clearTimeout(t);
  }, [waveId, reduceMotion]);

  const onLeave = useCallback(() => {
    setActive(false);
    setCursor(null);
    setLit({});
  }, []);

  const onMove = useCallback(
    (clientX: number, clientY: number) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const x = (clientX / w) * 100;
      const y = (clientY / h) * 100;

      if (x < -2 || y < -2 || x > 102 || y > 102) {
        onLeave();
        return;
      }

      setActive(true);
      setCursor({ x, y });

      const next: Record<number, number> = {};
      for (const lamp of LAMPS) {
        const dist = Math.hypot(lamp.x - x, lamp.y - y);
        if (dist < INFLUENCE) {
          next[lamp.id] = Math.max(0, 1 - dist / INFLUENCE);
        }
      }
      setLit(next);
    },
    [onLeave],
  );

  useEffect(() => {
    const handleMove = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const handleLeave = () => onLeave();

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    window.addEventListener("blur", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, [onMove, onLeave]);

  return (
    <div
      key={waveId}
      className={`site-lamps ${waving ? "is-waving" : "is-ready"} ${active ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <div className="site-lamps__wash" />

      {cursor && active ? (
        <div
          className="site-lamps__cursor-glow"
          style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
        />
      ) : null}

      {ordered.map((lamp, i) => {
        const strength = lit[lamp.id] ?? 0;
        const on = active && strength > 0.05;
        return (
          <span
            key={lamp.id}
            className={`site-lamp ${on ? "is-on" : ""}`}
            style={
              {
                left: `${lamp.x}%`,
                top: `${lamp.y}%`,
                "--lamp-size": `${lamp.size}rem`,
                "--lamp-strength": String(strength),
                "--lamp-delay": `${i * (STEP_MS / 1000)}s`,
              } as CSSProperties
            }
          >
            <span className="site-lamp__core" />
            <span className="site-lamp__halo" />
          </span>
        );
      })}
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
