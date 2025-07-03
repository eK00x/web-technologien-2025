<script>
  export let username;
  export let rating;
  export let title;
  export let text;

  const maxLength = 245; // maximale Zeichenanzahl

  // Text kürzen, falls zu lang
  $: shortenedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
</script>

<style>
  .review-card {
    width: 400px;          /* feste Breite */
    min-height: 220px;     /* Mindesthöhe für maximalen Inhalt */
    background-color: #208C81;
    padding: 1.5rem;
  
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: transform 0.2s ease;
    text-align: left;
    box-sizing: border-box;
  }

  .review-card:hover {
    transform: scale(1.01);
  }

  .header-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .username {
    font-size: 0.92rem;
    color: white;
    font-weight: 600;
  }

  .stars {
    font-size: 1.2rem;
    white-space: nowrap;
    display: flex;
    gap: 2px;
  }

  /* Gefüllte goldene Sterne */
  .stars i {
    color: gold;
  }

  /* Gefüllte hellgraue Sterne für "leere" Sterne */
  .stars i.regular {
    color: lightgray;
  }

  .title {
    font-weight: 800;
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }

  .text {
    font-size: 0.92rem;
    color: white;
    font-weight: 500;
  }
</style>

<div class="review-card">
  <div class="header-line">
    <div class="username">{username}</div>
    <div class="stars">
      {#each Array(rating) as _, i}
        <i class="fa-solid fa-star"></i>
      {/each}
      {#each Array(5 - rating) as _, i}
        <!-- Hier fa-solid für hellgrau gefüllte Sterne -->
        <i class="fa-solid fa-star regular"></i>
      {/each}
    </div>
  </div>

  <div class="title">{title}</div>
  <div class="text">{shortenedText}</div>
</div>
