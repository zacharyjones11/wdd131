// First, let's select the theme selector dropdown
const themeSelector = document.querySelector('#theme-select');

// Get the theme from localStorage or default to 'light'
const theme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Function to enable dark mode
function enableDarkMode() {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
    themeSelector.value = 'Dark';
    // Update logo
    document.querySelector('.logo').src = 'byui-logo_white.webp';
}

// Function to enable light mode
function enableLightMode() {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeSelector.value = 'Light';
    // Update logo
    document.querySelector('.logo').src = 'byui-logo_blue.webp';
}

// Check initial theme when page loads
if (theme === 'dark' || (!theme && prefersDark.matches)) {
    enableDarkMode();
} else {
    enableLightMode();
}

// Listen for theme changes via dropdown
themeSelector.addEventListener('change', () => {
    if (themeSelector.value === 'Dark') {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});

// Listen for system theme changes
prefersDark.addEventListener('change', (e) => {
    if (e.matches) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
});