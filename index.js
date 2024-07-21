// Constants for template paths
const templatePaths = {
    1: "images/vorlage1/",
    2: "images/vorlage2/",
    3: "images/vorlage3/",
    4: "images/vorlage4/",
    5: "images/vorlage5/",
    6: "images/vorlage6/",
  };

function getPathForTemplate(templateNumber) {
    return templatePaths[templateNumber] || "images/vorlage1/";
  }


function downloadPPTX(vorlageNb) {


let  pathVorlage = getPathForTemplate(vorlageNb);

    // Create a new Presentation
    let pres = new PptxGenJS();

    // Add first Slide
    let slide1 = pres.addSlide();

    // Get date from input and format it
    const dateValue = document.getElementById('dateInput').value;
    let formattedDate = '';
    if (dateValue) {
        const dateObj = new Date(dateValue);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = String(dateObj.getFullYear());
        formattedDate = `${day}.${month}.${year}`;
    }

    // Add images to the first slide
    slide1.addImage({ path: pathVorlage + "image1.jpg", x: "0%", y: "0%", w: "100%", h: "100%" });
    slide1.addImage({ path: "images/logo1.png", x: "75%", y: "83%", w: "25%", h: "17%", transparency: 15 });




    const textStyle1 = {
        x: 1.5,
        y: 1.0,
        bold: true,
        fontSize: 64,
        color: "FFFFFF",
        align: 'center'
    };
    slide1.addText("ஆராதனை", textStyle1);

    // Adding formatted date text to slide
    if (formattedDate) {
        const textStyle2 = {
            x: 1.5,
            y: 2.0,
            bold: true,
            fontSize: 64,
            color: "FFFFFF",
            align: 'center'
        };
        slide1.addText(formattedDate, textStyle2);
    }

    // Define image configuration for additional slides
    const imgConfig1 = {
        path: "images/slides/",
        x: "0%",
        y: "0%",
        w: "100%",
        h: "100%"
    };

    const ending = ".png";
    
    // Function to add a new slide and image to a presentation
    function addImageSlide(imageConfig, songArray) {
        const slide = pres.addSlide();
        slide.addImage({
            path: imageConfig.path + songArray.filename[0] + ending,
            x: imageConfig.x,
            y: imageConfig.y,
            w: imageConfig.w,
            h: imageConfig.h
        });

        if (songArray.filename.length > 1 && songArray.filename[1] != "") {
            const slide2 = pres.addSlide();
            slide2.addImage({
                path: imageConfig.path + songArray.filename[1] + ending,
                x: imageConfig.x,
                y: imageConfig.y,
                w: imageConfig.w,
                h: imageConfig.h
            });
        }
    }

    // Function to add an image to a new slide
    function addVorlageImageSlide(imagePath) {
        const slide = pres.addSlide();
        slide.addImage({
            path: imagePath,
            x: "0%",
            y: "0%",
            w: "100%",
            h: "100%"
        });
    }

    // Adding slides
    addImageSlide(imgConfig1, dataInpSngs[0]);
    addImageSlide(imgConfig1, dataInpSngs[1]);

    // Add additional images and texts as specified
    addVorlageImageSlide(pathVorlage + "image2.jpg"); // Slide 4
    addImageSlide(imgConfig1, dataInpSngs[2]); // Slide 5
    addVorlageImageSlide(pathVorlage + "image3.jpg"); // Slide 6
    addImageSlide(imgConfig1, dataInpSngs[3]); // Slide 7

    // Slide 8 with text
    let slide8 = pres.addSlide();
    slide8.addText("1. கொரிந்தியர் 11; 23-32\n\n1.Korinther 11; 23-32", {
        x: "0%",
        y: "50%",
        w: "100%",
        bold: true,
        fontSize: 50,
        color: "000000",
        align: "center"
    });

    // Adding remaining slides
    addImageSlide(imgConfig1, dataInpSngs[4]); // Slide 9
    addVorlageImageSlide(pathVorlage + "image4.jpg"); // Slide 10

    if (dataInpSngs.length > 4) {
        for (let i = 5; i < dataInpSngs.length; i++) {
            addImageSlide(imgConfig1, dataInpSngs[i]);
        }
    }

    

    // Save the presentation
    var fileName = "Gottesdienst " + formattedDate + ".pptx";
    pres.writeFile({ fileName: fileName });
}

  





function getVorlageValue() {
  var vorlageElement = document.getElementById('vorlageNb');
  return vorlageElement.value;
}



function main() {
    //var textInputProcessed = inputCheck();
    var vorlageNb = getVorlageValue();
    downloadPPTX(vorlageNb);
    

}

async function loadJsonData() {
  try {
      const response = await fetch('data.json');
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      data = await response.json();
  } catch (error) {
      console.error('Error loading JSON data:', error);
  }
}


 // Function to get the next Sunday's date
 function getNextSundayDateInp() {
  var today = new Date();
  
  if (today.getDay() === 0) {
    return today.toISOString().slice(0, 10); // Return today's date if it's Sunday
  } else {
    var nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + (7 - today.getDay()) % 7);
    return nextSunday.toISOString().slice(0, 10); // Return next Sunday's date
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
        updateIdAtIndex(index, null);
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






window.onload = function() {
  loadJsonData();
  document.getElementById('dateInput').value = getNextSundayDateInp();

  dataInpSngs = []; 

  initializeEventListeners(); // Initialize event listeners for existing inputs

  document.getElementById('addInput').addEventListener('click', addInputField);



};



