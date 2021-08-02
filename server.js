const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose= require('mongoose')
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

//connect to mongoose w url
mongoose.connect('mongodb+srv://hlittlefield:Tonkatruck4!@cluster0.tlijw.mongodb.net/MovieTracker?retryWrites=true&w=majority', {useNewUrlParser: true}, {useUnifiedTopology: true});

const Schema = mongoose.Schema
const movieSchema = new Schema({movieName: {type: String, unique: true},
genre: String,
director: String,
year: Number});
const Movie = mongoose.model("Movie", movieSchema);
const ratingSchema = new Schema({
  movieTitle: String,
  comments: String,
  rating: Number,
  date: Date
})
const Ratings = mongoose.model("Ratings", ratingSchema)

app.post('/api/movies', (req, res) => {
  const newMovie= new Movie({movieName: req.body.moviename,
  genre: req.body.genre,
  director: req.body.director,
  year: req.body.year });
  console.log(req.body)
  newMovie.save((err, data) => {
    res.json(req.body)
  })
})
/*
app.post("/api/users/:_id/exercises", (req, res)=>{
  const {userId, description, duration, date} = req.body;
  Person.findById(userId, (err, data)=>{
    if(err){
      res.json("Username already taken")
    }
    if (!data){
      res.send("Unknown userId")
    }else{
      const username = data.username;
      const newExercise = new Exercise({userId, description,duration, date})
        newExercise.save((err, data)=>{
          res.json({userId, username:username, duration, date})
    })
  }
  })
})*/

app.get("/api/movies", (req, res) =>{
  Movie.find({}, (err, data)=>{
    if (!data){
      res.send("No movies yet!")
    }else{
      res.json(data)
    }
    })
  })
