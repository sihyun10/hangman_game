function getRandomWords() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  const { word } = wordList.splice(randomIndex, 1)[0];
  return word;
}

function displayRandomWords() {
  const randomWordsContainer = document.querySelector(".random-words");

  const randomWords = [];
  while (randomWords.length < 3) {
      const word = getRandomWords();
      if (!randomWords.includes(word)) {
          randomWords.push(word);
      }
  }
  randomWordsContainer.innerHTML = '';
  randomWords.forEach((word) => {
      const wordElement = document.createElement("div");
      wordElement.classList.add("random-word");
      wordElement.textContent = word;
      randomWordsContainer.appendChild(wordElement);

      wordElement.addEventListener('click', () => startGame(word));
  });
}

function startGame(selectedWord) {
  const selectBox = document.querySelector(".select-box");
  selectBox.style.display = 'none';
  // console.log(selectedWord);
}

displayRandomWords();