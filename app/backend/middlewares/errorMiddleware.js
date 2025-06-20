import fs from "fs";

const errorMessages = fs.readFileSync("errorMessages.txt", "utf8");

export const errorMiddleware = (err, req, res, next) => {
    const clientVisible = err.clientVisible || false;
    let errorCode = clientVisible ? (err.errorCode || "020") : "020";
    if (errorCode.length > 3) errorCode = "020";
    if (errorCode.length < 3) errorCode.unshift("0");
    
    const messagePosition = errorMessages.search(errorCode+":");

    let statusCode = 500;
    let message = "Missing error message";
    if (messagePosition != -1) {
        message = "";
        statusCode = ""; 
        for(let i = 4; i < 255; i++) {
            const letter = errorMessages[messagePosition + i];
            if (letter == ";") i = 256;
            else {
                if (i < 8) statusCode += letter;
                else message += letter;
            }
        }
        statusCode = parseInt(statusCode) || 500;
    }
    console.log(err, ", message: ", message, ", statusCode:", statusCode);
    res.status(statusCode).json({ success: false, message });
};