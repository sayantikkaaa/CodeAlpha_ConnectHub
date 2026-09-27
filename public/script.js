// Follow system
let following = false;

function followUser() {
    const button = document.querySelector(".profile button");

    following = !following;

    if (following) {
        button.textContent = "Following ✓";
        button.style.background = "#4caf50";
    } else {
        button.textContent = "Follow";
        button.style.background = "#7b4bb7";
    }
}

// Like system
function likePost(button) {
    const count = button.querySelector("span");

    let likes = Number(count.textContent);

    if (button.classList.contains("liked")) {
        likes--;
        button.classList.remove("liked");
        button.innerHTML = `❤️ Like <span>${likes}</span>`;
    } else {
        likes++;
        button.classList.add("liked");
        button.innerHTML = `💖 Liked <span>${likes}</span>`;
    }
}

// Show/hide comment box
function showComment(button) {
    const post = button.closest(".post");
    const commentBox = post.querySelector(".comment-box");

    if (commentBox.style.display === "block") {
        commentBox.style.display = "none";
    } else {
        commentBox.style.display = "block";
        commentBox.querySelector("input").focus();
    }
}

// Add comment
function addComment(button) {
    const commentBox = button.closest(".comment-box");
    const input = commentBox.querySelector("input");
    const comments = commentBox.querySelector(".comments");

    const text = input.value.trim();

    if (text === "") {
        alert("Please write a comment first.");
        return;
    }

    const comment = document.createElement("div");
    comment.className = "comment";
    comment.textContent = "👩🏻 You: " + text;

    comments.appendChild(comment);

    input.value = "";
}

// Create new post
function createPost() {
    const input = document.getElementById("postInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please write something before posting.");
        return;
    }

    const postContainer = document.getElementById("postContainer");

    const post = document.createElement("article");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <div class="small-pic">👩🏻</div>
            <div>
                <b>Sayantika Boral</b>
                <small>@sayantika</small>
            </div>
        </div>

        <p>${text}</p>

        <div class="actions">
            <button onclick="likePost(this)">
                ❤️ Like <span>0</span>
            </button>

            <button onclick="showComment(this)">
                💬 Comment
            </button>
        </div>

        <div class="comment-box">
            <input type="text" placeholder="Write a comment...">
            <button onclick="addComment(this)">Post</button>
            <div class="comments"></div>
        </div>
    `;

    postContainer.prepend(post);

    input.value = "";
}