import { UserService } from "../services/auth.js";

async function getUserById(req, res) {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getUserById };
