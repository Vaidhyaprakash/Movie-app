const {Sequelize,DataTypes }=require("sequelize");
const sequelize=new Sequelize("postgres://postgres:ivp@localhost:5432/movieapp");

const Movie = sequelize.define('Movie', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    movieTitle:{
        type: DataTypes.STRING,
        allowNull: false
    },
    releaseDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    theatres:{
        type: DataTypes.ARRAY(DataTypes.STRING),

    },
    actor:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
        tableName:"movies"

});
module.exports.movies=Movie;