# InspoTab 🎯

A beautiful Chrome extension that transforms your new tab page into an inspiring experience with daily motivational quotes and stunning backgrounds.

![InspoTab Preview](images/logo.png)

## ✨ Features

- **Daily Inspirational Quotes**: Get a new motivational quote every time you open a new tab
- **Beautiful Backgrounds**: Stunning, high-quality backgrounds that change daily
- **Personalized Greetings**: Custom greetings with your name based on the time of day
- **Theme Customization**: Switch between light and dark themes
- **Font Options**: Choose from sans-serif, serif, or handwriting fonts
- **Custom Backgrounds**: Upload your own background images
- **Keyboard Shortcuts**: Quick navigation with keyboard shortcuts
- **Copy to Clipboard**: Easily copy quotes to share with others
- **Responsive Design**: Works perfectly on all screen sizes

## 🚀 Installation

### From Chrome Web Store (Coming Soon)
1. Visit the Chrome Web Store
2. Search for "InspoTab"
3. Click "Add to Chrome"
4. Confirm the installation

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the InspoTab folder
6. The extension is now installed!

## 🎮 Usage

### Basic Features
- **New Quote**: Press `R` or refresh the page for a new quote
- **Copy Quote**: Click the copy icon next to the quote
- **Settings**: Click the hamburger menu (☰) to access settings

### Settings Panel
Access settings by clicking the hamburger menu (☰) in the top left:

#### Personalization
- Set your name for personalized greetings
- Choose your preferred font style

#### Theme
- Switch between light and dark themes
- Automatic theme detection based on system preferences

#### Keyboard Shortcuts
- Enable/disable keyboard shortcuts
- View all available shortcuts

#### Background
- Upload custom background images
- Remove custom backgrounds to return to default

### Keyboard Shortcuts
- `R` - Get a new random quote
- `H` - Toggle minimal mode (hide/show UI elements)
- `S` - Open settings panel
- `A` - Open about page
- `C` - Open changelog
- `ESC` - Close modals/panels
- `?` - Show keyboard shortcuts

## 🛠️ Development

### Project Structure
```
InspoTab/
├── manifest.json          # Extension manifest
├── newtab.html           # Main new tab page
├── newtab.js             # Main JavaScript functionality
├── newtab.css            # Styles and theming
├── quotes.js             # Quote database and logic
├── images/
│   └── logo.png          # Extension icon
├── get-extension-id.html # OAuth setup helper
├── test-oauth.html       # OAuth testing page
└── README.md             # This file
```

### Technologies Used
- **HTML5**: Structure and semantics
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Functionality and interactions
- **Chrome Extension API**: Browser integration
- **Font Awesome**: Icons and UI elements

### Local Development
1. Clone the repository
2. Make your changes
3. Go to `chrome://extensions/`
4. Click the refresh icon on InspoTab
5. Test your changes

### Building for Production
1. Ensure all files are properly organized
2. Test thoroughly in Chrome
3. Create a ZIP file of the project
4. Submit to Chrome Web Store (if publishing)

## 🎨 Customization

### Adding New Quotes
Edit `quotes.js` to add your own inspirational quotes:
```javascript
const quotes = [
  "Your new quote here",
  "Another inspiring quote",
  // ... more quotes
];
```

### Custom Themes
Modify `newtab.css` to create custom themes or adjust existing ones.

### Background Images
Add your own background images to the `images/` folder and update the background logic in `newtab.js`.

## 📱 Browser Compatibility

- ✅ Chrome (Recommended)
- ✅ Chromium-based browsers (Edge, Brave, etc.)
- ❌ Firefox (requires different manifest format)
- ❌ Safari (not supported)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Test thoroughly before submitting
- Update documentation for new features
- Keep commits descriptive and atomic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Creator

**Created by:** Samuel Snow  
**Website:** [inspo.samuelesnow.co](https://inspo.samuelesnow.co)

## 📞 Support

If you encounter any issues or have suggestions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your Chrome version and extension version

## 🔄 Changelog

### Version 1.2.0 (July 13, 2025)
- Option to disable keyboard shortcuts
- About and changelog pages accessible from settings
- Enhanced OAuth flow with proper client ID configuration
- Removed quote favoriting feature to simplify the interface
- Removed font color customization to streamline settings
- Various UI improvements and bug fixes

### Version 1.0.0 (July 13, 2025)
- Initial release of InspoTab
- Daily inspirational quotes with beautiful backgrounds
- Customizable themes (light/dark mode)
- Font style options (sans-serif, serif, handwriting)
- Custom background upload feature
- Personalized greetings with user's name
- Copy quote to clipboard functionality
- Keyboard shortcuts for quick navigation
- Minimal mode toggle
- Responsive design for all screen sizes

---

**Made with ❤️ to inspire productivity and motivation every day!** 