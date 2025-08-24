const styles = [
  { name: "Rikka", description: "Formal and majestic, symbolizing the cosmos through tall, upright arrangements." },
  { name: "Nageire", description: "Spontaneous and natural, often placed in tall vases with flowing lines." },
  { name: "Moribana", description: "Modern and horizontal, using shallow containers to emphasize seasonal beauty." },
  { name: "Shōka", description: "Minimalist and spiritual, built around three main elements: heaven, earth, and man." },
  { name: "Free Style", description: "Contemporary and expressive, allowing creative freedom beyond traditional rules." }
];

let cards = [];
let flippedCards = [];
let matchedPairs = 0;

function createCards() {
  cards = [];

  styles.forEach(style => {
    cards.push({ type: "name", content: style.name, match: style.name });
    cards.push({ type: "description", content: style.description, match: style.name });
  });

  cards = cards.sort(() => Math.random() - 0.5);
}

function renderBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.index = index;

    cardElement.addEventListener("click", () => flipCard(index, cardElement));

    board.appendChild(cardElement);
  });
}

function flipCard(index, element) {
  if (flippedCards.length === 2 || element.classList.contains("flipped")) return;

  const card = cards[index];
  element.classList.add("flipped");
  element.textContent = card.content;

  flippedCards.push({ index, card, element });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [first, second] = flippedCards;

  if (first.card.match === second.card.match) {
    matchedPairs++;
    flippedCards = [];

    if (matchedPairs === styles.length) {
      setTimeout(() => alert("You matched all styles! 🌸"), 500);
    }
  } else {
    setTimeout(() => {
      first.element.classList.remove("flipped");
      second.element.classList.remove("flipped");
      first.element.textContent = "";
      second.element.textContent = "";
      flippedCards = [];
    }, 1000);
  }
}

function resetGame() {
  matchedPairs = 0;
  flippedCards = [];
  createCards();
  renderBoard();
}

resetGame();
