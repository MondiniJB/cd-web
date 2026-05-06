const cards = document.querySelectorAll(".card");
const modal = document.querySelector(".modal");
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".close");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const id = card.dataset.id;
    modalText.innerText = `Contenido dinámico del item ${id}`;
    modal.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
