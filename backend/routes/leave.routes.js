const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/apply',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles('employee'),
  leaveController.applyLeave
);

router.get(
  '/my-leaves',
  authMiddleware.verifyToken,
  leaveController.viewMyLeaves
);

router.get(
  '/team-leaves',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles('manager', 'hr'),
  leaveController.viewTeamLeaves
);

router.patch(
  '/:leaveId/status',
  authMiddleware.verifyToken,
  authMiddleware.authorizeRoles('manager'),
  leaveController.updateLeaveStatus
);

module.exports = router;
