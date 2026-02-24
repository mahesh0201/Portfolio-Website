import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

export function CyberSecurityVisualizer() {
  const [underAttack, setUnderAttack] = useState(false);
  const [isDefending, setIsDefending] = useState(false);
  const [defendProgress, setDefendProgress] = useState(0);

  // Simulate cyber attack and defense cycle
  useEffect(() => {
    const cycleTimeout = setInterval(() => {
      setUnderAttack(true);
      setIsDefending(false);
      setDefendProgress(0);

      // After 1.5s of attack, start defense
      setTimeout(() => {
        setIsDefending(true);
        let progress = 0;
        const defendInterval = setInterval(() => {
          progress += 5;
          setDefendProgress(progress);
          if (progress >= 100) {
            clearInterval(defendInterval);
            setUnderAttack(false);
            setIsDefending(false);
          }
        }, 50);
      }, 1500);
    }, 6000);

    return () => clearInterval(cycleTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.4,
        type: "spring",
        stiffness: 80,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", md: 420 },
          height: 420,
          background: underAttack
            ? "rgba(255, 0, 0, 0.05)"
            : "rgba(10, 10, 15, 0.6)",
          backdropFilter: "blur(20px)",
          border: underAttack
            ? "1.5px solid rgba(255, 0, 0, 0.6)"
            : "1.5px solid rgba(0, 240, 255, 0.3)",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: underAttack
            ? "0 20px 60px rgba(255, 0, 0, 0.25), inset 0 0 40px rgba(255, 0, 0, 0.1)"
            : "0 20px 60px rgba(0, 240, 255, 0.15), inset 0 0 40px rgba(0, 240, 255, 0.05)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Animated Grid Background */}
        <motion.div
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(90deg, ${underAttack ? "rgba(255, 0, 0, 0.08)" : "rgba(0, 240, 255, 0.1)"} 1px, transparent 1px),
              linear-gradient(${underAttack ? "rgba(255, 0, 0, 0.08)" : "rgba(0, 240, 255, 0.1)"} 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Attack Waves (Red lines when under attack) */}
        {underAttack && (
          <>
            <motion.div
              animate={{ y: [0, 420, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.9), transparent)",
                boxShadow: "0 0 15px rgba(255, 0, 0, 0.8)",
                zIndex: 6,
              }}
            />
            <motion.div
              animate={{ y: [0, 420, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.7), transparent)",
                boxShadow: "0 0 10px rgba(255, 0, 0, 0.6)",
                zIndex: 6,
              }}
            />
          </>
        )}

        {/* Defense Shield Animation */}
        {isDefending && (
          <motion.div
            animate={{
              scale: [0.8, 1.1, 1],
              opacity: [0, 1, 0.3],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              height: "300px",
              border: "2px solid rgba(0, 255, 136, 0.6)",
              borderRadius: "50%",
              boxShadow: "0 0 30px rgba(0, 255, 136, 0.4)",
              zIndex: 5,
            }}
          />
        )}

        {/* Central Security Icon */}
        <motion.div
          animate={{
            scale: underAttack
              ? [1, 1.1, 0.95, 1.05, 1]
              : isDefending
                ? [1, 1.15, 1]
                : [1, 1.05, 1],
            rotate: underAttack
              ? [0, -5, 5, -5, 0]
              : isDefending
                ? [0, 360]
                : [0],
          }}
          transition={{
            duration: underAttack ? 0.6 : isDefending ? 2 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "100px",
            zIndex: 4,
            filter: underAttack
              ? "drop-shadow(0 0 20px rgba(255, 0, 0, 0.6))"
              : isDefending
                ? "drop-shadow(0 0 20px rgba(0, 255, 136, 0.6))"
                : "drop-shadow(0 0 10px rgba(0, 240, 255, 0.4))",
          }}
        >
          {isDefending ? "🛡️" : underAttack ? "⚠️" : "🔐"}
        </motion.div>

        {/* Status Text */}
        <Box
          sx={{
            position: "absolute",
            bottom: 60,
            left: 20,
            right: 20,
            zIndex: 4,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Share Tech Mono", monospace',
              color: underAttack
                ? "#ff0000"
                : isDefending
                  ? "#00ff88"
                  : "#00f0ff",
              letterSpacing: 2,
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: "0.85rem",
              transition: "color 0.3s ease",
            }}
          >
            {underAttack
              ? "CYBERATTACK DETECTED"
              : isDefending
                ? "DEFENSE ACTIVE"
                : "SYSTEM SECURE"}
          </Typography>
        </Box>

        {/* Defense Progress Bar */}
        {isDefending && (
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              left: 20,
              right: 20,
              height: "4px",
              background: "rgba(0, 255, 136, 0.2)",
              borderRadius: 2,
              overflow: "hidden",
              zIndex: 4,
            }}
          >
            <motion.div
              animate={{ width: `${defendProgress}%` }}
              transition={{ duration: 0.1 }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, #00ff88, #5effff)",
                boxShadow: "0 0 10px rgba(0, 255, 136, 0.8)",
              }}
            />
          </Box>
        )}

        {/* Attack Indicators (Pulsing when under attack) */}
        {underAttack && (
          <>
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#ff0000",
                boxShadow: "0 0 15px rgba(255, 0, 0, 0.8)",
                zIndex: 5,
              }}
            />
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#ff0000",
                boxShadow: "0 0 15px rgba(255, 0, 0, 0.8)",
                zIndex: 5,
              }}
            />
          </>
        )}

        {/* Defense Indicators (Pulsing when defending) */}
        {isDefending && (
          <>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00ff88",
                boxShadow: "0 0 10px rgba(0, 255, 136, 0.8)",
                zIndex: 5,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00ff88",
                boxShadow: "0 0 10px rgba(0, 255, 136, 0.8)",
                zIndex: 5,
              }}
            />
          </>
        )}

        {/* Normal state indicators */}
        {!underAttack && !isDefending && (
          <>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00f0ff",
                boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
                zIndex: 5,
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00ff88",
                boxShadow: "0 0 10px rgba(0, 255, 136, 0.8)",
                zIndex: 5,
              }}
            />
          </>
        )}
      </Box>

      {/* Status Badge Below */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Box
          sx={{
            mt: 3,
            p: 1.5,
            background: underAttack
              ? "rgba(255, 0, 0, 0.08)"
              : "rgba(0, 240, 255, 0.08)",
            backdropFilter: "blur(10px)",
            border: underAttack
              ? "1px solid rgba(255, 0, 0, 0.2)"
              : "1px solid rgba(0, 240, 255, 0.2)",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            transition: "all 0.3s ease",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: underAttack ? "#ff0000" : "#00ff88",
              boxShadow: `0 0 8px ${underAttack ? "rgba(255, 0, 0, 0.8)" : "rgba(0, 255, 136, 0.8)"}`,
            }}
          />
          <Typography
            sx={{
              fontSize: "0.85rem",
              color: underAttack ? "#ff0000" : "#00ff88",
              fontWeight: 700,
              fontFamily: '"Share Tech Mono", monospace',
              letterSpacing: 1,
              transition: "color 0.3s ease",
            }}
          >
            {underAttack
              ? "INTRUSION DETECTED"
              : isDefending
                ? "NEUTRALIZING THREAT"
                : "SECURE BUILD ACTIVE"}
          </Typography>
        </Box>
      </motion.div>
    </motion.div>
  );
}
