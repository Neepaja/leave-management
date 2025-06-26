const { LeaveRequest, User } = require('../models');

// Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason, type } = req.body;
    const { userId } = req.user;

    const leave = await LeaveRequest.create({
      userId,
      startDate,
      endDate,
      reason,
      type,
      status: 'pending'
    });

    res.status(201).json({ message: 'Leave request submitted', leave });
  } catch (err) {
    res.status(500).json({ message: 'Error applying leave', error: err.message });
  }
};

// View status of applications
exports.viewMyLeaves = async (req, res) => {
  try {
    const { userId } = req.user;
    const leaves = await LeaveRequest.findAll({
      where: { userId },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });
    res.json({ leaves });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching your leaves', error: err.message });
  }
};

// View requests from direct reports (Manager), View all records (HR)
exports.viewTeamLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.findAll({
      include: [{ model: User, attributes: ['name', 'email', 'role'] }]
    });
    res.json({ leaves });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching team leaves', error: err.message });
  }
};

// Approve or reject requests (Manager)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const leave = await LeaveRequest.findByPk(leaveId);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    leave.status = status;
    await leave.save();

    res.json({ message: `Leave ${status}`, leave });
  } catch (err) {
    res.status(500).json({ message: 'Error updating leave', error: err.message });
  }
};


