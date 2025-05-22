# LiveScore Bet Landing Page - Local Copy

This is a local copy of the LiveScore Bet landing page extracted from https://www.livescorebet.com/uk/promo/p/2024-B10G30-stadium/index.html

## Structure

```
├── index.html              # Main landing page
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   ├── script.js       # Main JavaScript
│   │   └── promoPageHelper.js
│   └── img/
│       ├── logo.svg        # LiveScore Bet logo
│       ├── temp/
│       │   └── stadium.webp # Hero image
│       ├── icons/          # Feature icons
│       └── content-blocks/ # Content images
├── package.json
└── README.md
```

## Features Included

- ✅ Complete HTML structure
- ✅ All CSS styles with animations
- ✅ JavaScript functionality
- ✅ Google Tag Manager (GTM)
- ✅ OneTrust cookie consent
- ✅ All images and assets
- ✅ Responsive design
- ✅ Bootstrap framework
- ✅ Complete footer with partner logos
- ✅ Hero background animations
- ✅ Responsible gambling tools section

## Running Locally

### Option 1: Using npm (recommended for live reload)
```bash
npm install
npm run dev
```

### Option 2: Using basic http-server
```bash
npm install
npm start
```

### Option 3: Using Python (no dependencies)
```bash
python3 -m http.server 3000
```

Then open http://localhost:3000 in your browser.

## Making Modifications

You can now modify:
- **Content**: Edit `index.html` directly
- **Styling**: Modify `assets/css/style.css`
- **Behavior**: Update `assets/js/script.js`
- **Images**: Replace files in `assets/img/`

## Deployment to GitHub Pages

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on:
- Creating GitHub repository
- Enabling GitHub Pages
- Accessing your live site

**Quick Setup:**
1. Create new GitHub repository: `livescorebet-landing-page`
2. Push this code to the repository
3. Enable GitHub Pages in repository Settings
4. Site will be live at: `https://YOUR_USERNAME.github.io/livescorebet-landing-page/`

## External Dependencies

The page still loads some external resources:
- Google Fonts
- jQuery, Popper.js, Bootstrap from CDN
- Google Tag Manager
- OneTrust cookie scripts
- **Mida A/B Testing CDN**: `https://cdn.mida.so/js/optimize.js`

These can be downloaded and made local if needed for complete offline functionality.