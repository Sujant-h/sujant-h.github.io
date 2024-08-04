modeNb = 1;
fileformat = 1;


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

const ending = ".png";

function getPathForTemplate() {
  let vorlageValue = getVorlageValue();
  console.log(vorlageValue);
    return templatePaths[vorlageValue] || "images/vorlage1/";
  }


// Function to add a new slide and image to a presentation
    function addImageSlide(pres, imageConfig, songArray) {
      const ending = ".png"; // Ensure ending is defined within scope
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

  
function createFullPPTX(){

    if (!data || data.length === 0) {
      console.error("Data is not available or empty");
      return;
  }


    let pres = new PptxGenJS();
      for (let i = 0; i < data.length; i++) {
          addImageSlide(pres, imgConfig1, data[i]);
      }
    
      pres.writeFile({ fileName: "Alle Lieder.pptx" });
  }

function createSongPPTX(){
      // Create a new Presentation
      let pres = new PptxGenJS();

        for (let i = 0; i < dataInpSngs.length; i++) {
          if (dataInpSngs[i] != null && dataInpSngs[i] != undefined) {

            addImageSlide(pres, imgConfig1, dataInpSngs[i]);
          }
        }
      
      let formattedDate = dateInput();

      var fileName = "Nur Lieder " + formattedDate + ".pptx";
      pres.writeFile({ fileName: fileName });

    

}

  



function createStandardPPTX(){
  let  pathVorlage = getPathForTemplate(

  );

    // Create a new Presentation
    let pres = new PptxGenJS();

    // Add first Slide
    let slide1 = pres.addSlide();



    // Add images to the first slide
    slide1.addImage({ path: pathVorlage + "image1.jpg", x: "0%", y: "0%", w: "100%", h: "100%" });
    slide1.addImage({ path: "images/logo1.png", x: "67.2%", y: "90.5%", w: "32.8%", h: "9.5%"});

let formattedDate = dateInput();


    const textStyle1 = {
        x: 1.5,
        y: 1.0,
        bold: true,
        fontSize: 46,
        color: "FFFFFF",
        align: 'center'
    };
    slide1.addText("ஆராதனை", textStyle1);

    // Adding formatted date text to slide
    if (formattedDate) {
        const textStyle2 = {
            x: 1.5,
            y: 1.75,
            bold: true,
            fontSize: 46,
            color: "FFFFFF",
            align: 'center'
        };
        slide1.addText(formattedDate, textStyle2);
    }
    


    // Adding slides
    addImageSlide(pres, imgConfig1, dataInpSngs[0]);
    addImageSlide(pres, imgConfig1, dataInpSngs[1]);

    // Add additional images and texts as specified
    addVorlageImageSlide(pres, pathVorlage + "image2.jpg"); // Slide 4
    addImageSlide(pres, imgConfig1, dataInpSngs[2]); // Slide 5
    addVorlageImageSlide(pres, pathVorlage + "image3.jpg"); // Slide 6
    addImageSlide(pres, imgConfig1, dataInpSngs[3]); // Slide 7

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
    addImageSlide(pres, imgConfig1, dataInpSngs[4]); // Slide 9
    addVorlageImageSlide(pres, pathVorlage + "image4.jpg"); // Slide 10

    if (dataInpSngs.length > 4) {
        for (let i = 5; i < dataInpSngs.length; i++) {
          if(dataInpSngs[i] != null || dataInpSngs[i] != undefined) {
            addImageSlide(pres, imgConfig1, dataInpSngs[i]);
          }
            
        }
    }

    

    // Save the presentation
    var fileName = "Gottesdienst " + formattedDate + ".pptx";
    pres.writeFile({ fileName: fileName });

}


function downloadPPTX(vorlageNb) {
  if(fileformat===1){


  switch(modeNb) {
    case 1:
      createStandardPPTX();
      break;
    case 2:
      createSongPPTX();
      break;
    
   
    default:
      createStandardPPTX();
  }
} else if(fileformat===2){


  switch(modeNb) {
    case 1:
      createStandardPDF();
      break;
    case 2:
      createSongPDF();
      break;
   
    default:
      createStandardPPTX();
  }
} else if(fileformat===3){
  switch(modeNb) {
    case 1:
      downloadStandardImg();
      break;
    case 2:
      downloadSongImg();
      break;
   
    default:
      downloadStandardImg();
  }


}


}

  





function getVorlageValue() {
  var vorlageElement = document.getElementById('vorlageNb');
  return vorlageElement.value;
}



function main() {
    //var textInputProcessed = inputCheck();
    
    downloadPPTX();
    

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



async function loadImage(url) {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
  });
}

function addCenteredText(pdf, text, pageWidth, pageHeight) {
  const fontSize = 24; // Adjust as needed
  pdf.setFontSize(fontSize);
  const textWidth = pdf.getTextWidth(text);
  const x = (pageWidth - textWidth) / 2;
  const y = pageHeight / 3;
  pdf.text(text, x, y);
}


async function createStandardPDF() {
  const pageWidth = 1920;
  const pageHeight = 1080;
  const imageWidth = 1920;
  const imageHeight = 1080;

// Original dimensions of the logo
const originalLogoWidth = 632;
const originalLogoHeight = 103;
// Scale factor
const scaleFactor = 1.0; // Adjust this value to scale the image

// Scaled dimensions
const logoWidth = originalLogoWidth * scaleFactor;
const logoHeight = originalLogoHeight * scaleFactor;


  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080]
  });

  let  pathVorlage = getPathForTemplate();


  const img1 = await loadImage(pathVorlage + "image1.jpg");
  const headingImg = await loadImage("images/text.png");
  const logoImg = await loadImage("images/logo1.png");



  

  pdf.addImage(img1, 'JPG', 0, 0, imageWidth, imageHeight);

  // Calculate position for the logo image
const logoX = pageWidth - logoWidth;
const logoY = pageHeight - logoHeight;

pdf.addImage(logoImg, 'PNG', logoX, logoY, logoWidth, logoHeight);



  const headingImgWidth = 981;
const headingImgHeight = 155;
const headingX = (pageWidth - headingImgWidth) / 2; // Centering the heading image
const headingY = 75; // Adjust Y position as needed

pdf.addImage(headingImg, 'PNG', headingX, headingY, headingImgWidth, headingImgHeight);


// Adding text under the heading image
let text = dateInput();
const textFontSize = 150; // Adjust font size as needed
pdf.setFont('helvetica', 'bold');
pdf.setFontSize(textFontSize);

// Set font color to white
pdf.setTextColor(255, 255, 255);

// Calculate x-coordinate for centering the text
const textWidth = pdf.getTextWidth(text);
const textX = (pageWidth - textWidth) / 2;
const textY = headingY + headingImgHeight + textFontSize; // Adjust Y position as needed

pdf.text(text, textX, textY);

  pdf.addPage([pageWidth, pageHeight]);


  await addImagePage(pdf, dataInpSngs[0]);
  pdf.addPage([pageWidth, pageHeight]);

  await addImagePage(pdf, dataInpSngs[1]);
  pdf.addPage([pageWidth, pageHeight]);

  const img2 = await loadImage(pathVorlage + "image2.jpg");
  pdf.addImage(img2, 'JPG', 0, 0, imageWidth, imageHeight);
  pdf.addPage([pageWidth, pageHeight]);

  await addImagePage(pdf, dataInpSngs[2]);
  pdf.addPage([pageWidth, pageHeight]);

  const img3 = await loadImage(pathVorlage + "image3.jpg");
  pdf.addImage(img3, 'JPG', 0, 0, imageWidth, imageHeight);
  pdf.addPage([pageWidth, pageHeight]);

  await addImagePage(pdf, dataInpSngs[3]);
  pdf.addPage([pageWidth, pageHeight]);

  const imgKor = await loadImage("images/korinther.jpg");
  pdf.addImage(imgKor, 'JPG', 0, 0, imageWidth, imageHeight);
  pdf.addPage([pageWidth, pageHeight]);

  await addImagePage(pdf, dataInpSngs[4]);
  pdf.addPage([pageWidth, pageHeight]);

  const img4 = await loadImage(pathVorlage + "image4.jpg");
  pdf.addImage(img4, 'JPG', 0, 0, imageWidth, imageHeight);
  



if(dataInpSngs.length>5){
  for (let i = 5; i < dataInpSngs.length; i++) {
    if(dataInpSngs[i] != null || dataInpSngs[i] != undefined) {
      if(i===5) pdf.addPage([pageWidth, pageHeight]);
    await addImagePage(pdf, dataInpSngs[i]);
    if (i < dataInpSngs.length-1) pdf.addPage([pageWidth, pageHeight]);
    }

  }
}


  let formattedDate = dateInput();
  let filename = "Nur Lieder " + formattedDate + ".pdf"
  pdf.save(filename);
}


async function createSongPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080]
  });

  if (dataInpSngs[0] != null || dataInpSngs[0] != undefined) {
      await addImagePage(pdf, dataInpSngs[0]);
      
  }

  for (let i = 1; i < dataInpSngs.length; i++) {
    if (dataInpSngs[i] != null || dataInpSngs[i] != undefined) {
        pdf.addPage([1920, 1080]);
        await addImagePage(pdf, dataInpSngs[i]);
        
       
    }


  }

  let formattedDate = dateInput();
  let filename = "Nur Lieder" + formattedDate + ".pdf"
  pdf.save(filename);
}



async function createFullPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080]
  });

  for (let i = 0; i < data.length; i++) {
      await addImagePage(pdf, data[i]);
      if (i < data.length-1) pdf.addPage([1920, 1080]);

  }

  let formattedDate = dateInput();
  let filename = "Alle Lieder " + formattedDate + ".pdf"
  pdf.save(filename);
}


async function addImagePage(pdf, data){
    let pathImg1 = "images/slides/" + data.filename[0] + ".png";
    console.log(pathImg1)
    const img1 = await loadImage(pathImg1);

    pdf.addImage(img1, 'PNG', 0, 0, 1920, 1080);

    if (data.filename[1] !== "") {
        let pathImg2 = "images/slides/" + data.filename[1] + ".png";
        const img2 = await loadImage(pathImg2);

        pdf.addPage([1920, 1080]);
        pdf.addImage(img2, 'PNG', 0, 0, 1920, 1080);
}

}


function downloadImage(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function downloadSongImg() {
  for(let i=0;i<dataInpSngs.length;i++){
    if (dataInpSngs[i] != null && dataInpSngs[i] != undefined) {
      await addSongImg(dataInpSngs[i])
    }

}
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
  });
}


async function addTextToImage(path, texts) {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const img = await loadImage(path);

  canvas.width = img.width;
  canvas.height = img.height;

  context.drawImage(img, 0, 0);
  context.font = 'bold 160px Calibri';
  context.fillStyle = 'white';
  context.textAlign = 'center';

  texts.forEach(textObj => {
      context.fillText(textObj.text, canvas.width / 2, textObj.yPosition);
  });

  return canvas.toDataURL('image/jpeg');
}

async function addLogoToImage(imageDataUrl, logoUrl, logoWidth, logoHeight, scaleFactor) {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  const logo = await loadImage(logoUrl);

  // Calculate scaled logo dimensions
  const scaledLogoWidth = logoWidth * scaleFactor;
  const scaledLogoHeight = logoHeight * scaleFactor;

  // Draw the base image
  const baseImage = await loadImage(imageDataUrl);
  context.drawImage(baseImage, 0, 0);

  // Calculate logo position
  const logoX = canvas.width - scaledLogoWidth;
  const logoY = canvas.height - scaledLogoHeight;

  // Draw the logo
  context.drawImage(logo, logoX, logoY, scaledLogoWidth, scaledLogoHeight);

  return canvas.toDataURL('image/png');
}


async function downloadStandardImg() {
  let  pathVorlage = getPathForTemplate();
  let date = dateInput();
  const texts = [
      { text: "ஆராதனை", yPosition: 150 },
      { text: date, yPosition: 325 }
  ];

  const modifiedImageUrl = await addTextToImage(pathVorlage+"image1.jpg", texts);
  const modifiedImageUrlLogo = await addLogoToImage(modifiedImageUrl, "images/logo1.png", 632,103,1);
  await downloadImage(modifiedImageUrlLogo, "1.Bild.png");

  await addSongImg(dataInpSngs[0]);
  await addSongImg(dataInpSngs[1]);



  const modifiedImageUrl1 = await addTextToImage(pathVorlage+"image2.jpg", texts);
  await downloadImage(modifiedImageUrl1, "2.Bild.png");

  await addSongImg(dataInpSngs[2]);

  const modifiedImageUrl2 = await addTextToImage(pathVorlage+"image3.jpg", texts);
  await downloadImage(modifiedImageUrl2, "3.Bild.png");

  await addSongImg(dataInpSngs[3]);

  const modifiedImageUrl3 = await addTextToImage("images/korinther.jpg", texts);
  await downloadImage(modifiedImageUrl3, "Korinther.png");

  addSongImg(dataInpSngs[4]);

  const modifiedImageUrl4 = await addTextToImage(pathVorlage+"image4.jpg", texts);
  await downloadImage(modifiedImageUrl4, "4.Bild.png");

}




async function addSongImg(songArr){
  songName = songArr.filename[0]+".png";
  outputName = songArr.id
  await downloadImage("images/slides/"+songName, outputName);

  if (songArr.filename[1] !== "") {
    songName = songArr.filename[1]+".png";
    outputName = songArr.id+"_slide2"
    await downloadImage("images/slides/"+songName, outputName);


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
  console.log("Selected value: " + selectedValue);
  // Handle select change logic here
  switch(selectedValue) {
    case 'default':
      fileformat=1;
      document.querySelector(".GenerateBtn").innerHTML= 'Download PPTX';
        break;
    case 'pdf':
      fileformat=2;
      document.querySelector(".GenerateBtn").innerHTML= 'Download PDF';
        break;
    case 'img':
      fileformat=3;
      document.querySelector(".GenerateBtn").innerHTML= 'Download IMG';
      break;

  }
}



window.onload = function() {
  loadJsonData();
  document.getElementById('dateInput').value = getNextSundayDateInp();

  dataInpSngs = []; 

  initializeEventListeners(); // Initialize event listeners for existing inputs

};



