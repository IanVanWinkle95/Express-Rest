const express = require("express")
const router = express.Router()

const posts = require("../data/posts")
const error = require("../utilities")

router
  .route("/")
  .get((req, res) => {
    res.json(posts)
  })
  .post((req, res) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      }

      posts.push(post)
      res.json(posts[posts.length - 1])
    } else res.json({ error: "Insufficient Data" })
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id)
    if (post) res.json(post)
    else next()
  })
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key]
        }
        return true
      }
    })

    if (post) res.json(post)
    else next()
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1)
        return true
      }
    })

    if (post) res.json(post)
    else next()
  })


  router
  .route ("/:id")
  .get((req, res, next) => {
      const post = posts.find((p) => p.id == req.params.id)
      const links =[
          {
              href: `/${req.params.id}`,
              rel: "",
              type: "PATCH",
          },
          {
              href: `${req.params.id}`,
              rel: "",
              type: "DELETE",
          },
      ]
      if (post) res.json({post, links})
          else next()
    })
  
    .patch((req, res, next) => {
      const post = posts.find((p, i) => {
        if (p.id == req.params.id) {
          for (const key in req.body) {
            posts[i][key] = req.body[key]
          }
          return true
        }
      })
      if (post) res.json(post)
      else next()
    })
    .delete((req, res, next) => {
      const post = posts.find((p, i) => {
        if (p.id == req.params.id) {
          comments.splice(i, 1)
          return true
        }
      })
      if (posts) res.json(post)
      else next
    })

module.exports = router
