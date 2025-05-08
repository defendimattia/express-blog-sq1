const posts = require("../data/posts")

function index(req, res) {
    let filteredPosts = posts

    if (req.query.tag) {
        filteredPosts = posts.filter(post => post.tags.includes(req.query.tag)
        )
    }
    
    res.json(filteredPosts)
}

function show(req, res) {
    const selectedPost = posts.find((el) => el.id === parseInt(req.params.id))

    if (!selectedPost) {
        res.status(404)

        return res.json({
            status: 404,
            error: "Not found",
            message: "Post not found"
        })
    }
    
    res.json(selectedPost)
}

function store(req, res) {
    const newId = posts.at(-1).id + 1

    const newPost = {

        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags

    }

    posts.push(newPost)

    res.status(201).send(`Created new post with id: ${newId}`)
}

function update(req, res) {
    const selectedPost = posts.find((el) => el.id === parseInt(req.params.id))


    if (!selectedPost) {
        res.status(404)

        return res.json({
            status: 404,
            error: "Not found",
            message: "Post not found"
        })
    }

    selectedPost.title = req.body.title
    selectedPost.content = req.body.content
    selectedPost.image = req.body.image
    selectedPost.tags = req.body.tags

    console.log(`Post with id: ${req.params.id}, full edit`)
    res.json(posts)
}

function patch(req, res) {
    const selectedPost = posts.find((el) => el.id === parseInt(req.params.id))


    if (!selectedPost) {
        res.status(404)

        return res.json({
            status: 404,
            error: "Not found",
            message: "Post not found"
        })
    }

    if (req.body.title) selectedPost.title = req.body.title
    if (req.body.content) selectedPost.content = req.body.content
    if (req.body.image) selectedPost.image = req.body.image
    if (req.body.tags) selectedPost.tags = req.body.tags

    console.log(`Post with id: ${req.params.id}, partial edit`)
    res.json(posts)
}

function destroy(req, res) {
    const selectedPost = posts.find((el) => el.id === parseInt(req.params.id))


    if (!selectedPost) {
        res.status(404)

        return res.json({
            status: 404,
            error: "Not found",
            message: "Post not found"
        })
    }

    posts.splice(posts.indexOf(selectedPost), 1)

    res.sendStatus(204)
}




module.exports = { index, show, store, update, patch, destroy }