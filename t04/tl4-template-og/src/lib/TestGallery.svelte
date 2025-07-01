<script>
    import { ratings } from "../stores";
  
    
  </script>
  
  <div>
    <div class="card m-4">
      <div>
        {#if $ratings.length > 0}
          <h3>
            {$ratings[0].title}
          </h3>
          <p>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-solid fa-star'></i>
            <i class='fa-regular fa-star'></i>
          </p>
          <p>
            {$ratings[0].description}
          <br>
          <br>
            {$ratings[0].user}
          </p>
        {:else}
          <h5>There is no rating in the store!</h5>
        {/if}
      </div>
    </div>
  </div>
  