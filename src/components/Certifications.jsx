import React from 'react';
import {
  Box, Container, Typography, Card, CardContent, Grid, Chip,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// {/* REPLACE - update with your actual certifications */}
const certifications = [
  {
    id: 1,
    name: 'Certified Ethical Hacker (CEH)',
    issuer: 'EC-Council',
    date: 'Jan 2024', // {/* REPLACE */}
    credentialId: 'ECC1234567890', // {/* REPLACE */}
    color: '#ff6b6b',
    badge: '🛡',
  },
  {
    id: 2,
    name: 'AWS Certified Security – Specialty',
    issuer: 'Amazon Web Services',
    date: 'Mar 2024', // {/* REPLACE */}
    credentialId: 'AWS-SEC-XXXX', // {/* REPLACE */}
    color: '#ff9500',
    badge: '☁️',
  },
  {
    id: 3,
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    date: 'Aug 2023', // {/* REPLACE */}
    credentialId: 'COMP-SEC-XXXX', // {/* REPLACE */}
    color: '#00f0ff',
    badge: '🔐',
  },
  {
    id: 4,
    name: 'Offensive Security OSCP',
    issuer: 'Offensive Security',
    date: 'Jun 2023', // {/* REPLACE */}
    credentialId: 'OSCP-XXXX', // {/* REPLACE */}
    color: '#00ff88',
    badge: '💀',
  },
  {
    id: 5,
    name: 'React Developer Certification',
    issuer: 'Meta',
    date: 'Feb 2023', // {/* REPLACE */}
    credentialId: 'META-REACT-XXXX', // {/* REPLACE */}
    color: '#bf5fff',
    badge: '⚛️',
  },
  {
    id: 6,
    name: 'CISSP',
    issuer: 'ISC²',
    date: 'Nov 2023', // {/* REPLACE */}
    credentialId: 'CISSP-XXXX', // {/* REPLACE */}
    color: '#ffd700',
    badge: '🏅',
  },
];

const CertCard = ({ cert, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: `1px solid ${cert.color}40`,
            boxShadow: `0 8px 40px ${cert.color}15`,
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${cert.color}, transparent)`,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -40,
            right: -40,
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `${cert.color}08`,
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography sx={{ fontSize: '2rem' }}>{cert.badge}</Typography>
            <VerifiedIcon sx={{ color: cert.color, opacity: 0.7 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.5, lineHeight: 1.4 }}>
            {cert.name}
          </Typography>
          <Typography variant="body2" sx={{ color: cert.color, fontFamily: '"Share Tech Mono", monospace', fontSize: '0.78rem', mb: 2 }}>
            {cert.issuer}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
              label={cert.date}
              size="small"
              sx={{
                background: `${cert.color}10`,
                border: `1px solid ${cert.color}30`,
                color: 'text.secondary',
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: '0.68rem',
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: '0.65rem',
                opacity: 0.6,
              }}
            >
              #{cert.credentialId}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(180deg, #0c0c14 0%, #0a0a0f 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax background element */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: -200,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 70%)',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}
      />

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
              04 / Certifications
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, mb: 2 }}>
              Credentials
            </Typography>
            <Box sx={{ width: 60, height: 3, background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)', mx: 'auto' }} />
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {certifications.map((cert, i) => (
            <Grid item xs={12} sm={6} md={4} key={cert.id}>
              <CertCard cert={cert} index={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Certifications;
