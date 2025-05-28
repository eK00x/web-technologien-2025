// COUNTDOWN

// Aktuelle Zeit
const now = new Date();
// Zielzeit: 3 Tage ab jetzt
const countdownDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "Countdown abgelaufen!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = String(hours).padStart(2, '0');
  document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
  document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

// Alle 1 Sekunde aktualisieren
setInterval(updateCountdown, 1000);

// Direkt starten
updateCountdown();




// HELFER:INNEN 

async function fetchHelpers() {
  const loader = document.getElementById('loader');
  const container = document.getElementById('helperList');
  
  // Für den Fall, dass API nicht erreichbar: Anzeige einer sinnvollen und verständlichen Fehlermeldung an passender Stelle 
  try {
    const response = await fetch('https://randomuser.me/api/?results=30&seed=a');
    if (!response.ok) throw new Error('Netzwerkfehler');
    const data = await response.json();
    loader.style.display = 'none';
    renderHelpers(data.results);
  } catch (e) {
    loader.style.display = 'none';
    container.innerHTML = `<p>Fehler beim Laden der Helfer:innen-Daten: ${e.message}</p>`;
  }
}

async function fetchHelpers() {
  const loader = document.getElementById('loader');
  const container = document.getElementById('helperList');
  try {
    const response = await fetch('https://randomuser.me/api/?results=30&seed=a');
    if (!response.ok) throw new Error('Netzwerkfehler');
    const data = await response.json();
    loader.style.display = 'none';
    renderHelpers(data.results);
  } catch (e) {
    loader.style.display = 'none';
    container.innerHTML = `<p>Fehler beim Laden der Helfer:innen-Daten: ${e.message}</p>`;
  }
}

let helpers = [];

function renderHelpers(data) {
  helpers = data;
  sortAndRender();
}

function sortAndRender() {
  const sortValue = document.getElementById('sortSelect').value;
  const sorted = [...helpers];
  if (sortValue === 'name-asc') {
    sorted.sort((a, b) => a.name.last.localeCompare(b.name.last));
  } else if (sortValue === 'name-desc') {
    sorted.sort((a, b) => b.name.last.localeCompare(a.name.last));
  } else if (sortValue === 'reg-asc') {
    sorted.sort((a, b) => new Date(a.registered.date) - new Date(b.registered.date));
  } else if (sortValue === 'reg-desc') {
    sorted.sort((a, b) => new Date(b.registered.date) - new Date(a.registered.date));
  }

  const list = document.getElementById('helperList');
  list.innerHTML = '';
  sorted.forEach(user => {
    const dob = new Date(user.dob.date);
    const reg = new Date(user.registered.date);
    const age = user.dob.age;
    list.innerHTML += `
      <div class="helper-card">
        <img src="${user.picture.medium}" alt="${user.name.first}" />
        <div>
          <strong>${user.name.first} ${user.name.last}</strong><br>
          <em>${user.gender}</em><br>
          📧 ${user.email}<br>
          📅 Geboren: ${dob.toLocaleDateString('de-DE')} (${age} Jahre)<br>
          📝 Registriert: ${reg.toLocaleDateString('de-DE')}<br>
          ☎️ Telefon: ${user.phone}<br>
          📱 Handy: ${user.cell}<br>
          🆔 ID: ${user.id.value || 'N/A'}
        </div>
      </div>
    `;
  });
}

document.getElementById('sortSelect').addEventListener('change', sortAndRender);

fetchHelpers();