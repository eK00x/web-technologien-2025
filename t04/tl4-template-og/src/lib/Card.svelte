<script>
  export let username;
  export let rating;
  export let title;
  export let text;
</script>

<style>
  .review-card {
    width: 100%;               /* volle Spaltenbreite */
    min-height: 200px;
    background-color: #fdfdfd;
    padding: 1.5rem;
  
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: transform 0.2s ease;
    text-align: left;
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
    color: black;
    font-weight: 600;
  }

  .stars {
    font-size: 1.2rem;
    white-space: nowrap;
    display: flex;
    gap: 2px;
  }

  .stars i {
    color: gold;
  }

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
    color: black;
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
        <i class="fa-regular fa-star regular"></i>
      {/each}
    </div>
  </div>

  <div class="title">{title}</div>
  <div class="text">{text}</div>
</div>
