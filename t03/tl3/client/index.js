// AUFGABENTEIL > Frontend: "Beim Aufrufen der SPA sollen zunächst die JSON-Daten abgefragt werden.
// Diese sollen von Eurer lokal gehosteten API kommen."

console.log("Script geladen"); // Meldung zur Kontrolle, dass Script gestartet wurde

// ----------------------------------------------------------------------------------------------------------------------
//  1. Teil: Kreisdiagramm
// ----------------------------------------------------------------------------------------------------------------------

// Sicherstellen, dass DOM geladen ist, bevor mit D3 gearbeitet wird
document.addEventListener("DOMContentLoaded", () => {
  // --- Konstanten für das Kreisdiagramm: definieren die Größe und die Ränder des Zeichenbereichs ---
  const marginPie = { top: 20, right: 20, bottom: 30, left: 40 }; // Platz außen um das Diagramm
  const widthPie = 650 - marginPie.left - marginPie.right;
  const heightPie = 250 - marginPie.top - marginPie.bottom;

  // --- Daten vom Server laden und Kreisdiagramm erstellen ---
  fetch("http://localhost:3000/wetterdaten/temperatur")
    .then(response => {
      // Prüfen, ob die Serverantwort erfolgreich war (HTTP Status 200–299)
      if (!response.ok) throw new Error(`Serverfehler: ${response.status}`); // Bei Fehler wird eine Ausnahme ausgelöst
      return response.json(); // Serverantwort als JSON parsen
    })
    .then(temperaturDaten => {
      // Temperaturwerte aus den Daten extrahieren (Annahme: vorhanden im Array temperaturDaten.hourly.temperature_2m)
      const temperaturWerte = temperaturDaten.hourly.temperature_2m;

      // Definition eines Schwellenwerts, um Zeiträume mit höheren bzw. niedrigeren Temperaturen zu unterscheiden
      const schwellenwert = 20;

      // Anzahl Werte, die über dem Schwellenwert liegen
      const über = temperaturWerte.filter(t => t > schwellenwert).length;
      // Anzahl Werte, die gleich oder unter dem Schwellenwert liegen
      const unter = temperaturWerte.length - über;

      // Datenformat für Pie-Diagramm
      const pieData = [
        { label: `Zeit über ${schwellenwert}°C`, value: über },
        { label: `Zeit unter ${schwellenwert}°C`, value: unter }
      ];

      // Radius des Kreisdiagramms definieren
      const radius = Math.min(widthPie, heightPie) / 2;

      // SVG-Element erstellen und an das HTML-Element mit ID "piechart" anhängen
      const svg = d3.select("#piechart")                  // wählt Ziel-Element im DOM aus
        .append("svg")                                    // fügt in dieses Element ein <svg>-Element ein
        .attr("width", widthPie + marginPie.left + marginPie.right)  // setzt Breite des SVG entsprechend der gewünsch. Größe + Rändern
        .attr("height", heightPie + marginPie.top + marginPie.bottom)  // dasselbe für Höhe
        .append("g")                                        // fügt eine Gruppe für die Diagramm-Elemente ein
        // Koordinatenursprung verschieben für bessere Positionierung: 160px nach rechts und 125px nach unten.
        .attr("transform", "translate(160, 125)");

      // Pie-Generator erzeugen: berechnet anhand der Werte in pieData die Winkel für die Segmente des Kreisdiagramms.
      const pie = d3.pie().value(d => d.value);
      const pieReadyData = pie(pieData);


      // Arc Generator: Diese Funktion erzeugt die Pfad-Definition für jedes Segment des Kreisdiagramms.
      // Der innere Radius ist 0 (beginnt in der Mitte), der äußere Radius bestimmt die Größe der Segmente.
      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      // Eigene Farben definieren: z. B. orange für warm, blau für kühl
      const colors = ["#ffc107", "#0d6efd"];

      // Pfade für Sektoren hinzufügen
      svg.selectAll('path')                               // Auswahl aller Pfade im SVG
        .data(pieReadyData)                                 // Verbindet Daten mit Pfaden
        .enter()                                            // Für alle Daten ohne zugeordnetes Element:
        .append('path')                                   // Ein neues SVG-Pfad-Element erzeugen
        .attr('d', arc)                                   // Pfad mit der Arc-Funktion zeichnen
        .attr('fill', (d, i) => colors[i])               // Farbe aus dem Farbenarray zuweisen
        .attr('stroke', 'white')                         // Weißen Rand um jedes Segment zeichnen 
        .style('stroke-width', '2px');                   // Strichstärke für den Rand setzen

      // Textbeschriftungen für Segmente hinzufügen
      svg.selectAll('text')                                      // Auswahl aller Text-Elemente im SVG
        .data(pieReadyData)                                     // Verbindet Daten mit Texten
        .enter()                                                  // Für alle Daten ohne zugeordnetes Element:                   
        .append('text')                                          // Erzeuge neues Text-Element
        .text(d => d.data.label)                                 // Setzt Text auf Label aus den Daten
        .attr('transform', d => `translate(${arc.centroid(d)})`) // Positioniert Text in der Mitte des jeweiligen Segments
        .style('text-anchor', 'middle')                          // Zentriert Text horizontal
        .style('font-size', '13px')                              // Setzt Schriftgröße
        .style('fill', '#000');                                  // Setzt Textfarbe auf schwarz
    })
    .catch(err => {
      // Fehler beim Laden oder Verarbeiten der Temperaturdaten abfangen und in der Konsole ausgeben
      console.error("Fehler beim Laden der Temperaturdaten:", err);
    });
}); 

// ----------------------------------------------------------------------------------------------------------------------
// 2. Teil: Liniendiagramm
// ----------------------------------------------------------------------------------------------------------------------

// Sicherstellen, dass DOM vollständig geladen ist, bevor das Skript ausgeführt wird
document.addEventListener("DOMContentLoaded", () => {
    // Abruf der Wolkenbedeckungsdaten von der lokalen API
    fetch("http://localhost:3000/wetterdaten/wolkenbedeckung") // abrufen der lokalen API
    .then((response) => { 
      // Prüfen ob der Abruf erfolgreich war (Status 200–299)
      if (!response.ok) throw new Error(`Serverfehler: ${response.status}`); // falls nicht erfolgreich, Fehlermeldung
      return response.json(); // speichern der abgerufenen Daten als .json
    })
    .then((wolkenDaten) => {  // ein neues Array mit x-y paaren wird erstellt.  [{},{},{}]
        // Prüfen, ob die erwartete Datenstruktur vorhanden ist
        if (
        !wolkenDaten.hourly ||
        !Array.isArray(wolkenDaten.hourly.time) ||
        !Array.isArray(wolkenDaten.hourly.cloud_cover)
      ) {
        throw new Error("Unerwartete Datenstruktur der Wolkenbedeckungsdaten");
      }
    
      // Umwandeln der Rohdaten in ein Array von Objekten mit Zeit (Date) und Wert (Cloud Cover)
      const chartData = wolkenDaten.hourly.time.map((time, i) => ({
        x: new Date(time), // Zeit als Date-Objekt
        y: wolkenDaten.hourly.cloud_cover[i], // zugehörige Wolkenbedeckung
      }));

      // Aufruf der Funktion zum Zeichnen des Liniendiagramms mit den vorbereiteten Daten
      drawLineChart(chartData);
    })
    .catch((err) => {
      // Fehler beim Laden oder Verarbeiten der Wolkenbedeckungsdaten in Konsole ausgeben
      console.error("Fehler beim Laden der Wolkenbedeckungsdaten:", err)
    });
});

// Definition der drawLineChart Funktion
function drawLineChart(data) {
  // Ränder, Breite und Höhe des Diagramms definieren
  const marginLine = { top: 20, right: 190, bottom: 60, left: 40 };
  const widthLine = 800 - marginLine.left - marginLine.right;
  const heightLine = 400 - marginLine.top - marginLine.bottom;

  // SVG-Element im #linechart div anlegen
  const svg = d3.select("#linechart")
    .append("svg")
    .attr("width", widthLine + marginLine.left + marginLine.right)
    .attr("height", heightLine + marginLine.top + marginLine.bottom)
    .append("g")
    .attr("transform", `translate(${marginLine.left},${marginLine.top})`);

  // x-Achse als Zeitachse definieren (Bereich ist von min bis max der Datenzeitpunkte)
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, (d) => d.x))
    .range([0, widthLine]);

  // y-Achse linear von 0 bis 100% (Wolkenbedeckung in Prozent)
  const yScale = d3.scaleLinear()
    .domain([0, 100]) // werte von 0 bis 100%
    .range([heightLine, 0]);

  // X-Achse hinzufügen mit Datumsformat und schräger Beschriftung für bessere Lesbarkeit
  svg.append("g")
    .attr("transform", `translate(0,${heightLine})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y-%m-%d")))
    .selectAll("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-45)") // schräg stellen
    .attr("dx", "-0.8em")
    .attr("dy", "0.15em");

  // Y-Achse links hinzufügen
  svg.append("g")
    .call(d3.axisLeft(yScale));

  // Linie erzeugen, die Datenpunkte miteinander verbindet
  const lineGenerator = d3.line()
    .x(d => xScale(d.x))  // x-Koordinate basierend auf Datum
    .y(d => yScale(d.y)); // y-Koordinate basierend auf Wolkenbedeckung

  // Pfad mit Linienverlauf zum SVG hinzufügen
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#007BFF")  // blaue Linie
    .attr("stroke-width", 2)
    .attr("d", lineGenerator);

  // Datenpunkte als Kreise anzeigen (zur besseren Sichtbarkeit)
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.x))  // x-Position
    .attr("cy", (d) => yScale(d.y))  // y-Position
    .attr("r", 4)                    // Radius des Kreises
    .attr("fill", "#007BFF")         // blaue Füllung
    .attr("stroke", "white")         // weißer Rand
    .attr("stroke-width", 1.5);
}