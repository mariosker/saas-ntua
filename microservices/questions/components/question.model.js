const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Question', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hashtags: DataTypes.ARRAY(DataTypes.STRING)
  }, {
  })
}
