<nav class="bg-base-300 pb-2 rounded-b-xl position-fixed top-0 w-full ">
<div class="container pt-3 w-full flex justify-between align-items-center px-5">
  <h3 class="font-bold text-xl">MangaVerse</h3>
  <div class="flex gap-2 align-items-center">
    <div class="join">
      <input type="text" id="title" placeholder="Enter manga title" class="join-item shadow-md p-3 my-auto input">
      <button onclick="fetchManga()" class="btn btn-primary shadow-md join-item  my-auto"id="searchBtn">Search</button>
    </div>
    <div>
      <button id="themeToggle" class="btn shadow-md">
      <span id="themeIcon"><i class="fa-solid fa-sun"></i></span>
    </div>
  </div>
</div>
</nav>

<input type="checkbox" id="results" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box max-w-3xl">
    <div id="modalContent"></div>
    <div class="modal-action">
      <label for="results" class="btn">Close</label>
    </div>
  </div>
  <label for="results" class="modal-backdrop">Close</label>
</div>