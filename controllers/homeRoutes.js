const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({include: [
          {
            model: User,
            attributes: ['name']
          }]
        });
        const plainPosts = postData.map(post => post.get({plain: true}))
      
        const formattedPosts = plainPosts.map(post => {
          const date = new Date(post.date)
          post.date = date.toLocaleString('en-US')
          return post;
        })
        console.log(plainPosts)
        const plainReversedPosts = formattedPosts.reverse()
        res.render('homepage', 
        {
          posts: plainReversedPosts,
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


  router.get('/post/:id', withAuth, async (req, res) => {
    try{
      const post = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment,
            attributes: ['id', 'contents', 'user_id'],
            include: [
              {
                model: User,
                attributes: ['name']
              }
            ]
          }
        ]
      })
      const plainPost = post.get({ plain: true })
      console.log(plainPost);
      const owner = req.session.user_id === plainPost.user_id 
      res.render('post', { post: plainPost, owner: owner, logged_in: req.session.logged_in })
    } catch (err) {
      res.status(400).json(err)
    }
  })

  router.get('/edit/:id', withAuth, async (req, res) => {
    try{
      const post = await Post.findByPk(req.params.id)
      const plainPost = post.get({ plain: true })
      res.render('edit', { post: plainPost, logged_in: req.session.logged_in })
    } catch (err) {
      res.status(400).json(err)
    }
  })

module.exports = router;