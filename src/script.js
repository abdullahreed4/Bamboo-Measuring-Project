/* ---- Step set-up: one step per .step-button in the panel, so the two
        always stay in sync. Each step is a picture, a divider and a
        caption.

        DEV NOTE: stepImages and stepCaptions are indexed by step
        number, so each must hold one entry per .step-button, in order.
        The image files sit in the Images folder beside this file. ---- */

// DEV NOTE: zoomMin, zoomMax and zoomStep are multiples of the image's
// normal height. setZoom keeps each step's zoom inside that range.

const zoomMin = 1;
const zoomMax = 3;
const zoomStep = 0.25;

const stepImages = [
  'Images/Step1.png',
  'Images/Step2.png',
  'Images/Step3.png',
  null,
  null
];

const stepCaptions = [
  'Start with the tip of your foot at zero.',
  'Practise stepping exactly one metre.\nMark a one metre length on the ground with a tape measure.\nStep along it, check where each step lands, and repeat until your step is steady.',
  'Lay the bamboo out on the ground. Walk slowly along it and count how many one metre steps you need. The count is your estimate.',
  'Measure the bamboo with a tape measure. Find out exactly how long it is.\n\nAfter that, you can compare your estimate with the real length, God willing.',
  'Get Ihsan to calculate the error rate for you.\n\nError % = (estimate - true length) / true length x 100.\n\nAn error within 10% is ok.\n\nIf any estimate is outside 10%, it is not a good one.\nKeep practising until your estimates are within 10%.'
];

// DEV NOTE: stepWarnings is indexed by step number like stepCaptions.
// An entry of null means the step has no warning, and buildStep adds no warning element for it.

const stepWarnings = [
  null,
  null,
  'Do not step on the bamboo. Step next to it.',
  null,
  null,
  null
];

const steps = [];    // one state object per step

// DEV NOTE: briefPage uses the same .step class as a step, so it shares
// the show/hide animation, and the .brief-page class adds the hidden-bar
// scrolling. Its text is held in briefText and set with textContent, so
// it is never read as HTML. The brief image has no divider and is
// appended after the text, so it sits under it.

const briefText = 'Glory be to God. He is The One Who Creates Everything. He measures what He creates.\n\nPacing out the length of a piece of bamboo in one metre steps gives you an estimate when you have no tape measure.\n\nTo get the skill, you have to practice pacing out the length of a piece of bamboo.\n\nThe goal is to estimate the length to within 10% error from the true length.\n\nIf you had to estimate how long this piece is, could you do it?';

const briefPage = document.createElement('div');
briefPage.className = 'step brief-page';
briefPage.append(Object.assign(document.createElement('p'), {
  className: 'brief-text',
  textContent: briefText
}));

const briefButton = document.getElementById('read-brief-button');

const briefImage = document.createElement('img');
briefImage.className = 'brief-image';
briefImage.src = 'Images/Brief.png';
briefImage.alt = 'Brief diagram';
briefPage.append(briefImage);

let current = null;  // the step on show, or null while the brief is on show

/* Builds one step's page and its state. */

function buildStep(index){
  const step = {
    index: index,
    zoom: zoomMin
  };

  step.el = document.createElement('div');
  step.el.className = 'step';

  // DEV NOTE: stepImages is indexed by step number. An entry of null
  // means the step has no image, so buildStep adds neither the image
  // nor the divider for it, and step.image stays null.

  step.image = null;

  const scroll = document.createElement('div');
  scroll.className = 'step-scroll';

  if (stepImages[index] !== null){
    const image = document.createElement('img');
    image.className = 'step-image';
    image.src = stepImages[index];
    image.alt = 'Step ' + (index + 1) + ' diagram';
    step.image = image;
    scroll.append(image);

    const divider = document.createElement('hr');
    divider.className = 'divider';
    scroll.append(divider);
  }

  const stepMessage = document.createElement('p');
  stepMessage.className = 'step-message';
  stepMessage.textContent = stepCaptions[index];
  scroll.append(stepMessage);

  if (stepWarnings[index] !== null){
    const stepWarning = document.createElement('p');
    stepWarning.className = 'step-warning';
    stepWarning.textContent = stepWarnings[index];
    scroll.append(stepWarning);
  }

  step.el.append(scroll);

  // DEV NOTE: the zoom controls are only built for a step that has an
  // image, so a step with no image shows no zoom buttons.

  if (step.image !== null){
    const controls = document.createElement('div');
    controls.className = 'step-controls';

    const zoomOutButton = document.createElement('button');
    zoomOutButton.className = 'zoom-button';
    zoomOutButton.type = 'button';
    zoomOutButton.textContent = '-';
    zoomOutButton.setAttribute('aria-label', 'Zoom out');
    zoomOutButton.addEventListener('click', () => setZoom(step, step.zoom - zoomStep));

    const zoomInButton = document.createElement('button');
    zoomInButton.className = 'zoom-button';
    zoomInButton.type = 'button';
    zoomInButton.textContent = '+';
    zoomInButton.setAttribute('aria-label', 'Zoom in');
    zoomInButton.addEventListener('click', () => setZoom(step, step.zoom + zoomStep));

    controls.append(zoomOutButton, zoomInButton);
    step.el.append(controls);
  }
  
  return step;
}

/* Sets a step's zoom, kept between zoomMin and zoomMax, and passes it
   to the image through the --zoom custom property. */

function setZoom(step, value){
  if (step.image === null) return;   // DEV NOTE: a step with no image has nothing to zoom.
  step.zoom = Math.min(zoomMax, Math.max(zoomMin, value));
  step.image.style.setProperty('--zoom', step.zoom);
}

/* ---- Panel: always shows the state of the page on show. The step
        passed in is null while the brief is on show, so no STEP button
        is highlighted and the BRIEF button is. ---- */

function showPanelState(step){
  document.querySelectorAll('.step-button').forEach((button, i) => {
    button.classList.toggle('current', step !== null && i === step.index);
  });
  briefButton.classList.toggle('current', step === null);
}

/* Fades the page on show into the centre and brings the requested page
   up in its place (the animation is in the .step CSS). */

let activePage = null; // whichever page - a step or the brief - is on show

function showPage(el){
  if (el === activePage) return;
  if (activePage) activePage.classList.remove('active');
  el.classList.add('active');
  activePage = el;
}

const stepButtonCount = document.querySelectorAll('.step-button').length;
for (let i = 0; i < stepButtonCount; i++) steps.push(buildStep(i));
document.getElementById('container').append(...steps.map(step => step.el), briefPage);

current = steps[0];
showPage(current.el);
showPanelState(current);

briefButton.addEventListener('click', () => {
  current = null;
  showPage(briefPage);
  showPanelState(current);
});

document.querySelectorAll('.step-button').forEach((button, i) => {
  button.addEventListener('click', () => {
    current = steps[i];
    showPage(current.el);
    showPanelState(current);
  });
});
