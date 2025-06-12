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

const backgroundPaths = [
  { "image": "/images/TimsOKC/WarpDrive.gif" },
  { "image" : "/images/TimsOKC/underground_green.jpg", "opacity" : .4},
  { "image" : "/images/TimsOKC/underground_blue.jpg", "opacity" : .4},
];

const compiledFunction = pug.compileFile('./content/static/PUG/home.pug');

app.get('/', asyncMiddleware(async function (req, res) {
  const pic = { "image": "/images/DragonLair1.jpg", "opacity" : .4 };
  const pic2 = { "image": "/images/DragonLair2.jpg", "opacity" : .4 };

  res.send(compiledFunction({
    catchphrase: "Meet single dragons in YOUR local area!",
    message: "A placeholder for something I might do someday maybe.",
    backgroundImage: pic.image,
    backgroundOpacity: pic.opacity || 0,
    name2: "description1",
    url2: pic2.image,
  }));
}));

app.listen((process.env.PORT || 8000), '0.0.0.0');
