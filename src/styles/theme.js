import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00f0ff",
      light: "#5effff",
      dark: "#00b8c4",
    },
    secondary: {
      main: "#ff6b6b",
    },
    background: {
      default: "#0a0a0f",
      paper: "#12121a",
      card: "#1a1a2e",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#a0a0b0",
    },
  },
  typography: {
    fontFamily:
      '"Exo 2", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1a1a2e",
          border: "1px solid rgba(0, 240, 255, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Share Tech Mono", monospace',
        },
      },
    },
  },
});

export default theme;
