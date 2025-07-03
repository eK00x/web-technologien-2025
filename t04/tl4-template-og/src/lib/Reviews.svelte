<script>
  import { reviews } from '../stores.js';
  import Card from './Card.svelte';
  import { onMount } from 'svelte';

  let entries = [];

  const unsubscribe = reviews.subscribe(value => {
    entries = value;
  });

  onMount(() => {
    return () => unsubscribe();
  });
</script>

<style>
  .reviews-wrapper {
    padding: 2rem;
  }

  .empty-message {
    margin-top: 2rem;
    font-style: italic;
    color: white;
    text-align: center;
  }

  /* Container für die Karten */
  .reviews-container {
    display: flex;
    gap: 4rem;  /* Abstand zwischen Cards */
    justify-content: center;
    flex-wrap: wrap;
  }

  /* Wenn nur eine Karte da ist, soll sie nicht zu schmal sein */
  .reviews-container.one > div {
    flex: 0 0 400px; /* feste Breite passend zur Card */
  }

  /* Wenn zwei Karten da sind, gleiche feste Breite */
  .reviews-container.two > div {
    flex: 0 0 400px;
  }

  /* Für mehr als 2 Karten - flexibler */
  .reviews-container.more > div {
    flex: 1 1 400px; /* mindestens 400px, flexibel */
    max-width: 400px;
  }
</style>

<div class="container reviews-wrapper">
  {#if entries.length === 0}
    <p class="empty-message">Noch keine Erfahrungsberichte vorhanden.</p>
  {:else}
    <div class="reviews-container 
      {entries.length === 1 ? 'one' : entries.length === 2 ? 'two' : 'more'}">
      {#each entries.slice().reverse() as item}
        <div>
          <Card {...item} />
        </div>
      {/each}
    </div>
  {/if}
</div>
