const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Hashtag', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
  })
}
