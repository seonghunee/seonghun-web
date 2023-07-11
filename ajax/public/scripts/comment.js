const commentButtonElement = document.getElementById('comment-button');
const commentSectionElement = document.getElementById('comments');
const commentFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

function createCommentsList(comments) {
    const commentsListElement = document.createElement('ol');
    
    for (const comment of comments) {
        const commentElement = document.createElement('li');
        commentElement.innerHTML = `
        <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
        </article>
        `;
        commentsListElement.appendChild(commentElement);
    }

    return commentsListElement;
}

async function fetchCommentPost() {
    const postId = commentButtonElement.dataset.postid;
    const comment = await fetch(`/posts/${postId}/comments`);
    const commentData = await comment.json();

    if (commentData && commentData.length > 0) {
        const commentsListElement = createCommentsList(commentData);
        commentSectionElement.innerHTML = '';
        commentSectionElement.appendChild(commentsListElement);
    } else {
        commentSectionElement.firstElementChild.textContent = 
        'We could not find any comments.'
    }
}

async function saveComment(event) { 
    event.preventDefault();

    const commentTitle = commentTitleElement.Value;
    const commentText = commentTextElement.Value;
    const postId = commentFormElement.dataset.postid;
    const comment = {title: commentTitle, text: commentText};

    try {
        const response = await fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
        fetchCommentPost(); 
        } else {
            alert('error');
        }
    } catch {
        alert('error!')
    }

    
    
}

commentButtonElement.addEventListener('click', fetchCommentPost);
commentFormElement.addEventListener('submit', saveComment);