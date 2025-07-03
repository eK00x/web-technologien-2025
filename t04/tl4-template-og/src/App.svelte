<script>
  import './app.css';
  import Header from './lib/Header.svelte';
  import Form from './lib/Form.svelte';
  import Reviews from './lib/Reviews.svelte';
</script>

<div id="app">
  <Header />

  <!-- Hintergrundbild-Bereich mit Container für korrekte Ausrichtung -->
  <div class="background-wrapper">
    <div class="container">  <!-- Bootstrap Container für Grid-Ausgleich -->
      <main class="content-container">
        <Form />
        <Reviews />
      </main>
    </div>
  </div>
</div>
