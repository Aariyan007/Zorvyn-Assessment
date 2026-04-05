import { useEffect, useRef } from "react";

// Floating financial icons + geometric shapes on canvas
const ICONS = [
  // SVG path strings as text chars — we draw them as unicode on canvas
  { char: "₹", size: 28 },
  { char: "◈", size: 22 },
  { char: "⬡", size: 26 },
  { char: "◇", size: 20 },
  { char: "△", size: 22 },
  { char: "⊕", size: 24 },
  { char: "◎", size: 20 },
  { char: "⬢", size: 26 },
  { char: "✦", size: 18 },
  { char: "%",  size: 22 },
  { char: "↗",  size: 20 },
  { char: "⬡",  size: 24 },
];

function makeParticles(W, H, dark) {
  return Array.from({ length: 45 }, (_, i) => ({
    x:     Math.random() * W,
    y:     Math.random() * H,
    icon:  ICONS[i % ICONS.length],
    vx:    (Math.random() - 0.5) * 0.22,
    vy:    (Math.random() - 0.5) * 0.18,
    alpha: 0.12 + Math.random() * 0.18,
    rot:   Math.random() * Math.PI * 2,
    rotV:  (Math.random() - 0.5) * 0.004,
    scale: 0.8 + Math.random() * 0.9,
  }));
}

export default function FloatingBackground({ dark }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let raf, W, H;
    let particles = [];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles = makeParticles(W, H, dark);
    }

    // orange colour for icons
    const iconColor = dark
      ? "rgba(249,115,22,ALPHA)"
      : "rgba(234,88,12,ALPHA)";

    function draw() {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        // move
        p.x   += p.vx;
        p.y   += p.vy;
        p.rot += p.rotV;
        // wrap
        if (p.x < -60)  p.x = W + 60;
        if (p.x > W + 60) p.x = -60;
        if (p.y < -60)  p.y = H + 60;
        if (p.y > H + 60) p.y = -60;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.font = `${p.icon.size * p.scale}px "DM Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = iconColor.replace("ALPHA", p.alpha.toFixed(2));
        ctx.fillText(p.icon.char, 0, 0);
        ctx.restore();
      });

      raf = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0,
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
}