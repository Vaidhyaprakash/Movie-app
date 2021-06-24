'use strict';

const Hapi = require('@hapi/hapi');
const {Sequelize}=require("sequelize");
//Connecting to DB
//const sequelize=new Sequelize("postgres://postgres:ivp@localhost:5432/movieapp");
const sequelize = new Sequelize('movieapp', 'postgres', 'ivp', {
    host: 'localhost',
    dialect: 'postgres'
  });
 
const MovieController= require("./src/controllers/movie");

//checking connection to DB
async function testDbConnection(){
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: MovieController.welcome
    });

    server.route({
        method:'POST',
        path:'/movie',
        handler: MovieController.moviePost
    });

    server.route({
      method:'GET',
      path:"/movies",
      handler:MovieController.moviesGet
    });

    server.route({
      method:'POST',
      path:"/theatre",
      handler:MovieController.theatrePost
    });

    server.route({
      method:'GET',
      path:"/theatres",
      handler:MovieController.theatresGet
    });

    //Searching

    server.route({
      method:'POST',
      path:'/movieSearch',
      handler:MovieController.movieSearch
    });

    server.route({
      method:'POST',
      path:'/theatreSearch',
      handler:MovieController.theatreSearch
    });

    server.route({
      method:'POST',
      path:'/pinSearch',
      handler:MovieController.pinSearch
    });

    server.route({
      method:'POST',
      path:'/actorSearch',
      handler:MovieController.actorSearch
    });

    server.route({
      method:'POST',
      path:'/dateSearch',
      handler:MovieController.dateSearch
    });
    //User Booking Ticket
    server.route({
      method:'POST',
      path:'/BookTickets',
      handler:MovieController.userTicketBooking
    });
    //delete movie
    server.route({
      method:'POST',
      path:'/deleteMovie',
      handler:MovieController.deleteMovie
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
    await testDbConnection();
    //await sequelize.sync({force:true});
    //console.log("The tables are created or recreated!");
    await sequelize.authenticate();
    console.log("Database Connected...!");
};

init();
