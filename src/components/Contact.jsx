import React, { useState, useRef } from 'react';
import {
  Box, Container, Typography, Grid, TextField, Button,
  Paper, IconButton, Stack, Snackbar, Alert,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// {/* REPLACE - add your EmailJS credentials or Formspree endpoint */}
// EmailJS Setup: https://www.emailjs.com/
// Replace these with your actual credentials:
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // {/* REPLACE */}
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // {/* REPLACE */}
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // {/* REPLACE */}

const socialLinks = [
  // {/* REPLACE - update with your actual social links */}
  { icon: <GitHubIcon />, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: <TwitterIcon />, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: <EmailIcon />, href: 'mailto:your@email.com', label: 'Email' }, // {/* REPLACE */}
];

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);
  const bgRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: bgRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      // EmailJS integration
      // Uncomment and configure when ready:
      // const emailjs = await import('@emailjs/browser');
      // await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      //   from_name: form.name,
      //   from_email: form.email,
      //   subject: form.subject,
      //   message: form.message,
      // }, EMAILJS_PUBLIC_KEY);

      // Simulated success for demo:
      await new Promise(r => setTimeout(r, 1000));
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
    setLoading(false);
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      background: 'rgba(255,255,255,0.03)',
      '& fieldset': { borderColor: 'rgba(0,240,255,0.15)' },
      '&:hover fieldset': { borderColor: 'rgba(0,240,255,0.35)' },
      '&.Mui-focused fieldset': { borderColor: '#00f0ff' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#00f0ff' },
  };

  return (
    <Box
      ref={bgRef}
      sx={{
        py: { xs: 10, md: 14 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #0c0c14 100%)',
      }}
    >
      {/* Parallax background layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: bgY,
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" ref={ref} sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              sx={{ fontFamily: '"Share Tech Mono", monospace', color: 'primary.main', letterSpacing: 4, fontSize: '0.85rem', mb: 1, textTransform: 'uppercase' }}
            >
              06 / Contact
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700, mb: 1 }}>
              Get In Touch
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 500, mx: 'auto' }}>
              {/* REPLACE */}
              Open to freelance projects, full-time roles, and cybersecurity consulting. Let's build something secure together.
            </Typography>
            <Box sx={{ width: 60, height: 3, background: 'linear-gradient(90deg, transparent, #00f0ff, transparent)', mx: 'auto', mt: 2 }} />
          </Box>
        </motion.div>

        <Grid container spacing={6} justifyContent="center">
          {/* Form */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: 4,
                  background: '#1a1a2e',
                  border: '1px solid rgba(0,240,255,0.1)',
                  borderRadius: 3,
                }}
              >
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      endIcon={<SendIcon />}
                      disabled={loading}
                      sx={{
                        background: 'linear-gradient(135deg, #00f0ff, #00b8c4)',
                        color: '#0a0a0f',
                        fontWeight: 700,
                        py: 1.5,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5effff, #00f0ff)',
                          boxShadow: '0 0 20px rgba(0,240,255,0.3)',
                        },
                        '&:disabled': { opacity: 0.6 },
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          {/* Social links */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Let's Connect</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                  {/* REPLACE */}
                  Prefer email? Reach me directly at{' '}
                  <Box component="a" href="mailto:your@email.com" sx={{ color: 'primary.main', textDecoration: 'none' }}>
                    your@email.com
                  </Box>
                </Typography>

                <Stack spacing={2}>
                  {socialLinks.map((link) => (
                    <Box
                      key={link.label}
                      component="a"
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        background: '#1a1a2e',
                        border: '1px solid rgba(0,240,255,0.1)',
                        textDecoration: 'none',
                        color: 'text.secondary',
                        transition: 'all 0.3s',
                        '&:hover': {
                          border: '1px solid rgba(0,240,255,0.3)',
                          color: 'primary.main',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Box sx={{ color: 'primary.main' }}>{link.icon}</Box>
                      <Typography variant="body2" sx={{ fontFamily: '"Share Tech Mono", monospace', fontSize: '0.85rem' }}>
                        {link.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={status !== null}
        autoHideDuration={5000}
        onClose={() => setStatus(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setStatus(null)} severity={status === 'success' ? 'success' : 'error'} sx={{ background: '#1a1a2e', border: '1px solid rgba(0,240,255,0.2)' }}>
          {status === 'success'
            ? 'Message sent successfully! I\'ll get back to you soon.'
            : 'Failed to send. Please try again or email directly.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
