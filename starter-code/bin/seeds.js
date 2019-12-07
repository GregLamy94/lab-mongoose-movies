const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity.js");

const dbName = "lab-mongoose-movies";
// connection à la db

Celebrity.collection.drop();

mongoose
  .connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// remplir

const data = [
  {
    name: "Jean Reno",
    occupation: "actor",
    catchPhrase: "Je te frappe"
  },

  {
    name: "Scarlett Johanson",
    occupation: "actress",
    catchPhrase: "I love u"
  },

  {
    name: "Hendrix",
    occupation: "Singer",
    catchPhrase: "I m crasy"
  }
];

Celebrity.create(data)
  .then(celibrities => {
    celibrities.map(el => console.log(`Celibrity ${el.name} added.`));
    // se déconnecter une fois la db peuplé
    mongoose.connection.close().then(() => console.log("Disconnected from db"));
  })
  .catch(err => console.error(err));
