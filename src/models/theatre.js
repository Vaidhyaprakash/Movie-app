const {Sequelize, DataTypes }=require("sequelize");
const sequelize=new Sequelize("postgres://postgres:ivp@localhost:5432/movieapp");

const Theatres = sequelize.define("Theatres",{
  id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
  },
  theatreName:{
      type: DataTypes.STRING,
      allowNull:false
  },
  movieRunning:{
      type:DataTypes.STRING,
      allowNull:false
  },
  date:{
      type:DataTypes.DATE,
      allowNull:false
  },
  seatsAvailable:{
      type:DataTypes.INTEGER,
      allowNull:false
  },
  totalSeats:{
      type:DataTypes.INTEGER,
      allowNull:false
  },
  pincode:{
      type:DataTypes.INTEGER,
      allowNull:false
  }  
},{
    tableName:"theatres"
});
module.exports.theatre=Theatres;