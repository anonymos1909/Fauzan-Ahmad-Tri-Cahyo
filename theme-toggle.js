(function () {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');

  if (!button) return;

  const getStoredTheme = () => {
    try {
      const savedTheme = localStorage.getItem('ruang-hijau-theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch (error) {
      console.warn('Tema tidak dapat dibaca dari localStorage:', error);
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    button.setAttribute('aria-pressed', String(isDark));
    button.classList.toggle('is-dark', isDark);

    const icon = button.querySelector('.toggle-icon');
    const label = button.querySelector('.toggle-label');

    if (icon) {
      icon.textContent = isDark ? '☾' : '☀';
    }

    if (label) {
      label.textContent = isDark ? 'Mode terang' : 'Mode gelap';
    }
  };

  const setTheme = (theme) => {
    try {
      localStorage.setItem('ruang-hijau-theme', theme);
    } catch (error) {
      console.warn('Tema tidak dapat disimpan ke localStorage:', error);
    }

    applyTheme(theme);
  };

  applyTheme(getStoredTheme());

  button.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });
})();
