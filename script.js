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
