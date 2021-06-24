const {movies}=require("../models/movie");
const {theatre}=require('../models/theatre');
const {users}=require("../models/user");

exports.welcome = ()=>{
    return "Hello World";
}
//Movie and Theatre POST and GET
exports.moviePost = async function moviePost(req,h){
    const {  movieTitle,releaseDate,theatres,actor }=req.payload;
    try{
        const movie = await movies.create({movieTitle,releaseDate,theatres,actor});
        console.log(movie instanceof movies);
        return "Movie added to movies Table";
    }
    catch (err){
        console.log(err);
    } 
};
exports.moviesGet=async function moviesGet(req,h){
    try{
        const moviesIn = await movies.findAll();
        return h.response(moviesIn);
    }
    catch(err){
        console.log(err);
    }
};
exports.theatrePost=async function theatrePost(req,h){
    const {theatreName,movieRunning,date,seatsAvailable,totalSeats,pincode}=req.payload;
    try{
        const T = await theatre.create({theatreName,movieRunning,date,seatsAvailable,totalSeats,pincode});
        return "Theatre detail added to theatres table";
    }
    catch(err){
        console.log(err);
    }
};
exports.theatresGet=async function theatresGet(req,h){
    try{
        const AllTheatres=await theatre.findAll();
        return h.response(AllTheatres);
    }
    catch(err){
        console.log(err);
    }
};
//Searches
exports.movieSearch=async function movieSearch(req,h){
    const {movieTitle}=req.payload;
    try{
        const theatres=await movies.findOne({
            attributes:['theatres'],
            where:{
                movieTitle
            }
        });
        if(theatres==null){
            return "Movie details does not exist in DB";
        }else{
            return h.response(theatres);
        }
    }
    catch(err){
        console.log(err);
    }
};
exports.theatreSearch=async function theatreSearch(req,h){
    const {theatreName}=req.payload;
    try{
        const movie=await theatre.findOne({
            attributes:['movieRunning'],
            where:{
                theatreName
            }
        });
        if(movie==null){
            return "Theatre does not exist in DB";
        }else{
            return h.response(movie);
        }
    }
    catch(err){
        console.log(err);
    }
};
exports.pinSearch=async function pinSearch(req,h){
    const {pincode}=req.payload;
    try{
        const theatreDetails=await theatre.findAll({
            attributes:['theatreName','movieRunning'],
            where:{
                pincode
            }
        });
        if(theatreDetails.length==0){
            return "No theatres exist in the area";
        }else{
            return h.response(theatreDetails);
        }
    }
    catch(err){
        console.log(err);
    }
};
exports.actorSearch=async function actorSearch(req,h){
    const {actor}=req.payload;
    try{
        const movie=await movies.findAll({
            attributes:['movieTitle'],
            where:{
                actor
            }
        });
        if(movie.length==0){
            return "No movie of the actor is currently running";
        }else{
            return h.response(movie);
        }
    }
    catch(err){
        console.log(err);
    }
};
exports.dateSearch=async function dateSearch(req,h){
    const {date}=req.payload;
    let day=date.slice(8);
    let addDate=+(day)+1;
    let modifiedDate=date.slice(0,8)+addDate;
    try{
        const moviesToday=await theatre.findAll({
            attributes:['movieRunning'],
            where:{
                date:modifiedDate
            }
        });
        if(moviesToday.length==0){
            return "The movie is not Running anywhere on the specified date";
        }else{
            return h.response(moviesToday);
        }
    }
    catch(err){
        console.log(err);
    }
};
//user ticket booking
exports.userTicketBooking=async function userTicketBooking(req,h){
    const {name,tickets,theatreName,movie}=req.payload;
    const seatNumber=[];
    let start;
    let sA;
    try{
        const theatreDetails=await theatre.findOne({
            where:{
                theatreName
            }
        });
        if(theatreDetails==null){
            return "No such Theatre exists";
        }
        else{
            if(theatreDetails.movieRunning==movie){
                const seatsAvailable=theatreDetails.seatsAvailable;
                const totalSeats=theatreDetails.totalSeats;
                start=(totalSeats-seatsAvailable)+1;
                sA=seatsAvailable;
            }else{
                return "The movie is not running in the Theatre";
            }
            
        }
    }catch(err){
        console.log(err);
    }
    for(let i=0;i<tickets;i++){
        let x=start+i;
        seatNumber.push(x);
    }
    try{
        const user= await users.create({name,tickets,theatreName,movie,seatNumber});
        await theatre.update({seatsAvailable:sA-tickets},{
            where:{
                theatreName
            }
        });
        return h.response(user);
    }
    catch(err){
        console.log(err);
    }
};
//delete movie
exports.deleteMovie=async function deleteMovie(req,h){
    const {movieTitle}=req.payload;
    try{
        await movies.destroy({
            where:{
                movieTitle
            }
        });
        return "Movie deleted Successfully";
    }
    catch(err){
        console.log(err);
    }
}