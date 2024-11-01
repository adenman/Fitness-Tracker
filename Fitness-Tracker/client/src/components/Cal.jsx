import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import events from '../utils/events';
import { Typography } from '@mui/material';

function renderEventContent(eventInfo) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Typography>
        <Typography>{eventInfo.timeText}</Typography>
        <Typography>{eventInfo.event?._def?.title}</Typography>
        <Typography>{eventInfo.event?._def?.extendedProps.description}</Typography>
      </Typography>
    </div>
  );
}

function Cal() {
  return (
    <div className="App">
      <h1 className="App-header text-center text-warning">Your progress</h1>
      <FullCalendar
        headerToolbar={{
          start: 'title', // Will show us the calendar's month & year on the start
          end: 'today prev,next' // Will give us the option of the buttons on the right to navigate
        }}
        plugins={[dayGridPlugin]} // Calendar View type
        events={events}
        eventContent={renderEventContent} 
      />
    </div>
  );
}


export default Cal;