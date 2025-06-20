import { Outlet } from 'react-router-dom';
import { ThemeContext } from './theme/ThemeContext';
import { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemePallete } from './theme/ThemePallete';
import { Grid, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';

export default function App() {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  const [chat, setChat] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Create theme based on mode
  const theme = useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  // Store selected theme in localStorage
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Hamburger menu button (visible only on mobile) */}
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 11000,
            display: { xs: 'block', md: 'none' },
          }}
        >
          <IconButton onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Main layout with Sidebar + Content */}
        <Grid container sx={{ background: 'linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))' }}>
          {/* Sidebar */}
          <Grid
            item
            xs={12}
            md={2.5}
            sx={{
              bgcolor: 'primary.light',
              '@media (max-width:800px)': {
                width: '70%',
                position: 'fixed',
                height: '100vh',
                transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 400ms ease',
                zIndex: 9999,
                boxShadow: menuOpen ? 10 : 0,
              },
            }}
          >
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </Grid>

          {/* Page content */}
          <Grid item xs={12} md={9.5}>
            <Outlet context={{ chat, setChat, handleMobileMenu: setMenuOpen }} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
