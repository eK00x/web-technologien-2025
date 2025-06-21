// --- Imports ---
// Importiert Express-Framework, um einen Webserver und APIs zu erstellen
import express from 'express';  

// Importiert CORS-Middleware, um Cross-Origin Resource Sharing zu ermöglichen
import cors from 'cors';        

// Importiert eingebautes Node.js Modul für Dateioperationen
import fs from 'fs';            

// Importiert eingebautes Node.js Modul zur Arbeit mit Pfaden
import path from 'path';

// Importiert eine Funktion, um den Dateipfad des aktuellen Moduls zu ermitteln
import { fileURLToPath } from 'url';


// --- Initialisierung ---
// Erstellt eine neue Express-Anwendung
const app = express();

// Definiert den Port, auf dem der Server laufen soll
const port = 3000;


// --- CORS aktivieren ---
// Aktiviert CORS: Damit kann Server von anderen Domains angesprochen werden
// Wichtig: Dies muss vor den Routen passieren
app.use(cors());


// --- Hilfsvariablen für Pfadbehandlung ---
// Bestimmt den vollständigen Pfad der aktuellen Datei
const __filename = fileURLToPath(import.meta.url);

// Bestimmt den Ordnerpfad der aktuellen Datei
const __dirname = path.dirname(__filename);



// --- Daten einlesen ---
// Liest JSON-Datei mit stündlichen Temperaturdaten synchron ein und parsed sie zu einem JS-Objekt
const temperaturDaten = JSON.parse(fs.readFileSync(path.join(__dirname, 'temperatur_stuendlich.json'), 'utf-8'));

// Liest JSON-Datei mit stündlichen Wolkenbedeckungsdaten synchron ein und parsed sie zu einem JS-Objekt
const wolkenDaten = JSON.parse(fs.readFileSync(path.join(__dirname, 'wolkenbedeckung_stuendlich.json'), 'utf-8'));



// --- Routen ---
// Definiert die Route für die Startseite "/"
// Bei einem GET-Request auf diese URL wird der Text 'Server is up and running!' zurückgegeben
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Definiert eine Route, um die Temperaturdaten als JSON auszugeben
app.get('/wetterdaten/temperatur', (req, res) => {
  res.json(temperaturDaten);
});

// Definiert eine Route, um die Wolkenbedeckungsdaten als JSON auszugeben
app.get('/wetterdaten/wolkenbedeckung', (req, res) => {
  res.json(wolkenDaten);
});


// --- Server starten ---
// Startet Server und lässt ihn auf dem definierten Port (3000) warten
// Sobald Server läuft, wird Meldung auf Konsole ausgegeben
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});