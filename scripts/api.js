async function fetchManga() {
  const title = document.getElementById('title').value.trim();
  const resultsDiv = document.getElementById('results');
  const modalContent = document.querySelector('#results .modal-content');
  const modal = new bootstrap.Modal(resultsDiv);


  if (!title) {
    alert('Please enter a manga title.');
    return;
  }

  try {
    const searchRes = await fetch(`https://api.jikan.moe/v4/manga?q=${title}`);
    const searchData = await searchRes.json();

    if (!searchData.data || searchData.data.length === 0) {
      modalContent.innerHTML = 'No manga found.';
      modal.show();
      return;
    }

    const manga = searchData.data[0];
    const mangaId = manga.mal_id;

    const mangaRes = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}`);
    const charResponse = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}/characters`);
    const mangaData = await mangaRes.json();
    const charData = await charResponse.json();

    const info = mangaData.data;

    modalContent.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">${info.title}</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="d-flex gap-3 flex-column flex-lg-row align-items-center justify-content-center container float-center modal-body flex-wrap">
        <a href="${info.url}" target="_blank">
          <img src="${info.images.jpg.image_url}" alt="${info.title}" class="img-fluid">
        </a>
        <div>
          <p>${info.synopsis ? info.synopsis.slice(0, 250) + (info.synopsis.length > 300 ? '...' : '') : 'No synopsis available.'} 
          <a href="${info.url}" target="_blank" class="nav-link"><u>read more.</u></a></p>
        </div>
        <div class="mt-2 container">
          <h4>Main Character/s</h4>
          <div class="characterDetails d-flex gap-1 flex-wrap"></div>
        </div>
      </div>

    `;

    const characterDetailsDiv = modalContent.querySelector('.characterDetails');
    charData.data
      .filter(character => character.role === "Main")
      .forEach(character => {
        characterDetailsDiv.innerHTML += `
          <div class="character">
            <img src="${character.character.images.jpg.image_url}" alt="${character.character.name}" width="100"><br>
            <a href="${character.character.url}" target="_blank" class="nav-link">${character.character.name}</a>
          </div>
        `;
      });

    modal.show();

  } catch (error) {
    console.error('Error:', error);
    modalContent.innerText = 'Error fetching manga data. Check the console.';
    modal.show();
  }
}
