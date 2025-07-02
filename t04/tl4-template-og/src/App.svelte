<script>
  import Header from './lib/Header.svelte';
  import Form from './lib/Form.svelte';
  import Reviews from './lib/Reviews.svelte';
</script>

<main class="container my-5">

  <!-- Header mit Logo und Überschrift -->
  <Header />

  <!-- Formular für Erfahrungsberichte -->
  <Form />

  <!-- Anzeige der Erfahrungsberichte in Cards -->
  <Reviews />
</main>
