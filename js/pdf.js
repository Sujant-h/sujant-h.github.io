async function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
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
      const img1 = await loadImage(pathImg1);
  
      pdf.addImage(img1, 'PNG', 0, 0, 1920, 1080);
  
      if (data.filename[1] !== "") {
          let pathImg2 = "images/slides/" + data.filename[1] + ".png";
          const img2 = await loadImage(pathImg2);
  
          pdf.addPage([1920, 1080]);
          pdf.addImage(img2, 'PNG', 0, 0, 1920, 1080);
  }
  
  }
  