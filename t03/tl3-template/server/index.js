import express from "express"; // Import von express, dem Webframework mit dem Webserver und APIs erstellt werden können.
import fs from "fs"; // fs ist das eingebaute File-System Modul von Node.js, mit dem können Dateien gelesen oder geschrieben werden

// Erstellen einer neuen Express-Anwendung. Mit app können neue Routen (URL Endpunkte) definiert werden.
const app = express();

// Definiert die Route zur Startseite "/". 
// Bei Aufruf von dieser, bekommt der Nutzer momentan die Antwort: "Server is up and running."
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Der Server wird gestartet und bekommt die Anweisung, auf Port 3000 zu hören. 
app.listen(3000, () => {
  console.log(`Started on port 3000, go to http://localhost:3000`);
});

// Bindet die beiden Dateien ein, die lokal mit im Ordner liegen.
// Die Daten aus den Dateien werden eingelesen und in den Variablen als JS-Objekte gespeichert. 
const temperaturDaten = JSON.parse(fs.readFileSync("./server/temperatur_stuendlich.json", "utf-8"));
const wolkenDaten = JSON.parse(fs.readFileSync("./server/wolkenbedeckung_stuendlich.json", "utf-8"));

// Erstellt neuen Pfad, über den dann die Daten des Objektes temperaturDaten abgerufen werden können.
app.get("/wetterdaten/temperatur", (req, res) => {
  res.json(temperaturDaten);
});

// Erstellt neuen Pfad, über den dann die Daten der Objektes wolkenDaten abgerufen werden können. 
app.get("/wetterdaten/wolkenbedeckung", (req, res) => {
  res.json(wolkenDaten);
});

