import React from 'react';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Alert,
  createTheme,
  ThemeProvider
} from '@mui/material';

// Components using sx prop
function StyledComponents() {
  return (
    <div>
      {/* Box component using sx prop */}
      <Box
        sx={{
          backgroundColor: 'primary',
          color: 'Gray/50',
          padding: 2,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'Blue/500'
        }}
      >
        Primary Box with custom colors
      </Box>

      {/* Card component */}
      <Card
        sx={{
          backgroundColor: 'surface',
          borderColor: 'Gray/200',
          '&:hover': {
            backgroundColor: 'Gray/50'
          }
        }}
      >
        <CardContent>
          <Typography sx={{ color: 'text' }}>
            Card content with theme colors
          </Typography>
        </CardContent>
      </Card>

      {/* Button component */}
      <Button
        sx={{
          backgroundColor: 'secondary',
          color: 'Gray/800',
          '&:hover': {
            backgroundColor: 'Gray/600'
          }
        }}
      >
        Custom Button
      </Button>
    </div>
  );
}

// Components using inline styles
function InlineStyledComponents() {
  return (
    <div>
      <div
        style={{
          backgroundColor: 'primary',
          color: 'Gray/50',
          padding: '16px',
          borderColor: 'Blue/500'
        }}
      >
        Inline styled div
      </div>

      <Button
        style={{
          backgroundColor: 'success',
          color: 'Gray/50'
        }}
      >
        Success Button
      </Button>
    </div>
  );
}

// Custom theme
const customTheme = createTheme({
  palette: {
    primary: {
      main: 'primary',
      light: 'Blue/300',
      dark: 'Blue/700'
    },
    secondary: {
      main: 'secondary',
      light: 'Gray/400',
      dark: 'Gray/700'
    },
    success: {
      main: 'success',
      light: 'Green/300',
      dark: 'Green/700'
    },
    error: {
      main: 'error',
      light: 'Red/300',
      dark: 'Red/700'
    },
    background: {
      default: 'background',
      paper: 'surface'
    },
    text: {
      primary: 'text',
      secondary: 'text-secondary'
    }
  }
});

// Component using theme
function ThemedComponent({ theme }) {
  return (
    <div>
      <AppBar
        sx={{
          backgroundColor: 'Gray/800',
          color: 'Gray/50'
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ color: 'Gray/50' }}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>

      <Alert
        sx={{
          backgroundColor: 'Green/50',
          color: 'Green/800',
          borderColor: 'success'
        }}
      >
        Success message with custom colors
      </Alert>

      <Typography
        sx={{
          color: theme.palette.primary,
          backgroundColor: 'Gray/100'
        }}
      >
        Text with theme color reference
      </Typography>
    </div>
  );
}

// Main application component
function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          backgroundColor: 'background',
          minHeight: '100vh',
          padding: 2
        }}
      >
        <StyledComponents />
        <InlineStyledComponents />
        <ThemedComponent theme={customTheme} />
      </Box>
    </ThemeProvider>
  );
}

export default App; 