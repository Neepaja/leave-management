const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword1 = await bcrypt.hash('emp123', 10);
    const hashedPassword2 = await bcrypt.hash('mgr123', 10);
    const hashedPassword3 = await bcrypt.hash('hr123', 10);
    const hashedPassword4 = await bcrypt.hash('emp456', 10);

    await queryInterface.bulkInsert('Users', [
      {
        user_id: uuidv4(),
        name: 'Emp Person',
        email: 'emp@example.com',
        password: hashedPassword1,
        role: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: uuidv4(),
        name: 'Emp Two',
        email: 'emp2@example.com',
        password: hashedPassword4,
        role: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: uuidv4(),
        name: 'Mgr Person',
        email: 'mgr@example.com',
        password: hashedPassword2,
        role: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: uuidv4(),
        name: 'HR Person',
        email: 'hr@example.com',
        password: hashedPassword3,
        role: 'hr',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
