const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD
    }
})

const sendEmail = async (mailOptions) => {
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Successfully send mail " + info.response);
        }
    })
}

const sendRecoverPasswordEmail = async (emailAddress, fullName, token) => {
    if (!emailAddress && !token) {
        return false;
    }
    try {
        const forgetPasswordEmailOptions = {
            from: process.env.MAILER_USERNAME,
            to: emailAddress,
            subject: `Password Recovery for ${process.env.APPLICATION_NAME} account`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>CNG Gas Billing - Password Reset</title>
                    </head>
                    <body>
                        <p>We've received a request to reset the password for your CNG Gas Billing account.</p>

                        <p>Email Address: ${emailAddress}</p>

                        <p>To set a new password, please click on the link below:</p>
                        <p><a href="http://localhost:3003/cng/reset-password?user=${token}">Click here to reset your password</a></p>

                        <p><b>Important:</b> You won't receive your new password in this email. Instead, you'll be able to create a new one after clicking the link.</p>

                        <p>If you did not request a password reminder, please ignore this message.</p>

                        <p>Regards,</p>
                        <p>Lokeshwaran</p>
                        <p>8660095614</p>
                        <p>deftlokeshwaran0612@gmail.com</p>
                    </body>
                </html>
            `
        }
        await sendEmail(forgetPasswordEmailOptions);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }

}

const sendFollowUpEmail = async (emailAddress, fullName, oneTimePassword) => {
    if (!emailAddress && !oneTimePassword) {
        return false;
    }
    try {
        const followUpEmailOptions = {
            from: process.env.MAILER_USERNAME,
            to: emailAddress,
            subject: `Welcome to ${process.env.APPLICATION_NAME}`,
            text: `
                Hi ${fullName},

                Greetings from CNG Gas Billing Operator!

                We're happy to welcome you to our system. To get started, follow these steps:

                1. Click the link below to login to your CNG Gas Billing Account:
                    http://localhost:3003/cng/login
                2. Enter the email address you provided when contacting the operator.
                3. Use the one-time verification password below to proceed with login.
                    Verification password: ${oneTimePassword}
                    Note: please do not share this password until login.
                4. Almost done, After click login update your new password and proceed.

                Feel free to contact me if you have any further questions.

                Regards,
                Lokeshwaran
                8660095614
                deftlokeshwaran0612@gmail.com
            `
        }
        await sendEmail(followUpEmailOptions);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = { sendFollowUpEmail, sendRecoverPasswordEmail }