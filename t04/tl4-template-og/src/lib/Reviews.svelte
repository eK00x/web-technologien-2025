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
    flex-wrap: wrap;
    gap: 1rem; /* Abstand zwischen Cards */
    justify-content: center; /* Standard: zentriert */
  }

  /* Wenn genau 2 Einträge: je 50% Breite */
  .reviews-container.two > div {
    flex: 0 0 48%; /* knapp 50%, mit etwas Abstand */
    max-width: 48%;
  }

  /* Wenn nur 1 Eintrag: Karte wird max. 75% breit und zentriert */
  .reviews-container.one > div {
    flex: 0 0 75%;
    max-width: 75%;
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
