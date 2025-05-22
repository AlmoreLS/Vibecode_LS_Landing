# Deployment Guide

## GitHub Repository Setup

### Option 1: Using GitHub CLI (if installed)
```bash
gh repo create livescorebet-landing-page --public --description "LiveScore Bet landing page with Mida A/B testing integration" --push
```

### Option 2: Manual GitHub Setup
1. Go to [GitHub.com](https://github.com) and log in
2. Click "New repository" or go to https://github.com/new
3. Repository name: `livescorebet-landing-page`
4. Description: `LiveScore Bet landing page with Mida A/B testing integration`
5. Make it **Public**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Push to GitHub
After creating the repository, run these commands:

```bash
cd /Users/alessandro.moretti/Documents/CodingAI/Mida
git remote add origin https://github.com/YOUR_USERNAME/livescorebet-landing-page.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

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
https://YOUR_USERNAME.github.io/livescorebet-landing-page/
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