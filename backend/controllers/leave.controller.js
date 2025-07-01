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
    res.status(201).json({
      success: true,
      message: 'Leave request submitted successfully',
      leave
    });
  } catch (err) {
    console.error('Error applying leave:', err);
    res.status(500).json({
      success: false,
      message: 'Error applying leave',
      error: err.message
    });
  }
};


// View status of applications
exports.viewMyLeaves = async (req, res) => {
  try {
    const { userId } = req.user;

    const leaves = await LeaveRequest.findAll({
      where: { userId },
      include: [
        { model: User, as: 'User', attributes: ['name', 'email'] },
        { model: User, as: 'approver', attributes: ['name', 'email'] }
      ]
    });
    res.json({
      success: true,
      message: 'Fetched your leave records successfully',
      leaves
    });
  } catch (err) {
    console.error('Error fetching your leaves:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching your leaves',
      error: err.message
    });
  }
};



// View requests from direct reports (Manager), View all records (HR)
exports.viewTeamLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.findAll({
      include: [
        { model: User, as: 'User', attributes: ['name', 'email', 'role'] },
        { model: User, as: 'approver', attributes: ['name', 'email', 'role'] }
      ]
    });

    res.json({
      success: true,
      message: 'Fetched all team leave records successfully',
      leaves
    });
  } catch (err) {
    console.error('Error fetching team leaves:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching team leaves',
      error: err.message
    });
  }
};



// Approve or reject requests (Manager)
exports.updateLeaveStatus = async (req, res) => {
  try {
    // Log the user info for debugging
    console.log('Authenticated User:', req.user);

    const { leaveId } = req.params;
    const { status, note } = req.body;
    const approverId = req.user.userId; // Make sure this matches your auth middleware

    // Validate status input
    const validStatuses = ['approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Status must be either approved or rejected.',
      });
    }

    // Find the leave request by PK
    const leave = await LeaveRequest.findByPk(leaveId);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found.',
      });
    }

    // Update leave properties
    leave.status = status;
    leave.note = note ?? leave.note;
    leave.approvedBy = approverId;

    // Save the updated leave
    await leave.save();

    // Fetch updated leave with associated users
    const leaveWithApprover = await LeaveRequest.findByPk(leaveId, {
      include: [
        { model: User, as: 'User', attributes: ['name', 'email'] },
        { model: User, as: 'approver', attributes: ['name', 'email'] },
      ],
    });

    if (!leaveWithApprover) {
      // This should rarely happen, but safe check
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve updated leave.',
      });
    }

    // Respond with success, message and the updated leave data
    return res.json({
      success: true,
      message: `Leave ${status} successfully.`,
      leave: leaveWithApprover,
    });
  } catch (error) {
    console.error('Error updating leave:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while updating leave.',
      error: error.message,
    });
  }
};
