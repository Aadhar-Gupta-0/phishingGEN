# phishingGEN — Phishing Awareness Lab

A **defensive, local-only phishing-awareness project**. This tool helps users recognize suspicious URL patterns and practice cautious browsing.

## Features
- Explain red flags: user-info tricks, HTTP, shortened links, punycode, IP addresses, excessive subdomains, nonstandard ports, and account-related paths.
- No navigation to user-supplied URLs, network fetches, tracking or credential collection.
- Works as a static webpage in a modern browser.
- Reproducible automated tests.

## Run

Open `index.html` in a browser or start `python -m http.server 8000`.
Run `node test-analyzer.js` to test the URL analysis logic.

## Safety / limitations

**This is NOT a phishing-link generator.** It never sends phishing links, imitates real login portals, intercepts credentials or collects visitor IP addresses. The upstream repository linked in the project brief contained phishing-kit and credential-collection code and was **not copied** into this edition. This project is a newly implemented, defensive alternative.

The analysis is heuristic: a clean result is not proof of safety, and a flagged link is not definitive evidence of malicious intent. Always verify websites independently and follow your organization's incident-reporting process.

© 2026 Aadhar-Gupta-0. MIT license.
