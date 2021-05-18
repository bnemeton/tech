const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.session.user_id)
      const commentData = await Comment.create({
       ...req.body,
        user_id: req.session.user_id
      });
      console.log(commentData)
      const newComment = commentData.get({plain: true})
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;