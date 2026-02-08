
import fs from 'fs';

function random(max) {
    return Math.floor(Math.random() * max);
}

function generateBoxShadow(n) {
    let value = '';
    for (let i = 0; i < n; i++) {
        value += `${random(2000)}px ${random(2000)}px #FFF`;
        if (i < n - 1) {
            value += ', ';
        }
    }
    return value;
}

const starsTiny = generateBoxShadow(1000);
const starsSmall = generateBoxShadow(700);

const cssContent = `
/* Starry Background with Parallax Depth */
.starry-background {
    height: 100vh;
    width: 100%;
    background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
}

/* Layer 1: Tiny, Far, Blurred, Moves Up-Right */
#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${starsTiny};
  animation: animStarFar 200s linear infinite;
  opacity: 0.8;
  filter: blur(1px); /* Slight blur for depth */
}

#stars:after {
  content: " ";
  position: absolute;
  top: 2000px;
  left: -2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: ${starsTiny};
}

/* Layer 2: Small, Near, Sharp, Moves Down-Left */
#stars2 {
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${starsSmall};
  animation: animStarNear 150s linear infinite;
  opacity: 1;
}

#stars2:after {
  content: " ";
  position: absolute;
  top: -2000px;
  left: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: ${starsSmall};
}

@keyframes animStarFar {
  from { transform: translate(0, 0); }
  to { transform: translate(2000px, -2000px); }
}

@keyframes animStarNear {
  from { transform: translate(0, 0); }
  to { transform: translate(-2000px, 2000px); }
}
`;

fs.writeFileSync('src/components/StarryBackground.css', cssContent);
console.log('StarryBackground.css regenerated with parallax layers!');
