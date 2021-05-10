const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Hashtag', {
    hashtag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
  })
}
