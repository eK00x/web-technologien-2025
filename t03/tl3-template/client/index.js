

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
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
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
        .domain([0, 100])
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




// AUFGABENTEIL > Frontend: "Beim Aufrufen der SPA sollen zunächst die JSON-Daten abgefragt werden.
// Diese sollen von Eurer lokal gehosteten API werden.""

// Fetch-Anfragen

/*// Temperaturdaten vom Server holen
fetch("http://localhost:3000/wetterdaten/temperatur")
    .then((response) => response.json())
    .then((temperaturDaten) => {
        console.log("Temperaturdaten:", temperaturDaten);
        // Hier kannst du später die Temperaturdaten weiterverarbeiten (z. B. ins Diagramm einfügen)
    })
    .catch((error) => {
        console.error("Fehler beim Abrufen der Temperaturdaten:", error);
    });*/

/* Dieser Teil sollte jetzt oben schon abgedeckt sein.
// Wolkenbedeckungsdaten vom Server holen
fetch("http://localhost:3000/wetterdaten/wolkenbedeckung")
    .then((response) => response.json())
    .then((wolkenDaten) => {
        console.log("Wolkenbedeckungsdaten:", wolkenDaten);
        // Hier kannst du später die Wolkendaten weiterverarbeiten (z. B. ins Diagramm einfügen)
    })
    .catch((error) => {
        console.error("Fehler beim Abrufen der Wolkendaten:", error);
    });
    */
