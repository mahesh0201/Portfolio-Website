import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Paper, LinearProgress, Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// {/* REPLACE - update these arrays with your actual skills */}
const cyberSkills = [
  { name: 'Penetration Testing', level: 90 },
  { name: 'Network Security', level: 88 },
  { name: 'SIEM / Log Analysis', level: 82 },
  { name: 'Vulnerability Assessment', level: 92 },
  { name: 'Incident Response', level: 85 },
];

const devSkills = [
  { name: 'React ', level: 92 },
    { name: 'React Native', level: 80 },
{ name: 'TypeScript', level: 88 },
  { name: 'Python', level: 90 },
    { name: 'FastAPI', level: 90 },
  { name: 'AWS', level: 82 },
];

// {/* REPLACE - update these tool tags */}
const cyberTools = [
  'Burp Suite', 'Metasploit', 'Wireshark', 'Nmap', 'OWASP ZAP',
  'Splunk', 'Snort', 'Nessus', 'Kali Linux', 'MITRE ATT&CK',
];

const devTools = [
  'React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL',
'React Native', 'AWS', 'Git', 'CI/CD', 'REST APIs',
];

const SkillCard = ({ title, skills, tools, delay }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={{
        perspective: 1000,
        height: '100%',
      }}
    >
      <motion.div
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: 'preserve-3d',
          height: '100%',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            background: '#1a1a2e',
            border: '1px solid rgba(0,240,255,0.12)',
            borderRadius: 3,
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #00f0ff, transparent)',
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, mb: 3, color: 'primary.main', fontSize: '1.2rem' }}
          >
            {title}
          </Typography>

          {/* Skill bars */}
          <Box sx={{ mb: 3 }}>
            {skills.map((skill, i) => (
              <Box key={skill.name} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: '"Share Tech Mono", monospace', fontSize: '0.8rem' }}>
                    {skill.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'primary.main', fontFamily: '"Share Tech Mono", monospace', fontSize: '0.8rem' }}>
                    {skill.level}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={inView ? skill.level : 0}
                  sx={{
                    height: 5,
                    borderRadius: 5,
                    backgroundColor: 'rgba(0,240,255,0.08)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #00b8c4, #00f0ff)',
                      borderRadius: 5,
                      transition: `width ${0.8 + i * 0.1}s ease ${delay + i * 0.05}s`,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Tools */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: 'text.secondary',
                fontSize: '0.72rem',
                letterSpacing: 2,
                mb: 1.5,
                textTransform: 'uppercase',
              }}
            >
              Tools & Technologies
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
              {tools.map((tool) => (
                <Chip
                  key={tool}
                  label={tool}
                  size="small"
                  sx={{
                    background: 'rgba(0,240,255,0.06)',
                    border: '1px solid rgba(0,240,255,0.18)',
                    color: 'text.secondary',
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: '0.7rem',
                    height: 24,
                    '&:hover': {
                      background: 'rgba(0,240,255,0.12)',
                      color: 'primary.main',
                    },
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        background: '#0a0a0f',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: 'primary.main',
                letterSpacing: 4,
                fontSize: '0.85rem',
                mb: 1,
                textTransform: 'uppercase',
              }}
            >
              02 / Skills
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700 }}>
              Technical Expertise
            </Typography>
            <Box
              sx={{
                width: 60,
                height: 3,
                background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)',
                mx: 'auto',
                mt: 2,
              }}
            />
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <SkillCard
              title="🛡 Cybersecurity Skills"
              skills={cyberSkills}
              tools={cyberTools}
              delay={0.1}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <SkillCard
              title="⚙️ Full-Stack Development"
              skills={devSkills}
              tools={devTools}
              delay={0.25}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Skills;
