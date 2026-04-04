import { useEffect, useRef } from "react";

// Animated floating orbs drawn on canvas — sits behind everything
export default function FloatingBackground({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let W, H;

    const orbs = [
      { x: 0.15, y: 0.2,  r: 320, speed: 0.00018, angle: 0,    amp: 0.08, color: dark ? "rgba(249,115,22,0.055)" : "rgba(249,115,22,0.09)" },
      { x: 0.78, y: 0.15, r: 260, speed: 0.00022, angle: 2.1,  amp: 0.06, color: dark ? "rgba(251,146,60,0.04)"  : "rgba(251,146,60,0.07)" },
      { x: 0.85, y: 0.7,  r: 340, speed: 0.00015, angle: 4.2,  amp: 0.07, color: dark ? "rgba(249,115,22,0.04)"  : "rgba(249,115,22,0.06)" },
      { x: 0.3,  y: 0.75, r: 200, speed: 0.00025, angle: 1.0,  amp: 0.05, color: dark ? "rgba(234,108,5,0.035)"  : "rgba(234,108,5,0.055)" },
      { x: 0.55, y: 0.45, r: 180, speed: 0.0002,  angle: 3.5,  amp: 0.04, color: dark ? "rgba(251,146,60,0.03)"  : "rgba(251,146,60,0.05)" },
    ];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach((o) => {
        const angle = o.angle + t * o.speed;
        const cx = (o.x + Math.sin(angle) * o.amp) * W;
        const cy = (o.y + Math.cos(angle * 1.3) * o.amp) * H;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
        grad.addColorStop(0, o.color);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}