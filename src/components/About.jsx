import React from "react";
import { Box, Container, Typography, Chip, Grid, Paper } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import CodeIcon from "@mui/icons-material/Code";
import CloudIcon from "@mui/icons-material/Cloud";
import DevicesIcon from "@mui/icons-material/Devices";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const interests = [
  // {/* REPLACE */}
  "Penetration Testing",
  "Threat Intelligence",
  "Zero Trust Architecture",
  "React / React Native",
  "Python",
  "AWS Security",
  "FastAPI",
  "Docker",
  "CI/CD Pipelines",
  "Incident Response",
  "CTF Competitions",
  "Open Source",
];

const highlights = [
  {
    icon: <SecurityIcon />,
    title: "Cybersecurity",
    // {/* REPLACE */}
    desc: "5+ years in offensive & defensive security, specializing in web app pentesting and cloud security.",
  },
  {
    icon: <CodeIcon />,
    title: "Full-Stack Dev",
    // {/* REPLACE */}
    desc: "Expert in React, Python FastAPI, and REST APIs. Clean, maintainable code is my standard.",
  },
  {
    icon: <DevicesIcon />,
    title: "Mobile Dev",
    // {/* REPLACE */}
    desc: "Building cross-platform mobile apps with React Native, deployed to both iOS and Android.",
  },
  {
    icon: <CloudIcon />,
    title: "Cloud & AWS",
    // {/* REPLACE */}
    desc: "AWS Certified with deep expertise in IAM, EC2, Lambda, S3, and cloud security posture.",
  },
];

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        background:
          "linear-gradient(180deg, #0a0a0f 0%, #0e0e1a 50%, #0a0a0f 100%)",
        position: "relative",
      }}
    >
      <Container maxWidth="lg" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: "primary.main",
                letterSpacing: 4,
                fontSize: "0.85rem",
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              01 / About Me
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.8rem" },
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              Who I Am
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                background:
                  "linear-gradient(90deg, transparent, #00f0ff, transparent)",
                mx: "auto",
                mt: 2,
              }}
            />
          </Box>
        </motion.div>

        <Grid container spacing={6} alignItems="center">
          {/* Bio */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: "1.05rem",
                  mb: 3,
                }}
              >
                Hi! I'm{" "}
                <Box
                  component="span"
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  Mahesh Pandi
                </Box>
                , a cybersecurity professional and full-stack developer with a
                passion for{" "}
                <Box
                  component="span"
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  innovative solutions
                </Box>
                . I specialize in building secure, high-performance applications
                that bridge the gap between development and security operations.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: "1.05rem",
                  mb: 4,
                }}
              >
                With a background in offensive and defensive security combined
                with modern web development, I bring a security-first mindset to
                every project. I'm passionate about crafting elegant solutions,
                participating in CTF competitions, and contributing to
                open-source security initiatives.
              </Typography>

              {/* Interests */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {interests.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      background: "rgba(0,240,255,0.07)",
                      border: "1px solid rgba(0,240,255,0.2)",
                      color: "text.secondary",
                      fontFamily: '"Share Tech Mono", monospace',
                      fontSize: "0.72rem",
                      "&:hover": {
                        background: "rgba(0,240,255,0.15)",
                        color: "primary.main",
                        borderColor: "rgba(0,240,255,0.5)",
                      },
                      transition: "all 0.2s",
                    }}
                  />
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Highlight cards */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {highlights.map((item, i) => (
                <Grid item xs={12} sm={6} key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        background: "#1a1a2e",
                        border: "1px solid rgba(0,240,255,0.1)",
                        borderRadius: 3,
                        height: "100%",
                        "&:hover": {
                          border: "1px solid rgba(0,240,255,0.3)",
                          boxShadow: "0 4px 30px rgba(0,240,255,0.08)",
                        },
                        transition: "all 0.3s",
                      }}
                    >
                      <Box
                        sx={{
                          color: "primary.main",
                          mb: 1.5,
                          "& svg": { fontSize: "1.8rem" },
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, mb: 1, fontSize: "1rem" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.7 }}
                      >
                        {item.desc}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
