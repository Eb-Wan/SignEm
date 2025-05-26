import fs from "fs";

const errorMessages = fs.readFileSync("errorMessages.txt", "utf8");

export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const clientVisible = err.clientVisible || false;
    const errorCode = clientVisible ? (err.errorCode || "020") : "020";

    if (errorCode.length > 3) return res.status(statusCode).json({ success: false, message });
    if (errorCode.length < 3) errorCode.unshift("0");

    const messagePosition = errorMessages.search(errorCode);
    let message = "Missing error message";
    if (messagePosition != -1) {
        message = "";
        for(let i = 5; i < 255; i++) {
            const letter = errorMessages[messagePosition + i];
            if (letter == ";") i = 256;
            else message += letter;
        }
    }
    console.log(err);
    res.status(statusCode).json({ success: false, message });
};