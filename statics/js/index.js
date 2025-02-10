


const romanticEle = document.getElementById('romantic');

const romanticMessage = [
  ["I never believed in fate,", "until I met you."],
  ["Every moment with you", "feels like destiny."],
  ["Your smile is warmth,", "your embrace is home."],
  ["No matter where,", "I'll find you."]
]
const finish = "I love you, three thousand";
let index = 0;
const randomRomanticMessage = romanticMessage[index];
romanticEle.innerHTML = randomRomanticMessage.map((line) => `<tspan fill="#501323" x="55%" dy="1.2em">${line}</tspan>`).join('');
// Also add the heart emoji


// Onclick everywhere
document.addEventListener('click', () => {
  if (index === romanticMessage.length - 1) {
    romanticEle.innerHTML = `
<tspan fill="#501323" x="55%" dy="1.7em">${finish}</tspan>
<tspan class="heart" fill="#501323" x="55%" dy="1.2em">❤️</tspan>
`;
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
// setInterval(() => {
//   const randomRomanticMessage = romanticMessage[index];
//   romanticEle.innerHTML = randomRomanticMessage.map((line) => `<tspan fill="#501323" x="55%" dy="1.2em">${line}</tspan>`).join('');
//   if (index === romanticMessage.length - 1) {
//     index = 0;
//   } else {
//     index++;
//   }
// }, 3000);

// Change after 3 seconds
