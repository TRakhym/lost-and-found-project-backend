# Repository Audit

Current date: April 2026

I looked at my Lost and Found project repo honestly.

What I checked:

- README quality: I have a README.md in English. It explains what the project is, tech stack, quick start, endpoints and next features. Looks okay but could be better with problem statement and screenshots. Not super professional yet.
- Folder structure: Everything is in api/ folder (index.js, auth/, users/, items/, middleware/, lib/). Prisma folder is separate. No src/, docs/, tests/ or assets/. It's a bit messy because all backend files are mixed in api/.
- File naming consistency: Files are named okay (register.js, login.js, items.js). Some folders have the same name as files. Not perfect but readable.
- Essential files:

  - package.json — yes
  - .gitignore — yesLICENSE — no (missing)
  - No tests folder
- Commit history quality: I made a few commits manually. Messages are simple like "added items route". Not many commits, no detailed descriptions. Looks like student work.

Score: 5/10

Justification: The code works and has the main features (auth + items), but the repo looks unfinished and not clean. Folder structure doesn't match professional standards, missing important files like .gitignore and LICENSE. README is decent but not complete according to workshop requirements. Commit history is short and not very descriptive. I can improve it a lot by following the workshop.
