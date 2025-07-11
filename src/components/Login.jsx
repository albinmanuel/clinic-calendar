import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper,
  Avatar,
  Fade,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
  Email as EmailIcon 
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/calendar');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper 
            elevation={5} 
            sx={{ 
              p: 4, 
              width: '100%',
              borderRadius: 3,
              background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)'
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 3
              }}
            >
              <Avatar 
                sx={{ 
                  m: 1, 
                  bgcolor: 'primary.main',
                  width: 56,
                  height: 56,
                  transform: 'scale(1)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  }
                }}
              >
                <LockOutlinedIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Typography 
                component="h1" 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                  textAlign: 'center',
                  mt: 2
                }}
              >
                Clinic Staff Login
              </Typography>
            </Box>
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{
                '& .MuiTextField-root': {
                  mb: 2
                }
              }}
            >
              <TextField
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <TextField
                required
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              {error && (
                <Typography 
                  color="error" 
                  sx={{ 
                    mt: 2,
                    textAlign: 'center',
                    animation: 'shake 0.5s'
                  }}
                >
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s'
                }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Box>
      </Fade>
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
        `}
      </style>
    </Container>
  );
};

export default Login;