# Ghost Gallery - Vercel Deployment Guide

## 🚀 Deployment Checklist

### ✅ Files Created/Updated for Vercel:
- `vercel.json` - Routing configuration
- `vite.config.js` - Build optimization
- `package.json` - Deployment scripts
- `.gitignore` - Excludes unnecessary files
- `.vercelignore` - Vercel-specific exclusions

### ✅ Pre-Deployment Steps Completed:

#### 1. Build Configuration
- **Vite Config**: Configured with proper base path for relative deployment
- **Output Directory**: Set to `dist` (Vercel standard)
- **Asset Optimization**: Manual chunks for better caching

#### 2. Routing Setup
- **SPA Routing**: All routes redirect to `index.html`
- **Static Assets**: Public folder files served correctly
- **SPA Support**: Proper fallback routing for React Router-like navigation

#### 3. Image Path Verification
All image paths in `src/data.js` are correct and match actual files:
- ✅ All hoodie images in `/public/` directory
- ✅ Logo image for splash screen present
- ✅ Case-sensitive filenames verified
- ✅ Spaces in filenames handled correctly

#### 4. Package Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview built app
- `npm run deploy` - Build and ready for Vercel

## 📦 Deployment Instructions

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: ghost-gallery
# - Directory: ./
# - Build Command: npm run build
# - Output Directory: dist
```

### Method 2: GitHub Integration
1. Push code to GitHub repository
2. Connect GitHub repo to Vercel dashboard
3. Auto-deploy on push to main branch
4. Build settings automatically detected from `vercel.json`

### Method 3: Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from Git repository
4. Deploy automatically

## 🔧 Build Settings (Auto-Detected)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Dev Command**: `npm run dev`

## 📊 Expected Build Output
After deployment, you'll get:
```
✓ Production: 3.2s duration
✓ Deployed to production
✓ Deployed to ghost-gallery.vercel.app [1m 23s]
✓ URLs: https://ghost-gallery.vercel.app [2m 13s]
```

## 🚨 Important Notes

### Image Loading
- All images are in `/public/` folder
- Paths use absolute paths (`/image-name.png`)
- Vite serves public assets at root level
- **No changes needed** - images will load correctly

### Environment Variables
No environment variables required for this static site.

### Performance Optimizations
- **Caching**: Static assets cached for 1 year
- **Compression**: Gzip compression enabled
- **CDN**: Global CDN distribution
- **Images**: Automatically optimized

## 🔍 Troubleshooting

### If Images Don't Load:
1. Check browser console for 404 errors
2. Verify all images are in `/public/` directory
3. Ensure filenames match exactly (case-sensitive)
4. Clear browser cache and redeploy

### If Build Fails:
1. Run `npm run build` locally first
2. Check for TypeScript/JavaScript errors
3. Ensure all dependencies are in package.json
4. Verify file paths are correct

### If Routing Breaks:
1. Verify `vercel.json` rewrites are correct
2. Ensure SPA fallback is working
3. Check browser console for routing errors

## 🎯 Ready for Deployment!
Your project is now fully prepared for Vercel deployment. All configuration files are optimized and tested.