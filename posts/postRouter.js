const express = require('express');

const postDB = require('../posts/postDb');

const router = express.Router();

router.use(express.json());

router.post('/:id', (req, res) => {
  if(req.body){
  postDB.insert(post)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
  } else {
    res.status(404).json({errorMessage: "Please enter all the data necesarry"})
  }
})

router.get('/', (req, res) => {
  postDB.get()
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
});

router.get('/:id', (req, res) => {
  postDB.getById(req.params.id)
  .then(post => {
    console.log(post)
    if(post){
    res.status(200).json(post)
    } else {
      res.status(404).json({errorMessage: "Can't find user"})
    }
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something wrong with the server"})
  })
});

router.delete('/:id', (req, res) => {
  postDB.getById(req.params.id)
  .then(user => {
    if(user){
      postDB.remove(user.id)
      .then(deleted => {
        res.status(200).json({errorMessage: "User deleted"})
      })
    } else {
      res.status(404).json({errorMessage: "Can't find that post"})
    }
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something wrong with the server"})
})
});

router.put('/:id', (req, res) => {
  postDB.getById(req.params.id)
  .then(post => {
    if(post){
      postDB.update(req.params.id, req.body)
      .then(deleted => {
        res.status(200).json({errorMessage: "User Changed"})
      })
    } else {
      res.status(404).json({errorMessage: "Can't find that post"})
    }
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something wrong with the server"})
})
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
