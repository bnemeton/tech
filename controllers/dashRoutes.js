const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment')
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.id
            }
        })

        const plainPosts = postData.map(post => post.get({plain: true}));
        res.render('dashboard', {
            posts: plainPosts,
            logged_in: req.session.logged_in
            })
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get('/new', withAuth, async (req, res) => {
    try{
        res.render('new')
    } catch (err) {
        res.status(404).json(err)
    }
})

module.exports = router;