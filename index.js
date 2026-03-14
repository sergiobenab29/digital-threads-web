const themeButton = document.getElementById('theme-button');
const bodyElement = document.body;

const toggleDarkMode = () => {
    bodyElement.classList.toggle('dark-mode');

    if (bodyElement.classList.contains('dark-mode')) {
        themeButton.textContent = 'Light Mode';
    } else {
        themeButton.textContent = 'Dark Mode';
    }
};
themeButton.addEventListener('click', toggleDarkMode);

const rsvpButton = document.getElementById('rsvp-button');
const rsvpForm = document.getElementById('rsvp-form');

let participantCount = 3; 

let rotateFactor = 0;
const modalImage = document.getElementById('modal-image');
let intervalId;
let motionEnabled = true;
const reduceMotionButton = document.getElementById('reduce-motion-button');

const animateImage = () => {
    if (!motionEnabled) {
        return; 
    }
    if (rotateFactor === 0) {
        rotateFactor = -10;
    } else {
        rotateFactor = 0;
    }
    
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

const reduceMotion = () => {
    motionEnabled = !motionEnabled; 

    if (motionEnabled) {
        reduceMotionButton.textContent = 'Motion: OFF';
        modalImage.style.transform = 'rotate(0deg)'; 
    } else {
        reduceMotionButton.textContent = 'Motion: ON';
        modalImage.style.transform = 'rotate(0deg)';
    }
};

// Add the event listener to the new button
if (reduceMotionButton) {
    reduceMotionButton.addEventListener('click', reduceMotion);
}

const toggleModal = (person) => {
    const modal = document.getElementById('success-modal');
    const modalText = document.getElementById('modal-text'); 
    
    modal.style.display = 'flex';
    
    modalText.textContent = `Thanks for RSVPing, ${person.name}! You are now confirmed for Digital Threads. We look forward to seeing you!`;

    const intervalId = setInterval(animateImage, 500); 

    setTimeout(() => {
        clearInterval(intervalId);
        modal.style.display = 'none';
    }, 5000);
};

const updateRsvpCount = () => {
    const counterElement = document.getElementById('rsvp-count');
    if (counterElement) {
        counterElement.textContent = `⭐ ${participantCount} people have RSVP'd to this event!`;
    }
};

const addParticipant = (person) => {
    const newParticipant = document.createElement('p');
    newParticipant.textContent = `🎟️ ${person.name} from ${person.state} has RSVP'd.`;

    const participantsContainer = document.querySelector('.rsvp-participants');
    
    const firstParticipant = participantsContainer.querySelector('p:not(#rsvp-count)');

    if (firstParticipant) {
        participantsContainer.insertBefore(newParticipant, firstParticipant);
    } else {
        participantsContainer.appendChild(newParticipant);
    }

    participantCount++;
    updateRsvpCount();
};

const validateForm = (event) => {
  event.preventDefault();

  let containsErrors = false;
  
  const person = {
    name: document.getElementById('name-input').value,
    email: document.getElementById('email-input').value,
    state: document.getElementById('state-input').value
  };

  var rsvpInputs = document.getElementById("rsvp-form").elements; 
  
  for (let input of rsvpInputs) {
    input.classList.remove('error');
  }
  
  if (person.name.length < 2) {
      document.getElementById('name-input').classList.add('error');
      containsErrors = true;
  }
  if (person.state.length < 2) {
      document.getElementById('state-input').classList.add('error');
      containsErrors = true;
  }

  const emailInput = document.getElementById('email-input');
  
  if (!person.email.includes('@')) {
      containsErrors = true;
      emailInput.classList.add('error');
  } else {
      emailInput.classList.remove('error'); 
  }

  if (!containsErrors) {
    addParticipant(person); 
    toggleModal(person);

    for (let input of rsvpInputs) {
        input.value = "";
    }
  }
};

const closeModal = () => {
    const modal = document.getElementById('success-modal');
    modal.style.display = 'none';
    clearInterval(intervalId); 
};

const closeModalButton = document.getElementById('close-modal-button');
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

rsvpButton.addEventListener('click', validateForm);

document.addEventListener('DOMContentLoaded', updateRsvpCount);