//태그를 가져오는 방법
// const timeElement = document.getElementById("time");
//태그를 가져오는 다른 방법
const timeElement = document.querySelector("h1");

function time() {
  if (timeElement.style.color === "orange") {
    timeElement.style.color = "tomato";
  } else {
    timeElement.style.color = "orange";
  }
  // timeElement.innerText = "블라블라";
}

function num() {
  timeElement.innerText = "12:00";
}

// timeElement.addEventListener("mouseover", time);
// window.addEventListener('resize', time);

document.title = "반갑습니다~";

function setTime() {
  const time = new Date();
  const 시 = time.getHours().toString();
  const 분 = time.getMinutes().toString();
  const timeText = document.querySelector("#time");
  timeText.innerText = `${시.padStart(2, "0")}:${분.padStart(2, "0")}`;
}

setInterval(setTime, 1000);

// setInterval(sayHello, 1000);
// setTimeout(sayHello, 1000);

/*
const 시작_시간 = new Date();

function setTime() {
    const 현재_시간 = new Date();
    const 흐른_시간 = new Date(현재_시간 - 시작_시간);
    const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
    const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
    timeText.innerText = `${분}:${초}`;
    }

setInterval(setTime, 1000);
*/

// 화면 꾸며주기

const calcTime = (timestamp) => {
  // 한국시간
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour} 시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else return "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");

  data.reverse().forEach(async (obj) => {
    const itemListDiv = document.createElement("div");
    itemListDiv.className = "item-list";

    const itemListInfoImgDiv = document.createElement("div");
    itemListInfoImgDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/image/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const itemListInfoDiv = document.createElement("div");
    itemListInfoDiv.className = "item-list__info";

    const itemListInfoTitleDiv = document.createElement("div");
    itemListInfoTitleDiv.className = "item-list__info-title";
    itemListInfoTitleDiv.innerText = obj.title;

    const itemListInfoMetaDiv = document.createElement("div");
    itemListInfoMetaDiv.className = "item-list__info-meta";
    itemListInfoMetaDiv.innerText = obj.place + calcTime(obj.insertAt);

    const itemListInfoPriceDiv = document.createElement("div");
    itemListInfoPriceDiv.className = "item-list__info-price";
    itemListInfoPriceDiv.innerText = obj.price;

    itemListDiv.appendChild(itemListInfoImgDiv);
    itemListDiv.appendChild(itemListInfoDiv);
    itemListInfoImgDiv.appendChild(img);
    itemListInfoDiv.appendChild(itemListInfoTitleDiv);
    itemListInfoDiv.appendChild(itemListInfoPriceDiv);
    itemListInfoDiv.appendChild(itemListInfoMetaDiv);

    main.appendChild(itemListDiv);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
