const express = require('express');

const postDB = require('../posts/postDb');

const router = express.Router();

router.use(express.json());

router.post('/:id', validatePostId, validatePost, (req, res) => {
  const post = {...req.body, user_id: req.params.id}
  console.log(post)
  postDB.insert(post)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    if(error.errno = 19){
      res.status(500).json({errorMessage: "User doesn't exist"})
    } else {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
    }
  })
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

router.get('/:id', validatePostId, (req, res) => {
  postDB.getById(req.params.id)
  .then(post => {
    console.log(post)
    if(post){
    res.status(200).json(post)
    } else {
      res.status(404).json({errorMessage: "Can't find post"})
    }
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something wrong with the server"})
  })
});

router.delete('/:id', validatePostId, (req, res) => {
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

router.put('/:id', validatePostId, (req, res) => {
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
  isNaN(req.params.id) ? res.status(400).json({errorMessage: "Please enter a number"}) :
  (req.params.id === undefined) ? res.status(400).json({errorMessage: "Please enter an ID"}) :
  
  next();
}

function validatePost( req, res ,next) {
  (!req.body.text) ? res.status(400).json({errorMessage: "Please enter a text object"}):
  (req.body.text === undefined || "") ? res.status(400).json({errorMessage: "Please enter text"}):


  next();
}

module.exports = router;
