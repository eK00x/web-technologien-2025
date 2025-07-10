<script>
  import { reviews } from '../stores.js';     // Import des Review-Stores
  import Card from './Card.svelte';          // Komponente zur Darstellung einzelner Reviews
  import { onMount } from 'svelte';          // Lifecycle-Funktion, fügt neues review auf Seite hinzu (mountet)

  let entries = [];                          // Lokale Kopie der Reviews

  // Abonniert den Store und speichert die Daten in 'entries'
  const unsubscribe = reviews.subscribe(value => {
    entries = value;
  });

  // Beim Mounten: Unsubscribe ausführen, wenn die Komponente zerstört wird
  // Wichtig um Speicherlecks zu verhindern/ vorzubeugen
  onMount(() => {
    return () => unsubscribe();
  });
</script>

<div class="container reviews-wrapper">
  {#if entries.length === 0}
    <!-- Nachricht, wenn keine Einträge vorhanden sind -->
    <p class="empty-message">Noch keine Erfahrungsberichte vorhanden.</p>
  {:else}
    <!-- Dynamische Klasse je nach Anzahl der Einträge (für CSS-Layout) -->
    <div class="reviews-container
      {entries.length === 1 ? 'one' : entries.length === 2 ? 'two' : 'more'}">

      {#each entries.slice().reverse() as item}
        <!-- Aktuellsten Beitrag zuerst anzeigen -->
        <div>
          <Card {...item} /> <!-- Review-Daten an Card-Komponente übergeben -->
        </div>
      {/each}
    </div>
  {/if}
</div>
