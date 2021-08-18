const userName = 'Ivan';

console.log(userName);

// When selecting for example a button, it still doesn't exist
// and an exclamation at the end will tell TS to forget ignore it
const button = document.querySelector("button")!;

button.addEventListener("click", () => {
    console.log("Clicked!");
})