# Web-Technologien (WebT) – Sommersemester 2025

Dieses Repo enthält meine Lösungen für die Teilleistungen (TL) des Kurses **Web-Technologien** (Sommersemester 2025) der Otto-Friedrich-Universität Bamberg.

**Autoren:** Alice Alferink & Emilia Kistowski

---

## Globale Start- und Nutzungshinweise

Da es sich um voneinander unabhängige Webanwendungen handelt, folgen Sie bitte den spezifischen Anweisungen für jeden Ordner (`t02`, `t03`, `t04`).

**Achtung:** Für TL3 und TL4 ist die Installation von **Node.js** und den notwendigen **npm-Paketen** erforderlich (`npm install` im jeweiligen Ordner).

---

## Teilleistung 2: Festival Organisation (t02)

| | |
| :--- | :--- |
| **Beschreibung** | [cite_start]Single-Page-Application (SPA) zur Organisation des "Rock am See"-Festivals mit Countdown, Informationen, Events und einer sortierbaren Liste von Helfern[cite: 108, 109]. |
| **Technologien** | HTML, CSS, JavaScript (Fetch API, DOM-Manipulation). |
| **Funktionalität** | Fixierte Navigationsleiste, Sprungmarken (Anchors), Sortierfunktion für Helferliste (Name, Registrierungsdatum), CSS-Ladeanzeige während des Datenabrufs. |
| **Ordnerstruktur** | `home.html`, `script.js`, `style.css`, `festival.jpg`, `README.md` |
| **Start/Nutzung** | 1. Ordner **`t02`** herunterladen. 2. Datei **`home.html`** direkt im Browser öffnen. |
| **API** | `https://randomuser.me/api/?results=30&seed=a` |

---

## Teilleistung 3: Wetter-Monitoring (t03)

| | |
| :--- | :--- |
| **Beschreibung** | SPA zur Wetteranalyse (Temperatur und Wolkenbedeckung) für das "Rock am See" Festival. [cite_start]Die Anwendung besteht aus einem Frontend (Client) und einem Backend (Express-Server)[cite: 37, 27]. |
| **Technologien** | Node.js, Express.js (Backend), D3, Bootstrap (Frontend). |
| **Visualisierung** | [cite_start]Kreisdiagramm (Temperatur über/unter Schwellenwert), Liniendiagramm (Wolkenbedeckung pro Stunde)[cite: 28, 29]. |
| **Ordnerstruktur** | Enthält `./client`, `./server` (mit `index.js`, `temperatur_stuendlich.json`, `wolkenbedeckung_stuendlich.json`), `package.json`. |
| **Setup & Start** | 1. Im Ordner **`t03`** (oder dessen Root-Verzeichnis) `npm install` ausführen. 2. **Terminal 1:** `npm run server` (startet API auf `http://localhost:3000`). 3. **Terminal 2:** `npm run client` (startet SPA). |

---

## Teilleistung 4: Erfahrungsberichte (t04)

| | |
| :--- | :--- |
| **Beschreibung** | SPA zur Eingabe und Anzeige von Erfahrungsberichten in einem Grid-Layout. Die Daten werden lokal im Browser gespeichert. |
| **Technologien** | **Svelte 5**, Bootstrap, localStorage, Vite. |
| **Funktionalität** | Formular mit Validierung (Rating 1-5, max. Zeichenlängen), Anzeige als Card-Komponenten, Persistenz der Daten mittels `localStorage`. |
| **Ordnerstruktur** | Svelte-Komponenten (`App.svelte`, `Header.svelte`, `Form.svelte`, `Reviews.svelte`, `Card.svelte`) und `stores.js`. |
| **Setup & Start** | 1. Im Ordner **`t04`** `npm install` ausführen. 2. Entwicklungsserver starten: **`npm run dev`** (öffnet typischerweise `http://localhost:5173`). |
