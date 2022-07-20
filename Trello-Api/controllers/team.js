import { TeamService } from "../services/team.js";
import { UserService } from "../services/auth.js";
import { sendTeamInvitationEmail } from "../services/sendEmail.js";
import * as url from "url";
import path from "path";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

async function addTeam(req, res) {
  try {
    const team = await TeamService.addTeam(
      req.user.id,
      req.body.title,
      req.body.coverPicture
    );
    return res.status(200).json(team);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function sendInvitation(req, res) {
  try {
    const { teamId, userId } = req.params;
    const team = await TeamService.getTeamById(teamId);
    const user = await UserService.getUserById(userId);
    if (team.owner === req.user.id) {
      sendTeamInvitationEmail(user.email, teamId, userId);
    } else {
      return res
        .status(400)
        .json({ message: "You Can Only Send Invitation As Team Admin!" });
    }
    return res.json({ message: "Invitation Has Been Sent!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getTeamMembers(req, res) {
  try {
    const { teamId } = req.params;
    const team = await TeamService.getTeamById(teamId);
    const members = await TeamService.getTeamMembers(team.members);
    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function acceptInvitation(req, res) {
  try {
    const { teamId, userId } = req.params;
    const team = await TeamService.acceptInvitation(teamId, userId);
    if (team) {
      return res.sendFile(
        path.join(__dirname, "../view/teamInvite/invitationAcceptSuccess.html")
      );
    } else {
      return res.sendFile(
        path.join(__dirname, "../view/teamInvite/invitationAcceptFail.html")
      );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateTeam(req, res) {
  try {
    const { teamId } = req.params;
    const { title, coverPicture, members } = req.body;
    const team = await TeamService.getTeamById(teamId);
    let updatedTeam;
    if (team.owner === req.user.id) {
      updatedTeam = await TeamService.updateTeam(
        teamId,
        title,
        coverPicture,
        members
      );
    } else {
      return res
        .status(400)
        .json({ message: "You Can Update Team Data As Team Admin!" });
    }
    return res.status(200).json({ message: "Team Data Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateLists(req, res) {
  try {
    const { todo, done } = req.body;
    const { teamId } = req.params;
    const team = await TeamService.getTeamById(teamId);
    if (team.owner === req.user.id || team.members.includes(req.user.id)) {
      const updatedTeam = await TeamService.updateLists(teamId, todo, done);
    } else {
      return res.status(400).json({ message: "You Are Not A Team Member!" });
    }
    return res.status(200).json({ message: "Updated Successfuly" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function deleteTeam(req, res) {
  try {
    const { id } = req.user;
    const { teamId } = req.params;
    const team = await TeamService.getTeamById(teamId);
    if (team.owner === id) {
      const deletedTeam = await TeamService.deleteTeam(teamId);
    } else {
      return res
        .status(400)
        .json({ message: "You Can Only Delete Team As Team Admin!" });
    }
    return res.status(200).json({ message: "Deleted Successfuly" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getUsersTeams(req, res) {
  try {
    const teams = await TeamService.getUsersTeams(req.user.id);
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getTeamById(req, res) {
  try {
    const { teamId } = req.params;
    const team = await TeamService.getTeamById(teamId);
    if (team.owner === req.user.id || team.members.includes(req.user.id)) {
      return res.status(200).json(team);
    } else {
      return res.status(400).json({ message: "You Are Not A Team Member!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export {
  addTeam,
  sendInvitation,
  acceptInvitation,
  updateTeam,
  updateLists,
  deleteTeam,
  getUsersTeams,
  getTeamById,
  getTeamMembers,
};
