"use strict";

let activePage;
let menuArr = [];
////////////////////////////////
const closingOverlay2 = function () {
  // document.querySelector(".account").classList.add("account-close");
  // document.querySelector(".account").classList.remove("account-open");
  document.querySelector(".overlay2").classList.remove("open-overlay");

  document.querySelector(".account").style.width = "0";
  document.querySelector(".account").style.paddingRight = "0";
  document.querySelector(".account").style.paddingLeft = "0";
};
const openingOverlay = function () {
  document.querySelector(".overlay2").classList.add("open-overlay");
  // document.querySelector(".account").classList.remove("account-close");

  document.querySelector(".account").style.paddingRight = "40px";
  document.querySelector(".account").style.paddingLeft = "40px";
  document.querySelector(".account").style.width = "max-content";

  // document.querySelector(".account").classList.add("account-open");
};
/////////////////////////////////////
const checkSessionStorage = function () {
  sessionStorage.getItem("activePage") === null
    ? (activePage = [1, 0, 0, 0, 0])
    : (activePage = JSON.parse(sessionStorage.getItem("activePage")));
};

const updateActivePageInSession = function (activePageFn) {
  let c = sessionStorage.setItem("activePage", JSON.stringify(activePageFn));
  return c;
};

const checkActivePage = function () {
  let ctr;
  for (let i = 0; i < activePage.length; i++) {
    if (activePage[i] !== 1) {
      continue;
    } else {
      ctr = i;
      break;
    }
  }
  activePage[ctr] = 0;

  return ctr;
};
const changeActivePage = function () {
  const a = checkActivePage();
  document.querySelector(`.nav-btn-${a}`).classList.remove("active-btn");
  document.querySelector(`.page-${a}`).classList.add("hide");
};

const firstActivePage = function () {
  let ctr;
  for (let i = 0; i < activePage.length; i++) {
    if (activePage[i] !== 1) {
      continue;
    } else {
      ctr = i;
      break;
    }
  }
  document.querySelector(`.nav-btn-${ctr}`).classList.add("active-btn");
  document.querySelector(`.page-${ctr}`).classList.remove("hide");
};

//constructore function for menu order
const constructorMenuOrder = function (name, time, location) {
  this.name = name;
  this.time = time;
  this.location = location;
};
const checkLogin = function () {
  if (localStorage.getItem("userLogin") === null) {
    document.querySelector(".login-btn").classList.remove("hide");
  } else {
    document.querySelector(".acc-btn").classList.remove("hide");
    document.querySelector(".acc-name").textContent = JSON.parse(
      localStorage.getItem("userLogin")
    )[0];
    document.querySelector(".acc-email").textContent = JSON.parse(
      localStorage.getItem("userLogin")
    )[1];
  }
};
//funciton to construct objects for every menuorder
const constructMenuObject = function () {
  const noMenuOrder = document.querySelector(".menu-grid-main").children;
  for (let i = 0; i < noMenuOrder.length; i++) {
    let a = document.querySelector(".menu-grid-main").children[i].children[1];
    menuArr.push(
      new constructorMenuOrder(
        a.children[0].textContent.trim(),
        a.children[1].textContent.trim(),
        a.children[2].textContent.trim()
      )
    );
  }
};
////////////////
checkLogin();
constructMenuObject(); //construct an onject for all the items on the menu
checkSessionStorage(); // checks if the user has just came of was already using the site and jst reloaded the page and sets the activePage
firstActivePage(); //checks the activePage
//functions of all the buttons on the nav bar
console.log(menuArr);
document.querySelector(".header-logo").addEventListener("click", function () {
  changeActivePage();
  activePage[0] = 1;
  updateActivePageInSession(activePage);
  document.querySelector(".nav-btn-0").classList.add("active-btn");
  document.querySelector(".page-0").classList.remove("hide");
});

document
  .querySelector(".header-button-main")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("button-header")) {
      const a = e.target.classList[1].at(-1);
      changeActivePage();
      activePage[a] = 1;
      updateActivePageInSession(activePage);
      document.querySelector(`.nav-btn-${a}`).classList.add("active-btn");
      document.querySelector(`.page-${a}`).classList.remove("hide");
    } else if (e.target.classList.contains("login-btn")) {
      document.querySelector("#login-page").classList.remove("hide");
    }
  });
document.querySelector("#login-page").addEventListener("click", function (e) {
  if (
    e.target.classList.contains("overlay") ||
    e.target.classList.contains("close-login-img")
  )
    document.querySelector("#login-page").classList.add("hide");
});

document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  const userArr = [
    document.querySelector(".login-name").value,
    document.querySelector(".login-email").value,
    document.querySelector(".login-password").value,
  ];
  localStorage.setItem("userLogin", JSON.stringify(userArr));
  document.querySelector(".acc-name").textContent = userArr[0];
  document.querySelector(".acc-email").textContent = userArr[1];
  document.querySelector("#login-page").classList.add("hide");
  document.querySelector(".login-btn").classList.add("hide");
  document.querySelector(".acc-btn").classList.remove("hide");
  document.querySelector(".logged-in-popup").classList.add("open-popup");
});
document.querySelector(".pfp").addEventListener("click", function () {
  openingOverlay();
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    if (!document.querySelector("#overlay3").classList.contains("hide")) {
      document.querySelector("#overlay3").classList.add("hide");
      return;
    }
    if (!document.querySelector("#login-page").classList.contains("hide")) {
      document.querySelector("#login-page").classList.add("hide");
      return;
    }
    if (!document.querySelector(".overlay2").classList.contains("hide")) {
      closingOverlay2();
      return;
    }

    closingOverlay2();
  }
});
document.querySelector(".cancel-btn").addEventListener("click", function () {
  document.querySelector("#overlay3").classList.add("hide");
});
document.querySelector(".overlay2").addEventListener("click", function (e) {
  if (e.target.classList.contains("overlay2")) {
    closingOverlay2();
  }
});
document.querySelector(".popup-btn").addEventListener("click", function () {
  document.querySelector(".logged-in-popup").classList.add("close-popup");
  document.querySelector(".logged-in-popup").classList.remove("open-popup");
});
document.addEventListener("click", function () {
  if (
    document.querySelector(".logged-in-popup").classList.contains("open-popup")
  ) {
    document.querySelector(".logged-in-popup").classList.add("close-popup");
    document.querySelector(".logged-in-popup").classList.remove("open-popup");
  }
});

document.querySelector(".continue-btn").addEventListener("click", function () {
  localStorage.removeItem("userLogin");
  location.reload();
});
document.querySelector(".logout-btn").addEventListener("click", function () {
  document.querySelector("#overlay3").classList.remove("hide");
});
