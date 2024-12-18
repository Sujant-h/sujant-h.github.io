function downloadImage(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  async function createSongImg() {
    for(let i=0;i<dataInpSngs.length;i++){
      if (dataInpSngs[i] != null && dataInpSngs[i] != undefined) {
        await addImageSng(dataInpSngs[i]);
      }
  
  }
  }
  
  async function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image from ${url}`));
      img.src = url;
    });
  }
  
  
  async function addTextToImage(path, texts = []) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const img = await loadImage(path);
  
    canvas.width = img.width;
    canvas.height = img.height;
  
    context.drawImage(img, 0, 0);
    context.font = 'bold 160px Calibri';
    context.fillStyle = 'white';
    context.textAlign = 'center';
  
    if (Array.isArray(texts) && texts.length > 0) {
      texts.forEach(textObj => {
        context.fillText(textObj.text, canvas.width / 2, textObj.yPosition);
      });
    }
  
    return canvas.toDataURL('image/jpeg');
  }
  
  
  
  async function addImageSng(array) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let path = "images/slides/"+array.filename[0]+".png"
    const img = await loadImage(path);
  
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
  
  
    
    const sng1 = canvas.toDataURL('image/png');
    await downloadImage(sng1, array.id+".png");
  
    if (array.filename[1] !== "") {
      let path2 = "images/slides/"+array.filename[1]+".png"
      const img2 = await loadImage(path2);
      canvas.width = img2.width;
      canvas.height = img2.height;
      context.drawImage(img, 0, 0);
      const sng2 = canvas.toDataURL('image/png');
      await downloadImage(sng2, array.id+"_slide2.png");
  
  }
  
  }
  
  async function addImageSngWithoutDownload(array) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    let path = "images/slides/" + array.filename[0] + ".png";
    const img = await loadImage(path);
  
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
  
    const sng1 = canvas.toDataURL('image/png');
  
    if (array.filename[1] !== "") {
      let path2 = "images/slides/" + array.filename[1] + ".png";
      const img2 = await loadImage(path2);
      canvas.width = img2.width;
      canvas.height = img2.height;
      context.drawImage(img2, 0, 0); // Note: corrected to draw img2, not img
      const sng2 = canvas.toDataURL('image/png');
      return [sng1, sng2]; // Return an array containing both images
    } else {
      return [sng1]; // Return an array containing just one image
    }
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
  
  
  async function createStandardImg() {
    let pathVorlage = getPathForTemplate();
    let date = dateInput();
    const texts = [
      { text: "ஆராதனை", yPosition: 150 },
      { text: date, yPosition: 325 }
    ];
  
    const zip = new JSZip();
  
    const modifiedImageUrl = await addTextToImage(pathVorlage + "image1.jpg", texts);
    const modifiedImageUrlLogo = await addLogoToImage(modifiedImageUrl, "images/logo1.png", 632, 103, 1);
    zip.file("1.Bild.png", await fetch(modifiedImageUrlLogo).then(res => res.blob()));
  
    const modifiedImageUrl1 = await addTextToImage(pathVorlage + "image2.jpg", []);
    zip.file("2.Bild.png", await fetch(modifiedImageUrl1).then(res => res.blob()));
  
    const modifiedImageUrl2 = await addTextToImage(pathVorlage + "image3.jpg", []);
    zip.file("3.Bild.png", await fetch(modifiedImageUrl2).then(res => res.blob()));
  
    const modifiedImageUrl3 = await addTextToImage("images/korinther.jpg", []);
    zip.file("Korinther.png", await fetch(modifiedImageUrl3).then(res => res.blob()));
  
  
    // Add song images
    for (let i = 0; i < dataInpSngs.length; i++) {
      const songImages = await addImageSngWithoutDownload(dataInpSngs[i]);
      for (let j = 0; j < songImages.length; j++) {
        const imageUrl = songImages[j];
        const imageBlob = await fetch(imageUrl).then(res => res.blob());
        if (j === 0) {
          zip.file(`${dataInpSngs[i].id}.png`, imageBlob); // First file with id as name
        } else {
          zip.file(`${dataInpSngs[i].id}_slide2.png`, imageBlob); // Second file with suffix
        }
      }
    }
  
    // Generate and download zip file
    zip.generateAsync({ type: "blob" }).then(function (content) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      let date = dateInput();
      link.download = "Gottesdienst "+date+".zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  async function createFullImage() {
    const zip = new JSZip(); // Initialize zip object
    
    for (let i = 0; i < data.length; i++) {
      const songImages = await addImageSngWithoutDownload(data[i]);
      for (let j = 0; j < songImages.length; j++) {
        const imageUrl = songImages[j];
        const imageBlob = await fetch(imageUrl).then(res => res.blob());
        if (j === 0) {
          zip.file(`${data[i].id}.png`, imageBlob); // First file with id as name
        } else {
          zip.file(`${data[i].id}_slide2.png`, imageBlob); // Second file with suffix
        }
      }
    }

  // Generate and download zip file
  zip.generateAsync({ type: "blob" }).then(function (content) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = "Alle Lieder" + ".zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

