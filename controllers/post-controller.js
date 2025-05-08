const connection = require("../data/db")

function index(req, res) {

    const sql = "SELECT * FROM posts"

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    })
}

function show(req, res) {

    const id = req.params.id
    const sql = "SELECT * FROM posts WHERE id = ?"

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" })
        if (results.length === 0) return res.status(404).json({ error: "Posts not found" })
        res.json(results[0])
    })
}

function store(req, res) {

}

function update(req, res) {

}

function patch(req, res) {

}

function destroy(req, res) {

    const { id } = req.params
    const sql = "DELETE FROM posts WHERE id = ?"

    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: "Failed to delete post" })
        res.sendStatus(204)
    })
}




module.exports = { index, show, store, update, patch, destroy }