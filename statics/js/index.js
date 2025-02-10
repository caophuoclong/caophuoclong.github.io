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
padding: 20px 40px;
box-sizing: border-box;
color: #d84a3c;
font-size: 30px
`

const contents = [
  {
    content: "to",
    class: "caveat-bold",
    style: "",
    tag: "p"
  },
  {
    content: "the love of my life, Minh Anh",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 10px",
    tag: "p"
  },
  {
    content: "Happy Valentine’s Day!",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 20px",
    tag: "p"
  },
  {
    content: "Every moment with you",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 5px",
    tag: "p"
  },
  {
    content: "is a dream come true,",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 5px",
    tag: "p"
  },
  {
    content: "and I cherish you",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 5px",
    tag: "p"
  },
  {
    content: "more than words can say.",
    class: "caveat-regular sentence-border-bottom",
    style: "margin-top: 5px",
    tag: "p"
  },
  {
    content: "Your love, Long",
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
  // Check current date is Valentine's day
  const today = new Date();
  const valentineDay = new Date(today.getFullYear(), 1, 14);
  // If today is not valentine day, create a new div with class new-heart and display it overall
  if (today.getTime() !== valentineDay.getTime()) {
    const newHeart = document.createElement('div');
    newHeart.classList.add('new-heart');
    // Remove container and add new heart
    document.getElementById("container").remove();
    document.body.style = `
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0b1522;`
    document.body.appendChild(newHeart);
    //  And add the valentine day countdown
    const valentineCountdown = document.createElement('div');
    valentineCountdown.classList.add('valentine-countdown');
    valentineCountdown.innerHTML = `
    <div class="valentine-countdown-text">
      <p>Today is not Valentine's Day</p>
      <p>But every day is a day to love you</p>
    </div>
    `
    document.body.appendChild(valentineCountdown);
  }
}
