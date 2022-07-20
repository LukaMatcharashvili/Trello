import express from "express";
import passport from "../lib/passport/passport.js";

import {
  addTeam,
  sendInvitation,
  acceptInvitation,
  updateTeam,
  updateLists,
  deleteTeam,
  getUsersTeams,
  getTeamById,
  getTeamMembers,
} from "../controllers/team.js";

const teamRouter = express.Router();

teamRouter.post("/", passport.authenticate("jwt", { session: false }), addTeam);

teamRouter.get(
  "/sendinvitation/:teamId/:userId",
  passport.authenticate("jwt", { session: false }),
  sendInvitation
);

teamRouter.get(
  "/members/:teamId",
  passport.authenticate("jwt", { session: false }),
  getTeamMembers
);

teamRouter.get("/acceptinvitation/:teamId/:userId", acceptInvitation);

teamRouter.put(
  "/updateteam/:teamId",
  passport.authenticate("jwt", { session: false }),
  updateTeam
);

teamRouter.put(
  "/updatelists/:teamId",
  passport.authenticate("jwt", { session: false }),
  updateLists
);

teamRouter.delete(
  "/deleteteam/:teamId",
  passport.authenticate("jwt", { session: false }),
  deleteTeam
);

teamRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUsersTeams
);

teamRouter.get(
  "/:teamId",
  passport.authenticate("jwt", { session: false }),
  getTeamById
);

export default teamRouter;
