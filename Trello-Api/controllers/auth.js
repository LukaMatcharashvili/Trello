import { UserService } from '../services/auth.js'
import User from '../models/user.model.js'
import * as url from 'url';
import path from 'path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { sendPasswordResetEmail } from '../services/sendEmail.js'

async function registerUser (req, res) {
    try {
        const { username, email, image, password } = req.body;
        const user = await UserService.registerUser(username, email, password, image);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

async function verifyUserEmail (req, res) {
    try {
        const user = await User.findById(req.params.userId);
        if (!user || user.verificationToken !== req.params.token) {
            return res.sendFile(path.join(__dirname, '../view/emailVerified/emailVerifiedFail.html'))
        } else {
            user.verified = true;
            await user.save();
            return res.sendFile(path.join(__dirname, '../view/emailVerified/emailVerifiedSuccess.html'))
        }
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
}

async function loginUser (req, res) {
    try {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(500).json({ message: 'Invalid username or password!' })
        }
        if (user && !user.verified) {
            return res.status(500).json({ message: 'Please verify your email address!' })
        }
        const isValid = await user.comparePassword(req.body.password);
        if (!isValid) {
            return res.status(500).json({ message: 'Invalid username or password!' })
        }
        req.user = user;

        const token = jwt.sign(
            {
            userId: req.user.id,
            },
            process.env.JWTSECRET,
            { expiresIn: '24h' }
        );
        return res.json({ jwt: token });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function whoami (req, res) {
    const user = req.user;
    return res.json(user);
}

async function deleteUser (req, res) {
    try {
        const deletedUser = await User.deleteOne({ _id: req.user._id });
        return res.json(deletedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function updateUser (req, res) {
    try {
        const updatedUser = await User.findById(req.user._id)
        updatedUser.username = req.body.username || updatedUser.username;
        updatedUser.password = req.body.password || updatedUser.password;
        updatedUser.image = req.body.image || updatedUser.image;
        updatedUser.email = req.body.email || updatedUser.email;

        await updatedUser.save()
        return res.json(updatedUser)        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function receiveEmailForPasswordReset (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const resetToken = await UserService.createPasswordResetToken(user.id);
            sendPasswordResetEmail(user.email, resetToken.userId, resetToken.token)
        }else {
            return res.status(400).json({ message: 'The provided email is invalid!' });
        }
        return res.json({ message:'Password Reset Link Has Been Sent!' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  }

async function resetPassword (req, res) {
    try {
        const resetToken = await UserService.verifyPasswordResetToken(req.params.userId, req.params.resetToken);
        if (!resetToken) {
            return res.status(400).json({ message: 'The provided token is invalid!' });
        }
        await UserService.changePassword(req.params.userId, req.body.password);
        await UserService.deletePasswordResetToken(req.params.resetToken);
        return res.json({ message: 'Your password was successfully changed!'});
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}

export {
    registerUser,
    verifyUserEmail,
    loginUser,
    whoami,
    deleteUser,
    updateUser,
    receiveEmailForPasswordReset,
    resetPassword
}