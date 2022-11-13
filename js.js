"use strict";
//Declaration of variable for recieving data from fetch
let data = [];
let rawDataCards = [];
let filteredCards = [];
let cardsData = [];
let cardsName = [];
let cardsURL = [];
window.onload = async function () {
  const options = {
    method: "GET",
    urlCards:
      "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/classic",
    urlClasses: "https://omgvamp-hearthstone-v1.p.rapidapi.com/info",
    headers: {
      "x-rapidapi-key": "59489fd7femshd11da986701b4cep1b9b50jsn3ce72df24df4",
      "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };
  //***********************************      fetch All Cards    ******************************************
  await fetch(options.urlCards, options)
    .then((res) => res.json())
    .then((json) => (rawDataCards = json))
    .catch((err) => console.error("error:" + err));
  //***********************************      fetch All Classes    ******************************************
  await fetch(options.urlClasses, options)
    .then((response) => response.json())
    .then((response) => (data = response))
    .catch((err) => console.error(err));
  //******************************************************************************************************
  //assigning array of classes to data
  console.log(data);
  let classes = data.classes;
  //********************************************************************************
  // ********************************** FUNCTIONS **********************************
  //********************************************************************************

  // FILTER. recieves class name and all cards and filter all cards by class name and output it to the HTML
  const filterCardsbyClass = (className, cards) => {
    const backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    backBtn.id = "backBtn";
    resultSearch.appendChild(backBtn);

    cards.forEach((element) => {
      if (element.playerClass == className && element.img) {
        const avatar = document.createElement("img");
        avatar.src = element?.img;
        //store card names for future search
        filteredCards.push(element);
        resultSearch.appendChild(avatar);
      }
    });
    return filteredCards;
  };
  // **********************************    SEARCH INPUT    **********************************
  // SEARCH. user's input is compared with classes and if match it specific icon/s is/are shown to user
  const searchInput = (classes) => {
    //clear section
    resultSearch.innerHTML = "";

    //comparing data for match
    let result = formatArray(
      classes.filter((element) =>
        element.toLowerCase().includes(searchField.value.toLowerCase())
      )
    );

    if (result != 0) {
      updateUI(result);
    }
  };
  // **********************************    FORMAT ARRAY    **********************************
  //FORMAT. take classes array and format it to my needs.
  const formatArray = (classes) => {
    const solution = [];
    classes.forEach((hero, index) => {
      solution[index] = hero.replace(" ", "").toLowerCase();
    });
    return solution;
  };
  // **********************************    SET PICTURES    **********************************
  //just something extra, to improve readability
  function setPictures(classes, picEl, height = 90) {
    picEl.src = `pics/${classes}.png`;
    picEl.height = height;
    picEl.id = classes;
  }
  // **********************************    UPDATE UI     **********************************
  //recieves data and show all pictures
  function updateUI(classes) {
    formatArray(classes).forEach((hero, index) => {
      if (!dontInclude.includes(hero)) {
        const avatar = document.createElement("img");
        if (classes != filteredCards) setPictures(hero, avatar, 180);

        let selectedClassName = avatar.id[0].toUpperCase() + avatar.id.slice(1);
        resultSearch.appendChild(avatar);

        avatar.addEventListener("click", () => {
          resultSearch.innerHTML = "";
          cardsData = filterCardsbyClass(selectedClassName, rawDataCards);
          cardsData.forEach((card) => {
            cardsName.push(card.name);
            cardsURL.push(card.img);
          });
        });
      }
    });
  }
  function updateNav(classes) {
    formatArray(classes).forEach((hero) => {
      if (!dontInclude.includes(hero)) {
        const avatar = document.createElement("img");
        avatar.className = "cardsByClass";
        setPictures(hero, avatar);
        let selectedClassName = avatar.id[0].toUpperCase() + avatar.id.slice(1);
        classSection.appendChild(avatar);

        avatar.addEventListener("click", () => {
          resultSearch.innerHTML = "";
          cardsData = filterCardsbyClass(selectedClassName, rawDataCards);
        });
      }
    });
  }

  //**********************************           Declaration          **********************************
  const searchField = document.getElementById("searchCard");
  const classSection = document.getElementById("classesList");
  const resultSearch = document.getElementById("results");
  const dontInclude = [
    "dream",
    "neutral",
    "whizbang",
    "deathknight",
    "demonhunter",
  ];

  updateNav(classes);

  //********************************            SEARCH TRIGGER             **********************************
  searchField.addEventListener("keyup", function () {
    searchInput(classes);
  });
};
