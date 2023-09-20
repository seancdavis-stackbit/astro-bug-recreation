# Astro - Cookie Bug Recreation

## Setup

Install dependencies:

    yarn install

Start dev server:

    yarn dev

## Bug

### Chromium (Arc)

The intended behavior is seen when clicking the _Set Cookie_ button:

1. Leads to `/set-cookie`, which sets a `test-cookie` cookie with value `"Cookie is Set"`.
2. `/set-cookie` redirects to the home page, which shows that the cookie is set.

But when delivering an email to the same `/set-cookie` route, we get a different behavior:

1. Click the _Send email_ button, which will send an email using Nodemailer and Ethereal.
2. Close the current browser tab after seeing note about successful email.
3. Check the console for a preview URL to view the email. Open a new tab with this URL.
4. Click on the link in the email.
5. Directed back to the home page, but the cookie is not set.
6. Refresh the page and the cookie will be set.

### Safari

I tried this in Safari, which doesn't seem to set the cookie in any scenario.
