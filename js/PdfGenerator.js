/////////////////////////////
///////PDF GENERATION///////
///////////////////////////
const { PDFDocument, StandardFonts, rgb, degrees, grayscale } = PDFLib;
//createPdf();
async function createPdf(info, pdfName) {
    var infoArray = info.split("&");
    var infoLidarsArray = infoArray[0].split("$");
    var infoPropsArray = infoArray[1].split("$");
    var simulationImageTopView = infoArray[3];
    var simulationImagePerspective = infoArray[5];
    var simulationImageTopViewDotsMode = infoArray[7];
    var simulationImagePerspectiveDotsMode = infoArray[9];
    var coverageQuality = infoArray[10];

    //Page 0
    const pdfDoc = await PDFLib.PDFDocument.create();

    var screenTopViewBytes = Base64ToArrayBuffer(simulationImageTopView);
    var screenTopViewImage = await pdfDoc.embedPng(screenTopViewBytes);
    var screenPerspectiveBytes = Base64ToArrayBuffer(simulationImagePerspective);
    var screenPerspectiveImage = await pdfDoc.embedPng(screenPerspectiveBytes);
    var screenTopViewDotsModeBytes = Base64ToArrayBuffer(simulationImageTopViewDotsMode);
    var screenTopViewDotsModeImage = await pdfDoc.embedPng(screenTopViewDotsModeBytes);
    var screenPerspectiveDotsModeBytes = Base64ToArrayBuffer(simulationImagePerspectiveDotsMode);
    var screenPerspectiveDotsModeImage = await pdfDoc.embedPng(screenPerspectiveDotsModeBytes);

    const page_0 = pdfDoc.addPage([350, 500]);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const pathLogoOutsight = 'https://assets.website-files.com/5fb4b0553958b7358344a430/60136a77b296b7de8b823186_Outsight%20LOGO%20PRESS.png';
    const logoOutsightBytes = await fetch(pathLogoOutsight).then((res) => res.arrayBuffer());
    const logoOutsightImage = await pdfDoc.embedPng(logoOutsightBytes);

    page_0.drawImage(logoOutsightImage, {
        x: 15,
        y: page_0.getHeight() - logoOutsightImage.scale(0.05).height,
        width: logoOutsightImage.scale(0.05).width,
        height: logoOutsightImage.scale(0.05).height,
    });

    //Top of page
    var title = "Simulation report";
    var simName = pdfName;
    page_0.drawText(title, {x: page_0.getWidth() - title.length * 5, y: page_0.getHeight() - 20 ,size: 10});
    //page_0.drawText(simName, {x: page_0.getWidth() - simName.length * 5, y: page_0.getHeight() - 40 ,size: 10});

    //Imported image displaying

    DrawScreenShotMiddlePage(page_0, screenTopViewImage);
    var titleImagePosY = (page_0.getHeight() / 2 - ((page_0.getWidth() - 20) * screenTopViewImage.scale(1).height / screenTopViewImage.scale(1).width) / 2) 
    + ((page_0.getWidth() - 20) * screenTopViewImage.scale(1).height / screenTopViewImage.scale(1).width) + 10;
    page_0.drawText(coverageQuality, {x: page_0.getWidth() / 2 - coverageQuality.length * 4, y: titleImagePosY,size: 10});

    if(infoLidarsArray.length < 72)
    {
        const page_lidars1 = pdfDoc.addPage([350, 500]);
        page_lidars1.drawText("LiDARs in the simulation", {x: 15, y: page_lidars1.getHeight() - 75 ,size: 10});
        page_lidars1.drawImage(logoOutsightImage, {
            x: 15,
            y: page_lidars1.getHeight() - logoOutsightImage.scale(0.05).height,
            width: logoOutsightImage.scale(0.05).width,
            height: logoOutsightImage.scale(0.05).height,
        });
        DrawLidarsTable(infoLidarsArray, page_lidars1, 4, 75, 20, 25, page_lidars1.getHeight() - 115);
    }
    else if(infoLidarsArray.length >= 72 && infoLidarsArray.length < 144)
    {
        const page_lidars1 = pdfDoc.addPage([350, 500]);
        page_lidars1.drawText("LiDARs in the simulation", {x: 15, y: page_lidars1.getHeight() - 75 ,size: 10});
        page_lidars1.drawImage(logoOutsightImage, {
            x: 15,
            y: page_lidars1.getHeight() - logoOutsightImage.scale(0.05).height,
            width: logoOutsightImage.scale(0.05).width,
            height: logoOutsightImage.scale(0.05).height,
        });
        DrawLidarsTable(infoLidarsArray.slice(0, 76), page_lidars1, 4, 75, 20, 25, page_lidars1.getHeight() - 115);
        const page_lidars2 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(72, infoLidarsArray.length), page_lidars2, 4, 75, 20, 25, page_lidars2.getHeight() - 115);
    }
    else if(infoLidarsArray.length >= 144 && infoLidarsArray.length < 216)
    {
        const page_lidars1 = pdfDoc.addPage([350, 500]);
        page_lidars1.drawText("LiDARs in the simulation", {x: 15, y: page_lidars1.getHeight() - 75 ,size: 10});
        page_lidars1.drawImage(logoOutsightImage, {
            x: 15,
            y: page_lidars1.getHeight() - logoOutsightImage.scale(0.05).height,
            width: logoOutsightImage.scale(0.05).width,
            height: logoOutsightImage.scale(0.05).height,
        });
        DrawLidarsTable(infoLidarsArray.slice(0, 76), page_lidars1, 4, 75, 20, 25, page_lidars1.getHeight() - 115);
        const page_lidars2 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(72, 148), page_lidars2, 4, 75, 20, 25, page_lidars2.getHeight() - 115);
        const page_lidars3 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(144, infoLidarsArray.length), page_lidars3, 4, 75, 20, 25, page_lidars3.getHeight() - 115);
    }
    else if(infoLidarsArray.length >= 216 && infoLidarsArray.length < 288)
    {
        const page_lidars1 = pdfDoc.addPage([350, 500]);
        page_lidars1.drawText("LiDARs in the simulation", {x: 15, y: page_lidars1.getHeight() - 75 ,size: 10});
        page_lidars1.drawImage(logoOutsightImage, {
            x: 15,
            y: page_lidars1.getHeight() - logoOutsightImage.scale(0.05).height,
            width: logoOutsightImage.scale(0.05).width,
            height: logoOutsightImage.scale(0.05).height,
        });
        DrawLidarsTable(infoLidarsArray.slice(0, 76), page_lidars1, 4, 75, 20, 25, page_lidars1.getHeight() - 115);
        const page_lidars2 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(72, 148), page_lidars2, 4, 75, 20, 25, page_lidars2.getHeight() - 115);
        const page_lidars3 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(144, 220), page_lidars3, 4, 75, 20, 25, page_lidars3.getHeight() - 115);
        const page_lidars4 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(216, infoLidarsArray.length), page_lidars4, 4, 75, 20, 25, page_lidars4.getHeight() - 115);
    }
    else if(infoLidarsArray.length >= 288 && infoLidarsArray.length < 360)
    {
        const page_lidars1 = pdfDoc.addPage([350, 500]);
        page_lidars1.drawText("LiDARs in the simulation", {x: 15, y: page_lidars1.getHeight() - 75 ,size: 10});
        page_lidars1.drawImage(logoOutsightImage, {
            x: 15,
            y: page_lidars1.getHeight() - logoOutsightImage.scale(0.05).height,
            width: logoOutsightImage.scale(0.05).width,
            height: logoOutsightImage.scale(0.05).height,
        });
        DrawLidarsTable(infoLidarsArray.slice(0, 76), page_lidars1, 4, 75, 20, 25, page_lidars1.getHeight() - 115);
        const page_lidars2 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(72, 148), page_lidars2, 4, 75, 20, 25, page_lidars2.getHeight() - 115);
        const page_lidars3 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(144, 220), page_lidars3, 4, 75, 20, 25, page_lidars3.getHeight() - 115);
        const page_lidars4 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(216, 292), page_lidars4, 4, 75, 20, 25, page_lidars4.getHeight() - 115);
        const page_lidars5 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(288, infoLidarsArray.length), page_lidars5, 4, 75, 20, 25, page_lidars5.getHeight() - 115);
    }
    else if(infoLidarsArray.length >= 360 && infoLidarsArray.length < 432)
    {
        const page_lidars1 = pdfDoc.addPage([350, 500]);
        page_lidars1.drawText("LiDARs in the simulation", {x: 15, y: page_lidars1.getHeight() - 75 ,size: 10});
        page_lidars1.drawImage(logoOutsightImage, {
            x: 15,
            y: page_lidars1.getHeight() - logoOutsightImage.scale(0.05).height,
            width: logoOutsightImage.scale(0.05).width,
            height: logoOutsightImage.scale(0.05).height,
        });
        DrawLidarsTable(infoLidarsArray.slice(0, 76), page_lidars1, 4, 75, 20, 25, page_lidars1.getHeight() - 115);
        const page_lidars2 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(72, 148), page_lidars2, 4, 75, 20, 25, page_lidars2.getHeight() - 115);
        const page_lidars3 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(144, 220), page_lidars3, 4, 75, 20, 25, page_lidars3.getHeight() - 115);
        const page_lidars4 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(216, 292), page_lidars4, 4, 75, 20, 25, page_lidars4.getHeight() - 115);
        const page_lidars5 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(288, 364), page_lidars5, 4, 75, 20, 25, page_lidars5.getHeight() - 115);
        const page_lidars6 = pdfDoc.addPage([350, 500]);
        DrawLidarsTable(infoLidarsArray.slice(360, infoLidarsArray.length), page_lidars6, 4, 75, 20, 25, page_lidars6.getHeight() - 115);
    }

    //Page 2
    const page_props = pdfDoc.addPage([350, 500]);
    page_props.drawImage(logoOutsightImage, {
        x: 15,
        y: page_props.getHeight() - logoOutsightImage.scale(0.05).height,
        width: logoOutsightImage.scale(0.05).width,
        height: logoOutsightImage.scale(0.05).height,
    });
    page_props.drawText("3D objects in the scene", {x: 15, y: page_props.getHeight() - 75 ,size: 10});
    DrawPropsTable(page_props, 3, 90, 20, 40, page_props.getHeight() - 115);
    page_props.drawText(coverageQuality, {x: 15, y: 215 ,size: 10});


    //Page 3
    const page_screenshots1 = pdfDoc.addPage([350, 500]);
    page_screenshots1.drawImage(logoOutsightImage, {
        x: 15,
        y: page_0.getHeight() - logoOutsightImage.scale(0.05).height,
        width: logoOutsightImage.scale(0.05).width,
        height: logoOutsightImage.scale(0.05).height,
    });
    page_screenshots1.drawText("Screenshots of the simulation", {x: 15, y: page_props.getHeight() - 65 ,size: 10});
    
    DrawScreenShotTopPage(page_screenshots1, screenTopViewImage);

    
    DrawScreenShotBottomPage(page_screenshots1, screenPerspectiveImage);

    //Page 3
    const page_screenshots2 = pdfDoc.addPage([350, 500]);
    page_screenshots2.drawImage(logoOutsightImage, {
        x: 15,
        y: page_0.getHeight() - logoOutsightImage.scale(0.05).height,
        width: logoOutsightImage.scale(0.05).width,
        height: logoOutsightImage.scale(0.05).height,
    });
    
    
    DrawScreenShotTopPage(page_screenshots2, screenTopViewDotsModeImage);

    
    DrawScreenShotBottomPage(page_screenshots2, screenPerspectiveDotsModeImage);
    
    //Draw PDF
    /*const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri;*/

    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, pdfName + "_report" + ".pdf", "application/pdf");

    function DrawLidarsTable(lidarsInfo ,page, nbColumns, cellWidth, cellHeight, posX, posY)
    {
        var k = 0;
        for (i = 0; i < lidarsInfo.length / 4; i++){
            for (j = 0; j < nbColumns; j++){
                //Table header
                switch (i){
                    case 0:
                        var txt = "LiDAR";
                        page.drawText(txt, {x: posX + (i * cellWidth) + cellWidth / 2 - (txt.length * 5) / 2, y: posY + cellHeight / 4, size: 8});
                        break;
                    case 1:
                        var txt = "Resolution";
                        page.drawText(txt, {x: posX + (i * cellWidth) + cellWidth / 2 - (txt.length * 5) / 2, y: posY + cellHeight / 4, size: 8});
                        break;
                    case 2:
                        var txt = "Position";
                        page.drawText(txt, {x: posX + (i * cellWidth) + cellWidth / 2 - (txt.length * 5) / 2, y: posY + cellHeight / 4, size: 8});
                        var txt = "Tilt (still in dev.)";
                        page.drawText(txt, {x: posX + ((i + 1) * cellWidth) + cellWidth / 2 - (txt.length * 3) / 2, y: posY + cellHeight / 4, size: 7});
                        break;
                    case 3:
                        var txt = "Tilt (still in dev.)";
                        page.drawText(txt, {x: posX + (i * cellWidth) + cellWidth / 2 - (txt.length * 3) / 2, y: posY + cellHeight / 4, size: 7});
                        break;
                    default:
                        break;
                }

                page.drawRectangle({
                    x: posX + (j * cellWidth),
                    y: posY - (i * cellHeight),
                    width: cellWidth,
                    height: cellHeight,
                    borderWidth: 1,
                    borderColor: grayscale(0),
                    color: grayscale(1),
                    opacity: 0.5,
                    borderOpacity: 0.75,
                });
                if (k >= nbColumns && k <= infoLidarsArray.length + 4){
                    var cellText = lidarsInfo[k - nbColumns];
                    page.drawText(cellText, {x: posX + (j * cellWidth) + cellWidth/2 - (cellText.length * 1.5), y: posY - (i * cellHeight) + (cellHeight / 2), size: 6});
                }
                k++;
            }
        }
    }
    function DrawPropsTable(page, nbColumns, cellWidth, cellHeight, posX, posY)
    {
        var k = 0;
        for (i = 0; i < (infoPropsArray.length / 3) + 1; i++){
            for (j = 0; j < nbColumns; j++){
                //Table header
                switch (i){
                    case 0:
                        var txt = "Type Of Object";
                        page.drawText(txt, {x: posX + (i * cellWidth) + cellWidth / 3 - (txt.length * 3) / 2, y: posY + cellHeight / 4, size: 8});
                        break;
                    case 1:
                        var txt = "Average Hits Count";
                        page.drawText(txt, {x: posX + (i * cellWidth) + cellWidth / 3 - (txt.length * 3) / 2, y: posY + cellHeight / 4, size: 8});
                        break;
                    case 2:
                        var txt = "Hits Count Stand. Dev.";
                        page.drawText(txt, {x: posX + (i * cellWidth) + cellWidth / 3 - (txt.length * 2) / 2, y: posY + cellHeight / 4, size: 7});
                        break;                    
                    default:
                        break;
                }

                page.drawRectangle({
                    x: posX + (j * cellWidth),
                    y: posY - (i * cellHeight),
                    width: cellWidth,
                    height: cellHeight,
                    borderWidth: 1,
                    borderColor: grayscale(0),
                    color: grayscale(1),
                    opacity: 0.5,
                    borderOpacity: 0.75,
                });
                if (k >= nbColumns && k <= infoPropsArray.length + 3){
                    var cellText = infoPropsArray[k - nbColumns];
                    page.drawText(cellText, {x: posX + (j * cellWidth) + cellWidth/3 - (cellText.length * 1.5), y: posY - (i * cellHeight) + (cellHeight / 2), size: 6});
                }
                k++;
            }
        }
    }

    function Base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    function DrawScreenShotTopPage(page, image){
        page.drawImage(image, {
            x: 10,
            y: page.getHeight() - ((page.getWidth() - 20) * image.scale(1).height / image.scale(1).width) - 90,
            width: page.getWidth() - 20,
            height: (page.getWidth() - 20) * image.scale(1).height / image.scale(1).width,
        });
    }

    function DrawScreenShotBottomPage(page, image){
        page.drawImage(image, {
            x: 10,
            y: 25,
            width: page.getWidth() - 20,
            height: (page.getWidth() - 20) * image.scale(1).height / image.scale(1).width + 25,
        });
    }

    function DrawScreenShotMiddlePage(page, image){
        page.drawImage(image, {
            x: 10,
            y: page.getHeight() / 2 - ((page.getWidth() - 20) * image.scale(1).height / image.scale(1).width) / 2,
            width: page.getWidth() - 20,
            height: (page.getWidth() - 20) * image.scale(1).height / image.scale(1).width,
        });
    }
}