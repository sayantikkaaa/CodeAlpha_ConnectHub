const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let users = [
    {
        id: 1,
        name: "Sayantika Boral",
        username: "sayantika",
        followers: [],
        following: []
    }
];

let posts = [
    {
        id: 1,
        userId: 1,
        content: "Building my first social media platform! 💻💜",
        likes: 0,
        comments: []
    },
    {
        id: 2,
        userId: 1,
        content: "Learning HTML, CSS, JavaScript and Express.js 🚀",
        likes: 0,
        comments: []
    }
];

// Get users
app.get("/api/users", (req, res) => {
    res.json(users);
});

// Get posts
app.get("/api/posts", (req, res) => {
    res.json(posts);
});

// Create a post
app.post("/api/posts", (req, res) => {
    const { content } = req.body;

    if (!content || !content.trim()) {
        return res.status(400).json({
            message: "Post content is required"
        });
    }

    const newPost = {
        id: posts.length + 1,
        userId: 1,
        content: content.trim(),
        likes: 0,
        comments: []
    };

    posts.unshift(newPost);

    res.status(201).json(newPost);
});

// Like a post
app.post("/api/posts/:id/like", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    post.likes++;

    res.json(post);
});

// Add comment
app.post("/api/posts/:id/comments", (req, res) => {
    const post = posts.find(p => p.id === Number(req.params.id));

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    const { text } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({
            message: "Comment cannot be empty"
        });
    }

    const comment = {
        id: post.comments.length + 1,
        username: "sayantika",
        text: text.trim()
    };

    post.comments.push(comment);

    res.status(201).json(comment);
});

// Follow user
app.post("/api/users/:id/follow", (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (!user.followers.includes(1)) {
        user.followers.push(1);
    }

    res.json(user);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start server
app.listen(PORT, () => {
    console.log(`ConnectHub running at http://localhost:${PORT}`);
});
