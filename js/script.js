async function getPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    return posts;
}

async function renderPosts() {
    const postsContainer = document.getElementById('posts-container');
    const posts = await getPosts();

    for (const post of posts) {
        const postContainer = document.createElement('div');
        postContainer.className = 'post-container';

        const userPhoto = document.createElement('img');
        userPhoto.className = 'user-photo';
        userPhoto.src = `https://i.pravatar.cc/50?u=${post.id}`;
        postContainer.appendChild(userPhoto);

        const postImage = document.createElement('img');
        postImage.className = 'post-image';
        postImage.src = `https://source.unsplash.com/800x400/?nature,${post.id}`;
        postContainer.appendChild(postImage);

        const postContent = document.createElement('div');
        postContent.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
        postContainer.appendChild(postContent);

        const commentsIcon = document.createElement('span');
        commentsIcon.className = 'comments-icon';
        commentsIcon.innerHTML = '💬';
        commentsIcon.onclick = () => toggleComments(postContainer, post.id);
        postContent.appendChild(commentsIcon);

        const commentsContainer = document.createElement('div');
        commentsContainer.className = 'comments-container';
        postContainer.appendChild(commentsContainer);


        postsContainer.appendChild(postContainer);
    }
}

async function getAndRenderComments(commentsContainer, postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = await response.json();

    commentsContainer.innerHTML = '<h3>Comments:</h3>';

    const limitedComments = comments.slice(0, 7);

    limitedComments.forEach(comment => {
        const commentElement = document.createElement('p');
        commentElement.className = 'comment';
        commentElement.innerHTML = `<strong>${comment.email}</strong>: ${comment.body}`;
        commentsContainer.appendChild(commentElement);
    });
}

function toggleComments(postContainer, postId) {
    const commentsContainer = postContainer.querySelector('.comments-container');
    const isOpen = commentsContainer.style.display === 'block';

    if (!isOpen) {
        getAndRenderComments(commentsContainer, postId);
    }

    commentsContainer.style.display = isOpen ? 'none' : 'block';
}

window.onload = renderPosts;