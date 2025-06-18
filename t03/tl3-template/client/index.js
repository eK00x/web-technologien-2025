/*document.addEventListener("DOMContentLoaded", function () {
  const daten = [
    { label: "A", wert: 30 },
    { label: "B", wert: 70 },
    { label: "C", wert: 45 },
    { label: "D", wert: 65 }
  ];

  const breite = 400;
  const höhe = 400;
  const radius = Math.min(breite, höhe) / 2;

  const farbskala = d3.scaleOrdinal()
    .domain(daten.map(d => d.label))
    .range(d3.schemeCategory10);

  const svg = d3.select("svg")
    .attr("width", breite)
    .attr("height", höhe)
    .append("g")
    .attr("transform", `translate(${breite / 2}, ${höhe / 2})`);

  const pie = d3.pie().value(d => d.wert);
  const bogen = d3.arc().innerRadius(0).outerRadius(radius);

  const arcs = svg.selectAll("arc")
    .data(pie(daten))
    .enter()
    .append("g");

  arcs.append("path")
    .attr("d", bogen)
    .attr("fill", d => farbskala(d.data.label));

  arcs.append("text")
    .attr("transform", d => `translate(${bogen.centroid(d)})`)
    .attr("class", "label")
    .text(d => d.data.label);
});




// Variablen festlegen
const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/*Nur, wenn öffentliche API genutzt werden soll (d.h. ohne Backend)
// d3.json("https://api.open-meteo.com/v1/forecast?latitude=49.904&longitude=10.87&hourly=temperature_2m&timezone=Europe%2FBerlin&start_date=2025-06-12&end_date=2025-06-22").then((data) => 
    
   {
    const radius = Math.min(width, height) / 2 - margin.top;

    // Test-Daten laden
    data = [
        {
            "label": "Zeit über 20°C",
            "value": 30
        },
        {
            "label": "Zeit unter 20°C",
            "value": 70
        }
    ]


    // SVG-Elemente erstellen
    const piechart = d3
        .select("#piechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie()
        .value(d => d.value);

    const data_ready = pie(data);

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Slices zum Diagramm hinzufügen
    piechart.selectAll('slices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', (d, i) => d3.schemeCategory10[i])
        .attr('stroke', 'white')
        .style('stroke-width', '2px');

    // Beschriftungen zum Diagramm hinzufügen
    piechart.selectAll('labels')
        .data(data_ready)
        .enter()
        .append('text')
        .text(d => d.data.label)
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .style('text-anchor', 'middle')
        .style('font-size', '22px')
        .style('fill', 'black')
        .style('font-family', 'Arial');
})

*/
/*
d3.json("https://api.open-meteo.com/v1/forecast?latitude=49.904&longitude=10.87&hourly=cloud_cover&timezone=Europe%2FBerlin&start_date=2025-06-12&end_date=2025-06-22").then((data) => {
    console.log(data);
    // TODO: Hier soll nun der Code für die Erstellung des Liniendiagramms folgen. Aktuell ist nur ein Beispiel-Diagramm implementiert, das als Ausgangspunkt dienen soll.
    // Test-Daten laden
    data = [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 15 },
        { x: 4, y: 25 },
        { x: 5, y: 30 },
    ];

    // SVG-Elemente erstellen
    const linechart = d3
        .select("#linechart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Skalen für die Achsen definieren
    const xLine = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.x)])
        .range([0, width]);

    const yLine = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y)])
        .range([height, 0]);

    // X-Achse hinzufügen
    linechart
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xLine));

    // Y-Achse hinzufügen
    linechart.append("g").call(d3.axisLeft(yLine));

    // Linienfunktion definieren
    const line = d3
        .line()
        .x((d) => xLine(d.x))
        .y((d) => yLine(d.y));

    // Linie zum Diagramm hinzufügen
    linechart
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);
})
*/

// AUFGABENTEIL > Frontend: "Beim Aufrufen der SPA sollen zunächst die JSON-Daten abgefragt werden.
// Diese sollen von Eurer lokal gehosteten API werden.""

// Fetch-Anfragen

// Temperaturdaten vom Server holen

/*
fetch("http://localhost:3000/wetterdaten/temperatur")
  .then((response) => response.json())
  .then((temperaturDaten) => {
    console.log("Temperaturdaten:", temperaturDaten);
    // Hier kannst du später die Temperaturdaten weiterverarbeiten (z. B. ins Diagramm einfügen)
  })
  .catch((error) => {
    console.error("Fehler beim Abrufen der Temperaturdaten:", error);
  });

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


console.log("Script geladen");

// --- Konstanten für das Diagramm ---
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

    // Pfade (Sektoren) hinzufügen
    svg.selectAll('path')                               // sucht im SVG nach allen vorhandenen <path>
      .data(data_ready)                                 // verknüpft berechnete Segmente (data_ready) mit der Auswahl.
      .enter()                                          // "Für alle Daten, für die noch kein passendes Element existiert, 
                                                        // erstelle jetzt ein neues Element."
      .append('path')                                   // für jedes Datenelement ein neues <path>-Element in das SVG einfügen
      .attr('d', arc)                                   // definiert die Form des Segments mit dem Arc-Generator
      .attr('fill', (d, i) => d3.schemeCategory10[i])   // gibt jedem Segment andere Farbe: aus Standardfarbschema d3.schemeCategory10
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

