// Constants for template paths
const templatePaths = {
    1: "images/vorlage1/",
    2: "images/vorlage2/",
    3: "images/vorlage3/",
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
  let vorlageValue = getVorlageValue().value;
    return templatePaths[vorlageValue] || "images/vorlage1/";
  }

  function getVorlageValue() {
    return document.getElementById('vorlage');
  }

  function getFileformat () {
    return document.getElementById('outputFormat').value;
  }

  function getMode() {
    return document.getElementById('mode').value;
}

function getGenBtn() {
  return document.getElementById('generateBtn');
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
  async function genBtn() {
    try {
      let mode = getMode();
      // Call createErrorMessage, which might throw an error
      if(mode!=="Alle Lieder") {
        await checkDataInput();
      }
      // Proceed with the next function only if no error was thrown
      await createOutput(); 
    } catch (error) {
      // Log the error details for debugging (including stack trace)
      console.error('Error occurred in genBtn:', error);
    
      // Optionally, re-throw the error if you want it to propagate further
      // throw error;
    }
  }

  async function createOutput() {
    const button = getGenBtn();
    button.setAttribute('aria-busy', 'true');
    const fileformat = getFileformat();
    const mode = getMode();



    const actions = {
        PPTX: {
            "Gottesdienst": createStandardPPTX,
            "Nur Lieder": createSongPPTX,
            "Alle Lieder": createFullPPTX,
        },
        PDF: {
            "Gottesdienst": createStandardPDF,
            "Nur Lieder": createSongPDF,
            "Alle Lieder": createFullPDF,
        },
        IMG: {
            "Gottesdienst": createStandardImg,
            "Nur Lieder": createSongImg,
            "Alle Lieder": createFullImage,
        },
    };

    if (actions[fileformat] && actions[fileformat][mode]) {
        try {
            await actions[fileformat][mode](); // Wait for the file generation to complete
        } catch (error) {
            console.error("Error during file generation:", error);
        } finally {
            button.setAttribute('aria-busy', 'false'); // Set aria-busy to 'false' when done
        }
    } else {
        console.error("Invalid file format or mode.");
        button.setAttribute('aria-busy', 'false'); // Reset busy state if invalid
    }
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

function onModeChange() {
  const modeSelect = document.querySelector('#mode'); // Get the select element
  const mode = modeSelect.value; // Get the selected value
  updateInputsBasedOnMode(mode); // Call the update function with the selected mode
}

function updateInputsBasedOnMode(mode) {
  const songInputs = document.querySelectorAll('.inputSngs input'); // Select all song inputs
  const dateInput = document.querySelector('#dateInput'); // Select the date input
  const vorlageInput = document.querySelector('#vorlage'); // Ensure vorlage input is selected correctly

  if (!dateInput || !vorlageInput) {
      console.error("Required inputs are missing from the DOM.");
      return;
  }

  // Reset all inputs to enabled by default
  songInputs.forEach(input => input.removeAttribute('disabled'));
  dateInput.removeAttribute('disabled');
  vorlageInput.removeAttribute('disabled');

  // Apply specific disable rules based on mode
  if (mode === 'Alle Lieder') {
      // Disable all song inputs, date input, and vorlage input
      songInputs.forEach(input => input.setAttribute('disabled', 'true'));
      dateInput.setAttribute('disabled', 'true');
      vorlageInput.setAttribute('disabled', 'true');
      clearErrorMessage();
  } else if (mode === 'Nur Lieder') {
      // Disable date input and vorlage input
      vorlageInput.setAttribute('disabled', 'true');
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

  });
      try {
        createErrorMessage();
      } catch (error) {
        console.error('Error occurred in genBtn:', error);

      }

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
    try {
      createErrorMessage();
    } catch (error) {
      console.error('Error occurred in genBtn:', error);

    }
      
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
        //document.getElementById(inputId).style.border = '2px solid green';
      } else {
        //document.getElementById(inputId).style.border = '2px solid red';
      }
      try {
        createErrorMessage();
      } catch (error) {
        console.error('Error occurred in genBtn:', error);

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

function clearErrorMessage() {
  const errorMessageDiv = document.getElementById('error-message');
  const warningMessageDiv = document.getElementById('warning-message');
  
  errorMessageDiv.innerHTML = ''; // Clear previous error messages
  warningMessageDiv.innerHTML = ''; // Clear previous warning messages
}


function createErrorMessage() {
  const errorMessageDiv = document.getElementById('error-message');
  const warningMessageDiv = document.getElementById('warning-message');
  
  errorMessageDiv.innerHTML = ''; // Clear previous error messages
  warningMessageDiv.innerHTML = ''; // Clear previous warning messages
  errorMessageDiv.classList.remove('red', 'yellow'); // Remove 'red' and 'yellow' classes
  warningMessageDiv.classList.remove('yellow'); // Remove 'yellow' class for warnings
  
  const nullIndices = [];
  const emptyInputs = [];
  const duplicateWarning = [];
  const seen = new Map(); // Map to store items and their corresponding indices

  // Reset all input borders to default (e.g., no yellow borders)
dataInpSngs.forEach((item, index) => {
  const inputField = document.getElementById(index);
  if (inputField) {
    inputField.style.border = ''; // Reset border to default (empty string)
  }
});


  // Iterate over the array and check conditions
  dataInpSngs.forEach((item, index) => {
    const inputField = document.getElementById(index); // Select the input element with the corresponding ID

    if (item === null) {
      if (inputField) {
        // Safely check the value of the input field
        const inputValue = inputField.value?.trim() || ""; // Fallback to empty string if value is undefined
        if (inputValue === '') {
          emptyInputs.push(index + 1); // Convert to human-readable Lied numbering (1-based index)
        } else {
          nullIndices.push(index + 1); // Convert to human-readable Lied numbering (1-based index)
        }
      } else {
        // If inputField is not found, treat it as a general "not found" case
        nullIndices.push(index + 1);
      }
    } else {
      // Check for duplicates among non-null items only
      if (seen.has(item)) {
        const previousIndex = seen.get(item); // Get the previous index of the duplicate item
        duplicateWarning.push([previousIndex + 1, index + 1]); // Store both indices (1-based)
      } else {
        seen.set(item, index); // Store the item and its index
      }
    }
  });

  // Construct error messages
  const messages = [];
  if (emptyInputs.length > 0) {
    messages.push(`Fehler: Lied ${emptyInputs.join(', ')} ist leer.`);
  }
  if (nullIndices.length > 0) {
    messages.push(`Fehler: Lieder ${nullIndices.join(', ')} nicht gefunden.`);
  }

  // Display the combined error messages
  if (messages.length > 0) {
    errorMessageDiv.innerHTML = messages.join('<br>'); // Separate multiple messages with a line break
    errorMessageDiv.classList.add('error', 'red'); // Add both 'error' and 'red' classes for regular errors
  }

  // Construct duplicate warning message
  if (duplicateWarning.length > 0) {
    const duplicateMessage = duplicateWarning
      .map(([firstIndex, secondIndex]) => `Warnung: Lied ${firstIndex} und ${secondIndex} sind gleich.`)
      .join('<br>');
    warningMessageDiv.innerHTML = duplicateMessage;
    warningMessageDiv.classList.add('yellow'); // Apply yellow class for warning messages
  }

  // Reset border to green for all input fields that do not have errors or duplicates
  dataInpSngs.forEach((item, index) => {
    const inputField = document.getElementById(index); // Select the input element with the corresponding ID
    if (inputField) {
      // If there is no error, set the border to green
      inputField.setAttribute("aria-invalid", "false");
    }
  });

  // Highlight input fields with errors (red border)
  if (emptyInputs.length > 0 || nullIndices.length > 0) {
    dataInpSngs.forEach((item, index) => {
      const inputField = document.getElementById(index); // Select the input element with the corresponding ID
      if (inputField) {
        // Apply red border for fields with errors
        if (emptyInputs.includes(index + 1) || nullIndices.includes(index + 1)) {
          inputField.setAttribute("aria-invalid", "true");
        }
      }
    });
  }

  // Highlight duplicate input fields in yellow
  duplicateWarning.forEach(([firstIndex, secondIndex]) => {
    const firstInputField = document.getElementById(firstIndex - 1); // Adjust for 0-based index
    const secondInputField = document.getElementById(secondIndex - 1); // Adjust for 0-based index
    if (firstInputField) {
      firstInputField.style.border = '1px solid #FF9D2F'; // Apply yellow border for duplicates
    }
    if (secondInputField) {
      secondInputField.style.border = '1px solid #FF9D2F'; // Apply yellow border for duplicates
    }
  });
    // Throw an exception if there are errors
    if (messages.length > 0) {
      throw new Error(messages.join(' ')); // Combine messages and throw as an exception
    }
}

async function checkDataInput() {
  if (dataInpSngs.length === 0) {
      throw new Error("The data input array is empty.");
  }

  for (let item of dataInpSngs) {
      if (item === null || item === "") {
          throw new Error(`Invalid item found: ${item}. All items must be non-null and non-empty.`);
      }
  }

  console.log("All items are valid.");
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



// Map of select values to button text
const buttonTextMap = {
  PPTX: 'Download PPTX',
  PDF: 'Download PDF',
  IMG: 'Download IMG'
};

// Function to handle the select change logic
function handleSelectChange(selectElement) {
  const selectedValue = selectElement.value; // Get the selected value
  const generateBtn = document.querySelector("#generateBtn"); // Get the button

  // Update button text based on the selected value using the map
  generateBtn.innerHTML = buttonTextMap[selectedValue] || 'Download PPTX';
}

// Add an event listener to the select element
const outputFormatSelect = document.getElementById('outputFormat');
outputFormatSelect.addEventListener('change', function () {
  handleSelectChange(this); // Pass the select element to the function
});




window.onload = function() {
  loadJsonData();
  document.getElementById('dateInput').value = getNextSundayDateInp();

  handleSelectChange("default");

  dataInpSngs = []; 

  initializeEventListeners(); // Initialize event listeners for existing inputs


};



