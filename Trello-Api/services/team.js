import Team from "../models/team.model.js";
import User from "../models/user.model.js";

export class TeamService {
  static async addTeam(owner, title, coverPicture) {
    try {
      const team = new Team();
      team.owner = owner;
      team.title = title;
      team.coverPicture = coverPicture;
      team.members.push(owner);
      const savedTeam = await team.save();
      return savedTeam;
    } catch (error) {
      throw error;
    }
  }

  static async getTeamById(id) {
    try {
      const team = await Team.findById(id);
      return team;
    } catch (error) {
      throw error;
    }
  }

  static async getUsersTeams(userId) {
    try {
      const teams = await Team.find({ members: userId });
      return teams;
    } catch (error) {
      throw error;
    }
  }

  static async getTeamMembers(membersIds) {
    try {
      const teams = await User.find().where("_id").in(membersIds).exec();
      return teams;
    } catch (error) {
      throw error;
    }
  }

  static async acceptInvitation(teamId, userId) {
    try {
      const team = await Team.findById(teamId);
      team.members.push(userId);
      const savedTeam = await team.save();
      return savedTeam;
    } catch (error) {
      throw error;
    }
  }

  static async updateLists(teamId, todo, done) {
    try {
      const team = await Team.findById(teamId);
      team.todo = todo;
      team.done = done;
      const savedTeam = await team.save();
      return savedTeam;
    } catch (error) {
      throw error;
    }
  }

  static async updateTeam(teamId, title, coverPicture, members) {
    try {
      const team = await Team.findById(teamId);
      team.title = title || team.title;
      team.coverPicture = coverPicture || team.coverPicture;
      team.members = members || team.members;
      const savedTeam = await team.save();
      return savedTeam;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTeam(teamId) {
    try {
      const team = await Team.findByIdAndDelete(teamId);
      return team;
    } catch (error) {
      throw error;
    }
  }
}
