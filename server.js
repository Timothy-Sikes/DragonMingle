var express = require('express');
var app = express();
const pug = require('pug');

app.use(express.static('./content/static/'));

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

backgroundPaths = [
  { "image": "/images/TimsOKC/WarpDrive.gif" },
  { "image" : "/images/TimsOKC/underground_green.jpg", "opacity" : .4},
  { "image" : "/images/TimsOKC/underground_blue.jpg", "opacity" : .4},
]

const compiledFunction = pug.compileFile('./content/static/PUG/home.pug');

app.get('*', asyncMiddleware(async function (req, res) {
  pic = { "image": "/images/DragonLair1.jpg", "opacity" : .4 },
  //pic = "/images/DragonLair1.jpg"

  res.send(compiledFunction({
    catchphrase: "Meet single dragons in YOUR local area!",
    message: "A placeholder for something I might do someday maybe.",
    backgroundImage: pic.image,
    backgroundOpacity: pic.opacity || 0,
    goodreadsCss: getRandomInt(3) + 1
  }))
  })
)

app.listen((process.env.PORT || 8000));
