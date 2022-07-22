
const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector(".exchange"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
  
  for (const country_code in countries){
    let selected;
    if(id == 0 && country_code == "en-GB") {
      selected = "selected";
    } else if (id == 1 && country_code == "ru-RU"){
      selected = "selected";
    }

    let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    // добавление тега option внутри тега select
    tag.insertAdjacentHTML("beforeend", option);
  }
});

// замена текстовой области и выбор значения тега 
exchangeIcon.addEventListener("click", () => {
  let tempText = fromText.value,
  tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
})

translateBtn.addEventListener("click", () => {
  let text = fromText.value;
  translateForm = selectTag[0].value,
  translateTo = selectTag[1].value;
  if(!text) return;
  toText.setAttribute("placeholder", "Translating...");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateForm}|${translateTo}`;
  fetch(apiUrl).then(res => res.json()).then(data => {
    toText.value = data.responseData.translatedText;
    toText.setAttribute("placeholder", "Translation");
  })
});

// озвучка перевода

icons.forEach(icon => {
  icon.addEventListener("click", ({ target }) => {
    if (!fromText.value || !toText.value) return;
    if (target.classList.contains("fa-copy")) {
      target.id == "from" ? navigator.clipboard.writeText(fromText.value) : navigator.clipboard.writeText(toText.value);
    } else {
      let utterance;
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value)
        utterance.lang = selectTag[0].value;
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value)
        utterance.lang = selectTag[1].value;
      }
      speechSynthesis.speak(utterance);
    }
  });
});