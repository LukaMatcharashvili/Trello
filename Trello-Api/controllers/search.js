import { UserService } from "../services/auth.js";

async function getUsersBySearch(req, res) {
  try {
    const users = await UserService.getUsersBySearch(req.params.searchBody);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { getUsersBySearch };
