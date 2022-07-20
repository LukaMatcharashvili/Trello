import * as EmailValidator from 'email-validator';

function validatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    if(password.length < 8) return res.status(400).json({ message: 'Password Length Should Be Greater Than 8!'});
    if(confirmPassword !== password) return res.status(400).json({ message: 'Passwords Should Match!'});

    return next()
}

function validateEmail (req, res, next) {
    const emailIsValid = EmailValidator.validate(req.body.email);
    if(emailIsValid) {
        return next()
    }else {
        return res.status(400).json({ message: 'Enter Valid Email!' })
    }
}

export {
    validatePassword,
    validateEmail
}
