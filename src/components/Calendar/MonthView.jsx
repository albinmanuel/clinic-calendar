import { Box, Grid, Paper, Typography } from '@mui/material';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek,
  endOfWeek,
  addDays,
  isToday,
  isSameMonth,
} from 'date-fns';
import { doctors, patients } from '../../data/mockData';

const CELL_WIDTH = '130px'; 
const CELL_HEIGHT = '120px'; 
const HEADER_HEIGHT = '50px'; 

const MonthView = ({ currentDate, appointments, onDayClick, onAppointmentClick }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendarDays = () => {
    const days = [];
    let day = calendarStart;

    while (day <= calendarEnd) {
      days.push(day);
      day = addDays(day, 1);
    }

    const weeksArray = [];
    for (let i = 0; i < days.length; i += 7) {
      weeksArray.push(days.slice(i, i + 7));
    }

    return weeksArray;
  };

  const weeks = generateCalendarDays();

  const getAppointmentsForDate = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return appointments[dateKey] || [];
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        mt: 2,
        overflowX: 'auto'
      }}
    >
      <Box 
        sx={{
          minWidth: `calc(${CELL_WIDTH} * 7 + 6 * 8px)`, 
          px: 1
        }}
      >

        <Grid 
          container 
          spacing={1}
          sx={{
            mb: 1,
            '& > .MuiGrid-item': {
              width: CELL_WIDTH,
              flexGrow: 0,
              flexShrink: 0,
            }
          }}
        >
          {weekDays.map((day) => (
            <Grid 
              item 
              key={day}
            >
              <Paper
                elevation={0}
                sx={{
                  height: HEADER_HEIGHT,
                  p: 2,
                  textAlign: 'center',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {day}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {weeks.map((week, weekIndex) => (
          <Grid 
            container 
            spacing={1} 
            key={weekIndex}
            sx={{
              mb: 1,
              '& > .MuiGrid-item': {
                width: CELL_WIDTH,
                flexGrow: 0,
                flexShrink: 0,
              }
            }}
          >
            {week.map((day) => (
              <Grid 
                item 
                key={day.toString()}
              >
                <Paper
                  sx={{
                    height: CELL_HEIGHT,
                    p: 2,
                    cursor: 'pointer',
                    opacity: isSameMonth(day, currentDate) ? 1 : 0.3,
                    bgcolor: isToday(day) ? 'action.selected' : 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    }
                  }}
                  onClick={() => onDayClick(day)}
                >
                  <Typography 
                    sx={{ 
                      fontWeight: isToday(day) ? 'bold' : 'normal',
                      color: isToday(day) ? 'primary.main' : 'text.primary',
                      fontSize: '1.1rem',
                      mb: 1 
                    }}
                  >
                    {format(day, 'd')}
                  </Typography>
                  <Box 
                    sx={{ 
                      flex: 1,
                      overflowY: 'auto',
                      '::-webkit-scrollbar': {
                        width: '4px'
                      },
                      '::-webkit-scrollbar-track': {
                        background: '#f1f1f1'
                      },
                      '::-webkit-scrollbar-thumb': {
                        background: '#888'
                      }
                    }}
                  >
                    {getAppointmentsForDate(day).map((apt) => (
                      <Typography
                        key={apt.id}
                        variant="caption"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAppointmentClick(day, apt);
                        }}
                        sx={{
                          display: 'block',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: '0.75rem',
                          mb: 0.5,
                          bgcolor: 'primary.light',
                          color: 'white',
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                          }
                        }}
                      >
                        {format(new Date(apt.datetime), 'HH:mm')} - {
                          patients.find(p => p.id === apt.patientId)?.name || 'Unknown Patient'
                        }
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default MonthView;