<script>
  import { reviews } from '../stores.js';

  let username = "";
  let rating = 1;
  let title = "";
  let text = "";

  function submit(event) {
    event.preventDefault();

    reviews.update((items) => [
      ...items,
      {
        id: Date.now(),
        username,
        rating: Number(rating),
        title,
        text
      }
    ]);

    username = "";
    rating = 1;
    title = "";
    text = "";
  }
</script>

<style>
  @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

  .form-row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .form-row label {
    width: 35%;
    margin-bottom: 0;
    padding-right: 0.5rem;
    text-align: right;
  }

  .form-row input,
  .form-row select,
  .form-row textarea {
    width: 65%;
  }

  select.form-control {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23666%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207l5%205%205-5H5z%22/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
    padding-right: 2rem;
  }

  #rating {
    width: 8rem;
    border-radius: 0;
    border: 1px solid black;
  }

  .custom-submit-button {
    min-width: 140px;
    border-radius: 24px;
    padding: 0.2em;
    background-color: #F2CC0F;
    color: black;
    border: none;
  }

  .custom-submit-button:hover {
    background-color: #d4b10c;
    color: white;
  }
</style>

<form on:submit={submit} class="container-fluid mt-4">
  <div class="row gx-5 g-3" style="margin-left: 2rem;">
  
    <!-- Spalte 1 -->
    <div class="col-lg-4" style="padding-left: 5.5rem; padding-right: 0rem;">
      <div class="form-row">
        <label for="username">Nutzername</label>
        <input
          id="username"
          type="text"
          bind:value={username}
          maxlength="30"
          required
          class="form-control"
          style="height: 32px; border-radius: 0; border: 1px solid black;"
        />
      </div>

      <div class="form-row">
        <label for="rating">Rating</label>
        <select
          id="rating"
          bind:value={rating}
          required
          class="form-control"
          style="height: 32px"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
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
          style="height: 32px; border-radius: 0; border: 1px solid black;"
        />
      </div>
    </div>

    <!-- Spalte 2 -->
    <div class="col-lg-5" style="max-width: 100%;">
      <div class="mb-3">
        <label for="text" class="form-label w-100 text-start mb-2">
          Deine Erfahrungen
        </label>
        <textarea
          id="text"
          bind:value={text}
          maxlength="250"
          required
          class="form-control h-100"
          style="min-height: 97px; max-width: 320px; border-radius: 0; border: 1px solid black;"
        ></textarea>
      </div>
    </div>

    <!-- Spalte 3 -->
    <div class="col-lg-3 d-flex align-items-end" style="padding-bottom: 1rem; margin-left: -6rem;">
      <button 
        type="submit" 
        class="btn custom-submit-button"
      >
        Bericht senden
      </button>
    </div>

  </div>
</form>
