app.put("/crm/api/v1/users/:userId", [authJwt.verifyToken, authJwt.isAdmin, verifyUserReqBody.validateUserStatusAndUserType], userController.updateUser);
