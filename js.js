//searchInput.value = "ASDASD";
"use strict";
let data = [];
window.onload = async function () {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9e51f5dc49mshdf69009e5ae6b29p157366jsn34eb8c0dd070",
      "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
    },
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
  //**********************************                                       Declaration
  const inputField = document.getElementById("search1");
  const picSection = document.getElementById("results");
  //const avatar = document.createElement("img");

  const dontInclude = ["dream"];
  const searchInput = () => {
    //clear section
    picSection.innerHTML = "";

    //comparing data for match
      let result =  formatArray(
        data.filter((element) =>
          element.toLowerCase().includes(inputField.value.toLowerCase())
        )
      );
    
    console.log(result);

    if (result != 0) {
      result.forEach((hero) => {
        if (!dontInclude.includes(hero)) {
          const avatar = document.createElement("img");
          avatar.src = `pics/${hero}.png`;
          avatar.height = "300";
          picSection.appendChild(avatar);
        }
      });
    }
  };

  const formatArray = (classes) => {
    const solution = [];
    classes.forEach((hero, index) => {
      solution[index] = hero.replace(" ", "").toLowerCase();
    });
    return solution;
  };
  inputField.addEventListener("keyup", searchInput);
};
