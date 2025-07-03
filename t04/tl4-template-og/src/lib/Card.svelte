<script>
  export let username;
  export let rating;
  export let title;
  export let text;

  const maxLength = 245; // maximale Zeichenanzahl

  // Text kürzen, falls zu lang
  $: shortenedText = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
</script>

<div class="review-card">
  <div class="header-line">
    <div class="username">{username}</div>
    <div class="stars">
      {#each Array(rating) as _, i}
        <i class="fa-solid fa-star"></i>
      {/each}
      {#each Array(5 - rating) as _, i}
        <i class="fa-solid fa-star regular"></i>
      {/each}
    </div>
  </div>

  <div class="title">{title}</div>
  <div class="text">{shortenedText}</div>
</div>
