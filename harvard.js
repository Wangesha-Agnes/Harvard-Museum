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
