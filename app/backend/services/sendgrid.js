import sgMail from '@sendgrid/mail';

export const sendEmail = async (to, subject, html) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to,
            from: process.env.SENDGRID_SENDER,
            subject,
            text: subject,
            html
        }

        await sgMail.send(msg);
        return true
    } catch (error) {
        return error;
    }
}

export const sendMultipleEmails = async (to, subject, html) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to,
            from: process.env.SENDGRID_SENDER,
            subject,
            text: subject,
            html
        }

        await sgMail.sendMultiple(msg);
        return true
    } catch (error) {
        return error;
    }
}