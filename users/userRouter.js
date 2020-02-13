const express = require('express');

const userDB = require('./userDb')

const router = express.Router();

router.use(express.json());

router.post('/', validateUser, (req, res) => {
  console.log(req.body)
  userDB.insert(req.body).then(user => {
  if(user){
    res.status(200).json({successMessage: "User Added"})
  }
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
});

router.get('/', (req, res) => {
  userDB.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something is wrong with the server"})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  userDB.getById(req.params.id)
  .then(post => {
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

router.get('/:id/posts', validateUserId, (req, res) => {
  userDB.getById(req.params.id)
  .then(user => {
    userDB.getUserPosts(user.id)
    .then(posts => {
      if(posts){
        res.status(200).json(posts)
      } else {
        res.status(500).json({errorMessage: "Something wrong with the server"})
      }
    })
  })
  .catch(error => {
    res.status(404).json({errorMessage: "Couldn't find that post"})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  userDB.getById(req.params.id)
  .then(user => {
    if(user){
      userDB.remove(user.id)
      .then(res => {
      res.status(200).json({errorMessage: "User deleted"})
      })
    } else {
      res.status(404).json({errorMessage: "Can't find that user"})
    }
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something wrong with the server"})
})
});


router.put('/:id', validateUserId, (req, res) => {
  userDB.getById(req.params.id)
  .then(user => {
    if(user){
       userDB.update(req.params.id, req.body)
       .then(res.status(200).json({successMessage: "User Changed"}))
    } else {
      res.status(404).json({errorMessage: "Can't find that user"})
    }
  })
  .catch(error => {
    res.status(500).json({errorMessage: "Something wrong with the server"})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  isNaN(req.params.id) ? res.status(400).json({errorMessage: "Please enter a number"}) :
  (req.params.id === undefined) ? res.status(400).json({errorMessage: "Please enter an ID"}) :
  
  next();
}

function validateUser(req, res, next) {
  (!req.body.name) ? res.status(400).json({errorMessage: "Please enter a name object"}):
  (req.body.name === undefined || "") ? res.status(400).json({errorMessage: "Please enter a name"}):

  next();
}

module.exports = router;
