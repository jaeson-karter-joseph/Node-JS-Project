const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

let movies = [
  {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    release_date: "2022--07-16",
  },
  {
    id: "2",
    title: "Leo",
    director: "Jaeson",
    release_date: "2020--07-16",
  },
];

//Get All Movie
app.get("/movie", (req, res) => {
  res.json(movies);
});

//Add Move to List
app.post("/movie", (req, res) => {
  const movie = req.body;

  console.log(movie);

  movies.push(movie);

  res.send("Movie Added to List");
});

//Search For Movie
app.get("/movie/:id", (req, res) => {
  const id = req.params.id;

  for (let movie of movies) {
    if (movie.id == id) {
      res.json(movie);
    }
  }

  res.status(400).send("Movie Not Found")
});


app.delete("/movie/:id", (req,res) =>{
    const id = req.params.id;

    movies = movies.filter(movie => movie.id != id);

    res.send("Movie is Deleted")
})


//Set The Server to Listen at port
app.listen(port, () => console.log(`Listenting at Post ${port}`));
