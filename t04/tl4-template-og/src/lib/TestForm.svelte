<script>
    import { ratings } from "../stores";
  
    const rating = {
      ratingId: 1,
      stars: 4,
      title: "Meisterhaftes WebT-Modul",
      user: "Andi H.",
      description: "Der Lehrstuhl Medieninformatik ist unübertroffen! Das Modul WebT setzt Maßstäbe mit top aktuellen Inhalten und exzellenter Betreuung für die Webentwickler von morgen.",
    };
  
    const testWrite = () => {

        ratings.set([rating]);
        console.log(rating);
    };
  
    const testReset = () => {
        ratings.set([]);
    };
  </script>
  
  <button type="button" class="btn btn-primary" on:click={testWrite}
    >Write Test</button
  >
  
  <button type="button" class="btn btn-outline-primary" on:click={testReset}
    >Clear Test</button
  >
  