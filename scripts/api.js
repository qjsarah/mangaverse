async function fetchManga() {
  const title = document.getElementById('title').value.trim();
  const modalContent = document.getElementById('modalContent');
  const modalToggle = document.getElementById('results');

  if (!title) {
    alert('Please enter a manga title.');
    return;
  }

  try {
    const searchRes = await fetch(`https://api.mangadex.org/manga?title=${title}`);
    const searchData = await searchRes.json();

    if (!searchData.data || searchData.data.length === 0) {
      modalContent.innerHTML = '<p>No manga found.</p>';
      modalToggle.checked = true;
      return;
    }

    const manga = searchData.data[0];
    const mangaId = manga.id;

    const mangaRes = await fetch(`https://api.mangadex.org/manga/${mangaId}`);
    const mangaData = await mangaRes.json();
    const mangaInfo = mangaData.data.attributes;

    const coverRel = manga.relationships.find(rel => rel.type === 'cover_art');
    if (!coverRel) {
      modalContent.innerHTML = '<p>Cover image not found.</p>';
      modalToggle.checked = true;
      return;
    }

    const coverRes = await fetch(`https://api.mangadex.org/cover/${coverRel.id}`);
    const coverData = await coverRes.json();
    const fileName = coverData.data.attributes.fileName;
    const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
    const mangaUrl = `https://mangadex.org/title/${mangaId}`;

    modalContent.innerHTML = `
      <h3 class="text-xl font-bold mb-2">${mangaInfo.title.en || 'No Title'}</h3>
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <img src="${coverUrl}" alt="${mangaInfo.title.en}" class="w-40 rounded-lg shadow-md" />
        <div>
          <p class="mb-3">${mangaInfo.description?.en ? mangaInfo.description.en.slice(0, 350) + '...' : 'No synopsis available.'}</p>
          <a href="${mangaUrl}" target="_blank" class="btn btn-outline">Read Manga</a>
        </div>
      </div>
    `;

    modalToggle.checked = true;
  } catch (error) {
    console.error('Error:', error);
    modalContent.innerHTML = '<p>Error fetching manga data. Check console.</p>';
    modalToggle.checked = true;
  }
}
