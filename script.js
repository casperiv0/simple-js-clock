const CLOCK_ELEMENT = document.getElementById("__CLOCK__");
const HOUR_ARM_ID = "__HOUR__";
const MINUTE_ARM_ID = "__MINUTE__";
const SECONDS_ARM_ID = "__SECONDS__";

const LINE_EVERY_DEGREE_HOURS = 360 / 12;
const LIVE_EVERY_DEGREE_MINUTES = 360 / 60;

export function generateLinesDegrees() {
  const lines = [];

  for (let i = 1; i < 12 + 1; i++) {
    const lineAtDegree = LINE_EVERY_DEGREE_HOURS * i;
    lines.push(lineAtDegree);
  }

  return lines;
}

export function generateDOMClockNumbers() {
  const lines = generateLinesDegrees();

  lines.forEach((lineDegree) => {
    const element = document.createElement("div");
    const textSpan = document.createElement("p");

    // make sure the text is upright, not rotated.
    textSpan.textContent = lineDegree / LINE_EVERY_DEGREE_HOURS;
    textSpan.style.transform = `rotate(${lineDegree * -1}deg)`;

    element.classList.add("number");
    element.style.transform = `translate(-50%, -50%) rotate(${lineDegree}deg)`;

    element.appendChild(textSpan);
    CLOCK_ELEMENT.appendChild(element);
  });
}

export function generateCurrentTimeDOM() {
  const currentDate = new Date();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const hourDegrees = LINE_EVERY_DEGREE_HOURS * hour;
  const minuteDegrees = LIVE_EVERY_DEGREE_MINUTES * minute;
  const secondsDegrees = LIVE_EVERY_DEGREE_MINUTES * seconds;

  const hourElement = findExistingNode(HOUR_ARM_ID) ?? document.createElement("div");
  const minuteElement = findExistingNode(MINUTE_ARM_ID) ?? document.createElement("div");
  const secondsElement = findExistingNode(SECONDS_ARM_ID) ?? document.createElement("div");

  applyConfig({ node: hourElement, type: "hour", degree: hourDegrees, id: HOUR_ARM_ID });
  applyConfig({ node: minuteElement, type: "minute", degree: minuteDegrees, id: MINUTE_ARM_ID });
  applyConfig({
    node: secondsElement,
    type: "seconds",
    degree: secondsDegrees,
    id: SECONDS_ARM_ID,
  });

  if (!findExistingNode(HOUR_ARM_ID)) {
    CLOCK_ELEMENT.appendChild(hourElement);
    CLOCK_ELEMENT.appendChild(minuteElement);
    CLOCK_ELEMENT.appendChild(secondsElement);
  }
}

generateDOMClockNumbers();
generateCurrentTimeDOM();

setInterval(generateCurrentTimeDOM, 1000);

function findExistingNode(id) {
  return document.getElementById(id);
}

function applyConfig({ node, degree, id, type }) {
  node.classList.add("line", type);
  node.style.rotate = `${degree}deg`;
  node.id = id;
}
