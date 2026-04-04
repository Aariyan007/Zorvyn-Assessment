import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="loader-screen"
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
    >
      <div className="loader-rings">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="loader-ring"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.8 + i * 0.5, ease: "linear" }}
            style={{
              inset: i * 10,
              borderTopColor: `rgba(249,115,22,${0.9 - i * 0.25})`,
              borderRightColor: `rgba(249,115,22,${0.25 - i * 0.06})`,
            }}
          />
        ))}
        <div className="loader-center">F</div>
      </div>

      <motion.div
        className="loader-name"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        FinFlow
      </motion.div>

      <div className="loader-bar-wrap">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.9, ease: [0.4, 0, 0.2, 1] }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, var(--orange), var(--orange2))",
            borderRadius: 99,
          }}
        />
      </div>

      <motion.p
        className="loader-pulse"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
      >
        loading dashboard_
      </motion.p>
    </motion.div>
  );
}