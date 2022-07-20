import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { convertImgToCloudinary } from '../services/convertImageToCloudinary.js';
import { sendVerificationEmail } from '../services/sendEmail.js'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        unique: true,
    }
},
{
  timestamps: true,
})

async function generateHash(password) {
    return bcrypt.hash(password, 12);
  }

userSchema.pre('save', function preSavePasswordHash (next) {
    const user = this;
    if (user.isModified('password')) {
      return generateHash(user.password)
        .then((hash) => {
          user.password = hash;
          return next();
        })
        .catch((error) => {
          return next(error);
        });
    }
    return next();
});

userSchema.pre('save', async function preSaveImgConvert (next) {
  const user = this;
  if(!user.isModified('image') || !user.image) return next();
  try {
      const cloudinaryImage = (await convertImgToCloudinary(user.image)).url;
      if(cloudinaryImage) {
          user.image = cloudinaryImage;
          return next()
      }
  } catch (error) {
      return next(error)
  }
})

userSchema.pre('save', async function preSaveSendEmailVerification (next) {
    const user = this;
    if(user.isModified('email')) {
        try {
            user.verified = false;
            user.verificationToken = crypto.randomBytes(20).toString('hex');
            sendVerificationEmail(user.email, user._id, user.verificationToken)
            return next()
        } catch (error) {
            return next(error)
        }
    }
    return next();
})
  
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('user', userSchema)

export default User;