const API_KEY = 'eabd79d5-699b-45ca-ab08-8def26cbdf99';
const API_URL = 'https://api.harvardartmuseums.org/object';
const searchInput = document.getElementById('search-input');
const suggestionContainer = document.getElementById('suggestions');
const resultsContainer = document.getElementById('results');
searchInput.addEventListener('input', async function() {
 const query = this.value;
 if (query === '') {
 suggestionContainer.innerHTML = '';
 resultsContainer.innerHTML = ''; // Clear results if input is empty
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

