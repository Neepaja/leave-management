'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
class LeaveRequest extends Model {
    static associate(models) {
      LeaveRequest.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User',
      });
      LeaveRequest.belongsTo(models.User, {
        foreignKey: 'approvedBy',
        as: 'approver',
      });
    }
  }

  LeaveRequest.init({
    leave_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    type: DataTypes.STRING,
    reason: DataTypes.TEXT,
    status: DataTypes.STRING,
    note: DataTypes.TEXT,
    approvedBy: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  }, {
    sequelize,
    modelName: 'LeaveRequest',
  });
  return LeaveRequest;
};