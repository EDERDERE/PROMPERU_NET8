document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    locale: 'es',
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },
    events: [
      { // this object will be "parsed" into an Event Object
        start: '2025-02-19', // a property!
        end: '2025-02-20', // a property! ** see important note below about 'end' **
        backgroundColor: '#ff0000',
        display: 'background'
      },
      { // this object will be "parsed" into an Event Object
        title: 'The Title', // a property!
        start: '2025-02-19', // a property!
        end: '2025-02-20', // a property! ** see important note below about 'end' **
        backgroundColor: '#fff',
        borderColor: '#fff',
        textColor: '#ff0000',
      }
    ]
  });
  calendar.render();
});