const express = require('express');

const blogcontrollers = require('../controllers/post-controls');
const guardLoute = require('../middlewares/auth-meddleware');

const router = express.Router();

router.get('/', blogcontrollers.getHome);

router.use(guardLoute);

router.get('/admin',blogcontrollers.getAdmin);

router.post('/posts', blogcontrollers.createPost);

router.get('/posts/:id/edit', blogcontrollers.getSinglePost);

router.post('/posts/:id/edit', blogcontrollers.updatePost);

router.post('/posts/:id/delete', blogcontrollers.deletePost);

module.exports = router;
