const datePicker = document.getElementById('date-picker');
const addEventBtn = document.getElementById('add-event-btn');
const eventsDiv = document.querySelector('.events');

let events = [];

addEventBtn.addEventListener('click', () => {
    const date = datePicker.value;
    const event = prompt('Enter event name:');
    if (event && date) {
        events.push({ date, event });
        displayEvents();
        datePicker.value = '';
    } else {
        alert('Please enter a valid date and event name.');
    }
});

function displayEvents() {
    eventsDiv.innerHTML = '';
    events.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event';
        eventDiv.innerHTML = `
            <h3>${event.date}</h3>
            <p>${event.event}</p>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventsDiv.appendChild(eventDiv);
    });
}

function deleteEvent(index) {
    if (index >= 0 && index < events.length) {
        events.splice(index, 1);
        displayEvents();
    } else {
        console.error('Invalid event index');
    }
}
