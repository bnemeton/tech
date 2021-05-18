const router = require('express').Router();
const Post = require('../../models/Post');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.session.user_id)
      const postData = await Post.create({
       ...req.body,
        user_id: req.session.user_id
      });
      console.log(postData)
      const newPost = postData.get({plain: true})
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', withAuth, async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.session.user_id)
      const postData = await Post.update(req.body,
      {
        where: {
          id: req.params.id
        }
      });
      const newPost = postData.get({plain: true})
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try{
      const postData = await Post.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(postData)

    } catch (err) {
      res.status(500).json(err)
    }
  })

  module.exports = router;