const romanticEle = document.getElementById('romantic');

const romanticMessage = [
  ["I never believed in fate,", "until I met you."],
  ["Every moment with you", "feels like destiny."],
  ["Your smile is warmth,", "your embrace is home."],
  ["No matter where,", "I'll find you."]
]
const finish = "I love you, three thousand";
let index = 3;
const randomRomanticMessage = romanticMessage[index];
romanticEle.innerHTML = randomRomanticMessage.map((line) => `<tspan fill="#501323" x="55%" dy="1.2em">${line}</tspan>`).join('');



// Onclick everywhere
let interval = setInterval(() => {
  if (index === romanticMessage.length - 1) {
    index = 0;
  } else {
    index++;
  }
  const randomRomanticMessage = romanticMessage[index];
  romanticEle.innerHTML = randomRomanticMessage.map((line) => `<tspan fill="#501323" x="55%" dy="1.2em">${line}</tspan>`).join('');
}, 3000)
document.getElementById("container").addEventListener('click', () => {
  if (interval) {
    clearInterval(interval)
    interval = null
    index = 0
  }
  if (index === romanticMessage.length - 1) {
    romanticEle.innerHTML = `
<tspan fill="#501323" x="55%" dy="1.7em">${finish}</tspan>
<tspan class="heart" fill="#501323" x="55%" dy="1.2em">❤️</tspan>
`;
    displayOverlay();
  } else {
    if (index === romanticMessage.length - 1) {
      index = 0;
    } else {
      index++;
    }
    const randomRomanticMessage = romanticMessage[index];
    romanticEle.innerHTML = randomRomanticMessage.map((line) => `<tspan fill="#501323" x="55%" dy="1.2em">${line}</tspan>`).join('');
  }
});
const displayOverlay = () => {
  const overlayElement = document.createElement('div');
  overlayElement.setAttribute('id', 'overlay');
  overlayElement.classList.add('overlay');
  overlayElement.innerHTML = letterCover();
  document.body.appendChild(overlayElement);
  setTimeout(() => {
    document.getElementById("letter-cover").addEventListener('click', () => {
      document.getElementById("overlay").remove();
      document.getElementById("container").remove();
      document.body.innerHTML += page2;
      document.getElementById("page-2")
        .appendChild(letterContainer);
      setTimeout(() => {
        typewriter()
      }, 1000)
    });
  })
}

const letterCover = () => {
  return `
  <img id="letter-cover" class="letter-cover" src="statics/images/letter-cover.gif"/>
  `
}

// sweet pink color 


const page2 = `
<div id="page-2" style="background-color: #ffd5d0; width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 1000;">
</div>
`

const letterContainer = document.createElement('div');
letterContainer.setAttribute('id', 'letter-container');
letterContainer.classList.add('letter-container');

const letter = document.createElement('div');
letter.setAttribute('id', 'letter');
letter.classList.add('letter');

const sweetLetter = document.createElement("img")
sweetLetter.src = "statics/images/page2/sw-letter.png";
sweetLetter.classList.add("sweet-letter");

const leftFlower = document.createElement("img")
leftFlower.src = "statics/images/page2/flower.png";
leftFlower.classList.add("flower");
leftFlower.classList.add("left-flower");

const rightFlower = document.createElement("img")
rightFlower.src = "statics/images/page2/flower.png";
rightFlower.classList.add("flower");
rightFlower.classList.add("right-flower");

letterContainer.appendChild(letter);
letterContainer.appendChild(sweetLetter);
letterContainer.appendChild(leftFlower);
letterContainer.appendChild(rightFlower);

letter.style = `
font-family: 'Caveat', cursive;
padding: 15px 25px;
box-sizing: border-box;
color: #d84a3c;
font-size: 28px
`

const contents = [
  {
    content: "To my love,",
    class: "caveat-bold",
    style: "",
    tag: "p"
  },
  {
    content: "Happy Valentine’s Day! ❤️",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 20px",
    tag: "p"
  },
  {
    content: "Thank you for coming into my life.",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 10px",
    tag: "p"
  },
  {
    content: "I wish for us to be together always",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 5px",
    tag: "p"
  },
  {
    content: "and see your beautiful smile every day.",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 5px",
    tag: "p"
  },
  {
    content: "You are my greatest treasure.",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 5px",
    tag: "p"
  },
  {
    content: "Your greatest boyfriend,",
    class: "caveat-bold",
    style: "margin-top: 20px",
    tag: "p"
  }

]


letter.innerHTML += `
<div id="typedtext" style="margin-top: 20px;">
</div>
`


// set up text to print, each item in array is new line
var aText = contents.map(item => item.content);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this position
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
  sContents = ' ';
  iRow = Math.max(0, iIndex - iScrollAt);
  var destination = document.getElementById("typedtext");

  while (iRow < iIndex) {
    sContents += `<${contents[iRow].tag} class="${contents[iRow].class}" style="${contents[iRow].style}">${aText[iRow++]}</${contents[iRow].tag}>`;
  }
  destination.innerHTML = sContents + `<${contents[iIndex].tag} class="${contents[iIndex].class}" style="${contents[iIndex].style}">${aText[iIndex].substring(0, iTextPos)}_</${contents[iIndex].tag}>`;
  if (iTextPos++ == iArrLength) {
    iTextPos = 0;
    iIndex++;
    if (iIndex != aText.length) {
      iArrLength = aText[iIndex].length;
      setTimeout(typewriter, 500);
    }
  } else {
    setTimeout(typewriter, iSpeed);
  }
}



window.onload = function () {
  const today = new Date();
  const valentineDay = new Date(today.getFullYear(), 1, 14);
  const container = document.getElementById('container');
  if (today.getTime() < valentineDay.getTime()) {
    newContainer()
    container.style.display = 'none';
  } else {
    container.style.display = 'none';
    newContainer()
    const newContainer1 = document.getElementById('new-container');
    newContainer1.style.transition = 'opacity 1s ease';
    newContainer1.style.opacity = '1';
    setTimeout(() => {
      newContainer1.style.opacity = '0';
      setTimeout(() => {
        newContainer1.style.display = 'none';
        container.style.display = 'flex';
      }, 900);
    }, 1000);
  }
}

const newContainer = () => {
  const newContainer = document.createElement('div');
  newContainer.setAttribute('id', 'new-container');
  newContainer.classList.add('new-container');
  const newHeart = document.createElement('div');
  newHeart.classList.add('new-heart');
  // Remove container and add new heart
  newContainer.style = `
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #0b1522;`
  document.body.appendChild(newHeart);
  //  And add the valentine day countdown
  // const valentineCountdown = document.createElement('div');
  // valentineCountdown.classList.add('valentine-countdown');
  // valentineCountdown.innerHTML = `
  //   <div class="valentine-countdown-text">
  //     <p>Today is not Valentine's Day</p>
  //     <p>But every day is a day to love you</p>
  //   </div>
  //   `
  newContainer.appendChild(newHeart);
  // newContainer.appendChild(valentineCountdown);
  document.body.appendChild(newContainer);
}
