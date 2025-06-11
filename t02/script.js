/* ----------------------------------------- TEIL: COUNTDOWN ------------------------------------------------------------------------ */
// Zielzeitpunkt: 14. Juni 2025, 18:00 Uhr
const countdownDate = new Date("2025-06-14T18:00:00");

function updateCountdown() {
  // Aktuelle Zeit in Millisekunden
  const now = new Date().getTime();

  // Differenz zwischen Zielzeit und jetzt (in Millisekunden)
  const distance = countdownDate.getTime() - now;

  // Wenn Countdown abgelaufen, Text anzeigen und Funktion beenden
  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "Countdown abgelaufen!";

    // Funktion beenden, keine weiteren Updates nötig
    return;
  }

  // Berechnung der verbleibenden Tage, Stunden, Minuten und Sekunden
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));                          // Tage: Gesamt-Millis geteilt durch Anzahl Millisekunden pro Tag 
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));    // Stunden: Rest der Millisekunden nach Tagen, geteilt durch Millis pro Stunde
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));            // Minuten: Rest nach Tagen und Stunden, geteilt durch Millis pro Minute 
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);                        // Sekunden: Rest nach Tagen, Stunden und Minuten, geteilt durch Millis pro Sekunde

  // Berechneten Werte in die HTML-Elemente schreiben
  document.getElementById("days").innerText = days;

  // Stunden, Minuten, Sekunden werden mit führender Null dargestellt (z.B. 07 statt 7)
  document.getElementById("hours").innerText = String(hours).padStart(2, '0');
  document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
  document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}


// Countdown jede Sekunde aktualisieren
setInterval(updateCountdown, 1000);


// Countdown direkt beim Laden starten (ohne 1 Sekunde warten)
updateCountdown();


/* ----------------------------------------- TEIL: INFORMATION ------------------------------------------------------------------------ */
// Auswählen aller Elemente mit der Klasse "collapsible-btn" 
document.querySelectorAll('.collapsible-btn').forEach(button => {

  // Für jedes Element einen Event-Listener hinzufügen, der auf Klicks reagiert
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;            // Suche des Elements direkt unter dem Button: das ist der aufklappbare Inhalt
    const isVisible = content.style.display === 'block';  // Prüfe, ob der Inhalt momentan sichtbar ist
    content.style.display = isVisible ? 'none' : 'block'; // Wenn sichtbar, dann ausblenden, sonst einblenden
  });
});


/* ----------------------------------------- TEIL: HELFERINNEN ------------------------------------------------------------------------ */

// Funktion, die Helfer:innen-Daten von einer API lädt und darstellt
async function fetchHelpers() {
  // Referenzen zu Ladeanzeige und Container für Helfer:innen-Liste
  const loader = document.getElementById('loader');
  const container = document.getElementById('helperList');

  // Für den Fall, dass API nicht erreichbar: Anzeige einer sinnvollen und verständlichen Fehlermeldung an passender Stelle 
  try {
    // Fetch-Request an API, die zufällige Nutzer generiert
    // 'seed=a' sorgt für reproduzierbare Ergebnisse
    const response = await fetch('https://randomuser.me/api/?results=30&seed=a');

    // Prüfen, ob die Antwort OK ist (Status 200-299)
    if (!response.ok) throw new Error('Netzwerkfehler');

    // Antwort in JSON konvertieren
    const data = await response.json();

    // Ladeanzeige ausblenden, wenn Daten da sind
    loader.style.display = 'none';

    // Helfer:innen-Daten anzeigen
    renderHelpers(data.results);

  } catch (e) {

    // Falls Fehler beim Laden auftreten, Ladeanzeige ausblenden
    loader.style.display = 'none';

    // Fehlermeldung im Container anzeigen
    container.innerHTML = `<p>Fehler beim Laden der Helfer:innen-Daten: ${e.message}</p>`;
  }
}


// Hilfsvariable für aktuell geladene Helfer:innen
let helpers = [];


// Helfer:innen-Daten speichern und sortieren + anzeigen
function renderHelpers(data) {
  helpers = data;
  sortAndRender();
}


// Sortieren nach Auswahl im Dropdown-Menü und dann darstellen
function sortAndRender() {
  const sortValue = document.getElementById('sortSelect').value;
  const sorted = [...helpers];

  // Sortierlogik je nach Auswahl
  if (sortValue === 'name-asc') {
    // Alphabetisch aufsteigend nach Nachname sortieren
    sorted.sort((a, b) => a.name.last.localeCompare(b.name.last));

  } else if (sortValue === 'name-desc') {
    // Alphabetisch absteigend nach Nachname sortieren
    sorted.sort((a, b) => b.name.last.localeCompare(a.name.last));

  } else if (sortValue === 'reg-asc') {
    // Aufsteigend nach Registrierungsdatum sortieren (älteste zuerst)
    sorted.sort((a, b) => new Date(a.registered.date) - new Date(b.registered.date));

  } else if (sortValue === 'reg-desc') {
    // Absteigend nach Registrierungsdatum sortieren (neueste zuerst)
    sorted.sort((a, b) => new Date(b.registered.date) - new Date(a.registered.date));
  }


  // Container leeren
  const list = document.getElementById('helperList');
  list.innerHTML = '';

  // Jeden Nutzer als Karte darstellen mit Bild, Name, Geschlecht, Kontakt und weiteren Infos:
  // Für jeden Nutzer in der sortierten Liste eine Karte mit Details erstellen
  sorted.forEach(user => {
    const dob = new Date(user.dob.date);                                          // Geburtsdatum des Nutzers aus dem ISO-Datum in ein Date-Objekt umwandeln
    const reg = new Date(user.registered.date);                                   // Registrierungsdatum des Nutzers ebenfalls in ein Date-Objekt umwandeln
    const age = user.dob.age;                                                     // Alter des Nutzers aus den API-Daten extrahieren (wurde bereits berechnet)

    // HTML-Inhalt für die Nutzerkarte zusammenbauen und an das Container-Element anhängen
    list.innerHTML += `
      <div class="helper-card">
        <img src="${user.picture.medium}" alt="${user.name.first}" />
        <div>
          <strong>${user.name.first} ${user.name.last}</strong><br>               <!-- Name -->
          <em>${user.gender}</em><br>                                             <!-- Geschlecht -->
          📧 ${user.email}<br>                                                    <!-- E-Mail-Adresse -->
          📅 Geboren: ${dob.toLocaleDateString('de-DE')} (${age} Jahre)<br>       <!-- Geburtsdatum formatiert nach deutschem Datumsformat + Alter -->       
          📝 Registriert: ${reg.toLocaleDateString('de-DE')}<br>                  <!-- Registrierungsdatum formatiert nach deutschem Datumsformat -->
          ☎️ Telefon: ${user.phone}<br>                                           <!-- Festnetztelefonnummer -->
          📱 Handy: ${user.cell}<br>                                              <!-- Handynummer -->
          🆔 ID: ${user.id.value || 'N/A'}                                        <!-- ID-Wert anzeigen oder 'N/A' falls kein Wert vorhanden -->
        </div>
      </div>
    `;
  });
}


// Event-Listener: Wenn Sortierauswahl geändert wird, neu sortieren und darstellen
document.getElementById('sortSelect').addEventListener('change', sortAndRender);


// Initialer Aufruf, um Helfer:innen zu laden und darzustellen
fetchHelpers();