# Domain Setup Instructions for ReFi BCN Website

## Overview

This guide will help you configure the custom domain `refibcn.cat` to point to your GitHub Pages site hosting the ReFi BCN Website.

**Site URL:** https://refibcn.cat  
**Repository:** https://github.com/refibcn/ReFi-BCN-Website

---

## Part 1: GitHub Pages Configuration

### Step 1: Enable GitHub Pages

1. Go to your repository: **https://github.com/refibcn/ReFi-BCN-Website**
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under **Build and deployment** → **Source**, it should show:
   - **GitHub Actions** ✅ (not branch)
   - This is already configured via `.github/workflows/deploy.yml`

### Step 2: Configure Custom Domain

1. Still in **Pages** settings, scroll to **Custom domain**
2. In the text box, enter: `refibcn.cat`
3. Click **Save**
4. Wait for DNS check to complete (green checkmark ✅)
5. ✅ **Check** "Enforce HTTPS" (see HTTPS-SETUP.md for details)

**Important Notes:**
- The CNAME file is already in your repo at `quartz/static/CNAME`
- The site will be available at `refibcn.cat` once DNS is configured
- Initial deployment takes 1-5 minutes
- DNS propagation can take 5 minutes to 24 hours

### Step 3: Verify Deployment

After saving, check the deployment status:

1. **Actions Tab:** https://github.com/refibcn/ReFi-BCN-Website/actions
   - Look for the latest workflow run
   - Should show green checkmark ✅ when successful
   - Click on it to see build logs if there are issues

2. **Pages Settings:** https://github.com/refibcn/ReFi-BCN-Website/settings/pages
   - Should show: "Your site is live at https://refibcn.cat"

**Automatic Rebuilds:**
Every time you push to the `main` branch, GitHub Actions will automatically rebuild and redeploy your site.

---

## Part 2: Cloudflare DNS Configuration

### Step 1: Log into Cloudflare

1. Go to **https://dash.cloudflare.com/**
2. Select your account
3. Click on the **refibcn.cat** domain

### Step 2: Configure DNS Records

Go to **DNS** → **Records** and set up the following:

#### Delete Old Records First

**⚠️ Important:** Remove any existing CNAME or A records for `@` (root domain) before adding new ones.

Common old records to delete:
- Any CNAME pointing to `publish-main.obsidian.md`
- Old A records pointing to different IPs

#### Add GitHub Pages A Records

Add these 4 A records (one at a time):

**Record 1:**
- Type: `A`
- Name: `@` (or `refibcn.cat` depending on interface)
- Content: `185.199.108.153`
- Proxy status: **DNS only** (gray cloud ☁️)
- TTL: `Auto`

**Record 2:**
- Type: `A`
- Name: `@`
- Content: `185.199.109.153`
- Proxy status: **DNS only** (gray cloud)
- TTL: `Auto`

**Record 3:**
- Type: `A`
- Name: `@`
- Content: `185.199.110.153`
- Proxy status: **DNS only** (gray cloud)
- TTL: `Auto`

**Record 4:**
- Type: `A`
- Name: `@`
- Content: `185.199.111.153`
- Proxy status: **DNS only** (gray cloud)
- TTL: `Auto`

**Why these IPs?** These are GitHub Pages' official IP addresses for custom apex domains.

### Step 3: Add WWW Record (Optional but Recommended)

Add a CNAME record for the `www` subdomain:

- Type: `CNAME`
- Name: `www`
- Content: `refibcn.cat` (or `refibcn.github.io`)
- Proxy status: **DNS only** (gray cloud)
- TTL: `Auto`

This ensures `www.refibcn.cat` redirects to `refibcn.cat`.

### Step 4: Cloudflare Settings

#### SSL/TLS Configuration

1. Go to **SSL/TLS** in Cloudflare dashboard (left sidebar)
2. Under **Overview**, set encryption mode to: **Full** ✅
   - **Not** "Flexible" (this breaks SSL)
   - **Not** "Full (strict)" (GitHub Pages uses shared certificate)
   - Use **Full** for proper end-to-end encryption

**Encryption Modes Explained:**
```
Off          - No encryption ❌
Flexible     - Visitor → Cloudflare encrypted, Cloudflare → GitHub unencrypted ❌
Full         - Both connections encrypted ✅ ← USE THIS
Full (strict)- Both encrypted + strict certificate validation (may fail with GitHub Pages)
```

#### Enable HTTPS Redirects

1. Go to **SSL/TLS** → **Edge Certificates**
2. Enable **Always Use HTTPS** ✅
   - Forces all `http://` requests to redirect to `https://`
3. Enable **Automatic HTTPS Rewrites** ✅
   - Automatically rewrites insecure resource requests to HTTPS

#### Proxy Status Important Notes

**Recommended: DNS only (gray cloud ☁️)**
- Direct connection from visitors to GitHub Pages
- Let's GitHub handle SSL certificate directly
- Simpler setup, fewer issues

**Alternative: Proxied (orange cloud ☁️)**
- Routes traffic through Cloudflare's network
- Enables Cloudflare security features
- May require additional configuration for SSL

**For initial setup:** Use **DNS only (gray cloud)** until site is fully working.

---

## Part 3: Verification & Testing

### Step 1: Check DNS Propagation

DNS changes can take **5 minutes to 24 hours** (usually 5-30 minutes).

**Check propagation status:**
- **Online tool:** https://dnschecker.org/
  - Enter `refibcn.cat`
  - Select "A" record type
  - Should show GitHub Pages IPs globally

**Command line check:**
```bash
dig refibcn.cat +short
```

Should return:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Step 2: Test Your Site

Once DNS is propagated, test these URLs:

✅ **https://refibcn.cat/** - Should show ReFi BCN landing page  
✅ **https://www.refibcn.cat/** - Should redirect to non-www  
✅ **http://refibcn.cat/** - Should redirect to HTTPS  

**Look for:**
- 🔒 Padlock icon in browser address bar
- No "Not Secure" warnings
- Images and resources load correctly
- Blue accent colors throughout
- Navigation works

### Step 3: Enable HTTPS in GitHub Pages

After DNS is working and site loads:

1. Go to **GitHub** → **Settings** → **Pages**
2. Scroll to **Custom domain**
3. Verify domain shows green checkmark ✅
4. Enable **Enforce HTTPS** ✅
5. Wait 5-10 minutes for SSL certificate to provision

GitHub will automatically obtain a **Let's Encrypt SSL certificate** for your domain.

**For detailed HTTPS setup instructions**, see: `docs/HTTPS-SETUP.md`

---

## Part 4: Troubleshooting

### Issue: "There isn't a GitHub Pages site here"

**Possible causes:**
- DNS not propagated yet
- Wrong DNS records
- Custom domain not saved in GitHub Pages settings
- CNAME file missing or incorrect

**Solutions:**
1. **Wait longer** - DNS propagation can take up to 24 hours
2. **Check DNS records:**
   ```bash
   dig refibcn.cat +short
   ```
   Should return GitHub Pages IPs
3. **Verify custom domain** in GitHub Pages settings
4. **Check CNAME file:**
   - Path: `quartz/static/CNAME`
   - Content: `refibcn.cat` (single line, no http://)
5. **Check GitHub Actions:**
   - Go to Actions tab
   - Ensure latest workflow succeeded
   - Click on failed runs to see error logs

### Issue: SSL Certificate Error or "Not Secure"

**Possible causes:**
- HTTPS enforced before DNS propagated
- Cloudflare SSL mode incorrect
- Certificate not provisioned yet

**Solutions:**
1. **Check Cloudflare SSL mode** - Should be "Full"
2. **Wait for certificate** - Can take 5-10 minutes after DNS works
3. **Temporarily disable "Enforce HTTPS"** in GitHub Pages
4. **Wait 15 minutes**, then re-enable
5. **Clear browser cache** - Hard refresh (Cmd+Shift+R)
6. **Check certificate status:**
   ```bash
   curl -I https://refibcn.cat
   ```

**See full HTTPS troubleshooting:** `docs/HTTPS-SETUP.md`

### Issue: 404 Errors on Pages

**Possible causes:**
- GitHub Pages not rebuilding after changes
- Build failure in GitHub Actions
- Wrong navigation links

**Solutions:**
1. **Check GitHub Actions:**
   - Go to **Actions** tab in repository
   - Look for red ❌ failed workflows
   - Click to see error details
2. **Trigger manual rebuild:**
   - Make a small change to any file
   - Commit and push to `main`
3. **Clear browser cache:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
4. **Check file paths** in your markdown content
   - Links should use relative paths
   - No spaces in file names

### Issue: Old Content Showing

**Possible causes:**
- Browser cache
- Cloudflare cache (if using orange cloud)
- GitHub Pages cache

**Solutions:**
1. **Hard refresh browser:**
   - Mac: Cmd+Shift+R
   - Windows: Ctrl+Shift+R
2. **Try incognito/private mode:**
   - Bypasses all browser cache
3. **Clear Cloudflare cache:**
   - Cloudflare Dashboard → Caching → Purge Everything
4. **Wait for cache expiration:**
   - Cloudflare cache: Usually 2-4 hours
   - Browser cache: Depends on settings

### Issue: Mixed Content Warnings

**What it means:** HTTPS page trying to load HTTP resources (images, scripts, etc.)

**Solutions:**
1. **Check content files** for hardcoded `http://` URLs
2. **Use relative paths** for images:
   ```markdown
   ✅ Good: ![Image](/static/image.png)
   ❌ Bad:  ![Image](http://refibcn.cat/static/image.png)
   ```
3. **Enable "Automatic HTTPS Rewrites"** in Cloudflare SSL/TLS settings
4. **Check browser console** for specific resource URLs causing issues

### Issue: WWW Subdomain Not Working

**Possible causes:**
- CNAME record for www not added
- DNS not propagated

**Solutions:**
1. **Verify www CNAME record** in Cloudflare DNS:
   - Type: CNAME
   - Name: www
   - Content: refibcn.cat
2. **Check DNS propagation:**
   ```bash
   dig www.refibcn.cat
   ```
3. **Wait 10-15 minutes** for DNS changes

---

## Part 5: Site Structure

After setup, your ReFi BCN site structure:

```
refibcn.cat/
├── (root)                  → Landing page with all sections
├── .well-known/            → Security/verification (automatic)
└── static/                 → Images and assets
    ├── hero_home.png
    ├── refi_unconference.jpg
    ├── biofi_barcelona.jpg
    ├── gitcoin-explorer.png
    ├── refi_dao.png
    └── team photos...
```

**Navigation:**
All navigation happens via smooth scroll to sections on the landing page using ID anchors:
- `#about`
- `#regenerant-catalunya`
- `#events`
- `#ecosystem-map`
- `#contact`

---

## Part 6: Future Maintenance

### Updating Content

1. **Edit markdown files:**
   - Main content: `content/index.md`
   - Add other pages in `content/` folder as needed
2. **Commit and push to `main` branch:**
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```
3. **GitHub Actions automatically rebuilds** (1-3 minutes)
4. **Changes live at** `refibcn.cat` after build completes

### Monitoring Deployments

**Check deployment status:**
- **GitHub Actions:** https://github.com/refibcn/ReFi-BCN-Website/actions
  - Green ✅ = successful
  - Red ❌ = failed (click for logs)
  - Yellow ⚠️ = in progress
- **Pages Settings:** https://github.com/refibcn/ReFi-BCN-Website/settings/pages
  - Shows live URL and deployment status

**Build time:** Usually 1-3 minutes from push to live

### Adding New Pages

1. Create new markdown file in `content/` folder
2. Add frontmatter:
   ```yaml
   ---
   title: "Page Title"
   description: "Page description"
   ---
   ```
3. Commit and push
4. Page will be available at `refibcn.cat/page-name`

### DNS Changes

If you ever need to change domain:

1. **Update CNAME file:**
   - Path: `quartz/static/CNAME`
   - Change to new domain
2. **Update config:**
   - File: `quartz.config.ts`
   - Change `baseUrl: "refibcn.cat"` to new domain
3. **Update GitHub Pages:**
   - Settings → Pages → Custom domain
   - Enter new domain
4. **Update Cloudflare DNS:**
   - Add DNS records for new domain
   - Point to GitHub Pages IPs
5. **Commit and push changes**

---

## Quick Reference

### GitHub Pages IPs (for A records)
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Key Files
```
quartz/static/CNAME              - Contains: refibcn.cat
quartz.config.ts                 - baseUrl: "refibcn.cat"
.github/workflows/deploy.yml     - GitHub Actions deployment workflow
content/index.md                 - Main landing page content
```

### Important URLs
- **Live Site:** https://refibcn.cat
- **GitHub Repo:** https://github.com/refibcn/ReFi-BCN-Website
- **GitHub Actions:** https://github.com/refibcn/ReFi-BCN-Website/actions
- **GitHub Pages Settings:** https://github.com/refibcn/ReFi-BCN-Website/settings/pages

### Support Links
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Cloudflare DNS Docs:** https://developers.cloudflare.com/dns/
- **DNS Checker Tool:** https://dnschecker.org/
- **Let's Encrypt (SSL):** https://letsencrypt.org/

---

## Summary Checklist

### GitHub Setup
- [ ] Repository created: `ReFi-BCN-Website`
- [ ] Settings → Pages → Source: GitHub Actions
- [ ] Custom domain set to: `refibcn.cat`
- [ ] DNS check shows green checkmark ✅
- [ ] Enforce HTTPS enabled
- [ ] Latest deployment successful (check Actions)

### Cloudflare Setup
- [ ] 4 A records pointing to GitHub Pages IPs
- [ ] All DNS records use "DNS only" (gray cloud)
- [ ] SSL/TLS mode: **Full**
- [ ] Always Use HTTPS: **ON**
- [ ] Automatic HTTPS Rewrites: **ON**
- [ ] www CNAME record added (optional)

### Content Files
- [ ] `quartz/static/CNAME` contains: `refibcn.cat`
- [ ] `quartz.config.ts` baseUrl: `"refibcn.cat"`
- [ ] `content/index.md` has all sections
- [ ] All images exist in `quartz/static/`
- [ ] No hardcoded http:// URLs in content

### Testing
- [ ] `refibcn.cat` loads ReFi BCN landing page
- [ ] HTTPS works with 🔒 padlock icon
- [ ] No "Not Secure" warnings
- [ ] `http://refibcn.cat` redirects to HTTPS
- [ ] `www.refibcn.cat` redirects to apex domain
- [ ] All images load correctly
- [ ] Navigation smooth scroll works
- [ ] Mobile responsive design works
- [ ] Dark mode toggle works

---

## Need Help?

1. **Check GitHub Actions logs** for build errors
2. **Verify DNS propagation:** `dig refibcn.cat`
3. **Review HTTPS setup:** See `docs/HTTPS-SETUP.md`
4. **Test in incognito mode** to rule out cache issues
5. **Contact GitHub Support** if certificate won't provision after 48 hours

---

**Last Updated:** October 11, 2025  
**Repository:** https://github.com/refibcn/ReFi-BCN-Website

