import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  CardActions, Button, Chip, IconButton, Stack,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectModal from './ProjectModal';

// {/* REPLACE - update with your actual projects */}
const projects = [
  {
    id: 1,
    title: 'SecureVault',
    category: 'Cybersecurity',
    shortDesc: 'A zero-knowledge password manager with AES-256 encryption and TOTP support.',
    fullDesc: 'SecureVault is a production-grade password manager built with security-first architecture. Features end-to-end AES-256 encryption, zero-knowledge design (server never sees plaintext), TOTP 2FA, breach detection via HaveIBeenPwned API, and a React-based browser extension.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'AES-256', 'JWT', 'Docker'],
    github: 'https://github.com', // {/* REPLACE */}
    live: 'https://example.com', // {/* REPLACE */}
    color: '#00f0ff',
  },
  {
    id: 2,
    title: 'ThreatMapper',
    category: 'Cybersecurity',
    shortDesc: 'Real-time network threat visualization dashboard using ML anomaly detection.',
    fullDesc: 'ThreatMapper aggregates network traffic logs, applies machine learning anomaly detection, and visualizes threats on an interactive dashboard. Integrates with Splunk, Elastic SIEM, and custom log sources. Built with Python backend and React frontend with D3.js visualizations.',
    tech: ['Python', 'scikit-learn', 'React', 'D3.js', 'Elasticsearch', 'FastAPI'],
    github: 'https://github.com', // {/* REPLACE */}
    live: null,
    color: '#ff6b6b',
  },
  {
    id: 3,
    title: 'DevBridge',
    category: 'Full-Stack',
    shortDesc: 'Full-stack project management platform with real-time collaboration and CI/CD integration.',
    fullDesc: 'DevBridge is a developer-centric project management tool with kanban boards, real-time collaboration via WebSockets, GitHub/GitLab CI/CD integration, and an AI-powered task breakdown feature. Supports teams of up to 50 with role-based access control.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'WebSockets', 'Redis', 'AWS'],
    github: 'https://github.com', // {/* REPLACE */}
    live: 'https://example.com', // {/* REPLACE */}
    color: '#00ff88',
  },
  {
    id: 4,
    title: 'NativeGuard',
    category: 'Mobile',
    shortDesc: 'React Native app that scans and monitors device security posture with real-time alerts.',
    fullDesc: 'NativeGuard is a cross-platform mobile security app built with React Native. Features device vulnerability scanning, network threat detection on public WiFi, real-time phishing URL detection, and integration with corporate MDM solutions. Available on iOS and Android.',
    tech: ['React Native', 'Python', 'FastAPI', 'Firebase', 'TensorFlow Lite'],
    github: 'https://github.com', // {/* REPLACE */}
    live: null,
    color: '#ffd700',
  },
  {
    id: 5,
    title: 'APIShield',
    category: 'Full-Stack',
    shortDesc: 'API gateway with built-in rate limiting, authentication, and security middleware.',
    fullDesc: 'APIShield is a lightweight API gateway built on FastAPI that provides out-of-the-box JWT authentication, OAuth2 support, granular rate limiting, request/response logging, IP allowlisting, and SQL injection / XSS detection middleware. One-click Docker deployment.',
    tech: ['Python', 'FastAPI', 'Redis', 'Docker', 'JWT', 'OAuth2'],
    github: 'https://github.com', // {/* REPLACE */}
    live: null,
    color: '#bf5fff',
  },
  {
    id: 6,
    title: 'CloudSec Auditor',
    category: 'Cybersecurity',
    shortDesc: 'Automated AWS security audit tool generating compliance reports against CIS benchmarks.',
    fullDesc: 'CloudSec Auditor automatically scans AWS environments against CIS Benchmark controls, generates detailed remediation reports, and integrates with Slack/Jira for alerting. Covers IAM, S3, EC2, VPC, CloudTrail, and more. Reduces audit time from weeks to hours.',
    tech: ['Python', 'AWS SDK', 'FastAPI', 'React', 'PostgreSQL'],
    github: 'https://github.com', // {/* REPLACE */}
    live: 'https://example.com', // {/* REPLACE */}
    color: '#ff9500',
  },
];

const FILTERS = ['All', 'Cybersecurity', 'Full-Stack', 'Mobile'];

const ProjectCard = ({ project, onClick, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: `1px solid ${project.color}40`,
            boxShadow: `0 8px 40px ${project.color}15`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
          },
        }}
        onClick={() => onClick(project)}
      >
        <CardContent sx={{ flex: 1, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Chip
              label={project.category}
              size="small"
              sx={{
                background: `${project.color}15`,
                border: `1px solid ${project.color}40`,
                color: project.color,
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: '0.7rem',
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
            {project.shortDesc}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
            {project.tech.slice(0, 4).map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                sx={{
                  background: 'rgba(0,240,255,0.05)',
                  border: '1px solid rgba(0,240,255,0.15)',
                  color: 'text.secondary',
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: '0.68rem',
                  height: 22,
                }}
              />
            ))}
            {project.tech.length > 4 && (
              <Chip
                label={`+${project.tech.length - 4}`}
                size="small"
                sx={{ fontSize: '0.68rem', height: 22, background: 'rgba(255,255,255,0.05)', color: 'text.secondary' }}
              />
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ px: 3, pb: 2, gap: 1 }}>
          {project.github && (
            <IconButton
              size="small"
              component="a"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          )}
          {project.live && (
            <IconButton
              size="small"
              component="a"
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          )}
          <Button
            size="small"
            sx={{ ml: 'auto', color: project.color, fontSize: '0.75rem' }}
            onClick={(e) => { e.stopPropagation(); onClick(project); }}
          >
            View Details →
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <Box sx={{ py: { xs: 10, md: 14 }, background: 'linear-gradient(180deg, #0a0a0f 0%, #0c0c14 100%)' }}>
      <Container maxWidth="lg" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
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
              03 / Projects
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, mb: 2 }}>
              Featured Work
            </Typography>
            <Box sx={{ width: 60, height: 3, background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)', mx: 'auto' }} />
          </Box>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap" sx={{ mb: 6, gap: 1 }}>
            {FILTERS.map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                variant={filter === f ? 'contained' : 'outlined'}
                size="small"
                sx={
                  filter === f
                    ? {
                        background: 'linear-gradient(135deg, #00f0ff, #00b8c4)',
                        color: '#0a0a0f',
                        fontFamily: '"Share Tech Mono", monospace',
                        fontSize: '0.78rem',
                        px: 2.5,
                      }
                    : {
                        borderColor: 'rgba(0,240,255,0.3)',
                        color: 'text.secondary',
                        fontFamily: '"Share Tech Mono", monospace',
                        fontSize: '0.78rem',
                        px: 2.5,
                        '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                      }
                }
              >
                {f}
              </Button>
            ))}
          </Stack>
        </motion.div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Grid container spacing={3}>
              {filtered.map((project, i) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <ProjectCard project={project} onClick={setSelectedProject} index={i} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Box>
  );
};

export default Projects;
