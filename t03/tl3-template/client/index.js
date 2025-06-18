// AUFGABENTEIL > Frontend: "Beim Aufrufen der SPA sollen zunächst die JSON-Daten abgefragt werden.
// Diese sollen von Eurer lokal gehosteten API werden.""


console.log("Script geladen");

// --- Konstanten für das Kreisdiagramm ---
// definieren die Größe und die Ränder des Zeichenbereichs
const margin = { top: 20, right: 20, bottom: 30, left: 40 }; // Platz außen um das Diagramm
const width = 650 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// --- Daten laden und Diagramm zeichnen ---
fetch("http://localhost:3000/wetterdaten/temperatur")
    .then(response => response.json())
    .then(temperaturDaten => {
        // Temperaturwerte aus den Daten extrahieren (angenommen im Array temperaturDaten.hourly.temperature_2m)
        const werte = temperaturDaten.hourly.temperature_2m;

        // Schwellenwert für das Pie-Diagramm
        const schwellenwert = 20;

        // Anzahl Werte über bzw. unter dem Schwellenwert zählen
        const über = werte.filter(w => w > schwellenwert).length;
        const unter = werte.length - über;

        // Datenformat für Pie-Diagramm
        const data = [
            { label: `Zeit über ${schwellenwert}°C`, value: über },
            { label: `Zeit unter ${schwellenwert}°C`, value: unter }
        ];

        // Radius für Pie-Diagramm
        const radius = Math.min(width, height) / 2 * 0.7;

        // SVG Container anlegen
        const svg = d3.select("#piechart")                  //sucht im DOM (html-doc) ein Element mit der ID #piechart und wählt es aus
            .append("svg")                                    //fügt in dieses Element ein <svg>-Element ein
            .attr("width", width + margin.left + margin.right)  //setzt  Breite des SVG entsprechend der gewünsch. Größe + Rändern
            .attr("height", height + margin.top + margin.bottom)  //dasselbe für Höhe
            .append("g")                                        //fügt eine Gruppe in das SVG ein

            // Verschiebt die Gruppe (<g>) um 160 px nach rechts und 170 px nach unten.
            // Dadurch wird der Ursprung des Koordinatensystems der Gruppe verlagert —
            // sinnvoll z. B. um ein Kreisdiagramm im SVG zu zentrieren.
            .attr("transform", "translate(160, 170)");


        // Pie-Generator (rechnet auf Basis der Daten aus, wie groß jedes Segment ist)
        // Berechnet für jedes Datenobjekt (d.value), wie groß sein Anteil im Kreisdiagramm ist (als Winkel in Radiant).
        // Die Methode .value(d => d.value) gibt an, dass für jedes Datenobjekt der Wert in d.value die Größe des jeweiligen Kreisstücks bestimmt.
        // Der Generator berechnet daraus Start- und Endwinkel für jedes Segment eines Kreisdiagramms.
        const pie = d3.pie().value(d => d.value);
        const data_ready = pie(data);

        // Arc Generator (zeichnet ein Segment auf Basis der Winkel)
        // Erstellt eine Funktion, die einen Bogen für das Kreisdiagramm zeichnet.
        // Der innere Radius ist 0 (beginnt in der Mitte), der äußere Radius bestimmt die Größe.
        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Eigene Farben definieren: z. B. orange für >20 °C, blau für ≤20 °C
        const colors = ["#2484BF", "#ffc107"];
        
        // Pfade (Sektoren) hinzufügen
        svg.selectAll('path')                               // sucht im SVG nach allen vorhandenen <path>
            .data(data_ready)                                 // verknüpft berechnete Segmente (data_ready) mit der Auswahl.
            .enter()                                          // "Für alle Daten, für die noch kein passendes Element existiert, 
            // erstelle jetzt ein neues Element."
            .append('path')                                   // für jedes Datenelement ein neues <path>-Element in das SVG einfügen
            .attr('d', arc)                                   // definiert die Form des Segments mit dem Arc-Generator
            .attr('fill', (d, i) => colors[i])                // hier deine eigenen Farben
            .attr('stroke', 'white')                          // weißer Rand um jedes Segment (damit man die Stücke besser sieht) 
            .style('stroke-width', '2px');                    // Rand in px-Breite

        // Beschriftungen hinzufügen
        svg.selectAll('text')                                      // Sucht im SVG nach allen vorhandenen <text>-Elementen
            .data(data_ready)                                        // Verknüpft berechneten Segmente (data_ready) mit der Auswahl
            .enter()                                                 // "Für alle Daten, für die noch kein passendes Element existiert, 
            // erstelle jetzt ein neues Element."
            .append('text')                                          // Erzeuge ein neues <text>-Element
            .text(d => d.data.label)                                 // Setzt Text auf Label aus den Daten
            .attr('transform', d => `translate(${arc.centroid(d)})`) // Positioniert Text in der Mitte des jeweiligen Kreisstücks
            .style('text-anchor', 'middle')                          // Zentriert Text horizontal
            .style('font-size', '14px')                              // Setzt Schriftgröße
            .style('fill', '#000');                                  // Setzt Textfarbe auf schwarz

    })
    .catch(err => {
        console.error("Fehler beim Laden der Daten:", err); // Fehlerbehandlung beim Laden der Daten
    });



// von mir eingefügt: Liniendiagramm zu Wolkenbedackung

//Zueerst vollständiges Laden der HTML-Datei, bevor js ausgeführt wird. 
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/wetterdaten/wolkenbedeckung") // abrufen der lokalen API
        .then((response) => { //prüfen ob der Abruf erfolgreich war
            if (!response.ok) {
                throw new Error(`Serverfehler: ${response.status}`); // falls nicht erfolgreich, Fehlermeldung
            }
            return response.json(); // speichern der abgerufenen Daten als .json
        })


        .then((wolkenDaten) => {  // ein neues Array mit x-y paaren wird erstellt.  [{},{},{}]
            if (
                !wolkenDaten.hourly ||
                !Array.isArray(wolkenDaten.hourly.time) ||
                !Array.isArray(wolkenDaten.hourly.cloud_cover)
            ) {
                throw new Error("Unerwartete Datenstruktur");
            }

            const data = wolkenDaten.hourly.time.map((time, i) => ({
                x: new Date(time),
                y: wolkenDaten.hourly.cloud_cover[i],
            }));
            drawLineChart(data); // aufruf der Funktion drawLineChart
        })
        .catch((err) =>
            console.error("Fehler beim Laden der Wolkenbedeckungsdaten:", err)
        );
});

// Definition der drawLineChart Funktion
function drawLineChart(data) {
    const margin = { top: 20, right: 190, bottom: 60, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
        .select("#linechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // x-Achse (Zeit)
    const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.x))
        .range([0, width]);

    // y-Achse (0–100%)
    const y = d3
        .scaleLinear()
        .domain([0, 100]) // werte von 0 bis 100
        .range([height, 0]);

    // X-Achse unten hinzufügen mit Datumsformat YYYY-MM-DD und geneigten Labels
    svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")))
        .selectAll("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-45)") // schräg stellen
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em");

    // Y-Achse links hinzufügen
    svg.append("g").call(d3.axisLeft(y));

    // Linie zeichnen
    svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#007BFF")
        .attr("stroke-width", 2)
        .attr(
            "d",
            d3
                .line()
                .x((d) => x(d.x))
                .y((d) => y(d.y))
        );

    // Datenpunkte als Kreise anzeigen
    svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", 4)
        .attr("fill", "#007BFF")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5);
}
