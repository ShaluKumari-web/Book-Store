// Smooth Scroll
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute('href').substring(1);
    const target = document.getElementById(sectionId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Google Books API Search
document.getElementById('searchInput').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const query = this.value.trim();
    if (query) {
      fetchBooks(query);
    }
  }
});

function fetchBooks(query) {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=6`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const booksContainer = document.getElementById('booksContainer');
      booksContainer.innerHTML = '';

      if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
          const volumeInfo = item.volumeInfo;
          const title = volumeInfo.title || 'No Title';
          const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown';
          const thumbnail = volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x195?text=No+Image';
          const previewLink = volumeInfo.previewLink || volumeInfo.infoLink || '#';

          const bookCard = document.createElement('div');
          bookCard.className = 'bookCard';
          bookCard.innerHTML = `
            <img src="${thumbnail}" alt="${title}" />
            <h3>${title}</h3>
            <p><strong>Author:</strong> ${authors}</p>
            <a href="${previewLink}" target="_blank" class="view-btn">View Book</a>
          `;
          booksContainer.appendChild(bookCard);
        });
      } else {
        booksContainer.innerHTML = '<p style="color:red;">No books found!</p>';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('booksContainer').innerHTML = '<p style="color:red;">Something went wrong.</p>';
    });
}


// Contact form validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    e.preventDefault();
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    alert('Invalid email format.');
    e.preventDefault();
    return;
  }

  alert('Thank you! Message sent.');
});
