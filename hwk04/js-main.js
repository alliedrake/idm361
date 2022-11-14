let prepare_time = 5;
let work_time = 5;
let rest_time = 5;
let rounds = 10;
let phase = 'stopped';
let current_time = 0;
let rounds_remaining = 0;
let running = false;

const prepare_time_div = document.querySelector('#prep_time');
const work_time_div = document.querySelector('#work_time');
const rest_time_div = document.querySelector('#rest_time');
const rounds_div = document.querySelector('#rounds_count');

function init() {
  prepare_time_div.textContent = prepare_time;
  work_time_div.textContent = work_time;
  rest_time_div.textContent = rest_time;
  rounds_div.textContent = rounds;

  document.querySelector('#sub_prep').addEventListener('click', () => {
    if (prepare_time > 3) {
      prepare_time--;
    }
    prepare_time_div.textContent = prepare_time;  
  });
  document.querySelector('#add_prep').addEventListener('click', () => {
    prepare_time++;
    prepare_time_div.textContent = prepare_time;  
  });  
  
  // document.querySelector('#sub_work_big').addEventListener('click', () => {
  //   work_time < 5 ? work_time = 0 : work_time = work_time - 5;
  //   work_time_div.textContent = work_time;  
  // });
  document.querySelector('#sub_work').addEventListener('click', () => {
    work_time < 0 ? work_time = 0 : work_time--;
    work_time_div.textContent = work_time;  
  });
  // document.querySelector('#add_work_big').addEventListener('click', () => {
  //   work_time = work_time + 5;
  //   work_time_div.textContent = work_time;  
  // });
  document.querySelector('#add_work').addEventListener('click', () => {
    work_time++;
    work_time_div.textContent = work_time;  
  });

  // document.querySelector('#sub_rest_big').addEventListener('click', () => {
  //   rest_time < 5 ? rest_time = 0 : rest_time = rest_time - 5;
  //   rest_time_div.textContent = rest_time;  
  // });
  document.querySelector('#sub_rest').addEventListener('click', () => {
    rest_time < 0 ? rest_time = 0 : rest_time--;
    rest_time_div.textContent = rest_time;  
  });
  
  // document.querySelector('#add_rest_big').addEventListener('click', () => {
  //   rest_time = rest_time + 5;
  //   rest_time_div.textContent = rest_time;  
  // });
  
  document.querySelector('#add_rest').addEventListener('click', () => {
    rest_time++;
    rest_time_div.textContent = rest_time;  
  });

  document.querySelector('#sub_round').addEventListener('click', () => {
    if (rounds > 1) {
      rounds--;
    }
    rounds_div.textContent = rounds;  
  });
  document.querySelector('#add_round').addEventListener('click', () => {
    rounds++;
    rounds_div.textContent = rounds;  
  });
  
  // const start_button = document.querySelector('#start');
  // start_button.addEventListener('click', () => {
  //   start();
  // });
}

function update() {
  document.querySelector('#seconds').textContent = current_time;
  document.querySelector('#progress').textContent = '' + (rounds - rounds_remaining) + '/' + rounds;
  document.querySelector('#phase').textContent = phase;
  if (current_time > 0 && current_time < 4 && !(phase === 'work' && rounds_remaining === 0 && current_time === 1)) {
  }
  // I removed the color here 
  document.querySelector('#modalcontent').style.background = phase === 'Rest' ? '#3711A1' : null; 
  if (current_time > 1) {
    document.querySelector('#seconds').style.color = (current_time < 4) ? 'white' : 'white';
    --current_time;
  } else {
    switch (phase) {
      case 'Prepare':
        phase = 'Work';
        current_time = work_time;
        --rounds_remaining;
        break;
      case 'Work':
        if (rounds_remaining === 0) {
          // endsound.play();
          return;
        } else {
          current_time = rest_time;
          phase = 'Rest';
        }
        break;
      case 'Rest':
        --rounds_remaining;
        current_time = work_time;
        phase = 'Work';
        break;
    }
  }
  // setTimeout(update, 1000);
}

var myTimerObj;

function start() {
  running = true;
  const settings = document.querySelector('#settings');
  settings.style.height = '0px';
  settings.style.visibility = 'hidden';
  phase = 'Prepare';
  current_time = prepare_time;
  rounds_remaining = rounds;
  // update();
  myTimerObj = setInterval(update, 1000);
}

init();



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("start");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  start();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  // Reset timer
  phase = 'stopped';
  current_time = 0;
  rounds_remaining = 0;
  running = false;
  // Make modal disapear
  modal.style.display = "none";
  // Clear modal interface fields
  document.querySelector('#seconds').textContent = '';
  document.querySelector('#progress').textContent = '';
  document.querySelector('#phase').textContent = '';
  // Makes main interface visible again
  settings.style.visibility = 'visible';
  // Resets the timer
  clearInterval(myTimerObj);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

