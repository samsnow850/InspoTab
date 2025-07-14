// --- Background Images ---
const BACKGROUND_IMAGES = [
  'images/bg1.jpg',
  'images/bg2.jpg',
  'images/bg3.jpg',
  'images/bg4.jpg',
  'images/bg5.jpg',
  'https://img.pikbest.com/wp/202345/textured-minimalist-background-minimalistic-black-wave-pattern-texture-rendered-in-3d_9614698.jpg!w700wp',
  // Add more as needed
];

function getDailyBackground() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  return BACKGROUND_IMAGES[dayOfYear % BACKGROUND_IMAGES.length];
}

function setBackground() {
  const bgDiv = document.getElementById('background');
  const customBg = loadCustomBackground();
  
  if (customBg) {
    // Use custom background
    bgDiv.style.backgroundImage = `url('${customBg}')`;
  } else {
    // Use daily background
    bgDiv.style.backgroundImage = `url('${getDailyBackground()}')`;
  }
}

// --- Quotes ---
function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

// --- Quotes with Animation ---
function setQuote() {
  const quoteDiv = document.getElementById('quote');
  
  // Fade out current quote
  quoteDiv.classList.add('fade-out');
  
  setTimeout(() => {
    // Change the quote content
    quoteDiv.textContent = getRandomQuote();
    
    // Fade in new quote
    quoteDiv.classList.remove('fade-out');
    quoteDiv.classList.add('fade-in');
    
    // Remove animation classes after transition
    setTimeout(() => {
      quoteDiv.classList.remove('fade-in');
    }, 500);
  }, 250);
}

// --- Name & Greeting ---
function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

// --- Greeting with Animation ---
function setGreeting(name) {
  const greetingDiv = document.getElementById('greeting');
  const timeGreeting = getTimeBasedGreeting();
  
  // Fade out current greeting
  greetingDiv.classList.add('fade-out');
  
  setTimeout(() => {
    // Update the greeting content
    if (name) {
      greetingDiv.textContent = `${timeGreeting}, ${name} — here's some inspiration.`;
    } else {
      greetingDiv.textContent = `${timeGreeting} — here's some inspiration.`;
    }
    
    // Fade in new greeting
    greetingDiv.classList.remove('fade-out');
    greetingDiv.classList.add('fade-in');
    
    // Remove animation classes after transition
    setTimeout(() => {
      greetingDiv.classList.remove('fade-in');
    }, 500);
  }, 250);
}

function loadName() {
  return localStorage.getItem('inspotab_name') || '';
}

function saveName(name) {
  localStorage.setItem('inspotab_name', name);
}

// --- Theme ---
function setTheme(theme) {
  document.body.classList.toggle('dark-theme', theme === 'dark');
  document.body.classList.toggle('light-theme', theme === 'light');
}

function loadTheme() {
  return localStorage.getItem('inspotab_theme') || 'light';
}

function saveTheme(theme) {
  localStorage.setItem('inspotab_theme', theme);
}

// --- Font ---
function setFont(font) {
  document.body.classList.remove('font-sans-serif', 'font-serif', 'font-handwriting');
  document.body.classList.add(`font-${font}`);
}

// --- Font Color ---
// Removed setFontColor, loadFontColor, saveFontColor functions

function loadFont() {
  return localStorage.getItem('inspotab_font') || 'sans-serif';
}

function saveFont(font) {
  localStorage.setItem('inspotab_font', font);
}

// --- Keyboard Shortcuts ---
function loadKeyboardShortcutsEnabled() {
  const setting = localStorage.getItem('inspotab_keyboard_shortcuts');
  return setting === null ? true : setting === 'true'; // Default to enabled
}

function saveKeyboardShortcutsEnabled(enabled) {
  localStorage.setItem('inspotab_keyboard_shortcuts', enabled.toString());
}

// --- Settings Sections ---
function loadSectionStates() {
  const states = localStorage.getItem('inspotab_section_states');
  return states ? JSON.parse(states) : {
    personalization: false,
    theme: false,
    keyboard: false,
    background: false,
    info: false
  };
}

function saveSectionStates(states) {
  localStorage.setItem('inspotab_section_states', JSON.stringify(states));
}

function toggleSection(sectionName) {
  const header = document.querySelector(`[data-section="${sectionName}"]`);
  const content = document.getElementById(`${sectionName}-content`);
  const states = loadSectionStates();
  
  // If this section is currently open, close it
  if (states[sectionName]) {
    states[sectionName] = false;
    header.classList.add('collapsed');
    content.classList.add('collapsed');
  } else {
    // Close all other sections first (accordion behavior)
    Object.keys(states).forEach(key => {
      if (key !== sectionName) {
        states[key] = false;
        const otherHeader = document.querySelector(`[data-section="${key}"]`);
        const otherContent = document.getElementById(`${key}-content`);
        if (otherHeader && otherContent) {
          otherHeader.classList.add('collapsed');
          otherContent.classList.add('collapsed');
        }
      }
    });
    
    // Open the clicked section
    states[sectionName] = true;
    header.classList.remove('collapsed');
    content.classList.remove('collapsed');
  }
  
  saveSectionStates(states);
}

function initializeSections() {
  const states = loadSectionStates();
  
  Object.keys(states).forEach(sectionName => {
    const header = document.querySelector(`[data-section="${sectionName}"]`);
    const content = document.getElementById(`${sectionName}-content`);
    
    if (header && content) {
      if (states[sectionName]) {
        header.classList.remove('collapsed');
        content.classList.remove('collapsed');
      } else {
        header.classList.add('collapsed');
        content.classList.add('collapsed');
      }
    }
  });
}



// --- Copy Quote Functionality ---
function copyQuoteToClipboard() {
  const quoteText = document.getElementById('quote').textContent;
  
  // Use modern clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(quoteText).then(() => {
      showCopyFeedback();
    }).catch(() => {
      // Fallback for older browsers
      fallbackCopyTextToClipboard(quoteText);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(quoteText);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showCopyFeedback();
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  
  document.body.removeChild(textArea);
}

function showCopyFeedback() {
  const copyBtn = document.getElementById('copyQuote');
  const icon = copyBtn.querySelector('i');
  
  copyBtn.classList.add('copied');
  icon.className = 'fa-solid fa-check'; // Change to checkmark
  
  setTimeout(() => {
    copyBtn.classList.remove('copied');
    icon.className = 'fa-solid fa-copy'; // Change back to copy icon
  }, 2000);
}

// --- Keyboard Shortcuts ---
function toggleMinimalMode() {
  const body = document.body;
  body.classList.toggle('minimal-mode');
}

function showKeyboardShortcuts() {
  const shortcuts = [
    'R - Get a new random quote',
    'H - Toggle minimal mode (hide/show UI elements)',
    'S - Open settings',
    'A - Open about page',
    'C - Open changelog',
    'ESC - Close modals/panels'
  ];
  
  // Create a small popup instead of using alert
  const popup = document.createElement('div');
  popup.className = 'keyboard-popup';
  popup.innerHTML = `
    <div class="keyboard-popup-content">
      <h3>Keyboard Shortcuts</h3>
      <ul>
        ${shortcuts.map(shortcut => `<li>${shortcut}</li>`).join('')}
      </ul>
      <button class="close-popup">Got it!</button>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Close popup when clicking the button or outside
  const closePopup = () => {
    popup.remove();
  };
  
  popup.querySelector('.close-popup').addEventListener('click', closePopup);
  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });
}

// Update keyboard shortcut for new quote to include animation
function handleKeyboardShortcuts(e) {
  // Don't trigger shortcuts when typing in input fields
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
    return;
  }
  
  switch(e.key.toLowerCase()) {
    case 'r':
      e.preventDefault();
      setQuote(); // This now includes animation
      break;
    case 'h':
      e.preventDefault();
      toggleMinimalMode();
      break;
    case 's':
      e.preventDefault();
      document.getElementById('settingsPanel').classList.add('open');
      break;
    case 'a':
      e.preventDefault();
      document.getElementById('aboutOverlay').classList.add('show');
      break;
    case 'c':
      e.preventDefault();
      document.getElementById('changelogOverlay').classList.add('show');
      break;

    case 'escape':
      e.preventDefault();
      // Close all overlays
      document.getElementById('settingsPanel').classList.remove('open');
      document.getElementById('aboutOverlay').classList.remove('show');
      document.getElementById('changelogOverlay').classList.remove('show');
      document.body.classList.remove('minimal-mode');
      break;
    case '?':
      e.preventDefault();
      showKeyboardShortcuts();
      break;
  }
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
  setBackground();
  setQuote();

  // Hamburger menu and settings panel
  const hamburger = document.getElementById('hamburger');
  const settingsPanel = document.getElementById('settingsPanel');
  const settingsBackdrop = document.getElementById('settingsBackdrop');
  const closeSettings = document.getElementById('closeSettings');

  hamburger.addEventListener('click', () => {
    settingsPanel.classList.add('open');
    settingsBackdrop.classList.add('show');
  });
  
  closeSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('open');
    settingsBackdrop.classList.remove('show');
  });

  // Close settings panel when clicking on backdrop
  settingsBackdrop.addEventListener('click', () => {
    settingsPanel.classList.remove('open');
    settingsBackdrop.classList.remove('show');
  });

  // Load saved settings
  const storedName = loadName();
  const storedTheme = loadTheme();
  const storedFont = loadFont();
  // const storedFontColor = loadFontColor(); // Removed

  // Apply saved settings
  setTheme(storedTheme);
  setGreeting(storedName);
  setFont(storedFont);
  // setFontColor(storedFontColor); // Removed

  // Settings elements
  const nameInput = document.getElementById('nameInput');
  const themeSelect = document.getElementById('themeSelect');
  const fontSelect = document.getElementById('fontSelect');
  // const fontColorSelect = document.getElementById('fontColorSelect'); // Removed
  const keyboardShortcutsCheckbox = document.getElementById('keyboardShortcutsEnabled');
  const saveSettingsBtn = document.getElementById('saveSettings');

  // Set current values
  nameInput.value = storedName;
  themeSelect.value = storedTheme;
  fontSelect.value = storedFont;
  // fontColorSelect.value = storedFontColor; // Removed
  keyboardShortcutsCheckbox.checked = loadKeyboardShortcutsEnabled();

  // Initialize collapsible sections
  initializeSections();
  
  // Add event listeners for section headers
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const sectionName = header.getAttribute('data-section');
      toggleSection(sectionName);
    });
  });

  // Reset to default button
  const resetFontBtn = document.getElementById('resetFont');
  resetFontBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all settings to default? This will clear your name, theme, font, and custom background.')) {
      // Reset all settings to default
      nameInput.value = '';
      themeSelect.value = 'light';
      fontSelect.value = 'sans-serif';
      keyboardShortcutsCheckbox.checked = true;
      
      // Clear custom background
      saveCustomBackground(null);
      setBackground();
      
      // Reset file input
      document.getElementById('customBackground').value = '';
      const fileButton = document.getElementById('fileInputButton');
      fileButton.textContent = 'Choose File';
      fileButton.classList.remove('has-file');
      
      // Apply default settings
      saveName('');
      saveTheme('light');
      saveFont('sans-serif');
      saveKeyboardShortcutsEnabled(true);
      setGreeting('');
      setTheme('light');
      setFont('sans-serif');
      
      // Close settings panel
      settingsPanel.classList.remove('open');
    }
  });

  // About modal
  const aboutBtn = document.getElementById('aboutBtn');
  const aboutOverlay = document.getElementById('aboutOverlay');
  const closeAbout = document.getElementById('closeAbout');

  aboutBtn.addEventListener('click', () => {
    aboutOverlay.classList.add('show');
  });

  closeAbout.addEventListener('click', () => {
    aboutOverlay.classList.remove('show');
  });

  // Close about modal when clicking outside
  aboutOverlay.addEventListener('click', (e) => {
    if (e.target === aboutOverlay) {
      aboutOverlay.classList.remove('show');
    }
  });

  // Changelog modal
  const changelogBtn = document.getElementById('changelogBtn');
  const changelogOverlay = document.getElementById('changelogOverlay');
  const closeChangelog = document.getElementById('closeChangelog');

  changelogBtn.addEventListener('click', () => {
    changelogOverlay.classList.add('show');
  });

  closeChangelog.addEventListener('click', () => {
    changelogOverlay.classList.remove('show');
  });

  // Close changelog modal when clicking outside
  changelogOverlay.addEventListener('click', (e) => {
    if (e.target === changelogOverlay) {
      changelogOverlay.classList.remove('show');
    }
  });

  

  // Copy quote button
  const copyQuoteBtn = document.getElementById('copyQuote');
  copyQuoteBtn.addEventListener('click', copyQuoteToClipboard);

  // Keyboard shortcuts checkbox
  keyboardShortcutsCheckbox.addEventListener('change', () => {
    saveKeyboardShortcutsEnabled(keyboardShortcutsCheckbox.checked);
  });

  // Save settings
  saveSettingsBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const theme = themeSelect.value;
    const font = fontSelect.value;
    // const fontColor = fontColorSelect.value; // Removed

    saveName(name);
    saveTheme(theme);
    saveFont(font);
    // saveFontColor(fontColor); // Removed
    setGreeting(name);
    setTheme(theme);
    setFont(font);
    // setFontColor(fontColor); // Removed
    
    // Close settings panel
    settingsPanel.classList.remove('open');
  });

  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveSettingsBtn.click();
    }
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);

  // Custom Background Section
  const customBackgroundInput = document.getElementById('customBackground');
  const removeCustomBgBtn = document.getElementById('removeCustomBg');

  customBackgroundInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB.');
        return;
      }
      
      handleCustomBackgroundUpload(file);
    }
  });

  removeCustomBgBtn.addEventListener('click', removeCustomBackground);
});

// Update keyboard shortcuts to also close overlays
function handleKeyboardShortcuts(e) {
  // Check if keyboard shortcuts are enabled
  if (!loadKeyboardShortcutsEnabled()) {
    return;
  }
  
  // Don't trigger shortcuts when typing in input fields
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
    return;
  }
  
  switch(e.key.toLowerCase()) {
    case 'r':
      e.preventDefault();
      setQuote();
      break;
    case 'h':
      e.preventDefault();
      toggleMinimalMode();
      break;
    case 's':
      e.preventDefault();
      document.getElementById('settingsPanel').classList.add('open');
      break;
    case 'a':
      e.preventDefault();
      document.getElementById('aboutOverlay').classList.add('show');
      break;
    case 'c':
      e.preventDefault();
      document.getElementById('changelogOverlay').classList.add('show');
      break;
    case 'e':
      e.preventDefault();
    
      break;
    case 'escape':
      e.preventDefault();
      // Close all overlays
      document.getElementById('settingsPanel').classList.remove('open');
      document.getElementById('aboutOverlay').classList.remove('show');
      document.getElementById('changelogOverlay').classList.remove('show');
      document.body.classList.remove('minimal-mode');
      break;
    case '?':
      e.preventDefault();
      showKeyboardShortcuts();
      break;
  }
}

// Add keyboard hint button functionality
const keyboardHint = document.getElementById('keyboardHint');
keyboardHint.addEventListener('click', showKeyboardShortcuts); 

// --- Custom Background ---
function loadCustomBackground() {
  return localStorage.getItem('inspotab_custom_bg') || null;
}

function saveCustomBackground(imageData) {
  if (imageData) {
    localStorage.setItem('inspotab_custom_bg', imageData);
  } else {
    localStorage.removeItem('inspotab_custom_bg');
  }
}

function setBackground() {
  const bgDiv = document.getElementById('background');
  const customBg = loadCustomBackground();
  
  if (customBg) {
    // Use custom background
    bgDiv.style.backgroundImage = `url('${customBg}')`;
  } else {
    // Use daily background
    bgDiv.style.backgroundImage = `url('${getDailyBackground()}')`;
  }
}

function handleCustomBackgroundUpload(file) {
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const imageData = e.target.result;
    saveCustomBackground(imageData);
    setBackground();
    
    // Update button text to show filename
    const fileButton = document.getElementById('fileInputButton');
    fileButton.textContent = file.name;
    fileButton.classList.add('has-file');
  };
  
  reader.readAsDataURL(file);
}

function removeCustomBackground() {
  saveCustomBackground(null);
  setBackground();
  
  // Reset file input and button
  document.getElementById('customBackground').value = '';
  const fileButton = document.getElementById('fileInputButton');
  fileButton.textContent = 'Choose File';
  fileButton.classList.remove('has-file');
} 