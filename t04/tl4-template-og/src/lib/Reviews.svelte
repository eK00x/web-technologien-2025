<script>
  // State-Variablen, die an die Inputs gebunden werden
  let username = "";
  let rating = 1;
  let title = "";
  let text = "";

  // Funktion zum Absenden des Formulars
  function submit(event) {
    event.preventDefault();

    console.log({ username, rating, title, text });

    // Optional: Felder zurücksetzen nach dem Absenden
    username = "";
    rating = 1;
    title = "";
    text = "";
  }
</script>

<style>
  /* Container für Label + Input nebeneinander */
  .form-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem; /* entspricht Bootstrap mb-3 */
  }
  /* Label links mit fixer Breite */
  .form-row label {
    width: 35%;
    margin-bottom: 0; /* entfernt den Abstand unter Label */
    padding-right: 0.5rem;
    text-align: right;
  }
  /* Input nimmt den restlichen Platz */
  .form-row input,
  .form-row textarea {
    width: 65%;
  }
</style>

<form on:submit={submit} class="container-fluid mt-4">
  <div class="row g-3">
    <!-- Spalte 1 -->
    <div class="col-lg-4">
      <div class="form-row">
        <label for="username">Nutzername</label>
        <input
          id="username"
          type="text"
          bind:value={username}
          maxlength="30"
          required
          class="form-control"
        />
      </div>

      <div class="form-row">
        <label for="rating">Rating</label>
        <input
          id="rating"
          type="number"
          bind:value={rating}
          min="1"
          max="5"
          required
          class="form-control"
        />
      </div>

      <div class="form-row">
        <label for="title">Titel</label>
        <input
          id="title"
          type="text"
          bind:value={title}
          maxlength="30"
          required
          class="form-control"
        />
      </div>
    </div>

    <!-- Spalte 2 -->
        <div class="col-lg-5">
        <div class="mb-3 h-100">
            <label for="text" style="display: block; text-align: left; margin-bottom: 0.5rem;">
            Deine Erfahrungen
            </label>
            <textarea
            id="text"
            bind:value={text}
            maxlength="250"
            required
            class="form-control h-100"
            style="min-height: 170px;"
            ></textarea>
        </div>
    </div>


    <!-- Spalte 3 -->
    <div class="col-lg-3 d-flex align-items-end">
      <button 
        type="submit" 
        class="btn btn-success" 
        style="min-width: 140px; border-radius: 24px; padding: 0.2em 1.5em;"
      >
        Bericht senden
      </button>
    </div>
  </div>
</form>
