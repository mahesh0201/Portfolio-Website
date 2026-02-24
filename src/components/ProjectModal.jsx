import React from 'react';
import {
  Dialog, DialogContent, DialogActions, Box, Typography,
  Button, Chip, IconButton, Stack, Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ProjectModal = ({ project, open, onClose }) => {
  if (!project) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: '#12121a',
          border: `1px solid ${project.color}30`,
          borderRadius: 3,
          boxShadow: `0 20px 80px ${project.color}15`,
        },
      }}
    >
      {/* Top accent bar */}
      <Box
        sx={{
          height: 3,
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
        }}
      />

      {/* Header */}
      <Box sx={{ p: 3, pb: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Chip
            label={project.category}
            size="small"
            sx={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}40`,
              color: project.color,
              fontFamily: '"Share Tech Mono", monospace',
              fontSize: '0.7rem',
              mb: 1,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {project.title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
          {project.fullDesc}
        </Typography>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 2.5 }} />

        <Typography
          variant="body2"
          sx={{
            fontFamily: '"Share Tech Mono", monospace',
            color: 'text.secondary',
            fontSize: '0.72rem',
            letterSpacing: 2,
            textTransform: 'uppercase',
            mb: 1.5,
          }}
        >
          Tech Stack
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
          {project.tech.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              sx={{
                background: 'rgba(0,240,255,0.07)',
                border: '1px solid rgba(0,240,255,0.2)',
                color: 'primary.main',
                fontFamily: '"Share Tech Mono", monospace',
                fontSize: '0.72rem',
              }}
            />
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        {project.github && (
          <Button
            variant="outlined"
            startIcon={<GitHubIcon />}
            component="a"
            href={project.github}
            target="_blank"
            rel="noreferrer"
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'text.primary',
              '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
            }}
          >
            GitHub
          </Button>
        )}
        {project.live && (
          <Button
            variant="contained"
            startIcon={<OpenInNewIcon />}
            component="a"
            href={project.live}
            target="_blank"
            rel="noreferrer"
            sx={{
              background: `linear-gradient(135deg, ${project.color}, ${project.color}99)`,
              color: '#0a0a0f',
              fontWeight: 700,
              '&:hover': { opacity: 0.9 },
            }}
          >
            Live Demo
          </Button>
        )}
        <Button
          onClick={onClose}
          sx={{ ml: 'auto', color: 'text.secondary' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectModal;
