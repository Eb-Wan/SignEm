import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.GMAIL_APP_PASS
    },
});

export const sendMail = async (subject, text, html, to) => {
    try {
        await transporter.sendMail({
            from: "SignEm <"+process.env.EMAIL_SENDER+">",
            to: to.toString(),
            subject,
            text,
            html
        });
        return true;
    } catch (error) {
        return error;
    } 
};