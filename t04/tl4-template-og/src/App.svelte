<script>
  // Globale CSS-Datei importieren
  import './app.css';

  // Komponenten importieren
  import Header from './lib/Header.svelte'; // Import des Headers
  import Form from './lib/Form.svelte';  // Import der Formulars
  import Reviews from './lib/Reviews.svelte'; // Import von Reviews (verwaltet die Liste der Review)
</script>

<!-- Haupt-Wrapper der App -->
<div id="app">
  <Header /> <!-- Header-Komponente -->
  <div class="background-wrapper">  <!-- Bereich mit Hintergrundbild -->
    <div class="container">
      <main class="content-container">
        <Form /> <!-- Formular-Komponente für Eingaben -->
        <Reviews /> <!-- Reviews-Komponente -->
      </main>
    </div>
  </div>
</div>
