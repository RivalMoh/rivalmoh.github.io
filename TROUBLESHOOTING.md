# GitHub Pages Troubleshooting Guide

## Current Issue
The portfolio website works perfectly in local environment but fails on GitHub Pages:
- Horizontal scroll is not working
- Cards are stacking vertically instead of horizontally
- JavaScript and CSS styles are not applying correctly

## Troubleshooting Steps

### 1. Check Debug Page
Visit: `https://rivalmoh.github.io/debug-test.html`
This page will help identify:
- Browser compatibility issues
- CSS loading problems
- JavaScript execution errors

### 2. Browser Console Debugging
Open developer tools (F12) on the GitHub Pages site and check:
- Console tab for JavaScript errors
- Network tab for failed resource loading
- Elements tab to verify CSS is applied

### 3. Common GitHub Pages Issues

#### A. Case Sensitivity
GitHub Pages is case-sensitive. Ensure all file references match exactly:
- `css/style.css` (not `CSS/Style.css`)
- `js/script.js` (not `JS/Script.js`)
- `images/` folder names match references

#### B. File Paths
Verify all paths in `index.html`:
```html
<link href="css/style.css" rel="stylesheet">
<script src="js/script.js"></script>
```

#### C. HTTPS vs HTTP
GitHub Pages uses HTTPS. Mixed content issues can occur with HTTP resources.

### 4. CSS Fixes Applied
The following CSS rules have been strengthened:

```css
.projects-horizontal-scroll {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    gap: 2rem;
    width: fit-content;
    min-width: 100%;
}

.project-card {
    flex: 0 0 350px !important;
    min-width: 350px !important;
    width: 350px !important;
}
```

### 5. JavaScript Enhancements
Added comprehensive logging and error handling:
- Console logging for debugging
- Fallback for AOS library
- Proper DOM ready handling

### 6. Verification Steps

1. **Check Repository Structure**
   ```
   rivalmoh.github.io/
   ├── index.html
   ├── css/
   │   └── style.css
   ├── js/
   │   └── script.js
   ├── images/
   └── bootstrap/
   ```

2. **Test Individual Components**
   - Load `debug-test.html` to verify basic functionality
   - Check browser console for errors
   - Test horizontal scroll on debug page

3. **Force Refresh**
   - Use Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache
   - Try different browsers

### 7. If Issues Persist

1. **Check GitHub Pages Settings**
   - Go to repository Settings
   - Scroll to Pages section
   - Ensure source is set to "Deploy from a branch"
   - Branch should be "main" or "master"

2. **Verify File Deployment**
   - Check if all files are committed and pushed
   - Verify files exist at: `https://rivalmoh.github.io/css/style.css`
   - Verify files exist at: `https://rivalmoh.github.io/js/script.js`

3. **Mobile Testing**
   - Test on mobile devices
   - Check responsive behavior
   - Verify touch scrolling works

### 8. Emergency Fallback
If the issue persists, you can add this inline CSS as a temporary fix:

```html
<style>
.projects-horizontal-scroll, .certifications-horizontal-scroll {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    gap: 1.5rem !important;
    padding: 1rem 0 !important;
}

.project-card, .certification-card {
    flex: 0 0 auto !important;
    min-width: 300px !important;
    width: 300px !important;
}
</style>
```

## Expected Results
After applying these fixes:
- Projects section should scroll horizontally
- Certifications section should scroll horizontally
- Cards should maintain fixed width
- Filtering should work properly
- All JavaScript functionality should work

## Contact
If issues persist, please provide:
- Browser and version
- Any console errors
- Screenshots of the problem
- URL of the problematic page
