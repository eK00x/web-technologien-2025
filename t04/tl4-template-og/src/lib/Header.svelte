<script>
  import logo from '../assets/logo.png';
</script>

<style>
  header {
    display: flex;
    justify-content: center; /* Text + Logo mittig horizontal */
    align-items: center;     /* Vertikal zentriert */
    padding: 1rem 2rem;
    width: 100%;
    box-sizing: border-box;
    background-color: #f5f5f5;
  }

  .text-container {
    max-width: 60%;          /* Optional: begrenzt die Textbreite */
  }

  h1 {
    font-size: 1.9rem;
    margin: 0 0 0.75rem 0; /* Mehr Abstand unter h1 */
    font-weight: 600;
  }

  h2 {
    font-size: 0.9rem;
    margin: 0;
    font-weight: normal;
    color: #555;
  }

  img {
    width: 160px;
    height: auto;
    flex-shrink: 0;          /* Logo nicht schrumpfen lassen */
  }
</style>

<header>
  <div class="text-container">
    <h1>Erfahrungsberichte Rock am See 2025</h1>
    <h2>Teilt eure Erfahrungen mit uns und den anderen Besucher:innen</h2>
  </div>
  <img src={logo} alt="Festival-Logo" />
</header>
