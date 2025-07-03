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
    color: #666;
    text-align: center;
  }

  /* Container für die Karten */
  .reviews-container {
    display: flex;
    flex: 0 0 400px; /* Kein Wachstum, kein Schrumpfen, feste Breite */
    max-width: 100%; /* Sicherheit: nicht über Container hinaus */
    /* flex-wrap: wrap; */
    gap: 4rem;  /* Abstand zwischen Cards */
    justify-content: center; /* Standard: zentriert */
  }

.reviews-container.two > div {
    flex: 0 0 400px;
  }
  
</style>

<div class="container reviews-wrapper">
  {#if entries.length === 0}
    <p class="empty-message">Noch keine Erfahrungsberichte vorhanden.</p>
  {:else}
    <div class="reviews-container {entries.length === 2 ? 'two' : entries.length === 1 ? 'one' : ''}">
      {#each entries.slice().reverse() as item}
        <div>
          <Card {...item} />
        </div>
      {/each}
    </div>
  {/if}
</div>
