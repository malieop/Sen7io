const express = require('express');
const CoordDB = require('../models/coord');

const router = express.Router();
router.get('', (req, res, next) => {
  console.log('BOSTA');
});
//user
/*
 router.get('/api/token', (req, res, next) => {
  //  cria o token

  const token = jwt.sign(
    {}, // <= mandar dados pelo token
    'string_de_teste_que_deve_ser_maior_por_questões_de_segurança',
    { expiresIn: '1h' }
  );
  res.status(200).json({
    token: token,
    expiresIn: 3600 // tempo que o token irá manter-se válido
  })
});*/

router.get('/api/routes/2', (req, res, next) => {
  CoordDB.find()
    .where('weekday')
    .equals('2')
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        routes: documents
      });
    });
});
router.get('/api/routes/3', (req, res, next) => {
  CoordDB.find()
    .where('weekday')
    .equals('3')
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        routes: documents
      });
    });
});
router.get('/api/routes/4', (req, res, next) => {
  CoordDB.find()
    .where('weekday')
    .equals('4')
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        routes: documents
      });
    });
});
router.get('/api/routes/5', (req, res, next) => {
  CoordDB.find()
    .where('weekday')
    .equals('5')
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        routes: documents
      });
    });
});
router.get('/api/routes/6', (req, res, next) => {
  CoordDB.find()
    .where('weekday')
    .equals('6')
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        routes: documents
      });
    });
});
router.get('/api/routes/7', (req, res, next) => {
  CoordDB.find()
    .where('weekday')
    .equals('7')
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        routes: documents
      });
    });
});
router.get('/api/routes/8', (req, res, next) => {
  CoordDB.find()
    .where('weekday')
    .equals('8')
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        routes: documents
      });
    });
});

router.post('/saveroute', (req, res, next) => {
  const coord = req.body;

  console.log(coord);
  console.log('bosta');
  var distance = require('google-distance');
  distance.apiKey = 'AIzaSyCm2UyAl3e8FoGBxdGt_ASXqbXuRxQDbmc';
  var aux_origem = coord.origem_lat + ',' + coord.origem_lng;
  var aux_destiny = coord.destiny_lat + ',' + coord.destiny_lng;
  /* console.log(aux_origem);
  console.log(aux_destiny);*/
  distance.get(
    {
      /*origin: coord.origem_lat+','+coord.origem_lng ,
      destination: coord.destiny_lat+','+coord.destiny_lat*/
      origin: aux_origem,
      destination: aux_destiny
    },
    function(err, data) {
      if (err) return console.log(err);
      /*console.log(data);
      console.log(data.distance);*/
      /*
      const coordDB = new CoordDB({
        route_type: data.mode,
        origin: data.origin,
        destiny: data.destination,
        distance: data.distance,
        time: data.duration,
        weekday: coord.weekday
      });
      coordDB.save();
      //res.send(data);*/
    }
  );

  res.status(201).json({
    message: 'Coordinates added successfully!'
  });
});

router.get(
  '/:origem_lat/:origem_lng/:destiny_lat/:destiny_lng',
  (req, res, next) => {
    var distance = require('google-distance');
    distance.apiKey = 'AIzaSyCm2UyAl3e8FoGBxdGt_ASXqbXuRxQDbmc';
    var aux_origem = req.params.origem_lat + ',' + req.params.origem_lng;
    var aux_destiny = req.params.destiny_lat + ',' + req.params.destiny_lng;
    /* console.log(aux_origem);
  console.log(aux_destiny);*/
    distance.get(
      {
        /*origin: coord.origem_lat+','+coord.origem_lng ,
      destination: coord.destiny_lat+','+coord.destiny_lat*/
        origin: aux_origem,
        destination: aux_destiny
      },
      function(err, data) {
        if (err) return console.log(err);
        console.log(data);
        //console.log(data.distance);
        res.status(200).json({
          routes: data
        });
      }
    );
  }
);

router.post('/submitRoutes', (req, res, next) => {
  const r = req.body;
    const coordDB = new CoordDB({
      origin: r.origin,
      destiny: r.destination,
      origem_lat: r.origem_lat,
      origem_lng: r.origem_lng,
      destiny_lat: r.destiny_lat,
      destiny_lng: r.destiny_lng,
      distance: r.distance,
      time: r.duration,
      mode: r.mode,
      weekday: r.weekday,
      car_persons: r.car_persons, // não está adicionado no backend para guardar este valor !!!!!
      route_type: r.purpose
    });

    coordDB
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Route added!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
);

module.exports = router;
