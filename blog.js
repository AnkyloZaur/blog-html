document.addEventListener('DOMContentLoaded', () => {
    fetch('post.json')
        .then(response => response.json())
        .then(posts => displayPosts(posts));

    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('closePopup');
    closeBtn.onclick = () => {
        popup.style.display = 'none';
    };
    window.onclick = (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    };
});

function displayPosts(posts) {
    const container = document.getElementById('posts-container');
    container.innerHTML = '';
    posts.forEach((post, idx) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p class="date">${post.date}</p>
            <button class="read-more" data-idx="${idx}">Read more</button>
        `;
        container.appendChild(postDiv);
    });
    document.querySelectorAll('.read-more').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.getAttribute('data-idx');
            showPopup(posts[idx]);
        });
    });
}

function showPopup(post) {
    document.getElementById('popup-title').textContent = post.title;
    document.getElementById('popup-date').textContent = post.date;
    document.getElementById('popup-body').textContent = post.content;
    document.getElementById('popup').style.display = 'block';
}
