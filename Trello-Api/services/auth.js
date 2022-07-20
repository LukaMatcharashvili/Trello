import User from "../models/user.model.js";
import PasswordResetToken from "../models/passwordResetToken.model.js";

export class UserService {
  static async registerUser(username, email, password, image) {
    const user = new User();
    user.email = email;
    user.password = password;
    user.username = username;
    user.image = image;
    const savedUser = await user.save();
    return savedUser;
  }

  static async getUserById(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      return error;
    }
  }

  static async getUsersBySearch(searchBody) {
    try {
      const search = searchBody.toLowerCase();
      const users = await User.find({
        username: new RegExp(search, "i"),
      });
      return users;
    } catch (error) {
      return error;
    }
  }

  static async createPasswordResetToken(userId) {
    const passwordReset = new PasswordResetToken();
    passwordReset.userId = userId;
    const savedToken = await passwordReset.save();
    return savedToken;
  }

  static async verifyPasswordResetToken(userId, token) {
    const foundToken = await PasswordResetToken.findOne({ token, userId });
    return foundToken;
  }

  static async deletePasswordResetToken(token) {
    const deletedToken = await PasswordResetToken.findOneAndDelete({ token });
    return deletedToken;
  }

  static async changePassword(userId, password) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.password = password;
    return user.save();
  }
}
