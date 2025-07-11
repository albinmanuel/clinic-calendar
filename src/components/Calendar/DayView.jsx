import { Box, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';

const DayView = ({ currentDate, appointments, onTimeClick }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {hours.map((hour) => {
        const currentHourDate = new Date(currentDate);
        currentHourDate.setHours(hour, 0, 0, 0);

        const hourAppointments = appointments.filter(
          (apt) =>
            format(new Date(apt.datetime), 'yyyy-MM-dd HH') ===
            format(currentHourDate, 'yyyy-MM-dd HH')
        );

        return (
          <Paper
            key={hour}
            sx={{
              p: 2,
              mb: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' },
            }}
            onClick={() => onTimeClick(currentHourDate)}
          >
            <Typography>
              {format(currentHourDate, 'HH:mm')}
            </Typography>
            {hourAppointments.map((apt) => (
              <Typography
                key={apt.id}
                variant="body2"
                sx={{ ml: 2 }}
              >
                {format(new Date(apt.datetime), 'HH:mm')} - {apt.patientName}
              </Typography>
            ))}
          </Paper>
        );
      })}
    </Box>
  );
};

export default DayView;