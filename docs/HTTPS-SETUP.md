# HTTPS Setup Guide for refibcn.cat

## 🔒 Making Your Site Secure

After deploying your site to GitHub Pages with a custom domain, you need to enable HTTPS to make it secure. Follow these steps to fix the "Not Secure" warning in browsers.

---

## Step 1: Enable HTTPS on GitHub Pages

### 1.1 Go to GitHub Pages Settings

1. Open your browser and go to: **https://github.com/refibcn/ReFi-BCN-Website/settings/pages**
2. Log in to GitHub if prompted

### 1.2 Wait for DNS Check

- GitHub needs to verify your custom domain first
- Look for the **Custom domain** section
- You should see: `refibcn.cat` with a ✅ green checkmark
- If you see ⚠️ yellow warning or ❌ red error, wait 5-10 minutes for DNS to propagate

### 1.3 Enable HTTPS

1. Scroll down to **"Enforce HTTPS"**
2. Check the box: ✅ **Enforce HTTPS**
3. Click **Save** (if available)

**⚠️ Important:** 
- If the checkbox is grayed out, GitHub is still verifying your domain
- Wait 5-10 minutes and refresh the page
- Once verified, the checkbox will become clickable

---

## Step 2: Configure Cloudflare SSL/TLS Settings

### 2.1 Set SSL/TLS Encryption Mode

1. Go to **Cloudflare Dashboard**: https://dash.cloudflare.com
2. Select your domain: **refibcn.cat**
3. Click **SSL/TLS** in the left sidebar
4. Under **Overview**, set **SSL/TLS encryption mode** to:

   ```
   ○ Off
   ○ Flexible
   ● Full          ← SELECT THIS
   ○ Full (strict)
   ```

   **Why "Full"?**
   - Your visitors → Cloudflare: Encrypted ✅
   - Cloudflare → GitHub Pages: Encrypted ✅
   - GitHub Pages has its own SSL certificate

### 2.2 Enable Always Use HTTPS

1. Still in **SSL/TLS** section
2. Click **Edge Certificates** tab
3. Find **Always Use HTTPS**
4. Toggle it **ON** (blue) ✅

   This forces all `http://` requests to redirect to `https://`

### 2.3 Enable Automatic HTTPS Rewrites

1. In the same **Edge Certificates** tab
2. Find **Automatic HTTPS Rewrites**
3. Toggle it **ON** (blue) ✅

   This automatically rewrites insecure requests to HTTPS

---

## Step 3: Wait for SSL Certificate Provisioning

### 3.1 GitHub Pages SSL Certificate

GitHub Pages automatically provisions a free SSL certificate for your custom domain using Let's Encrypt.

**Timeline:**
- ⏱️ **Usually:** 5-10 minutes
- ⏱️ **Sometimes:** Up to 24 hours
- ✅ **You'll know it's ready** when "Enforce HTTPS" becomes checkable

### 3.2 Check Certificate Status

Run this command in your terminal to check if SSL is working:

```bash
curl -I https://refibcn.cat
```

**If working:**
```
HTTP/2 200
server: GitHub.com
...
```

**If not ready yet:**
```
curl: (60) SSL certificate problem: unable to get local issuer certificate
```

---

## Step 4: Verify HTTPS is Working

### 4.1 Browser Check

1. Open your browser
2. Go to: **https://refibcn.cat**
3. Look for 🔒 padlock icon in the address bar
4. Click the padlock to see certificate details

**✅ Success indicators:**
- 🔒 Padlock icon appears
- "Secure" or "Connection is secure" message
- No warning icons

### 4.2 Force Clear Cache

If you still see "Not Secure":

**Chrome/Edge:**
- Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

**Firefox:**
- Press `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

**Safari:**
- Press `Cmd+Option+R` (Mac)

### 4.3 Test HTTP → HTTPS Redirect

1. Type in browser: **http://refibcn.cat** (without the 's')
2. Press Enter
3. URL should automatically redirect to **https://refibcn.cat**

---

## Troubleshooting

### Problem 1: "Enforce HTTPS" checkbox is grayed out

**Cause:** GitHub hasn't verified your custom domain yet

**Solution:**
1. Wait 10 minutes
2. Check Cloudflare DNS records are correct (see DOMAIN-SETUP-INSTRUCTIONS.md)
3. Verify CNAME file exists in `quartz/static/CNAME` with content: `refibcn.cat`
4. Refresh GitHub Pages settings page

### Problem 2: SSL certificate not provisioning after 24 hours

**Cause:** DNS configuration issues

**Solution:**
1. Verify A records in Cloudflare point to GitHub Pages IPs:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
2. Ensure Cloudflare proxy is **DNS only** (gray cloud)
3. Remove and re-add custom domain in GitHub Pages settings
4. Wait 10 minutes and try again

### Problem 3: Mixed content warnings

**Cause:** Some resources (images, scripts) loading over HTTP instead of HTTPS

**Solution:**
1. Check `content/index.md` for any hardcoded `http://` URLs
2. Use relative paths for images: `/static/image.png` instead of full URLs
3. Enable "Automatic HTTPS Rewrites" in Cloudflare (Step 2.3)

### Problem 4: Certificate shows wrong domain or error

**Cause:** Cloudflare proxy mode interfering with GitHub's SSL

**Solution:**
1. In Cloudflare DNS settings, click the **orange cloud** icon
2. It should turn **gray** (DNS only mode)
3. Wait 5-10 minutes for changes to propagate

---

## Summary Checklist

Use this checklist to ensure everything is configured:

### GitHub Pages
- [ ] Custom domain set to `refibcn.cat`
- [ ] DNS check shows ✅ green checkmark
- [ ] "Enforce HTTPS" is checked and enabled
- [ ] Site builds successfully (check Actions tab)

### Cloudflare
- [ ] SSL/TLS mode set to **Full**
- [ ] **Always Use HTTPS** is ON
- [ ] **Automatic HTTPS Rewrites** is ON
- [ ] DNS A records point to GitHub Pages IPs
- [ ] DNS proxy mode is **DNS only** (gray cloud)

### Browser
- [ ] `https://refibcn.cat` loads with 🔒 padlock
- [ ] No "Not Secure" warnings
- [ ] `http://refibcn.cat` redirects to HTTPS
- [ ] All images and resources load over HTTPS

---

## Additional Resources

- [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Cloudflare SSL/TLS Documentation](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/)
- [Let's Encrypt Certificate Info](https://letsencrypt.org/)

---

## Questions?

If you continue to experience issues after following this guide:

1. Check GitHub Actions for build errors: https://github.com/refibcn/ReFi-BCN-Website/actions
2. Verify DNS propagation: https://dnschecker.org/#A/refibcn.cat
3. Contact GitHub Support if certificate won't provision after 48 hours

---

**Last Updated:** October 11, 2025

