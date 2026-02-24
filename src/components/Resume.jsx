import React from 'react';
import {
  Box, Container, Typography, Button, Grid, Paper, Divider, Chip,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// {/* REPLACE - update with your experience and education */}
const experience = [
  {
    role: 'Senior Cybersecurity Engineer',
    company: 'TechCorp Inc.',
    period: '2022 – Present',
    bullets: [
      'Led red team exercises and penetration tests across 20+ client environments.',
      'Built security tooling with Python and FastAPI, reducing incident response time by 40%.',
      'Architected zero-trust AWS infrastructure for 5 enterprise clients.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    period: '2020 – 2022',
    bullets: [
      'Developed React web apps and React Native mobile apps serving 50K+ users.',
      'Implemented OAuth2 / JWT auth and OWASP-compliant API security.',
      'Reduced build pipeline time by 60% with GitHub Actions CI/CD.',
    ],
  },
];

const education = [
  {
    degree: 'B.S. Computer Science – Cybersecurity Track',
    school: 'University of Technology',
    period: '2016 – 2020',
    detail: 'GPA: 3.8 / 4.0 | Dean\'s List',
  },
];

const Resume = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
              05 / Resume
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, mb: 3 }}>
              Experience & Education
            </Typography>
            <Box sx={{ width: 60, height: 3, background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)', mx: 'auto', mb: 4 }} />
            <Button
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              href="/assets/resume/resume.pdf" // {/* REPLACE */}
              download
              sx={{
                background: 'linear-gradient(135deg, #00f0ff, #00b8c4)',
                color: '#0a0a0f',
                fontWeight: 700,
                px: 4,
                py: 1.5,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5effff, #00f0ff)',
                  boxShadow: '0 0 20px rgba(0,240,255,0.3)',
                },
              }}
            >
              Download Full Resume
            </Button>
          </Box>
        </motion.div>

        <Grid container spacing={5}>
          {/* Experience */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <WorkIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Work Experience</Typography>
              </Box>

              {experience.map((exp, i) => (
                <Paper
                  key={i}
                  sx={{
                    p: 3,
                    mb: 2,
                    background: '#1a1a2e',
                    border: '1px solid rgba(0,240,255,0.08)',
                    borderLeft: '3px solid rgba(0,240,255,0.5)',
                    borderRadius: '0 12px 12px 0',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 0.5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                      {exp.role}
                    </Typography>
                    <Chip
                      label={exp.period}
                      size="small"
                      sx={{
                        fontFamily: '"Share Tech Mono", monospace',
                        fontSize: '0.7rem',
                        background: 'rgba(0,240,255,0.08)',
                        color: 'primary.main',
                        border: '1px solid rgba(0,240,255,0.2)',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'primary.main', fontFamily: '"Share Tech Mono", monospace', fontSize: '0.8rem', mb: 1.5 }}>
                    {exp.company}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, m: 0 }}>
                    {exp.bullets.map((b, j) => (
                      <Typography
                        component="li"
                        key={j}
                        variant="body2"
                        sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 0.5 }}
                      >
                        {b}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              ))}
            </motion.div>
          </Grid>

          {/* Education */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <SchoolIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Education</Typography>
              </Box>

              {education.map((edu, i) => (
                <Paper
                  key={i}
                  sx={{
                    p: 3,
                    mb: 2,
                    background: '#1a1a2e',
                    border: '1px solid rgba(0,240,255,0.08)',
                    borderLeft: '3px solid rgba(255,107,107,0.5)',
                    borderRadius: '0 12px 12px 0',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'secondary.main', fontFamily: '"Share Tech Mono", monospace', fontSize: '0.8rem', mb: 1 }}>
                    {edu.school}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={edu.period} size="small" sx={{ fontFamily: '"Share Tech Mono", monospace', fontSize: '0.7rem', background: 'rgba(255,107,107,0.1)', color: 'secondary.main', border: '1px solid rgba(255,107,107,0.2)' }} />
                    <Chip label={edu.detail} size="small" sx={{ fontFamily: '"Share Tech Mono", monospace', fontSize: '0.7rem', background: 'rgba(0,240,255,0.08)', color: 'primary.main', border: '1px solid rgba(0,240,255,0.2)' }} />
                  </Box>
                </Paper>
              ))}
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Resume;
