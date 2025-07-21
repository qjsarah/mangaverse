
const baseUrl = 'https://api.jikan.moe/v4';

// Fetch popular manga
async function fetchPopularManga() {
    const res = await fetch(`${baseUrl}/top/manga`);
    const data = await res.json();
    return data.data; 
}

// Fetch latest manga updates
async function fetchLatestManga() {
  const res = await fetch(`${baseUrl}/manga?status=publishing`);
  const data = await res.json();
  return data.data;
}

// Fetch manga by genre
async function fetchMangaByGenre(genreId) {
    const res = await fetch(`${baseUrl}/manga?genres=${genreId}&order_by=members&sort=desc`);
    const data = await res.json();
    return data.data;
}

async function owlCarousel() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        rtl: false,
        loop:true,
        margin:10,
        smartSpeed: 800,
        autoplay:true,
        autoplayTimeout:1500,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },            
            960:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });
    owl.on('mousewheel', '.owl-stage', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const d = e.originalEvent.deltaY;
        if (d > 0) {
            $(this).closest('.owl-carousel').trigger('next.owl.carousel');
        } else {
            $(this).closest('.owl-carousel').trigger('prev.owl.carousel');
        }
    });
}

//display content in the popular manga section
const popularDiv = document.getElementById('popular-manga');
fetchPopularManga().then(mangaList => {
    popularDiv.innerHTML = `
        <div class="owl-carousel owl-theme">
            ${mangaList.slice(0, 20).map(manga => `
                <div class="item d-flex flex-column">
                    <a href="${manga.url}" target="_blank" class="manga-cover nav-link">
                        <img src="${manga.images.jpg.image_url}" class="rounded-end-4 " alt="${manga.title}" style="width: 150px;">
                        <span class="fw-bold text-start manga-title position-absolute start-0 bottom-0">${manga.title}</span>
                    </a>
                </div>
            `).join('')}
        </div>
    `;
    owlCarousel();
});

//display content in the latest manga section
const latestDiv = document.getElementById('latest-manga');
fetchLatestManga().then(mangaList => {
    latestDiv.innerHTML = `
        <div class="owl-carousel owl-theme">
            ${mangaList.slice(0, 10).map(manga => `
                <div class="item">
                    <a href="${manga.url}" target="_blank" class="manga-cover nav-link"><img src="${manga.images.jpg.image_url}" class="rounded-end-4" alt="${manga.title}" style="width: 150px;">
                    <span class="fw-bold text-start manga-title position-absolute start-0 bottom-0 text-light">${manga.title}</span></a>
                </div>
            `).join('')}
        </div>
    `;
    owlCarousel();
});

// GENRE LIST
const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 4, name: 'Comedy' },
  { id: 7, name: 'Mystery' },
  { id: 10, name: 'Fantasy' },
  { id: 36, name: 'Slice of Life' },
  { id: 14, name: 'Horror' },
  { id: 62, name: 'Isekai'}
];  

const genreListDiv = document.getElementById('genre-list');
const genreMangaDiv = document.getElementById('genre-manga');

genreListDiv.innerHTML = genres.map(genre => `
    <button class="btn mb-2 form-control btn-outline-secondary py-3 rounded-end-5" onclick="loadGenreManga(${genre.id})" >${genre.name}</button>`).join('');

async function loadGenreManga(genreId) {
    const mangaList = await fetchMangaByGenre(genreId);
    genreMangaDiv.innerHTML = `
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Manga in ${genres.find(g => g.id === genreId).name} Genre</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-wrap">
                ${mangaList.map(manga => `
                    <div class="col-6 col-sm-3 mb-4 float-center">
                        <div class="item p-2 rounded-bottom-4 lift-on-hover text-center">
                            <a href="${manga.url}" target="_blank" class="manga-cover"><img src="${manga.images.jpg.image_url}" class="rounded-end-4 img-fluid" alt="${manga.title}" style="width: 150px;"></a>
                            <p class="fw-bold text-start">${manga.title}</p>
                        </div>
                    </div>
                `).join('')}
        </div>
    </div>
    `;
    const modal = new bootstrap.Modal(genreMangaDiv);
    modal.show();
}
