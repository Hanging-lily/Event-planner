// Runtime storage
const events = [];
const guests = [];

// Forms
const eventForm = document.getElementById("eventForm");
const guestForm = document.getElementById("guestForm");

// Preview elements
const previewTitle = document.getElementById("previewTitle");
const previewDate = document.getElementById("previewDate");
const previewDescription = document.getElementById("previewDescription");
const previewInvite = document.getElementById("previewInvite");

// Guests
const attendeesList = document.getElementById("attendeesList");
const guestCount = document.getElementById("guestCount");

// Events
const eventsContainer =
  document.getElementById("eventsContainer");

const emptyState =
  document.getElementById("emptyState");

// CREATE EVENT
eventForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const eventName =
    document.getElementById("eventName").value;

  const eventDate =
    document.getElementById("eventDate").value;

  const eventDescription =
    document.getElementById("eventDescription").value;

  const inviteMessage =
    document.getElementById("inviteMessage").value;

  // Live Preview
  previewTitle.textContent = eventName;
  previewDate.textContent = formatDate(eventDate);
  previewDescription.textContent = eventDescription;
  previewInvite.textContent = inviteMessage;

  // Save Event Runtime
  const event = {
    id: Date.now(),
    eventName,
    eventDate,
    eventDescription,
    inviteMessage
  };

  events.push(event);

  renderEvents();

  eventForm.reset();

  showNotification("Event created successfully!");
});

// REGISTER GUEST
guestForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const name =
    document.getElementById("guestName").value.trim();

  const surname =
    document.getElementById("guestSurname").value.trim();

  if (!name || !surname) return;

  const guest = {
    id: Date.now(),
    name,
    surname
  };

  guests.push(guest);

  renderGuests();

  guestForm.reset();

  showNotification(
    `${name} ${surname} joined the event!`
  );
});

// RENDER EVENTS
function renderEvents() {

  eventsContainer.innerHTML = "";

  if (events.length === 0) {

    eventsContainer.innerHTML = `
      <div class="empty-state">
        No events created yet.
      </div>
    `;

    return;
  }

  events.forEach((event) => {

    const card = document.createElement("div");

    card.className = "event-card";

    card.innerHTML = `
      <div class="event-card-content">

        <h3>${event.eventName}</h3>

        <div class="event-date">
          ${formatDate(event.eventDate)}
        </div>

        <p class="event-description">
          ${event.eventDescription}
        </p>

        <div class="event-invite">
          <h4>Invite Message</h4>
          <p>${event.inviteMessage}</p>
        </div>

        <div class="event-footer">
          <div class="event-badge">
            Active Event
          </div>
        </div>

      </div>
    `;

    eventsContainer.appendChild(card);
  });
}

// RENDER GUESTS
function renderGuests() {

  attendeesList.innerHTML = "";

  guests.forEach((guest) => {

    const li = document.createElement("li");

    li.className = "attendee-item";

    li.innerHTML = `
      <div class="attendee-name">
        ${guest.name} ${guest.surname}
      </div>

      <div class="joined-badge">
        Registered
      </div>
    `;

    attendeesList.appendChild(li);
  });

  guestCount.textContent =
    `${guests.length} Guest${guests.length !== 1 ? "s" : ""}`;
}

// FORMAT DATE
function formatDate(dateString) {

  if (!dateString) return "Select a date";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// NOTIFICATIONS
function showNotification(message) {

  const notification =
    document.createElement("div");

  notification.textContent = message;

  notification.style.position = "fixed";
  notification.style.bottom = "30px";
  notification.style.right = "30px";
  notification.style.padding = "14px 20px";
  notification.style.background =
    "linear-gradient(135deg, #7c3aed, #06b6d4)";

  notification.style.color = "white";
  notification.style.borderRadius = "14px";
  notification.style.fontWeight = "600";
  notification.style.boxShadow =
    "0 10px 30px rgba(0,0,0,0.35)";

  notification.style.zIndex = "9999";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2500);
}