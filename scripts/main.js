const savedTheme = localStorage.getItem('theme') || 'luxury';

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  // Apply saved theme on load
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.innerHTML = savedTheme === 'luxury'
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  // Toggle on click
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'luxury' ? 'valentine' : 'luxury';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    themeIcon.innerHTML = newTheme === 'luxury'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });
});
