//searchInput.value = "ASDASD";
"use strict";

let data = [];
window.onload = async function () {
  const options = {
    method: "GET",
    url: "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/classic",
    headers: {
      "x-rapidapi-key": "59489fd7femshd11da986701b4cep1b9b50jsn3ce72df24df4",
      "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
  };
  let rawDataClasses = [];
  await fetch(options.url, options)
    .then((res) => res.json())
    .then((json) => (rawDataClasses = json))
    .catch((err) => console.error("error:" + err));

  const filterCardsbyClass = (className, cards) => {
    const newSection = document.createElement("section");
    newSection.class = "allCardsByClass";
    document.body.appendChild(newSection);
    cards.forEach((element) => {
      if (element.playerClass == className && element.img) {
        console.log("I am here");
        const avatar = document.createElement("img");
        avatar.src = element?.img;
        newSection.appendChild(avatar);
      }
    });
  };

  data = await fetch(
    "https://omgvamp-hearthstone-v1.p.rapidapi.com/info",
    options
  )
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.error(err));

  //assigning array of classes to data
  data = data.classes;
  //**********************************           Declaration          **********************************
  const inputField = document.getElementById("search1");
  const picSection = document.getElementById("results");
  //   const avatar = document.createElement("img");
  const dontInclude = ["dream"];
  //**********************************          finish
  const searchInput = () => {
    //clear section
    picSection.innerHTML = "";

    //comparing data for match
    let result = formatArray(
      data.filter((element) =>
        element.toLowerCase().includes(inputField.value.toLowerCase())
      )
    );

    if (result != 0) {
      updateUI(result);
    }
  };

  const formatArray = (classes) => {
    const solution = [];
    classes.forEach((hero, index) => {
      solution[index] = hero.replace(" ", "").toLowerCase();
    });
    return solution;
  };
  updateUI(data);
  //********************************         SEARCH TRIGGER
  inputField.addEventListener("keyup", searchInput);

  function updateUI(data) {
    formatArray(data).forEach((hero) => {
      console.log(hero);
      if (!dontInclude.includes(hero)) {
        const avatar = document.createElement("img");

        avatar.src = `pics/${hero}.png`;
        avatar.height = "300";
        avatar.id = hero;   
        picSection.appendChild(avatar);
        avatar.addEventListener("click", () => {
          console.log(avatar.id);
          filterCardsbyClass("Druid", rawDataClasses);
        });
      }
    });
  }
};
