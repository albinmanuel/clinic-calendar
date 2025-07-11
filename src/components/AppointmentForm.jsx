import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  Slide,
  Paper,
  Avatar
} from '@mui/material';
import {
  Close as CloseIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  LocalHospital as DoctorIcon,
  Notes as NotesIcon
} from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { doctors, patients } from '../data/mockData';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppointmentForm = ({ 
  open, 
  onClose, 
  onSave, 
  onDelete, 
  selectedDate, 
  appointment 
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    datetime: selectedDate || new Date(),
    notes: ''
  });

  useEffect(() => {
    if (open && selectedDate) {
      if (appointment) {
        setFormData(appointment);
      } else {
        setFormData({
          patientId: '',
          doctorId: '',
          datetime: selectedDate,
          notes: ''
        });
      }
    }
  }, [open, selectedDate, appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    if (appointment?.id) {
      onDelete(appointment.id);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={fullScreen}
      TransitionComponent={Transition}
      PaperProps={{
        elevation: 5,
        sx: {
          borderRadius: fullScreen ? 0 : 3,
          overflow: 'hidden',
          bgcolor: 'background.paper'
        }
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: 'primary.dark' }}>
            {appointment ? <TimeIcon /> : <TimeIcon />}
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {appointment ? 'Edit Appointment' : 'Schedule New Appointment'}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ 
            color: 'white',
            '&:hover': { 
              bgcolor: 'rgba(255,255,255,0.1)',
              transform: 'rotate(90deg)'
            },
            transition: 'all 0.3s'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.50',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <PersonIcon color="primary" />
              <Typography variant="h6" color="primary.main">
                Patient Details
              </Typography>
            </Box>
            <TextField
              select
              fullWidth
              label="Select Patient"
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            >
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24 }}>
                      {patient.name[0]}
                    </Avatar>
                    <Typography>{patient.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Paper>

          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.50',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <DoctorIcon color="primary" />
              <Typography variant="h6" color="primary.main">
                Doctor Details
              </Typography>
            </Box>
            <TextField
              select
              fullWidth
              label="Select Doctor"
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'secondary.main' }}>
                      {doctor.name.split(' ')[1][0]}
                    </Avatar>
                    <Box>
                      <Typography>{doctor.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {doctor.specialty}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Paper>

          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.50',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <TimeIcon color="primary" />
              <Typography variant="h6" color="primary.main">
                Appointment Time
              </Typography>
            </Box>
            <TimePicker
              label="Select Time"
              value={formData.datetime}
              onChange={(newTime) => setFormData({ ...formData, datetime: newTime })}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            />
          </Paper>

          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              bgcolor: 'grey.50',
              borderRadius: 2
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <NotesIcon color="primary" />
              <Typography variant="h6" color="primary.main">
                Additional Notes
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Add Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            />
          </Paper>
        </Box>
      </DialogContent>

      <Divider />
      
      <DialogActions 
        sx={{ 
          p: 2, 
          bgcolor: 'grey.50',
          gap: 1
        }}
      >
        {appointment && (
          <Button 
            onClick={handleDelete} 
            color="error" 
            variant="outlined"
            startIcon={<CloseIcon />}
            sx={{ 
              mr: 'auto',
              borderRadius: 2,
              px: 3,
              '&:hover': {
                bgcolor: 'error.light',
                color: 'white'
              }
            }}
          >
            Delete
          </Button>
        )}
        <Button 
          onClick={onClose}
          sx={{ 
            borderRadius: 2,
            px: 3,
            color: 'text.secondary'
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          sx={{ 
            borderRadius: 2,
            px: 4,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s'
          }}
        >
          {appointment ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm;