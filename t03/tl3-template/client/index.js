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
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
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
    const svg = d3.select("#piechart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      
      .attr("transform", "translate(160, 170)");



      
    // Pie Generator
    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(data);

    // Arc Generator
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Pfade (Sektoren) hinzufügen
    svg.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i])
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    // Beschriftungen hinzufügen
    svg.selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => d.data.label)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#000');  // schwarz als Textfarbe, falls notwendig
  })
  .catch(err => {
    console.error("Fehler beim Laden der Daten:", err);
  });
