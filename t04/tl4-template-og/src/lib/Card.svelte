<script>
  export let username;
  export let rating;
  export let title;
  export let text;
</script>

<style>
  .review-card {
    width: 100%;
    min-height: 200px;
    background-color: #fdfdfd;
    padding: 1.5rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: transform 0.2s ease;
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
    font-size: 0.9rem;
    color: #666;
  }

  .stars {
    font-size: 1.3rem;
    white-space: nowrap;
  }

  .title {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
  }

  .text {
    font-size: 0.95rem;
    color: #333;
  }
</style>

<div class="review-card">
  <div class="header-line">
    <div class="username">{username}</div>
    <div class="stars">
      {#each Array(rating) as _, i}
        <span style="color: gold;">★</span>
      {/each}
      {#each Array(5 - rating) as _, i}
        <span style="color: lightgray;">★</span>
      {/each}
    </div>
  </div>

  <div class="title">{title}</div>
  <div class="text">{text}</div>
</div>
