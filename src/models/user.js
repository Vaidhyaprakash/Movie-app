const {Sequelize,DataTypes }=require("sequelize");
const sequelize=new Sequelize("postgres://postgres:ivp@localhost:5432/movieapp");

const Users = sequelize.define("Users",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tickets:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    theatreName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    movie:{
        type:DataTypes.STRING,
        allowNull:false
    },
    seatNumber:{
        type:DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull:false
    }
},{
    tableName:"users"
});
module.exports.users=Users;