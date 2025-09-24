// IIFE to avoid polluting global scope
(function() {
  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    const CLASS_NAME = 'fullscreen-mode';
    const STORAGE_KEY = 'theme_fullscreen_mode';
    const BUTTON_ID = 'fullscreen-toggle-btn';

    // Find the container for the button
    const rightsideConfig = document.getElementById('rightside-config-hide');

    // If the container doesn't exist, do nothing
    if (!rightsideConfig) {
      return;
    }

    // --- 1. Create the button ---
    const button = document.createElement('button');
    button.id = BUTTON_ID;
    button.type = 'button';
    button.title = '切换全屏模式';
    button.innerHTML = '<i class="fas fa-expand"></i>';

    // Add the button to the page
    rightsideConfig.appendChild(button);

    // --- 2. Function to apply the mode ---
    const applyMode = (isFullScreen) => {
      if (isFullScreen) {
        document.body.classList.add(CLASS_NAME);
        button.innerHTML = '<i class="fas fa-compress"></i>'; // Change icon to "compress"
      } else {
        document.body.classList.remove(CLASS_NAME);
        button.innerHTML = '<i class="fas fa-expand"></i>'; // Change icon to "expand"
      }
    };

    // --- 3. Add click event listener to the button ---
    button.addEventListener('click', () => {
      const isCurrentlyFullScreen = document.body.classList.contains(CLASS_NAME);
      // Toggle the mode and save the new state
      applyMode(!isCurrentlyFullScreen);
      localStorage.setItem(STORAGE_KEY, !isCurrentlyFullScreen);
    });

    // --- 4. Check localStorage on page load and apply the saved mode ---
    const savedMode = localStorage.getItem(STORAGE_KEY);
    // If savedMode is 'true', apply fullscreen, otherwise default to not fullscreen
    applyMode(savedMode === 'true');
  });
})();