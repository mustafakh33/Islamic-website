/* =================================================
******************** Haeder ************************
================================================== */
let fixedNav = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (this.window.scrollY > 100) {
    fixedNav.classList.add("active");
  } else {
    fixedNav.classList.remove("active");
  }
});
/* =================================================
***************** Exploe button *******************
================================================== */
let exploreBtn = document.querySelector(".title .btn");
let HadithSection = document.querySelector(".hadith");
exploreBtn.addEventListener("click", () => {
  HadithSection.scrollIntoView({
    behavior: "smooth",
  });
});
/* =================================================
*************** button scroll top  *****************
================================================== */
let btn = document.querySelector(".scrollBtn");
window.addEventListener("scroll",()=>{
  if(window.scrollY > 100){
    btn.classList.add("active");
  } else{
    btn.classList.remove("active");
  }
})
btn.addEventListener("click",()=>{
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})
/* =================================================
**************** active sideBar  *******************
================================================== */
let bars = document.querySelector('.bars');
console.log(bars);
let sideBar =document.querySelector('.header ul');
bars.addEventListener("click",()=>{
  sideBar.classList.toggle("active");
  console.log("hello");
})
/* =================================================
*************** Fetch Hadith Api *******************
================================================== */
let hadithContainer = document.querySelector(".hadithContainer");
let number = document.querySelector(".number");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let hadithIndex = 0;
const HadithChange = async function () {
  let response = await fetch(
    "https://api.hadith.gading.dev/books/muslim?range=1-300"
  );
  let data = await response.json();
  displayHadith(data.data.hadiths);
};
HadithChange();
/* =================================================
*************** Display Hadith  ********************
================================================== */
next.addEventListener("click", () => {
  if (hadithIndex == 300) {
    hadithIndex = 0;
  } else {
    hadithIndex++;
  }
  HadithChange();
});
prev.addEventListener("click", () => {
  if (hadithIndex == 0) {
    hadithIndex = 300;
  } else {
    hadithIndex--;
  }
  HadithChange();
});
function displayHadith(hadith) {
  hadithContainer.innerHTML = hadith[hadithIndex].arab;
  number.innerHTML = `300 - ${hadithIndex + 1}`;
}
/* =================================================
***************** Link Section  ********************
================================================== */
let sections = document.querySelectorAll("section");
let links = document.querySelectorAll("header ul li");
links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((link) => {
      link.classList.remove("active");
    });
    link.classList.add("active");
    let target = link.dataset.filter;
    console.log(target);
    sections.forEach((section) => {
      if (section.classList.contains(target)) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
/* =================================================
*************** Fetch Surah Api  *******************
================================================== */
let surahsContainer = document.querySelector(".surHasContainer");
const getSurahs = async function () {
  let response = await fetch("http://api.alquran.cloud/v1/meta");
  let data = await response.json();
  displaySurahs(data.data.surahs.references);
};
getSurahs();
/* =================================================
**************** Display Surahs  *******************
================================================== */
function displaySurahs(surah) {
  let boxs = "";
  for (let i = 0; i < surah.length; i++) {
    boxs += `
    <div class="surah">
          <p> ${surah[i].name} </p>
          <p> ${surah[i].englishName}</p>
        </div>
        `;
  }
  surahsContainer.innerHTML = boxs;
  /* pop up */
  let surahsTitels = document.querySelectorAll(".surah");
  let popup = document.querySelector(".surah-popup");
  let ayatContainer = document.querySelector(".ayat");
  // add class active and surah to popup
  surahsTitels.forEach((title, index) => {
    title.addEventListener("click", () => {
      fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
        .then((response) => response.json())
        .then((data) => {
          let ayat = data.data.ayahs;
          ayat.forEach((aya) => {
            popup.classList.add("active");
            ayatContainer.innerHTML += `
          <p>${aya.text}</p>
          `;
          });
        });
    });
  });
  // close btn
  let btnClose = document.querySelector(".surah-popup i");
  btnClose.addEventListener("click", () => {
    popup.classList.remove("active");
  });
}
/* =================================================
****************** prayTime API  *******************
================================================== */
let cards = document.querySelector(".cards");
const getPrayTimes = async function () {
  let response = await fetch(
    "https://api.aladhan.com/v1/timingsByCity/17-03-2024?city=Dubai&country=United+Arab+Emirates&method=8"
  );
  let data = await response.json();
  console.log(data.data.timings);
  displaypray(data.data.timings);
};
getPrayTimes();
/* =================================================
*************** Display prayTime  ******************
================================================== */
function displaypray(prays) {
  let boxs = "";

  for (let pray in prays) {
    boxs += `
    <div class="card">
    <div class="circle">
      <svg>
        <circle cx="100" cy="100" r="100"></circle>
      </svg>
      <div class="praytime">${prays[pray]}</div>
    </div>
    <p>${pray}</p>
  </div>
        `;
  }
  cards.innerHTML = boxs;
}
