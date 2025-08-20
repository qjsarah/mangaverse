
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
                <div class="item flex flex-col relative">
                <a href="${manga.url}" target="_blank" class="manga-cover block relative">
                    <img src="${manga.images.jpg.image_url}" 
                        alt="${manga.title}" 
                        class="w-[150px] rounded-r-xl object-cover" />
                    <span class="font-bold text-left manga-title absolute left-0 bottom-0 text-white text-sm px-2 py-1 w-full">
                    ${manga.title}
                    </span>
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
                    <a href="${manga.url}" target="_blank" class="manga-cover block relative"><img src="${manga.images.jpg.image_url}" class="w-[150px] rounded-r-xl object-cover" alt="${manga.title}">
                    <span class="font-bold text-left manga-title absolute left-0 bottom-0 text-white text-sm px-2 py-1 w-full">${manga.title}</span></a>
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
const modalToggle = document.getElementById('genre-manga');
const modalContent = document.getElementById('genreContent');


genreListDiv.innerHTML = genres.map(genre => `
    <button class="btn btn-primary mb-1 form-control py-5 rounded-full" onclick="loadGenreManga(${genre.id})" >${genre.name}</button>`).join('');

async function loadGenreManga(genreId) {
    const mangaList = await fetchMangaByGenre(genreId);
    modalContent.innerHTML = `
        <h3 class="text-xl font-bold mb-2">Manga in ${genres.find(g => g.id === genreId).name} Genre</h3>
            <div class="flex flex-wrap">
                ${mangaList.map(manga => `
                    <div class="w-1/2 sm:w-1/4 mb-4 flex justify-center">
                        <div class="p-2 rounded-b-xl shadow-md text-center">
                            <a href="${manga.url}" target="_blank" class="manga-cover">
                            <img src="${manga.images.jpg.image_url}" 
                                alt="${manga.title}" 
                                class="w-[150px] rounded-e-xl object-cover mx-auto" />
                            </a>
                            <p class="font-bold text-left mt-2">${manga.title}</p>
                        </div>
                    </div>
                `).join('')}
        </div>
    </div>
    `;
    modalToggle.checked = true;
}
