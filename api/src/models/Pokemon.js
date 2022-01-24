const { DataTypes } = require('sequelize')

module.exports = (sequelize) => { 

  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hp: {           
      type: DataTypes.INTEGER,
    },
    attack: {               
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    image:{
      type: DataTypes.STRING,
      validate: {isUrl: true},
      defaultValue: "https://imagenpng.com/wp-content/uploads/2016/09/Pokebola-pokeball-png-0.png"
    },
  })
}