<div class="container mx-auto mt-5 flex flex-col lg:flex-row gap-4 pt-5 content-container">
    <div></div>

    <!-- Main content -->
    <div class="w-full lg:w-3/4">
        <h2 class="font-bold text-lg">Top Manga</h2>
        <div id="popular-manga" class="mt-2"></div>

        <h2 class="mt-4 font-bold text-lg">Recently Updated</h2>
        <div id="latest-manga"></div>
    </div>

    <!-- Sidebar -->
    <div class="w-full lg:w-1/4">
        <div class="w-full">
            <h2 class="font-bold mb-2 text-lg">Genre List</h2>
            <div id="genre-list" class="flex flex-col gap-2"></div>
        </div>
    </div>

    <!-- Modal -->
    <input type="checkbox" id="genre-manga" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box  w-11/12 max-w-5xl">
            <div id="genreContent"></div>
            <div class="modal-action">
            <label for="genre-manga" class="btn">Close</label>
            </div>
        </div>
        <label for="genre-manga" class="modal-backdrop">Close</label>
    </div>
</div>
