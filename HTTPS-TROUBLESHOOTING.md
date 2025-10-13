# HTTPS Certificate Troubleshooting for refibcn.cat

## Issue: "Enforce HTTPS" Unavailable

The message "Unavailable for your site because a certificate has not yet been issued for your domain" is normal when first setting up or changing a custom domain.

---

## Quick Fix Steps (Try These First)

### Step 1: Verify DNS Configuration in Cloudflare

1. Go to **Cloudflare Dashboard** → **DNS** for `refibcn.cat`
2. Check you have these records:

**For root domain (`refibcn.cat`):**

| Type  | Name | Target           | Proxy Status | TTL  |
|-------|------|------------------|--------------|------|
| A     | @    | 185.199.108.153  | Proxied (☁️) | Auto |
| A     | @    | 185.199.109.153  | Proxied (☁️) | Auto |
| A     | @    | 185.199.110.153  | Proxied (☁️) | Auto |
| A     | @    | 185.199.111.153  | Proxied (☁️) | Auto |

**For www subdomain:**

| Type  | Name | Target           | Proxy Status | TTL  |
|-------|------|------------------|--------------|------|
| CNAME | www  | refibcn.cat      | Proxied (☁️) | Auto |

### Step 2: GitHub Pages "Remove and Re-add" Trick

This often forces GitHub to re-check DNS and provision the certificate:

1. Go to: https://github.com/refibcn/ReFi-BCN-Website/settings/pages
2. Under **Custom domain**, **remove** `refibcn.cat` (delete the text and save)
3. Wait 30 seconds
4. **Re-enter** `refibcn.cat` and click **Save**
5. GitHub will re-verify the domain
6. Wait 2-5 minutes and refresh the page
7. The "Enforce HTTPS" checkbox should now be available

### Step 3: Check DNS Propagation

Before GitHub can issue a certificate, DNS must be properly configured:

```bash
# Check if DNS is pointing correctly
dig refibcn.cat +short

# Expected output: GitHub Pages IP addresses
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

Or use online tools:
- https://dnschecker.org → Enter `refibcn.cat`
- Should show GitHub Pages IPs globally

---

## Detailed Troubleshooting

### Problem 1: DNS Not Propagated

**Symptoms:**
- "Enforce HTTPS" grayed out
- Domain verification failing
- DNS check shows old IPs or no results

**Solution:**
1. **Wait**: DNS propagation can take 5 minutes to 24 hours (usually 10-30 minutes)
2. **Check Cloudflare Settings**:
   - Go to **SSL/TLS** → **Overview**
   - Set to **Full** (not "Full (strict)" yet, as GitHub doesn't have cert)
3. **Flush DNS cache locally**:
   ```bash
   # macOS
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

### Problem 2: Certificate Provisioning Delay

**Symptoms:**
- DNS is correct but HTTPS still unavailable
- Domain shows as verified but checkbox disabled

**Solution:**
1. **Be patient**: Certificate provisioning can take up to 24 hours
2. **Check GitHub Status**: https://www.githubstatus.com
   - Look for "GitHub Pages" issues
3. **Try the remove/re-add trick** (Step 2 above)

### Problem 3: Cloudflare Proxy Interfering

**Symptoms:**
- Domain verified but certificate won't issue
- Intermittent connection issues

**Temporary Solution** (to get certificate):
1. In Cloudflare DNS, toggle **Proxy status to "DNS only" (gray cloud ☁️)**
2. Wait 5-10 minutes for DNS to propagate
3. In GitHub Pages, remove and re-add the domain
4. Wait for certificate to be issued and "Enforce HTTPS" to be available
5. Once HTTPS works, you can re-enable Cloudflare proxy if desired

**Better Solution** (keep proxy on):
1. In Cloudflare, go to **SSL/TLS** → **Overview**
2. Change mode to **Full** (this allows Cloudflare ↔ GitHub to work)
3. Go to **Edge Certificates**
4. Enable **Always Use HTTPS**
5. Wait and try remove/re-add trick in GitHub

### Problem 4: CNAME File Missing or Incorrect

**Check:**
```bash
cd "/Users/luizfernando/Desktop/git/Zettelkasten/03 Libraries/ReFi-BCN-Website"
cat quartz/static/CNAME
```

**Should contain:**
```
refibcn.cat
```

**If not, fix it:**
```bash
echo "refibcn.cat" > quartz/static/CNAME
git add quartz/static/CNAME
git commit -m "Fix CNAME file"
git push origin main
```

---

## Step-by-Step: Complete Setup for HTTPS

### 1. Cloudflare Configuration

**DNS Records:**
```
Type: A      Name: @    Target: 185.199.108.153  Proxy: ON
Type: A      Name: @    Target: 185.199.109.153  Proxy: ON
Type: A      Name: @    Target: 185.199.110.153  Proxy: ON
Type: A      Name: @    Target: 185.199.111.153  Proxy: ON
Type: CNAME  Name: www  Target: refibcn.cat      Proxy: ON
```

**SSL/TLS Settings:**
- **Encryption mode**: Full
- **Edge Certificates**: 
  - ✅ Always Use HTTPS
  - ✅ Automatic HTTPS Rewrites
  - ✅ Opportunistic Encryption

### 2. GitHub Pages Configuration

1. Go to: https://github.com/refibcn/ReFi-BCN-Website/settings/pages
2. **Source**: `main` branch, `/ (root)` folder
3. **Custom domain**: `refibcn.cat`
4. Click **Save**
5. **Wait for domain verification** (green checkmark appears)
6. Once verified, **Enforce HTTPS** will become available
7. Check the box and save

### 3. Verification

**Test DNS:**
```bash
dig refibcn.cat
nslookup refibcn.cat
```

**Check Site:**
1. Open https://refibcn.cat (might show warning initially)
2. Check https://www.refibcn.cat (should redirect to refibcn.cat)

**Monitor GitHub Actions:**
- https://github.com/refibcn/ReFi-BCN-Website/actions
- Verify deployment succeeded

---

## Timeline: What to Expect

| Time        | What Happens                                      |
|-------------|---------------------------------------------------|
| 0 min       | Change DNS in Cloudflare                          |
| 5-30 min    | DNS propagates globally                           |
| 10-60 min   | GitHub detects correct DNS                        |
| 15-90 min   | GitHub issues Let's Encrypt certificate           |
| 20-120 min  | "Enforce HTTPS" becomes available                 |

**Total time**: Usually 30 minutes to 2 hours. Can take up to 24 hours in rare cases.

---

## Current Status Check

Run these commands to verify current status:

```bash
# Check DNS
dig refibcn.cat +short

# Check if site is accessible
curl -I https://refibcn.cat

# Check GitHub Pages deployment
cd "/Users/luizfernando/Desktop/git/Zettelkasten/03 Libraries/ReFi-BCN-Website"
git log -1 --oneline
```

---

## When Nothing Works: Nuclear Option

If after 24 hours HTTPS still isn't working:

### Option 1: Use Cloudflare SSL Only

1. In Cloudflare: **SSL/TLS** → **Edge Certificates**
2. Enable **Always Use HTTPS**
3. In GitHub Pages: Leave "Enforce HTTPS" unchecked
4. Cloudflare will handle all HTTPS (visitors always get HTTPS)
5. Connection: `Visitor -(HTTPS)-> Cloudflare -(HTTP)-> GitHub Pages`

This is **secure** because:
- Visitors always use HTTPS to Cloudflare
- Cloudflare to GitHub is on GitHub's network
- No sensitive data transmitted

### Option 2: Contact GitHub Support

1. Go to: https://support.github.com
2. Select "GitHub Pages"
3. Explain:
   - Domain: `refibcn.cat`
   - DNS is correct (provide dig output)
   - Certificate won't provision
   - Include screenshot of Pages settings

---

## Post-HTTPS Checklist

Once HTTPS is enabled:

- [ ] Visit https://refibcn.cat - no warnings
- [ ] Visit https://www.refibcn.cat - redirects correctly
- [ ] Visit http://refibcn.cat - redirects to HTTPS
- [ ] All images and assets load (check browser console)
- [ ] Navigation works
- [ ] Search works
- [ ] Green padlock in browser address bar
- [ ] Check on mobile device

---

## Common Errors and Solutions

### Error: "Domain's DNS record is not properly configured"

**Solution:**
- DNS records not set up correctly
- Follow Step 1 under "Quick Fix Steps"
- Wait 10-30 minutes after changes

### Error: "Both refibcn.cat and www.refibcn.cat resolve to the same place"

**Solution:**
- This is OK! GitHub just wants you to choose one as primary
- Keep `refibcn.cat` as the custom domain (no www)

### Error: Certificate shows "Not Secure" in browser

**Solution:**
- Certificate is being provisioned but not ready
- Wait 10-30 more minutes
- Try clearing browser cache
- Try incognito/private mode

---

## Quick Reference: GitHub Pages IPs

Always use these four IPs for A records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

---

## Support Resources

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Cloudflare DNS Docs**: https://developers.cloudflare.com/dns
- **Let's Encrypt Status**: https://letsencrypt.status.io
- **GitHub Status**: https://www.githubstatus.com

---

## Summary

**Most Common Fix:**
1. Remove custom domain in GitHub Pages settings
2. Wait 30 seconds
3. Re-add custom domain
4. Wait 5-10 minutes
5. "Enforce HTTPS" should now be available

**If that doesn't work:**
- Check DNS is correct in Cloudflare
- Wait up to 24 hours for certificate provisioning
- Use Cloudflare's "Always Use HTTPS" as a backup solution

