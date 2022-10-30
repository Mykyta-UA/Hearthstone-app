//searchInput.value = "ASDASD";
"use strict";
//Declaration of variable for recieving data from fetch
let data = [];
let rawDataCards = [];

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
  data = data.classes;

  //********************************************************************************
  // ********************************** FUNCTIONS **********************************
  //********************************************************************************

  // FILTER. recieves class name and all cards and filter all cards by class name and output it to the HTML
  const filterCardsbyClass = (className, cards) => {
    const newSection = document.createElement("section");
    newSection.class = "allCardsByClass";
    document.body.appendChild(newSection);
    cards.forEach((element) => {
      if (element.playerClass == className && element.img) {
        const avatar = document.createElement("img");
        avatar.src = element?.img;
        newSection.className = "cards";
        newSection.appendChild(avatar);
      }
    });
  };
  // **********************************    SEARCH INPUT    **********************************
  // SEARCH. user's input is compared with classes and if match it specific icon/s is/are shown to user
  const searchInput = () => {
    //clear section
    resultSearch.innerHTML = "";

    //comparing data for match
    let result = formatArray(
      data.filter((element) =>
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
  function setPictures(data, picEl) {
    picEl.src = `pics/${data}.png`;
    picEl.height = "90";
    picEl.id = data;
  }
  // **********************************    UPDATE UI     **********************************
  //recieves data and show all pictures
  function updateUI(data) {
    formatArray(data).forEach((hero) => {
      if (!dontInclude.includes(hero)) {
        const avatar = document.createElement("img");
        setPictures(hero, avatar);
        let selectedClassName = avatar.id[0].toUpperCase() + avatar.id.slice(1);
        resultSearch.appendChild(avatar);

        avatar.addEventListener("click", () => {
          resultSearch.innerHTML = "";
          filterCardsbyClass(selectedClassName, rawDataCards);
        });
      }
    });
  }
  function updateNav(data) {
    formatArray(data).forEach((hero) => {
      if (!dontInclude.includes(hero)) {
        const avatar = document.createElement("img");
        setPictures(hero, avatar);
        let selectedClassName = avatar.id[0].toUpperCase() + avatar.id.slice(1);
        classSection.appendChild(avatar);

        avatar.addEventListener("click", () => {
          resultSearch.innerHTML = "";
          filterCardsbyClass(selectedClassName, rawDataCards);
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

  updateNav(data);

  //********************************            SEARCH TRIGGER             **********************************
  searchField.addEventListener("keyup", searchInput);
};
