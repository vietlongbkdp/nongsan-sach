import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e6b3c',
      light: '#40916c',
      dark: '#0d3d21',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f0a845',
      light: '#f5c273',
      dark: '#c07e20',
      contrastText: '#1a2e1a',
    },
    background: {
      default: '#f7fdf4',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a2e1a',
      secondary: '#5a7a5a',
    },
    success: { main: '#2d9e4a' },
    error: { main: '#d32f2f' },
  },
  typography: {
    fontFamily: '"Be Vietnam Pro", sans-serif',
    h1: { fontWeight: 900, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.01em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: '0.01em' },
  },
  shape: { borderRadius: 12 },
  shadows: [
    'none',
    '0 1px 4px rgba(0,0,0,0.06)',
    '0 2px 8px rgba(0,0,0,0.08)',
    '0 4px 16px rgba(0,0,0,0.10)',
    '0 8px 24px rgba(0,0,0,0.12)',
    '0 12px 32px rgba(0,0,0,0.14)',
    '0 16px 40px rgba(0,0,0,0.16)',
    ...Array(18).fill('none'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontFamily: '"Be Vietnam Pro", sans-serif', backgroundColor: '#f7fdf4' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
          textTransform: 'none',
          fontSize: '0.9rem',
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': { boxShadow: '0 4px 16px rgba(30,107,60,0.35)' },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': { borderWidth: '1.5px' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          border: '1px solid rgba(0,0,0,0.04)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(30,107,60,0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&:hover fieldset': { borderColor: '#40916c' },
            '&.Mui-focused fieldset': { borderColor: '#1e6b3c' },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: '"Be Vietnam Pro", sans-serif', fontWeight: 600 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 20 },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: '#f0fdf4',
            fontWeight: 700,
            color: '#1e6b3c',
          },
        },
      },
    },
  },
})

export default theme
