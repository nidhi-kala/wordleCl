document.addEventListener("DOMContentLoaded", () => {
  createSquares();
  let game = {
    attempt: 0,
    letter: 0,
  };

  let allWords = [
    "rails",
    "class",
    "index",
    "react",
    "event",
    "views",
    "crime",
    "bring",
    "songs",
    "nidhi",
    "super",
    "homes",
    "final",
  ];
  let word_of_the_day = "nidhi";
  let answer = word_of_the_day.split("");
  let currentAttempt = [];

  /* when enter is pressed:
  1) check currentAttempt has required number of letters: 5;
  2) check currentAttempt word is one of the wordList
  3)check currentattempt against todays word: array to array comparison 
      a)for each letter in currentAttempt, check existance in word of the day array.
      b) if yes: turn yellow(different place) or green(same place) 
        if no: bg of keyboard and sqaure: dark gray
      c) if currentattempt === word of day, turn green
  */

  function checkAttempt() {
    if (currentAttempt.length != 5) {
      alert("must be 5 letters");
    }
    if (currentAttempt.join("") === word_of_the_day) {
      for (let i = 0; i < 5; i++) {
        let square = document.getElementById(game["attempt"] + "" + i);
        square.style = "background: green;";
      }
      alert("you win");
    }

    if (!allWords.includes(currentAttempt.join(""))) {
      alert("not a word");
      return;
    }

    for (let i = 0; i < 5; i++) {
      let square = document.getElementById(game["attempt"] + "" + i);
      let key = document.getElementById(currentAttempt[i]);
      if (currentAttempt[i] === answer[i]) {
        square.style = "background: green;";
        key.style = "background: green;";
      } else if (answer.includes(currentAttempt[i])) {
        square.style = "background: yellow;";
        key.style = "background: yellow; color:grey;";
      } else {
        square.style = "background: black; color:grey;";
        key.style = "background: black; color:grey;";
      }
    }
  }

  function deleteHandler(game) {
    let previousSquare = document.getElementById(
      game["attempt"] + "" + game["letter"]
    );
    if (game["letter"] == 4 && previousSquare.innerHTML != "") {
      previousSquare = document.getElementById(
        game["attempt"] + "" + game["letter"]
      );
    } else if (game["letter"] == 0) {
      return;
    } else {
      previousSquare = document.getElementById(
        game["attempt"] + "" + (game["letter"] - 1)
      );
      game["letter"] -= 1;
    }
    console.log("deleting", previousSquare.id);
    previousSquare.innerHTML = "";
  }

  const keys = document.querySelectorAll(".keyboard-row button");

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const key = target.getAttribute("id");

      let currentSquare = document.getElementById(
        game["attempt"] + "" + game["letter"]
      );

      if (key != "enter" && key != "del") {
        currentSquare.innerHTML = key.toUpperCase();
        currentAttempt.push(key);
      }
      if (key == "del") {
        deleteHandler(game);

        currentAttempt.pop();
        return;
      }
      // Progress conditions
      // 1: if all letters of current attempt are clicked then enter will start next attempt

      // Game conditions
      // 1: last letter of an attempt is entered
      // 2: any letter of ongoing attempt is made
      // 3: all attempts are over.
      if (game["letter"] == 4) {
        if (key == "enter") {
          checkAttempt();
          game["attempt"] += 1;
          game["letter"] = 0;
          currentAttempt = [];
        }
      } else {
        if (key == "enter") {
          return;
        }
        game["letter"] += 1;
      }
    };
  }
  function createSquares() {
    const gameBoard = document.getElementById("board");
    for (let attempt = 0; attempt < 6; attempt++) {
      for (let letter = 0; letter < 5; letter++) {
        let square = document.createElement("div");
        square.classList.add("square");

        let id = attempt + "" + letter;
        square.setAttribute("id", id);
        gameBoard.appendChild(square);
      }
    }
  }
});
