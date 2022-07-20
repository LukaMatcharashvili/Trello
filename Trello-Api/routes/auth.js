import express from 'express';
import { registerUser, verifyUserEmail, loginUser, whoami, deleteUser, updateUser, receiveEmailForPasswordReset, resetPassword } from '../controllers/auth.js'
import { validateEmail, validatePassword } from '../middlewares/validators.js'
import passport from 'passport';

const authRouter = express.Router();

authRouter.post('/register', validateEmail, validatePassword, registerUser)

authRouter.get('/verify/:userId/:token', verifyUserEmail)

authRouter.post('/login', loginUser);

authRouter.get(
    '/whoami',
    passport.authenticate('jwt', { session: false }),
    whoami
);

authRouter.delete(
    '/delete',
    passport.authenticate('jwt', { session: false }),
    deleteUser
)

authRouter.put(
    '/update',
    passport.authenticate('jwt', { session: false }),
    updateUser
)

authRouter.post(
    '/resetpassword',
    validateEmail,
    receiveEmailForPasswordReset
  );

authRouter.post(
    '/resetpassword/:userId/:resetToken',
    validatePassword,
    resetPassword
  );

export default authRouter;