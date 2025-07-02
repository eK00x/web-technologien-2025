<script>
  import logo from '../assets/logo.png';
</script>

<style>
  header {
    display: flex;
    justify-content: space-between; /* Text links, Logo rechts */
    align-items: center;
    width: 100%;               /* Volle Breite */
    box-sizing: border-box;    /* Padding zählt zur Breite */
    padding: 1rem 2rem;
    background-color: #f5f5f5; /* Optional */
  }

  .text-container {
    max-width: 60%;
  }

  h1 {
    font-size: 2.5rem;
    margin: 0 0 0.25rem 0;
    font-weight: bold;
  }

  h2 {
    font-size: 1.2rem;
    margin: 0;
    font-weight: normal;
    color: #555;
  }

  img {
    width: 150px;
    height: auto;
  }
</style>

<header>
  <div class="text-container">
    <h1>Erfahrungsberichte Rock am See 2025</h1>
    <h2>Teilt eure Erfahrungen mit uns und den anderen Besucher:innen</h2>
  </div>

  <img src={logo} alt="Festival-Logo" />
</header>
