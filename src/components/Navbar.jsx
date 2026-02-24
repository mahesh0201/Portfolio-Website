import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemText, useScrollTrigger,
  useTheme, useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setDrawerOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          background: trigger
            ? 'rgba(10, 10, 15, 0.95)'
            : 'transparent',
          backdropFilter: trigger ? 'blur(12px)' : 'none',
          borderBottom: trigger ? '1px solid rgba(0,240,255,0.15)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: 'primary.main',
                cursor: 'pointer',
                letterSpacing: 2,
                '&:hover': { textShadow: '0 0 12px #00f0ff' },
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {/* REPLACE */}
              &lt;JD /&gt;
            </Typography>
          </motion.div>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.2 }}
                >
                  <Button
                    onClick={() => handleNavClick(link.href)}
                    sx={{
                      color: activeSection === link.href.replace('#', '')
                        ? 'primary.main'
                        : 'text.secondary',
                      fontFamily: '"Share Tech Mono", monospace',
                      fontSize: '0.82rem',
                      letterSpacing: 1,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: activeSection === link.href.replace('#', '') ? '60%' : '0%',
                        height: 1.5,
                        background: '#00f0ff',
                        transition: 'width 0.3s ease',
                        borderRadius: 1,
                      },
                      '&:hover': { color: 'primary.main' },
                      '&:hover::after': { width: '60%' },
                    }}
                  >
                    {link.label}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'primary.main' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'rgba(10,10,15,0.98)',
            backdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(0,240,255,0.2)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'primary.main' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navLinks.map((link) => (
            <ListItem
              key={link.href}
              button
              onClick={() => handleNavClick(link.href)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&:hover': {
                  background: 'rgba(0,240,255,0.08)',
                  '& .MuiListItemText-primary': { color: 'primary.main' },
                },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontFamily: '"Share Tech Mono", monospace',
                  color: activeSection === link.href.replace('#', '') ? 'primary.main' : 'text.primary',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
