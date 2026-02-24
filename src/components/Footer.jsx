import React from 'react';
import { Box, Container, Typography, IconButton, Stack, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// {/* REPLACE */}
const socialLinks = [
  { icon: <GitHubIcon fontSize="small" />, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: <LinkedInIcon fontSize="small" />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: <TwitterIcon fontSize="small" />, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: <EmailIcon fontSize="small" />, href: 'mailto:your@email.com', label: 'Email' },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: '#08080d',
        borderTop: '1px solid rgba(0,240,255,0.08)',
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
            mb: 3,
          }}
        >
          {/* Logo */}
          <Typography
            sx={{
              fontFamily: '"Share Tech Mono", monospace',
              color: 'primary.main',
              fontSize: '1.1rem',
              letterSpacing: 2,
              cursor: 'pointer',
              '&:hover': { textShadow: '0 0 12px #00f0ff' },
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* REPLACE */}
            &lt;MPjd /&gt;
          </Typography>

          {/* Quick nav */}
          <Stack direction="row" spacing={3}>
            {navLinks.map((link) => (
              <Typography
                key={link.href}
                component="a"
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontFamily: '"Share Tech Mono", monospace',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>

          {/* Social icons */}
          <Stack direction="row" spacing={0.5}>
            {socialLinks.map((link) => (
              <IconButton
                key={link.label}
                component="a"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                size="small"
                aria-label={link.label}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main', background: 'rgba(0,240,255,0.08)' },
                  transition: 'all 0.2s',
                }}
              >
                {link.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mb: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: '0.75rem',
              opacity: 0.5,
            }}
          >
            {/* REPLACE */}
            © {new Date().getFullYear()} Mahesh Pandi. Built with React & Material UI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
