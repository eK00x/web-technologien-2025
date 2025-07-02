<script>
  import Header from './lib/Header.svelte';
  import Form from './lib/Form.svelte';
  import Reviews from './lib/Reviews.svelte';
</script>

<main class="container my-5">

  <div class="container my-5">
    <div class="p-5 text-center bg-body-tertiary rounded-3">
      <h1 class="text-body-emphasis">TL4 Template</h1>
      <p class="lead">Test the store connection by clicking the buttons.</p>
    </div>
  </div>

  <!-- Header mit Logo und Überschrift -->
  <Header />

  <!-- Formular für Erfahrungsberichte -->
  <Form />

  <!-- Anzeige der Erfahrungsberichte in Cards -->
  <Reviews />
</main>
