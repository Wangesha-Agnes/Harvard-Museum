const API_KEY = 'eabd79d5-699b-45ca-ab08-8def26cbdf99';
const API_URL = 'https://api.harvardartmuseums.org/object';
const searchInput = document.getElementById('search-input');
const suggestionContainer = document.getElementById('suggestions');
const resultsContainer = document.getElementById('results');
searchInput.addEventListener('input', async function() {
 const query = this.value;
 if (query === '') {
 suggestionContainer.innerHTML = '';
 resultsContainer.innerHTML = '';
 return;
 }
 const url = `${API_URL}?apikey=${API_KEY}&q=${query}`;
 try {
 const response = await fetch(url);
 const data = await response.json();
 displaySuggestions(data.records);
 } catch (error) {
 console.error('Error fetching data:', error);
 }
});

function displaySuggestions(artworks) {
    suggestionContainer.innerHTML = '';
    artworks.forEach(artwork => {
    const suggestion = document.createElement('div');
    suggestion.textContent = artwork.title || 'Unknown Title';
    suggestion.addEventListener('click', function() {
    searchInput.value = this.textContent;
    suggestionContainer.innerHTML = '';
    searchArtworks();
    });
    suggestionContainer.appendChild(suggestion);
    });
   }

async function searchArtworks() {
    const query = searchInput.value;
    if (query === '') {
    resultsContainer.innerHTML = ''; 
    return;
    }
    const url = `${API_URL}?apikey=${API_KEY}&q=${query}`;
    try {
    const response = await fetch(url);
    const data = await response.json();
    displayArtworks(data.records);
    } catch (error) {
    console.error('Error fetching data:', error);
    }
    suggestionContainer.innerHTML = ''; 
   }
   
   function displayArtworks(artworks) {
    resultsContainer.innerHTML = '';
    artworks.forEach(artwork => {
    const artworkElement = document.createElement('div');
    artworkElement.classList.add('photo-card')
    artworkElement.className = 'artwork';
    const title = artwork.title || 'Unknown Title';
    const artist = artwork.people ? artwork.people.map(person => person.name).join(', ') : 'Unknown Artist';
    const date = artwork.dated || 'Unknown Date';
    const medium = artwork.medium || 'Unknown Medium';
    const imageUrl = artwork.primaryimageurl || '';
    artworkElement.innerHTML = `
    <h3>${title}</h3>
    <p><strong>Artist:</strong> ${artist}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Medium:</strong> ${medium}</p>
    ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
    `;
    resultsContainer.appendChild(artworkElement);
    });
   }

