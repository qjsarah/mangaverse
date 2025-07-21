 <nav class="bg-secondary pb-2 rounded-bottom-5 position-fixed top-0 w-100 ">
 <div class="container pt-3 w-100 d-flex justify-content-between align-items-center">
    <h3>MangaVerse</h3>
      <div class="d-flex float-end align-items-center">
        <input type="text" id="title" placeholder="Enter manga title" class="form-control rounded-pill pr-3 my-auto">
        <button onclick="fetchManga()" class="btn my-auto"id="searchBtn">Search</button>
      <div>
        <button id="themeToggle" class="btn">
        <span id="themeIcon"><i class="fa-solid fa-sun"></i></span>
      </div>
    </div>
</div>
</nav>

<div id="results" class="modal fade" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content"></div>
  </div>
</div>