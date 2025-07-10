import './app.css'               // Globale CSS-Datei importieren
import App from './App.svelte'   // Haupt-Svelte-Komponente importieren (App)
import { mount } from 'svelte';  // Funktion zum Mounten der Komponente importieren

// App-Komponente in das DOM-Element mit ID 'app' einfügen
const app = mount(App, {
  target: document.getElementById('app'),
});

export default app              // Export der App-Instanz für weitere Verwendung
