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
    const searchRes = await fetch(`https://api.mangadex.org/manga?title=${title}`);
    const searchData = await searchRes.json();

    if (!searchData.data || searchData.data.length === 0) {
      modalContent.innerHTML = 'No manga found.';
      modal.show();
      return;
    }

    const manga = searchData.data[0];
    const mangaId = manga.id;

    const mangaRes = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
    const mangaData = await mangaRes.json();
    const info = mangaData.data;
    const mangaInfo = info.attributes;
    const coverRel = manga.relationships.find(rel => rel.type === 'cover_art');

    if (!coverRel) {
      modalContent.innerHTML = 'Cover image not found.';
      modal.show();
      return;
    }

    const coverId = coverRel.id;
    const coverRes = await fetch(`https://api.mangadex.org/cover/${coverId}`);
    const coverData = await coverRes.json();
    const fileName = coverData.data.attributes.fileName;
    const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
    const mangaUrl = `https://mangadex.org/title/${mangaId}`;

    modalContent.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">${mangaInfo.title.en}</h3>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="d-flex gap-3 flex-column flex-lg-row align-items-center justify-content-center container float-center modal-body">
        <img src="${coverUrl}" alt="${mangaInfo.title.en}" class="img-fluid w-25">
        <div>
          <a href="${mangaUrl}" target="_blank" class="nav-link"><button class="btn btn-outline-secondary rounded-pill mt-1 px-5">Read Manga</button></a></p>
          <p>${mangaInfo.description.en ? mangaInfo.description.en.slice(0, 350) : 'No synopsis available.'} 
        </div>
      </div>
    `;
    modal.show();

  } catch (error) {
    console.error('Error:', error);
    modalContent.innerText = 'Error fetching manga data. Check the console.';
    modal.show();
  }
}
