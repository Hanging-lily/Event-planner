// Runtime-only storage
const guests = [];

// Forms
const eventForm = document.getElementById("eventForm");
const guestForm = document.getElementById("guestForm");

// Preview elements
const previewTitle = document.getElementById("previewTitle");
const previewDate = document.getElementById("previewDate");
const previewDescription = document.getElementById("previewDescription");
const previewInvite = document.getElementById("previewInvite");

// Guest elements
const attendeesList = document.getElementById("attendeesList");
const guestCount = document.getElementById("guestCount");

// Event Creation
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const eventName = document.getElementById("eventName").value;
  const eventDate = document.getElementById("eventDate").value;
  const eventDescription =
    document.getElementById("eventDescription").value;

  const inviteMessage =
    document.getElementById("inviteMessage").value;

  previewTitle.textContent = eventName;

  previewDate.textContent = formatDate(eventDate);

  previewDescription.textContent = eventDescription;

  previewInvite.textContent = inviteMessage;

  showNotification("Event saved successfully!");
});

// Guest Registration
guestForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
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

  showNotification(`${name} ${surname} joined the event!`);
});

// Render Guests
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

// Date Formatter
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

// Notification
function showNotification(message) {

  const notification = document.createElement("div");

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