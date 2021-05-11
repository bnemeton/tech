const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        const plainPosts = postData.map(post => post.get({plain: true}))
        res.render('homepage', 
        {
          posts: plainPosts,
          logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(404).json(err)
    }
})


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dash');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dash');
      return;
    }
  
    res.render('signup');
  });


module.exports = router;