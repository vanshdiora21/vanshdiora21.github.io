# 🚀 Deployment Guide for Your Portfolio Website

## Quick Setup (5 Minutes)

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New Repository" 
3. Name it exactly: `yourusername.github.io` (replace with your actual username)
4. Make it public
5. Don't add README, .gitignore, or license (we already have these)
6. Click "Create Repository"

### Step 2: Upload Your Files
**Option A: GitHub Web Interface (Easiest)**
1. Click "uploading an existing file" on the new repository page
2. Drag and drop ALL the portfolio files into the upload area:
   - index.html
   - README.md
   - .gitignore
   - styles/ folder (with main.css)
   - js/ folder (with main.js)
   - assets/ folder (with all instruction files)
3. Write commit message: "Initial portfolio upload"
4. Click "Commit changes"

**Option B: Git Command Line**
```bash
# Navigate to your portfolio folder
cd path/to/your/portfolio

# Initialize git repository
git init

# Add your GitHub repository as origin (replace with your username)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio upload"

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (left sidebar)
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Wait 2-3 minutes for deployment

### Step 4: Access Your Website
Your website will be available at: `https://yourusername.github.io`

## Adding Your Content

### Required Images (Replace Placeholders)
Upload these to the `assets/` folder:

1. **Your Professional Photo**
   - Rename to: `profile-placeholder.jpg`
   - Size: 400x400 pixels
   - Professional headshot

2. **Project Screenshots** (600x400 pixels each):
   - `pairs-trading-placeholder.jpg`
   - `options-pricing-placeholder.jpg` 
   - `lbo-modeling-placeholder.jpg`
   - `ai-chatbot-placeholder.jpg`

3. **Your Resume**
   - Save as: `Vansh_Diora_Resume.pdf`
   - Current version in PDF format

### Updating Content
Edit `index.html` to customize:
- Contact information (phone, email)
- LinkedIn and GitHub URLs
- Project descriptions and links
- Work experience details
- Skills and technologies

## Custom Domain (Optional)

### If You Want a Custom Domain (like vanshdiora.com):
1. Buy domain from registrar (GoDaddy, Namecheap, etc.)
2. Add a `CNAME` file to your repository root with your domain:
   ```
   vanshdiora.com
   ```
3. Configure DNS settings at your registrar:
   - Add CNAME record: `www` → `yourusername.github.io`
   - Add A records for apex domain:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. Enable custom domain in GitHub Pages settings

## Troubleshooting

### Website Not Loading?
- Check that repository is named correctly: `yourusername.github.io`
- Verify GitHub Pages is enabled in Settings → Pages
- Wait 5-10 minutes after enabling (deployment takes time)
- Check for any error messages in Settings → Pages

### Images Not Showing?
- Verify image files are in `assets/` folder
- Check that filenames match exactly (case-sensitive)
- Ensure image files are under 10MB each

### Form Not Working?
- The contact form is set to simulation mode
- Follow instructions in README.md to connect with Formspree or Netlify

### Need to Update Content?
- Edit files on GitHub (click file → edit button → commit changes)
- Or use git to push updates from your computer
- Changes appear within 1-2 minutes

## Performance Tips

### Optimize Images
- Compress images before uploading (use TinyPNG.com)
- Keep project images under 500KB each
- Profile photo under 200KB

### SEO Optimization
- Update meta description in index.html
- Add relevant keywords to content
- Ensure all images have alt text

## Getting Help

1. **GitHub Issues**: Create issue in your repository for tracking
2. **GitHub Documentation**: [GitHub Pages Guide](https://docs.github.com/en/pages)
3. **Contact Me**: dioravansh0@gmail.com for specific questions

## Success Checklist ✅

- [ ] Repository created and named correctly
- [ ] All files uploaded to GitHub
- [ ] GitHub Pages enabled
- [ ] Website loads at yourusername.github.io
- [ ] Profile photo added and displays correctly
- [ ] Project images added (can be placeholders initially)
- [ ] Resume PDF uploaded and download link works
- [ ] Contact information updated
- [ ] Social media links updated
- [ ] Mobile responsiveness tested

**Congratulations! Your professional portfolio is now live! 🎉**

Share your new portfolio:
- Add URL to LinkedIn profile
- Include in email signatures
- Share with potential employers
- Add to business cards