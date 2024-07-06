import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            message: "Type in your URL",
            name: "URL",
        },
    ])
    .then((answers) => {
        const url = answers.URL;
        const qr_svg = qr.image(url, { type: 'png' });

        // Create a writable stream for the QR code image
        const writableStream = fs.createWriteStream("image.png");
        
        // Pipe the QR code image to the writable stream
        qr_svg.pipe(writableStream);

        // Handle the finish event
        writableStream.on('finish', () => {
            console.log("The QR code image has been saved as image.png");
        });

        // Save the URL in a text file
        fs.writeFile("URL.txt", url, (err) => {
            if (err) {
                console.error("Error writing URL.txt:", err);
            } else {
                console.log("The URL has been saved in URL.txt");
            }
        });
    })
    .catch((error) => {
        console.error("An error occurred:", error);
    });
