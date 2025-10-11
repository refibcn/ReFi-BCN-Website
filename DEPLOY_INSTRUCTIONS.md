# Deploy ReFi BCN Website to refibcn.cat

## ✅ Configuration Complete

The site is already configured with:
- ✅ `baseUrl: "refibcn.cat"` in `quartz.config.ts`
- ✅ CNAME file in `quartz/static/CNAME`
- ✅ GitHub Pages deployment workflow in `.github/workflows/deploy.yml`

## Step 1: Commit and Push Changes

Run these commands from the ReFi-BCN-Website directory:

```bash
cd "/Users/luizfernando/Desktop/git/Zettelkasten/03 Libraries/ReFi-BCN-Website"

# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "Configure site for refibcn.cat custom domain"

# Push to main branch
git push origin main
```

## Step 2: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/YOUR_USERNAME/ReFi-BCN-Website
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - Source: **GitHub Actions** (should already be selected)
4. Under **Custom domain**:
   - Enter: `refibcn.cat`
   - Click **Save**
   - Wait for DNS check (may show pending initially)

## Step 3: Configure DNS in Cloudflare

1. Log into your Cloudflare dashboard
2. Select the `refibcn.cat` domain
3. Go to **DNS** → **Records**
4. Add/Update these records:

### For Apex Domain (refibcn.cat):

**Option A: Using A Records (Recommended)**
```
Type: A
Name: @
Content: 185.199.108.153
TTL: Auto
Proxy status: DNS only (gray cloud)
```

Add 3 more A records with the same settings but different IPs:
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**Also add AAAA records for IPv6:**
```
Type: AAAA
Name: @
Content: 2606:50c0:8000::153
TTL: Auto
Proxy status: DNS only
```

Add 3 more AAAA records:
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

### Add CNAME for www (optional):
```
Type: CNAME
Name: www
Content: YOUR_GITHUB_USERNAME.github.io
TTL: Auto
Proxy status: DNS only
```

## Step 4: Verify Deployment

1. **Wait for GitHub Action to complete** (3-5 minutes)
   - Go to **Actions** tab in your GitHub repo
   - Watch the "Deploy Quartz site to GitHub Pages" workflow
   - It should show a green checkmark when done

2. **Wait for DNS propagation** (5-30 minutes)
   - Check DNS: `dig refibcn.cat` or use https://dnschecker.org
   - Should show the GitHub Pages IPs

3. **Test the site:**
   - Visit: https://refibcn.cat
   - Should load your ReFi BCN landing page

4. **Verify SSL:**
   - GitHub Pages automatically provides HTTPS
   - May take a few minutes to provision the certificate
   - Check the padlock icon in your browser

## Troubleshooting

### DNS check fails on GitHub
- Wait a few more minutes for DNS propagation
- Verify Cloudflare records are correct
- Make sure Proxy status is **DNS only** (gray cloud, not orange)

### Site shows 404
- Verify the GitHub Action completed successfully
- Check that the `main` branch has your latest changes
- Ensure GitHub Pages is enabled and set to use GitHub Actions

### HTTPS not working
- Wait 10-20 minutes for GitHub to provision SSL certificate
- Try disabling and re-enabling HTTPS in GitHub Pages settings

### Old site showing
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Try incognito/private browsing mode
- DNS may still be propagating

## Repository Details

- Repository: https://github.com/YOUR_USERNAME/ReFi-BCN-Website
- Branch: `main`
- Build directory: `public`
- Custom domain: `refibcn.cat`

## Future Updates

After initial setup, to update the site:

1. Make your changes locally
2. Commit: `git add . && git commit -m "Update site"`
3. Push: `git push origin main`
4. GitHub Actions will automatically rebuild and deploy

The site will update in 3-5 minutes after pushing to main.

