const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Answer', {
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    QuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
  })
}
