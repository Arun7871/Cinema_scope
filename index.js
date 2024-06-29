import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
const port = 3000;
const app = express();
const API_URL = "http://www.omdbapi.com/?apikey=82b7f628&t=";
app.use(express.static('public'));

app.get("/",(req,res)=>{
    const leo = {
        "Title": "Leo",
        "Year": "2023",
        "Rated": "Not Rated",
        "Released": "21 Nov 2023",
        "Runtime": "164 min",
        "Genre": "Action, Crime, Drama",
        "Director": "Lokesh Kanagaraj",
        "Writer": "Lokesh Kanagaraj, Rathna Kumar, Deeraj Vaidy",
        "Actors": "Joseph Vijay, Sanjay Dutt, Trisha Krishnan",
        "Plot": "Parthiban is a mild-mannered cafe owner in Kashmir, who fends off a gang of murderous thugs and gains attention from a drug cartel claiming he was once a part of them.",
        "Language": "Tamil",
        "Country": "India",
        "Awards": "4 nominations",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMmFiOGYyZjQtZmZmNC00ZTgzLWI5ZjktMTRiYzc5NjAzODRkXkEyXkFqcGdeQXVyMTYyNDkzNzgz._V1_SX300.jpg",
        "Ratings": [
            {
                "Source": "Internet Movie Database",
                "Value": "7.2/10"
            },
            {
                "Source": "Rotten Tomatoes",
                "Value": "82%"
            }
        ],
        "Metascore": "N/A",
        "imdbRating": "7.2",
        "imdbVotes": "60,061",
        "imdbID": "tt15654328",
        "Type": "movie",
        "DVD": "N/A",
        "BoxOffice": "N/A",
        "Production": "N/A",
        "Website": "N/A",
        "Response": "True"
    };
    res.render("index.ejs");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", async (req,res)=>{
    console.log("this method is called");
    const movieName = req.body.Movie;
    try{
        const response = await axios.get(API_URL+movieName);
        if(response.data.Response=="False") throw new Error(response.data.Error);
        res.render('index.ejs',{data:response.data});
    }catch (error){
        console.log("error");
        res.render("index.ejs",{error:"Oops! We couldn't find that movie. Please check the name and try again 😊"})
    }
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})