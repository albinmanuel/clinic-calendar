import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  useMediaQuery, 
  useTheme,
  Typography,
  IconButton,
  Paper,
  Fade,
  Avatar,
  Tooltip,
  Chip,
  Divider
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  CalendarMonth as CalendarIcon,
  AccountCircle as AccountIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, addMonths, subMonths } from 'date-fns';
import MonthView from './Calendar/MonthView';
import DayView from './Calendar/DayView';
import AppointmentForm from './AppointmentForm';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedAppointments = sessionStorage.getItem('appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setSelectedAppointment(null);
    setIsFormOpen(true);
  };

  const handleAppointmentClick = (date, appointment) => {
    setSelectedDate(date);
    setSelectedAppointment(appointment);
    setIsFormOpen(true);
  };

  const handleAddAppointment = (appointmentData) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    
    if (selectedAppointment) {
      setAppointments(prev => ({
        ...prev,
        [dateKey]: prev[dateKey].map(apt => 
          apt.id === selectedAppointment.id ? { ...appointmentData, id: apt.id } : apt
        )
      }));
    } else {
      setAppointments(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), { ...appointmentData, id: Date.now().toString() }]
      }));
    }
    
    setIsFormOpen(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setAppointments(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(apt => apt.id !== appointmentId)
    }));
    setIsFormOpen(false);
    setSelectedAppointment(null);
  };

  const getAppointmentsForDate = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return appointments[dateKey] || [];
  };

  return (
    <Fade in={true} timeout={800}>
      <Container 
        maxWidth={false} 
        sx={{ 
          py: 4, 
          px: { xs: 2, sm: 4 },
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: '#ffffff',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)'
          }}
        >

          <Box
            sx={{
              p: 2,
              bgcolor: 'primary.dark',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <Chip
              icon={<AccountIcon />}
              label={`Welcome Staff`}
              sx={{
                color: 'white',
                bgcolor: 'primary.main',
                '& .MuiChip-icon': { color: 'white' }
              }}
            />
            <Chip
              icon={<TimeIcon />}
              label={format(currentTime, 'yyyy-MM-dd HH:mm:ss')}
              sx={{
                color: 'white',
                bgcolor: 'primary.main',
                '& .MuiChip-icon': { color: 'white' }
              }}
            />
          </Box>

          <Divider />

          <Box
            sx={{
              p: 3,
              background: 'linear-gradient(45deg, #2196f3, #1976d2)',
              color: 'white',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                width: { xs: '100%', md: 'auto' }
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.dark',
                  width: 48,
                  height: 48,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                <CalendarIcon />
              </Avatar>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: 'bold',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Clinic Calendar
              </Typography>
            </Box>

            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                ml: { md: 'auto' },
                width: { xs: '100%', md: 'auto' },
                justifyContent: { xs: 'space-between', md: 'flex-end' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Previous Month">
                  <IconButton 
                    onClick={handlePreviousMonth}
                    sx={{ 
                      color: 'white',
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </Tooltip>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    minWidth: 200, 
                    textAlign: 'center',
                    fontWeight: 'medium',
                    letterSpacing: 1
                  }}
                >
                  {format(currentDate, 'MMMM yyyy')}
                </Typography>
                <Tooltip title="Next Month">
                  <IconButton 
                    onClick={handleNextMonth}
                    sx={{ 
                      color: 'white',
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Tooltip title="Today">
                <IconButton 
                  onClick={() => setCurrentDate(new Date())}
                  sx={{ 
                    color: 'white',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <TodayIcon />
                </IconButton>
              </Tooltip>

              <DatePicker
                value={currentDate}
                onChange={(newDate) => setCurrentDate(newDate)}
                slotProps={{ 
                  textField: { 
                    size: "small",
                    sx: { 
                      width: 200,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                        borderRadius: 2,
                        '&:hover': {
                          '& > fieldset': { borderColor: 'rgba(255,255,255,0.5)' }
                        },
                        '&.Mui-focused': {
                          '& > fieldset': { borderColor: 'white' }
                        }
                      }
                    }
                  } 
                }}
              />
            </Box>
          </Box>

          <Box 
            sx={{ 
              p: 3,
              bgcolor: '#f8fafc'
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                bgcolor: 'white',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              {isMobile ? (
                <DayView
                  currentDate={currentDate}
                  appointments={getAppointmentsForDate(currentDate)}
                  onTimeClick={handleDayClick}
                  onAppointmentClick={(appointment) => 
                    handleAppointmentClick(currentDate, appointment)
                  }
                />
              ) : (
                <MonthView
                  currentDate={currentDate}
                  appointments={appointments}
                  onDayClick={handleDayClick}
                  onAppointmentClick={handleAppointmentClick}
                />
              )}
            </Paper>
          </Box>
        </Paper>

        <AppointmentForm
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedAppointment(null);
          }}
          onSave={handleAddAppointment}
          onDelete={handleDeleteAppointment}
          selectedDate={selectedDate}
          appointment={selectedAppointment}
        />
      </Container>
    </Fade>
  );
};

export default Calendar;