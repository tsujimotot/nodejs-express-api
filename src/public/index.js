window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".user").forEach((user) => {
    user.addEventListener("click", async (event) => {
      console.log(event.target.innerHTML);
    })
  })
})