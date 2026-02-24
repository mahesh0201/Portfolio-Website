import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TypeAnimation } from "react-type-animation";
import { motion, useScroll, useTransform } from "framer-motion";
import CelestialMatrixShader from "./ui/martrix-shader";

// Hexagon particle data
const HEX_COUNT = 18;
const hexagons = Array.from({ length: HEX_COUNT }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 60 + 20,
  opacity: Math.random() * 0.12 + 0.03,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
}));

const Hero = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: "transparent",
        overflow: "hidden",
        pt: 8,
      }}
    >
      {/* Matrix Shader Background */}
      <CelestialMatrixShader />
      
      {/* Overlay gradient for depth */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.07) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      {/* Animated grid lines */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating hexagons with mouse parallax */}
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          style={{
            position: "absolute",
            left: `${hex.x}%`,
            top: `${hex.y}%`,
            width: hex.size,
            height: hex.size,
            x:
              mousePos.x *
              (hex.id % 3 === 0 ? 0.8 : hex.id % 3 === 1 ? 0.4 : 1.2),
            y:
              mousePos.y *
              (hex.id % 3 === 0 ? 0.5 : hex.id % 3 === 1 ? 1.0 : 0.3),
            pointerEvents: "none",
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 60, 120, 180, 240, 300, 360],
          }}
          transition={{
            duration: hex.duration,
            delay: hex.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="2"
              opacity={hex.opacity}
            />
          </svg>
        </motion.div>
      ))}

      {/* Glow orb */}
      <motion.div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          y: y1,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div style={{ opacity }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: { xs: 6, md: 8 },
              py: 4,
            }}
          >
            {/* Text content */}
            <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Share Tech Mono", monospace',
                    color: "primary.main",
                    fontSize: "0.9rem",
                    letterSpacing: 4,
                    mb: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Welcome to my portfolio 👋
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.8rem", md: "4rem", lg: "5rem" },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    mb: 1,
                    background:
                      "linear-gradient(135deg, #ffffff 30%, #00f0ff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Mahesh Pandi
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Box
                  sx={{
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Share Tech Mono", monospace',
                      color: "primary.main",
                      fontSize: { xs: "1.1rem", md: "1.4rem" },
                    }}
                  >
                    <TypeAnimation
                      sequence={[
                        "Cybersecurity Engineer",
                        2000,
                        "Full-Stack Developer",
                        2000,
                        "React Native Dev",
                        2000,
                        "Cloud Security Architect",
                        2000,
                        "Python & FastAPI Expert",
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </Typography>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    maxWidth: 520,
                    mb: 4,
                    lineHeight: 1.8,
                    fontSize: "1.05rem",
                    mx: { xs: "auto", md: 0 },
                  }}
                >
                  Crafting innovative digital solutions at the intersection of
                  cybersecurity and modern web development. Passionate about
                  secure architecture, threat prevention, and elegant code.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Stack
                  direction="row"
                  gap={2}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<DownloadIcon />}
                    href="/assets/resume/resume.pdf"
                    download
                    sx={{
                      background: "linear-gradient(135deg, #00f0ff, #00b8c4)",
                      color: "#0a0a0f",
                      fontWeight: 700,
                      px: 3,
                      py: 1.5,
                      "&:hover": {
                        background: "linear-gradient(135deg, #5effff, #00f0ff)",
                        boxShadow: "0 0 20px rgba(0,240,255,0.4)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Download Resume
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() =>
                      document
                        .getElementById("projects")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    sx={{
                      borderColor: "rgba(0,240,255,0.5)",
                      color: "primary.main",
                      px: 3,
                      py: 1.5,
                      "&:hover": {
                        borderColor: "primary.main",
                        background: "rgba(0,240,255,0.08)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    View Projects
                  </Button>
                </Stack>
              </motion.div>
            </Box>

            {/* Profile avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 220, md: 280 },
                  height: { xs: 220, md: 280 },
                }}
              >
                {/* Rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    inset: -8,
                    borderRadius: "50%",
                    border: "2px dashed rgba(0,240,255,0.3)",
                  }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    inset: -16,
                    borderRadius: "50%",
                    border: "1px dashed rgba(0,240,255,0.15)",
                  }}
                />
                <Avatar
                  src="/assets/images/profile-placeholder.svg"
                  alt="Mahesh Pandi"
                  sx={{
                    width: "100%",
                    height: "100%",
                    border: "3px solid rgba(0,240,255,0.4)",
                    boxShadow: "0 0 40px rgba(0,240,255,0.2)",
                    fontSize: "5rem",
                    background: "linear-gradient(135deg, #1a1a2e, #12121a)",
                  }}
                >
                  MP
                </Avatar>
                {/* Online indicator */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 12,
                    right: 12,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#00ff88",
                    border: "2px solid #0a0a0f",
                    boxShadow: "0 0 8px #00ff88",
                  }}
                />
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Box
          onClick={scrollToAbout}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            color: "rgba(0,240,255,0.5)",
            "&:hover": { color: "primary.main" },
            transition: "color 0.3s",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Share Tech Mono"',
              fontSize: "0.7rem",
              letterSpacing: 2,
              mb: 0.5,
            }}
          >
            SCROLL
          </Typography>
          <KeyboardArrowDownIcon />
        </Box>
      </motion.div>
    </Box>
  );
};

export default Hero;
