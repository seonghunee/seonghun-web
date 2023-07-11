const express = require('express');
const db = require('../data/database');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
  const posts = await db.getDb().collection('posts').find({}).project({ _id: 1, title: 1, summary: 1, 'author.name': 1}).toArray();
  res.render('posts-list', { posts: posts });
});


router.get('/new-post', async function(req, res) {
  const authors = await db.getDb().collection('authors').find().toArray();
  console.log(authors)
  res.render('create-post', {authors: authors});
});

router.get('/posts/:id', async function(req, res) {
  const postId = new ObjectId(req.params.id);
  console.log(postId);
  const post = await db.getDb().collection('posts').findOne({_id: postId});
  
  if (!post || post.length == 0 ) {
    return res.status(404).render('404');
  }

  post.humanReadableDate = post.date.toLocaleDateString('eu-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  post.date = post.date;

  res.render('post-detail', {post: post});
})

router.get('/posts/:id/edit', async function(req, res) {
  const postId = new ObjectId(req.params.id);
  console.log(postId);
  const post = await db.getDb().collection('posts').findOne({ _id: postId });

  if (!post || post.length == 0 ) {
    return res.status(404).render('404');
  }

  res.render('update-post', { post: post });
})

router.post('/posts/:id/edit', async function(req, res) {
  const postId = new ObjectId(req.params.id);
  await db.getDb().collection('posts').updateOne({ _id: postId }, { $set: {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    //date: new Date()
  }});

  res.redirect('/posts');
})

router.post('/new-post', async function(req, res) {
  const authorId = new ObjectId(req.body.author);
  const author = await db.getDb().collection('authors').findOne( { _id: authorId } );

  const newData = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email
    }
  }
  
  const result = await db.getDb().collection('posts').insertOne(newData);
  console.log(result);

  res.redirect('/posts');
});

router.post('/posts/:id/delete', async function(req, res) {
  const postId = new ObjectId(req.params.id);
  
  await db.getDb().collection('posts').deleteOne({_id: postId});

  res.redirect('/posts');
})


module.exports = router;