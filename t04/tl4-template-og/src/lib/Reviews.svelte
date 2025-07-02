<script>
  import { reviews } from '../stores.js'; // ggf. Pfad anpassen
  import Card from './Card.svelte';
  import { onMount } from 'svelte';

  let entries = [];

  // Store abonnieren
  const unsubscribe = reviews.subscribe(value => {
    entries = value;
  });

  onMount(() => {
    return () => unsubscribe();
  });
</script>

<style>
  .empty-message {
    margin-top: 2rem;
    font-style: italic;
    color: #666;
    text-align: center;
  }

  .reviews-wrapper {
    padding: 2rem;
  }
</style>

<div class="container reviews-wrapper">
  <div class="row">
    {#if entries.length === 0}
      <div class="col-12">
        <p class="empty-message">Noch keine Erfahrungsberichte vorhanden.</p>
      </div>
    {:else}
      {#each entries.slice().reverse() as item}
        <div class="col-md-6 mb-4 d-flex">
          <Card {...item} />
        </div>
      {/each}
    {/if}
  </div>
</div>
