const ending = ".png";

function createFullPPTX(){

    if (!data || data.length === 0) {
      console.error("Data is not available or empty");
      return;
  }


    let pres = new PptxGenJS();
      for (let i = 0; i < data.length; i++) {
          addImageSlide(pres, imgConfig1, data[i]);
      }
    
      return new Promise((resolve, reject) => {
        try {
          pres.writeFile({ fileName: "Alle Lieder.pptx" }).then(resolve).catch(reject);
        } catch (error) {
            reject(error);
        }
    });
  }

async function createSongPPTX(){
      // Create a new Presentation
      let pres = new PptxGenJS();

        for (let i = 0; i < dataInpSngs.length; i++) {
          if (dataInpSngs[i] != null && dataInpSngs[i] != undefined) {

            addImageSlide(pres, imgConfig1, dataInpSngs[i]);
          }
        }
      
      let formattedDate = dateInput();


        // Save the presentation (simulating async with Promise)
  return new Promise((resolve, reject) => {
    try {
      var fileName = "Nur Lieder " + formattedDate + ".pptx";
        pres.writeFile({ fileName: fileName }).then(resolve).catch(reject);
    } catch (error) {
        reject(error);
    }
});

    

}

  


async function createStandardPPTX() {
  let pathVorlage = getPathForTemplate();

  // Create a new Presentation
  let pres = new PptxGenJS();

  // Add first Slide
  let slide1 = pres.addSlide();

  // Add images to the first slide
  slide1.addImage({ path: pathVorlage + "image1.jpg", x: "0%", y: "0%", w: "100%", h: "100%" });
  slide1.addImage({ path: "images/logo1.png", x: "67.2%", y: "90.5%", w: "32.8%", h: "9.5%" });

  let formattedDate = dateInput();

  const textStyle1 = {
      x: 1.5,
      y: 1.0,
      bold: true,
      fontSize: 46,
      color: "FFFFFF",
      align: 'center',
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
          align: 'center',
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
      align: "center",
  });

  // Adding remaining slides
  addImageSlide(pres, imgConfig1, dataInpSngs[4]); // Slide 9

  if (dataInpSngs.length > 4) {
      for (let i = 5; i < dataInpSngs.length; i++) {
          if (dataInpSngs[i] != null || dataInpSngs[i] != undefined) {
              addImageSlide(pres, imgConfig1, dataInpSngs[i]);
          }
      }
  }

  // Add a black slide with no content
  let slide9 = pres.addSlide();
  slide9.background = { color: "000000" }; // Set the background color to black

  // Save the presentation (simulating async with Promise)
  return new Promise((resolve, reject) => {
      try {
          var fileName = "Gottesdienst " + formattedDate + ".pptx";
          pres.writeFile({ fileName: fileName }).then(resolve).catch(reject);
      } catch (error) {
          reject(error);
      }
  });
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
