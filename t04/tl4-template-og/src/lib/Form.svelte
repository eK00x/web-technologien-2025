<script>
  import { reviews } from "../stores.js";

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
        text,
      },
    ]);

    username = "";
    rating = 1;
    title = "";
    text = "";
  }
</script>

<form on:submit={submit} class="container-fluid mt-4 custom-form">
  <div class="row gx-5 g-3 form-main-row">
    <!-- Spalte 1 -->
    <div class="col-lg-4 form-col-left">
      <div class="form-row">
        <label for="username">Nutzername</label>
        <input
          id="username"
          type="text"
          bind:value={username}
          maxlength="30"
          required
          class="form-control custom-input"
        />
      </div>

      <div class="form-row">
        <label for="rating">Rating</label>
        <select
          id="rating"
          bind:value={rating}
          required
          class="form-control custom-select"
        >
          <option value="1">(1)⭐</option>
          <option value="2">(2)⭐⭐</option>
          <option value="3">(3)⭐⭐⭐</option>
          <option value="4">(4)⭐⭐⭐⭐</option>
          <option value="5">(5)⭐⭐⭐⭐⭐</option>
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
          class="form-control custom-input"
        />
      </div>
    </div>

    <!-- Spalte 2 -->
    <div class="col-lg-5 form-col-middle">
      <div class="mb-3">
        <label for="text" class="form-label w-100 text-start mb-2">
          Deine Erfahrungen
        </label>
        <textarea
          id="text"
          bind:value={text}
          maxlength="250"
          required
          class="form-control custom-textarea"
        ></textarea>
      </div>
    </div>

    <!-- Spalte 3 -->
    <div class="col-lg-3 d-flex align-items-end form-col-right">
      <button type="submit" class="btn custom-submit-button">
        Bericht senden
      </button>
    </div>
  </div>
</form>