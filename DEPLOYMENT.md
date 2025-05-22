# Deployment Guide

## GitHub Repository Setup

## ✅ Repository Already Created and Connected

**GitHub Repository:** https://github.com/almoretti/VibescoreBet_Landing

Your code has been successfully pushed to GitHub! The repository is already set up and connected.

## GitHub Pages Deployment

### Option 1: Via GitHub Website
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Branch: `main` / `/ (root)`
6. Click "Save"

### Option 2: Via GitHub CLI (if available)
```bash
gh repo edit --enable-pages --pages-branch main --pages-path /
```

## Access Your Site

After enabling GitHub Pages, your site will be available at:
```
https://almoretti.github.io/VibescoreBet_Landing/
```

It may take a few minutes for the site to be live after initial deployment.

## Local Development Commands

```bash
# Install dependencies
npm install

# Start development server with live reload
npm run dev

# Start basic HTTP server
npm start
```

## Project Structure

```
├── index.html              # Main landing page
├── assets/
│   ├── css/style.css       # Styles with animations
│   ├── js/                 # JavaScript files
│   ├── img/                # All images and icons
│   └── global/             # Footer and global content
├── package.json            # Node.js dependencies
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## Features Included

✅ **Mida A/B Testing**: Anti-flicker script + Mida optimize.js
✅ **Hero Animations**: CSS clip-path reveal effects
✅ **Complete Footer**: Partner logos, responsible gambling tools  
✅ **Tracking**: Google Tag Manager, OneTrust cookies
✅ **Responsive Design**: Mobile/desktop optimized
✅ **Local Assets**: All images and resources downloaded