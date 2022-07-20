import mongoose from 'mongoose';
import crypto from 'crypto';

const resetTokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      index: true,
      unique: true,
      default: () => crypto.randomBytes(20).toString('hex'),
    },
  },
  {
    timestamps: true,
  }
);

resetTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const PasswordResetToken = mongoose.model('passwordResetToken', resetTokenSchema)

export default PasswordResetToken;