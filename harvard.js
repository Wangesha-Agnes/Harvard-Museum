// const API_KEY = 'eabd79d5-699b-45ca-ab08-8def26cbdf99'; 
// const API_URL = 'https://api.harvardartmuseums.org/object';
// async function searchArtworks() {
//     const query = document.getElementById('search-input').value;
//     const url = `${API_URL}?apikey=${API_KEY}&q=${query}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         displayArtworks(data.records);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// function displayArtworks(artworks) {
//     const resultsContainer = document.getElementById('results');
//     resultsContainer.innerHTML = '';
//     artworks.forEach(artwork => {
//         const artworkElement = document.createElement('div');
//         artworkElement.className = 'artwork';
//         const title = artwork.title || 'Unknown Title';
//         const artist = artwork.people ? artwork.people.map(person => person.name).join(', ') : 'Unknown Artist';
//         const date = artwork.dated || 'Unknown Date';
//         const medium = artwork.medium || 'Unknown Medium';
//         const imageUrl = artwork.primaryimageurl || '';
//         artworkElement.innerHTML = `
//             <h3>${title}</h3>
//             <p><strong>Artist:</strong> ${artist}</p>
//             <p><strong>Date:</strong> ${date}</p>
//             <p><strong>Medium:</strong> ${medium}</p>
//             ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
//         `;
//         resultsContainer.appendChild(artworkElement);
//     });
// }

function displayArtworks(artworks) {
    resultsContainer.innerHTML = '';
    artworks.forEach(artwork => {
    const artworkElement = document.createElement('div');
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