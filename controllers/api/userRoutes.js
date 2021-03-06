const router = require('express').Router();
const User = require('../../models/User');


router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const userData = await User.create({...req.body});
    console.log(userData)
    const newUser = userData.get({plain: true})
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { name: req.body.username } });
  
      if (!userData) {
        res
          .status(530)
          .json({ message: 'incorrect login info' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(530)
          .json({ message: 'incorrect login info' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.status(200).json({ user: userData, message: 'login successful!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;