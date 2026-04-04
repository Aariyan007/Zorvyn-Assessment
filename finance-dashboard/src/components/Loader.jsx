import { motion } from "framer-motion";

export default function Loader({ dark }) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45 }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: dark ? "#0a0a0a" : "#fafaf9",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 28,
      }}
    >
      {/* animated rings */}
      <div style={{ position: "relative", width: 80, height: 80, marginBottom: 8 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.6, ease: "linear" }}
            style={{
              position: "absolute",
              inset: i * 10,
              borderRadius: "50%",
              border: `2px solid transparent`,
              borderTopColor: `rgba(249,115,22,${0.9 - i * 0.25})`,
              borderRightColor: `rgba(249,115,22,${0.3 - i * 0.08})`,
            }}
          />
        ))}
        <div style={{
          position: "absolute", inset: 24, borderRadius: "50%",
          background: "var(--orange)", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 700, color: "#000",
        }}>
          ₹
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ fontFamily: "var(--font)", fontSize: 22, fontWeight: 700, letterSpacing: -0.5, color: "var(--text)" }}
      >
        FinFlow
      </motion.div>

      {/* progress bar */}
      <div style={{ width: 180, height: 2, background: "var(--bg4)", borderRadius: 99, overflow: "hidden" }}>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ height: "100%", background: "linear-gradient(90deg,var(--orange),var(--orange2))", borderRadius: 99 }}
        />
      </div>

      <motion.p
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
        style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--text3)" }}
      >
        loading dashboard_
      </motion.p>
    </motion.div>
  );
}