# Preview Password

The Coming Soon page is now active on your home page!

## Password to Access Preview

**Password:** `mentormatch2025`

## How It Works

1. When someone visits your website at http://localhost:3001, they'll see the Coming Soon page
2. They need to enter the password to access the full site
3. Once authenticated, the access is stored in localStorage, so they won't need to enter it again
4. To test the Coming Soon page again, clear your browser's localStorage or open in incognito mode

## Changing the Password

To change the password, edit this line in `/src/components/coming-soon.tsx`:

```typescript
const PREVIEW_PASSWORD = 'mentormatch2025' // Change this to your desired password
```

## Clearing Access (Testing)

To see the Coming Soon page again:
1. Open browser console (F12)
2. Run: `localStorage.removeItem('preview_access')`
3. Refresh the page

Or simply open the site in an incognito/private window.
