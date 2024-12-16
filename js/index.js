// Constants for template paths
const templatePaths = {
    1: "images/vorlage1/",
    2: "images/vorlage2/",
    3: "images/vorlage3/",
    4: "images/vorlage4/",
    5: "images/vorlage5/",
    6: "images/vorlage6/",
  };

  // Define image configuration for additional slides
      const imgConfig1 = {
        path: "images/slides/",
        x: "0%",
        y: "0%",
        w: "100%",
        h: "100%"
    };


function getPathForTemplate() {
  let vorlageValue = getVorlageValue();
    return templatePaths[vorlageValue] || "images/vorlage1/";
  }

  function getVorlageValue() {
    return document.getElementById('vorlageNb').value;
  }

  function getFileformat () {
    return document.getElementById('select3').value;
  }

  function getActiveButton() {
    const activeButton = document.querySelector('.buttonTop .button.active'); // Find the active button
    if (activeButton) {
        return activeButton; // Return the active button element
    }
    return null; // Return null if no active button is found
}


  // Function to add an image to a new slide
  function addVorlageImageSlide(pres, imagePath) {
      const slide = pres.addSlide();
      slide.addImage({
          path: imagePath,
          x: "0%",
          y: "0%",
          w: "100%",
          h: "100%"
      });
  }

  function dateInput(){
        // Get date from input and format it
        const dateValue = document.getElementById('dateInput').value;
        let formattedDate = '';
        if (dateValue) {
            const dateObj = new Date(dateValue);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = String(dateObj.getFullYear());
            return `${day}.${month}.${year}`;
        }

  }




  function createOutput() {
    let fileformat = getFileformat(); // Get the selected file format (e.g., 'default', 'pdf', 'image')
    let activeButton = getActiveButton(); // Get the active button element

    // Check if no button is active
    if (!activeButton) {
        console.error("No active button found.");
        return; // Stop execution if no active button is found
    }

    // Define the mapping between fileformat and mode (button ID) to their respective functions
    const actions = {
        default: {
            button1: createStandardPPTX,
            button2: createSongPPTX
        },
        pdf: {
            button1: createStandardPDF,
            button2: createSongPDF
        },
        img: {
            button1: downloadStandardImg,
            button2: downloadSongImg
        }
    };

    // Execute the corresponding function based on the file format and active button ID
    const action = actions[fileformat]?.[activeButton.id]; // Safely retrieve the corresponding function
    if (action) {
        action(); // Call the function
    } else {
        console.error("Invalid file format or button mode.");
    }
}


function createFullOutput() {
  let fileformat = getFileformat();
  if (fileformat === 'default') {
    createFullPPTX(); // Call function for PPTX
  } else if (fileformat === 'pdf') {
    createFullPDF(); // Call function for PDF
  } else if (fileformat === 'img') {
    createFullImage(); // Call function for Image
  } else {
    console.error('Unsupported file format'); // Handle invalid file format
  }
}




function main() {
    //var textInputProcessed = inputCheck();
    
    createOutput();
    

}

async function loadJsonData() {
  try {
      const response = await fetch('./data/data.json');
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
  } catch (error) {
      console.error('Error loading JSON data:', error);
  }
}




function randomSngs(){
  let inputElements = document.querySelectorAll(".inputSngs input");
  let inpNb = inputElements.length;
  let indices = Array.from({length: data.length}, (v, k) => k); // Erzeugt ein Array von 0 bis data.length - 1

  // Fisher-Yates-Algorithmus zum Mischen des Arrays
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]; // Elemente vertauschen
  }

  // Die ersten inpNb Elemente des gemischten Arrays auswählen
  let selectedIndices = indices.slice(0, inpNb);

  // Ausgewählte Titel ausgeben
  selectedIndices.forEach((index, i) => {
    inputElements[i].value = data[index].title;
    dataInpSngs[i] = enableAutocomplete(inputElements[i].value);
    document.getElementById(i).style.border = '2px solid green';

  });
}




function getNextSundayDateInp() {
  var today = new Date();
  
  if (today.getDay() === 0) {
    return today.toISOString().slice(0, 10); // Return today's date if it's Sunday
  } else {
    var nextSunday = new Date(today);
    var daysUntilSunday = 7 - today.getDay();
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    
    // Format the date as YYYY-MM-DD without using toISOString()
    var year = nextSunday.getFullYear();
    var month = (nextSunday.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    var day = nextSunday.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`; // Return next Sunday's date
  }
}




function enableAutocomplete(inpVal) {


  let exactMatch = data.find(item => item.id === inpVal);

  if (!exactMatch) {
      exactMatch = data.find(item => item.title === inpVal);
  }

      if (exactMatch) {
          return exactMatch;
      } else {
          return null;
      }
  }



  function handleInputFocus(event) {
      
  }

  
  function handleInputBlur(event) {


      // Add custom logic for input autocomplete
      let inputId = event.target.id;
      
      let inptVal = event.target.value.trim().toUpperCase();

      if (/^[bB]?\d+$/.test(inptVal)) {
        // Remove leading zeros using regular expression
      inptVal = inptVal.replace(/^0+/, ''); // Remove leading zeros from numeric part
      // Remove leading zeros from the numeric part after a letter prefix
     inptVal = inptVal.replace(/([A-Z]+)0+/, '$1'); // Remove leading zeros from alphanumeric part
    }

      dataInpSngs[inputId] = enableAutocomplete(inptVal);

      if(enableAutocomplete(inptVal)){
        document.getElementById(inputId).value = dataInpSngs[inputId].title;
        document.getElementById(inputId).style.border = '2px solid green';
      } else {
        document.getElementById(inputId).style.border = '2px solid red';
      }
  }


  function handleKeyDown(event, index) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        event.target.value = '';
        lastValidId = ""; // Reset last valid id when input is cleared
    }
}




  // Function to initialize event listeners
function initializeEventListeners() {
  const inputs = document.querySelectorAll('.inputSngs input');

  inputs.forEach((input, index) => {
    input.addEventListener('focus', handleInputFocus);
    input.addEventListener('blur', handleInputBlur);
    input.addEventListener('keydown', function(e) {
        handleKeyDown(e, index);
    });
});

  
}



function addInputFields() {
  // Get the container where new inputs are to be added
  const songInputs = document.getElementById('songInputs'); // Corrected getElementById
  const newInputCount = document.querySelectorAll(".inputSngs input").length; // Count of inputs to generate a unique ID

  // Generate unique ID for the new input
  const newInputId = newInputCount;

 // HTML content for the new input and its label
 const newInputHTML = `
 <label for="${newInputId}">Lied ${newInputCount+1}</label>
 <input type="text" id="${newInputId}" placeholder="Lied Nummer einfügen">
 <br>
`;

  // Append new input field and its label to the songInputs container using insertAdjacentHTML
  songInputs.insertAdjacentHTML('beforeend', newInputHTML);

  // Attach event listeners to the new input
  const newInput = document.getElementById(newInputId);
  newInput.addEventListener('focus', handleInputFocus);
  newInput.addEventListener('blur', handleInputBlur);
  newInput.addEventListener('keydown', function(e) {
    handleKeyDown(e, newInputId);
});
}

function handleButtonClick(buttonNumber) {
  // Remove 'active' class from all buttons
  document.querySelectorAll('.buttonTop button').forEach(button => {
    button.classList.remove('active');
  });
  
  // Add 'active' class to the clicked button
  const clickedButton = document.querySelector(`.buttonTop button:nth-child(${buttonNumber})`);
  clickedButton.classList.add('active');
  const vorlageInp = document.querySelector(`#vorlageNb`);
  
  
    // Call a specific function based on the active button
    switch(buttonNumber) {
        case 1:
          modeNb = 1;
          document.getElementById('vorlageNb').disabled = false;
            break;
        case 2:
          modeNb = 2;
            document.getElementById('vorlageNb').disabled = true;
            break;
    }
  }



function handleSelectChange(selectElement) {
  const selectedValue = selectElement.value;
  // Handle select change logic here
  switch(selectedValue) {
    case 'default':
      document.querySelector(".GenerateBtn").innerHTML= 'Download PPTX';
        break;
    case 'pdf':
      document.querySelector(".GenerateBtn").innerHTML= 'Download PDF';
        break;
    case 'img':
      document.querySelector(".GenerateBtn").innerHTML= 'Download IMG';
      break;

  }
}

function addLongPressListener(element, onLongPress, delay = 500) {
  let timer;

  const startTimer = () => {
    timer = setTimeout(() => {
      onLongPress();
      timer = null; // Reset timer
    }, delay);
  };

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  // Add event listeners for desktop
  element.addEventListener('mousedown', startTimer);
  element.addEventListener('mouseup', clearTimer);
  element.addEventListener('mouseleave', clearTimer);

  // Add event listeners for mobile
  element.addEventListener('touchstart', startTimer);
  element.addEventListener('touchend', clearTimer);
  element.addEventListener('touchcancel', clearTimer);
}

const button = document.querySelector(".GenerateBtn");
addLongPressListener(button, () => {
  createFullOutput();
}, 700); // 700ms long press



window.onload = function() {
  loadJsonData();
  document.getElementById('dateInput').value = getNextSundayDateInp();

  handleSelectChange("default");

  dataInpSngs = []; 

  initializeEventListeners(); // Initialize event listeners for existing inputs
  

};



