const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Answer', {
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
  })
}
