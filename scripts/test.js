document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchBar');
    const images = document.querySelectorAll('img');

    searchInput.addEventListener('input', function () {
        const searchText = searchInput.value.toLowerCase();

        images.forEach(function (image) {
            const altText = image.getAttribute('alt').toLowerCase();
            if (altText.includes(searchText)) {
                image.parentElement.style.display = 'block';
            } else {
                image.parentElement.style.display = 'none';
            }
        });
    });
});
