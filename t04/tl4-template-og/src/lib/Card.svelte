<script>
  // Eingabewerte (Props) aus der übergeordneten Komponente
  export let username;
  export let rating;
  export let title;
  export let text;

  const maxLength = 245; // maximale Zeichenanzahl für den angezeigten Text

  // Reaktive Zuweisung: Wird neu berechnet, wenn sich 'text' ändert
  $: shortenedText =
    text.length > maxLength
      ? text.slice(0, maxLength) + "..." // Text wird abgeschnitten und mit "..." ergänzt
      : text;
</script>

<div class="review-card">
  <div class="header-line">
    <div class="username">{username}</div>

    <div class="stars">
      {#each Array(rating) as _, i}
        <i class="fa-solid fa-star"></i>
        <!-- Gefüllter Stern (gelb) für jeden gegebenen Stern -->
      {/each}
      {#each Array(5 - rating) as _, i}
        <i class="fa-solid fa-star regular"></i>
        <!-- Leerer Stern (grau) für die restlichen nicht vergebenen Sterne -->
      {/each}
    </div>
  </div>

  <div class="title">{title}</div>
  <div class="text">{shortenedText}</div>
  <!-- Gekürzter oder vollständiger Text -->
</div>
