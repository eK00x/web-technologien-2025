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
