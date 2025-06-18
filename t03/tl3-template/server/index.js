// --- Imports ---
import express from 'express';  // Import von express, dem Webframework mit dem Webserver und APIs erstellt werden können.
import cors from 'cors';        // CORS
import fs from 'fs';            // fs ist das eingebaute File-System Modul von Node.js, mit dem können Dateien gelesen oder geschrieben werden
import path from 'path';
import { fileURLToPath } from 'url';

// --- Initialisierung ---
const app = express();        // Erstellen einer neuen Express-Anwendung. Mit app können neue Routen (URL Endpunkte) definiert werden.
const port = 3000;




// --- CORS aktivieren ---
app.use(cors()); //  <--- unbedingt vor den Routen aufrufen

// --- Hilfsvariablen für Pfadbehandlung ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// --- Daten einlesen ---

// Bindet die beiden Dateien ein, die lokal mit im Ordner liegen.
// Die Daten aus den Dateien werden eingelesen und in den Variablen als JS-Objekte gespeichert. 
const temperaturDaten = JSON.parse(fs.readFileSync(path.join(__dirname, 'temperatur_stuendlich.json'), 'utf-8'));
const wolkenDaten = JSON.parse(fs.readFileSync(path.join(__dirname, 'wolkenbedeckung_stuendlich.json'), 'utf-8'));




// --- Routen ---

// Definiert die Route zur Startseite "/". 
// Bei Aufruf von dieser, bekommt der Nutzer momentan die Antwort: "Server is up and running."
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Erstellt neuen Pfad, über den dann die Daten des Objektes temperaturDaten abgerufen werden können.
app.get('/wetterdaten/temperatur', (req, res) => {
  res.json(temperaturDaten);
});

// Erstellt neuen Pfad, über den dann die Daten der Objektes wolkenDaten abgerufen werden können. 
app.get('/wetterdaten/wolkenbedeckung', (req, res) => {
  res.json(wolkenDaten);
});

// --- Server starten ---
// Der Server wird gestartet und bekommt die Anweisung, auf Port 3000 zu hören. 
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
