function downloadPPTX(jsonData) {
    console.log(jsonData);
    // 1. Create a new Presentation
    let pres = new PptxGenJS();


    // 2. Add a Slide
    let slide = pres.addSlide();

    let currentDate = new Date();
    
    // Find the next Sunday
    let nextSunday = new Date(currentDate);
    nextSunday.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
    
    // Format the date to dd.mm.yy
    let formattedDate = nextSunday.getDate().toString().padStart(2, '0') + '.' +
                        (nextSunday.getMonth() + 1).toString().padStart(2, '0') + '.' +
                        nextSunday.getFullYear();
    
    // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
    slide.addImage({ path: "images/image1.jpg", x: "0%", y:"0%", w: "100%", h: "100%" });
    slide.addImage({ path: "images/logo1.png", x: "75%", y:"83%", w:"25%", h:"17%", transparency: 15});
    
    slide.addText(formattedDate, {
        x: 1.5,
        y: 1.5,
        bold: true,
        fontSize: 64,
        color: "FFFFFF",
        align: pres.AlignH.center,
    });
        


/*  
        SLIDE 2,    Erstes Lied

*/

    let slide2 = pres.addSlide();


    //Title of seconf slide
    slide2.background = {color: "000000"}
    slide2.addText(jsonData[0].title, {
        y: 0.3333,
        bold: true,
        fontSize: 24,
        color: "FFFFFF",
        w: "100%",
        align: "center",
    });


var songText = splitText(jsonData[0].text);
var blocks = songText.length;




    switch (blocks) {
        case 0:
          
          break;
        case 1:
            console.log(1);
            slide2.addText(songText[0], {
                x: "25%",
                y: "55%",
                w: "80%",
                autoFit: true,
                fontSize: 14,
                color: "FFFFFF",
                align: "left",
                isTextBox: true,
                lang: "ta",
            });
    


          
          break;
        case 2:
          console.log('2');

          slide2.addText(songText[0], {
            x: "3%",
            y: "55%",
            w: "45%",
            autoFit: true,
            fontSize: 14,
            color: "FFFFFF",
            align: "left",
            isTextBox: true,
            lang: "ta",
        });

        slide2.addText(songText[1], {
            x: "53%",
            y: "55%",
            w: "45%",
            autoFit: true,
            fontSize: 14,
            color: "FFFFFF",
            align: "left",
            isTextBox: true,
        });
          // Expected output: "Mangoes and papayas are $2.79 a pound."
          break;
        case 3:
            console.log('3');
            // Expected output: "Mangoes and papayas are $2.79 a pound."
            break;
        case 3:
            console.log('4');
            // Expected output: "Mangoes and papayas are $2.79 a pound."
            break;
        default:
          console.log(`Sorry, we are out of.`);
      }



/*

        SLIDE 3,    Zweites Lied

*/

let slide3 = pres.addSlide();


//Title of seconf slide
slide3.background = {color: "000000"}
slide3.addText(jsonData[1].title, {
    y: 0.3333,
    bold: true,
    fontSize: 24,
    color: "FFFFFF",
    w: "100%",
    align: "center",
});


songText = splitText(jsonData[1].text);
blocks = songText.length;




switch (blocks) {
    case 0:
      
      break;
    case 1:
        console.log(1);
        slide3.addText(songText[0], {
            x: "25%",
            y: "55%",
            w: "80%",
            autoFit: true,
            fontSize: 14,
            color: "FFFFFF",
            align: "left",
            isTextBox: true,
            lang: "ta",
        });

      
      break;
    case 2:
      console.log('2');

      slide3.addText(songText[0], {
        x: "3%",
        y: "55%",
        w: "45%",
        autoFit: true,
        fontSize: 14,
        color: "FFFFFF",
        align: "left",
        isTextBox: true,
        lang: "ta",
    });

    slide3.addText(songText[1], {
        x: "53%",
        y: "55%",
        w: "45%",
        autoFit: true,
        fontSize: 14,
        color: "FFFFFF",
        align: "left",
        isTextBox: true,
    });
      // Expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    case 3:
        console.log('3');
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
    case 3:
        console.log('4');
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
    default:
      console.log(`Sorry, we are out of.`);
  }


  /* 

        SLIDE 4,    Zweites Bild

  */
  
let slide4 = pres.addSlide();        
slide4.addImage({ path: "images/image2.jpg", x: "0%", y:"0%", w: "100%", h: "100%" });


  /* 

        SLIDE 5,    Drittes Lied

  */


let slide5 = pres.addSlide();


//Title of seconf slide
slide5.background = {color: "000000"}
slide5.addText(jsonData[2].title, {
    y: 0.3333,
    bold: true,
    fontSize: 24,
    color: "FFFFFF",
    w: "100%",
    align: "center",
});


songText = splitText(jsonData[2].text);
blocks = songText.length;




switch (blocks) {
    case 0:
      
      break;
    case 1:
        console.log(1);
        slide5.addText(songText[0], {
            x: "25%",
            y: "55%",
            w: "80%",
            autoFit: true,
            fontSize: 14,
            color: "FFFFFF",
            align: "left",
            isTextBox: true,
            lang: "ta",
        });

      
      break;
    case 2:
      console.log('2');

      slide5.addText(songText[0], {
        x: "3%",
        y: "55%",
        w: "45%",
        autoFit: true,
        fontSize: 14,
        color: "FFFFFF",
        align: "left",
        isTextBox: true,
        lang: "ta",
    });

    slide5.addText(songText[1], {
        x: "53%",
        y: "55%",
        w: "45%",
        autoFit: true,
        fontSize: 14,
        color: "FFFFFF",
        align: "left",
        isTextBox: true,
    });
      // Expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    case 3:
        console.log('3');
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
    case 3:
        console.log('4');
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
    default:
      console.log(`Sorry, we are out of.`);
  }





       // SLIDE 6,    Drittes Bild



  
let slide6 = pres.addSlide();        
slide6.addImage({ path: "images/image3.jpg", x: "0%", y:"0%", w: "100%", h: "100%" });



  /* 

        SLIDE 7,    Viertes Lied

  */


        let slide7 = pres.addSlide();


        //Title of seconf slide
        slide7.background = {color: "000000"}
        slide7.addText(jsonData[3].title, {
            y: 0.3333,
            bold: true,
            fontSize: 24,
            color: "FFFFFF",
            w: "100%",
            align: "center",
        });
        
        
        songText = splitText(jsonData[3].text);
        blocks = songText.length;
        
        
        
        
        switch (blocks) {
            case 0:
              
              break;
            case 1:
                console.log(1);
                slide7.addText(songText[0], {
                    x: "25%",
                    y: "55%",
                    w: "80%",
                    autoFit: true,
                    fontSize: 14,
                    color: "FFFFFF",
                    align: "left",
                    isTextBox: true,
                    lang: "ta",
                });
        
              
              break;
            case 2:
              console.log('2');
        
              slide7.addText(songText[0], {
                x: "3%",
                y: "55%",
                w: "45%",
                autoFit: true,
                fontSize: 14,
                color: "FFFFFF",
                align: "left",
                isTextBox: true,
                lang: "ta",
            });
        
            slide7.addText(songText[1], {
                x: "53%",
                y: "55%",
                w: "45%",
                autoFit: true,
                fontSize: 14,
                color: "FFFFFF",
                align: "left",
                isTextBox: true,
            });
              // Expected output: "Mangoes and papayas are $2.79 a pound."
              break;
            case 3:
                console.log('3');
                // Expected output: "Mangoes and papayas are $2.79 a pound."
                break;
            case 3:
                console.log('4');
                // Expected output: "Mangoes and papayas are $2.79 a pound."
                break;
            default:
              console.log(`Sorry, we are out of.`);
          }


    /* 

        SLIDE 8,    1. Korinther 11; 23-32

  */

            // 2. Add a Slide
    let slide8 = pres.addSlide();

    
    slide8.addText("1. கொரிந்தியர் 11; 23-32\n\n1.Korinther 11; 23-32", {
        x: "0%",
        y: "50%",
        w: "100%",
        bold: true,
        fontSize: 50,
        color: "000000",
        align:"center",
      
    });


/* 

        SLIDE 9,    Fünftes und letztes Lied

*/


let slide9 = pres.addSlide();

slide9.background = {color: "000000"}

//Title of  slide

slide9.addText(jsonData[4].title, {
    y: 0.3333,
    bold: true,
    fontSize: 24,
    color: "FFFFFF",
    w: "100%",
    align: "center",
});

songText = splitText(jsonData[4].text);
blocks = songText.length;




switch (blocks) {
    case 0:
      
      break;
    case 1:
        console.log(1);
        slide9.addText(songText[0], {
            x: "25%",
            y: "55%",
            w: "80%",
            autoFit: true,
            fontSize: 14,
            color: "FFFFFF",
            align: "left",
            isTextBox: true,
            lang: "ta",
        });

      
      break;
    case 2:
      console.log('2');

      slide9.addText(songText[0], {
        x: "3%",
        y: "55%",
        w: "45%",
        autoFit: true,
        fontSize: 14,
        color: "FFFFFF",
        align: "left",
        isTextBox: true,
        lang: "ta",
    });

    slide9.addText(songText[1], {
        x: "53%",
        y: "55%",
        w: "45%",
        autoFit: true,
        fontSize: 14,
        color: "FFFFFF",
        align: "left",
        isTextBox: true,
    });
      // Expected output: "Mangoes and papayas are $2.79 a pound."
      break;
    case 3:
        console.log('3');
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
    case 3:
        console.log('4');
        // Expected output: "Mangoes and papayas are $2.79 a pound."
        break;
    default:
      console.log(`Sorry, we are out of.`);
  }


      /* 

        SLIDE 10,    Letzte Folie

  */

            // 2. Add a Slide
            let slide10 = pres.addSlide();
            slide10.background = {color: "000000"}







    // 4. Save the Presentation
    pres.writeFile({ fileName: "Sample Presentation.pptx" });
}







function splitText(songText) {
        // Count the occurrences of "+++"
        const countPluses = (songText.match(/\+\+\+/g) || []).length;

        // Split the text by "+++"
        const textSegments = songText.split('+++');
    
        // Optionally, you might want to trim whitespace if needed
        const trimmedTextSegments = textSegments.map(text => text.trim());
        return trimmedTextSegments;
}

async function fetchDataAndFilter(ids) {
    try {
        const response = await fetch('output.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Convert input IDs to strings to match JSON data formatting
        const stringIds = ids.map(id => id.toString());

        // Create a map from the JSON data for quick lookup
        const dataMap = new Map(data.map(item => [item.id, item]));

        // Collect results based on the order of provided IDs using the map for constant time lookup
        const results = stringIds.map(id => dataMap.get(id)).filter(item => item !== undefined);

        // Log the ordered matching entries to verify correct ordering and presence
        //console.log('Ordered matching entries:', results);
        return results;
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

function inputCheck() {
    var textInputs = [];
    var inputSet = new Set(); // Used to track unique inputs for duplicate detection
    var errorMessage = document.getElementById("error-message"); // Assume there's an HTML element with this ID
    
    errorMessage.innerHTML = ""; // Clear previous messages

    for (var i = 1; i <= 5; i++) {
      var input = document.getElementById("textInput" + i).value.trim();
      if (input === "") {
        errorMessage.innerHTML = "Please enter text in all fields.";
        throw new Error("Please enter text in all fields."); // Log the error but don't break the flow
        return;
      }
      if (inputSet.has(input)) {
        errorMessage.innerHTML = "Duplicate text found: " + input + ". Please enter unique texts.";
        return;
      }
      inputSet.add(input);
      textInputs.push(input);
    }
    downloadMessage();
    return textInputs;
}


function downloadMessage(){
    const message = document.querySelector('.downloadMessage');
    message.style.display = 'block'; // Make the message box visible
    setTimeout(() => {
        message.classList.add('fade-in'); // Start the fade-in effect
    }, 100); // Add a slight delay to ensure the style change has taken effect

    // Optional: Automatically hide the message after a few seconds
    setTimeout(() => {
        message.classList.remove('fade-in'); // Remove the fade class
        message.style.display = 'none'; // Hide the message box
    }, 4000); // Time in milliseconds (4 seconds)
}



// Wrap your main functionality in an async function to use await
async function main() {




    var textInputProcessed = inputCheck();
    var inputFormLength = document.querySelectorAll("input").length;
    
    // Example usage: searching for entries with ids 1 and 10
    fetchDataAndFilter(textInputProcessed).then(result => {
        if (result.length == inputFormLength) {
            downloadPPTX(result);
        } else {
            alert("Nicht alle Lieder wurden gefunden");
        }
    });

    

}
