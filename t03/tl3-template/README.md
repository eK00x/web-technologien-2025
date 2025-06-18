# T03 Single-Page-Application for Weather Monitoring (Web-Technologien)

Authors: Alice Alferink & Emilia Kistowski

## Description
The Website "Festival am See - Wetter" is a single page application that allows to monitor waether data for the upcoming days. The applicstion is divided into a frontend and a backend. In the backend a local API is provided by a server. The Frontend connects as client to the API. It fetches the weather data and visualizes them. Data about the temperatore are shown as a Pie Chart. A line chart visualizes the cloudyness in perent per hour. 
A header on top of the page as well as two text boxes, next to the diagrams explain the visualizations with a few words. 

## Folder Structure
- Teilleistung_03
    - client
        - index.html
        - index.js
    - server
        - index.js
        - temperatur_stuendlich.json
        - wolkenbedeckung_stuendlich.json
        - package.json
    - node_modules
    - package-lock.json
    - package.json
    - README.md


## Setup Backend
- install VS Code
- install node.js
- install npm packages
- install cors

## How to Start/Use the Website
1. Step: Download the folder.
2. Step: If needed, unzip the folder.
3. Step: Open the folder in VS Coder or an other IDE with an terminal. 
5. Step: Run the command: "npm run server" .
6. Step: Open second teminal and run: "npm run client" . The SPA should open itself automatically in the browser. 
7. Step: Enjoy! 😊


## Testing
The application was tested on
- Brave Browser
- Firefox
- Chrome


## Testing
The application was tested on
- Brave Browser
- Firefox
- Chrome