// Variablen festlegen
const margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = 650 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

d3.json("https://api.open-meteo.com/v1/forecast?latitude=49.904&longitude=10.87&hourly=temperature_2m&timezone=Europe%2FBerlin&start_date=2025-06-12&end_date=2025-06-22").then((data) => {
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