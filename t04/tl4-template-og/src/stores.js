import { writable } from "svelte/store";

// 1. Beim Laden erst mal prüfen, ob Daten im localStorage sind
const storedReviews = localStorage.getItem("reviews");

// 2. Falls ja, diese laden; sonst leeres Array
const initialReviews = storedReviews ? JSON.parse(storedReviews) : [];

// 3. Store mit initialen Daten füllen
export const reviews = writable(initialReviews);

// 4. Änderungen am Store automatisch im localStorage speichern
reviews.subscribe((value) => {
    localStorage.setItem("reviews", JSON.stringify(value));
});
