# Umami Analytics Internal Traffic Filtering

> **Status:** P0 - Data credibility baseline
> **Updated:** 2025-02-05
> **Purpose:** Prevent internal traffic from polluting conversion data

---

## Filtering Layers (Implemented)

### ✅ Layer 1: Environment Filtering
**Location:** `components/UmamiAnalytics.tsx:24-26`

Umami script **only loads in production** (`NODE_ENV === "production"`).

- Development environment: ❌ No tracking
- Preview deployments: ❌ No tracking
- Production (openclaw-ai.org): ✅ Tracking enabled

---

### ✅ Layer 2: URL Query Parameter (NEW)
**Location:** `components/UmamiAnalytics.tsx:31-35`

**Testing Mode:** Add `?umami_ignore=1` to any page URL to disable analytics for that session.

```bash
# Example URLs
https://openclaw-ai.org/guides/fix-openclaw-cuda-oom-errors?umami_ignore=1
https://openclaw-ai.org/?umami_ignore=1
https://openclaw-ai.org/troubleshooting?umami_ignore=1
```

**How to use:**
1. Browse to any page on the site
2. Add `?umami_ignore=1` to the URL (or `&umami_ignore=1` if URL already has parameters)
3. Reload page — analytics will be disabled for that session
4. Remove the parameter to re-enable analytics

**Advantages:**
- No browser console needed
- Works in Incognito/Private windows
- Temporary (doesn't persist like localStorage)
- Ideal for testing CTAs, layouts, or content without polluting analytics

**Console output when active:**
```
[Umami] Analytics disabled by URL parameter (?umami_ignore=1)
```

---

### ✅ Layer 3: Browser Opt-Out
**Location:** `components/UmamiAnalytics.tsx:40-46`

Maintainers can exclude themselves via browser console:

```javascript
// To exclude your traffic:
localStorage.setItem('umami_ignore', '1')

// To re-enable:
localStorage.removeItem('umami_ignore')
```

When set, the script shows: `[Umami] Analytics disabled by user opt-out`

**Advantages:**
- Works regardless of IP (home, VPN, mobile hotspot)
- Persists across sessions
- Per-browser, not per-device

---

### ✅ Layer 4: IP Exclusion (Backend Config)

**Action Required:** Configure in Umami Dashboard

### Steps:
1. Go to: `https://analytics.umami.is/settings`
2. Navigate to: **Websites** → **openclaw-ai.org** → **Settings**
3. Find: **Exclude IPs** section
4. Add IPs one per line

### IPs to Exclude (Example List)

| IP / CIDR | Purpose | Added By | Date |
|-----------|---------|----------|------|
| `YOUR_HOME_IP` | Maintainer home | | |
| `YOUR_OFFICE_IP` | Office network | | |
| `YOUR_VPN_IP` | Personal VPN | | |
| `VULTR_SERVER_IP` | Cloud maintenance | | |
| `CI_PREVIEW_IP` | Automated testing | | |

### How to Find Your Public IP
```bash
# Quick check
curl -s ifconfig.me

# Or visit: https://ifconfig.me
```

### How to Add/Remove Internal IPs

**To Add:**
1. Access Umami Dashboard
2. Go to Website Settings
3. Add IP to **Exclude IPs** list
4. Click **Save**

**To Remove:**
1. Access Umami Dashboard
2. Go to Website Settings
3. Remove IP from **Exclude IPs** list
4. Click **Save**

> **Note:** IP exclusions take effect immediately. Historical data is not modified.

---

## Verification Checklist

### Pre-Deployment
- [ ] `NODE_ENV` check is in place
- [ ] `umami_ignore` query parameter logic works
- [ ] `localStorage.umami_ignore` logic works
- [ ] Dev environment doesn't load Umami script

### Post-Deployment
- [ ] Visit site in development → No Umami script in DevTools
- [ ] Visit production → Umami script is present
- [ ] Add `?umami_ignore=1` to URL → Console shows disabled message
- [ ] Set `localStorage.umami_ignore = "1"` → Console shows opt-out message
- [ ] Configure IP exclusions in Umami backend (optional)

### Ongoing Monitoring
- [ ] Compare `vultr_click` events before/after filtering
- [ ] Check for abnormal spikes (indicates missed internal traffic)
- [ ] Review new user sessions vs expected external traffic

---

## Testing Commands

### Check if Umami is loaded (Browser Console)
```javascript
// Should return true in production, false in dev
!!document.querySelector('script[data-website-id="5db90e55-9103-490f-8df0-9636a84942c8"]')
```

### Check opt-out status
```javascript
// Should return "1" if opted out
localStorage.getItem('umami_ignore')
```

### Check URL parameter status
```javascript
// Should return "1" if parameter is set
new URLSearchParams(window.location.search).get('umami_ignore')
```

### Simulate external user
```javascript
// Open Incognito/Private window (no localStorage)
// Should see Umami script loaded
```

---

## Troubleshooting

### Issue: Still tracking my traffic
**Solutions:**
1. Verify `localStorage.umami_ignore = "1"` is set
2. Hard refresh page (Ctrl+Shift+R / Cmd+Shift+R)
3. Check browser console for opt-out message
4. If using IP exclusion, verify current IP: `curl ifconfig.me`

### Issue: Not tracking any traffic
**Solutions:**
1. Check `NODE_ENV === "production"`
2. Verify not opted out: `localStorage.getItem('umami_ignore')`
3. Check Umami backend status

### Issue: Development environment is tracking
**Solutions:**
1. Verify `process.env.NODE_ENV` is not "production"
2. Check network tab for Umami script requests

---

## Related Files

| File | Purpose |
|------|---------|
| `components/UmamiAnalytics.tsx` | Analytics wrapper with filtering |
| `app/layout.tsx` | Root layout (imports UmamiAnalytics) |

---

## Data Credibility Statement

> **Before Umami filtering, no conversion conclusions should be drawn.**
>
> Internal traffic (developer testing, family preview, etc.) can easily inflate click counts by 10-100x, leading to:
> - False confidence in underperforming CTAs
> - Misguided UX decisions
> - Wasted optimization efforts
>
> **This filtering system is the baseline for trustworthy analytics.**

---

**Last Updated:** 2025-02-05
**Maintainer:** @hoskingxxx
