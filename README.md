# SecPath

Group 7’s installable, mobile-first learning app for Cloud Security and IAS 2. Each course has a discussion, an interactive simulation, a ten-question quiz, and the original downloadable exercise manual. Quiz attempts and activity progress are stored in the current browser.

## Run locally

From this folder, start a static server:

```powershell
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open [SecPath on localhost](http://localhost:4173). To install it on a phone, open its hosted HTTPS URL in the mobile browser and select **Install app** or **Add to Home Screen**. Visit the app online once so the service worker can save the coursework and manuals for offline use.

## Google Forms submissions

Each exercise already links to its published Group 7 responder form. To replace either link later:

1. Create and publish a Google Form that students can respond to. Add a required **File upload** question for their exercise evidence. For Cloud Security, also collect the deployed URL or URLs as short answers.
2. For a shared form, add a required course selector with **Cloud Security** and **IAS 2**. Alternatively, create a separate form for each course.
3. Paste the published responder links into [dist/config.js](dist/config.js) and republish the site. Use HTTPS links from `forms.gle` or a Google Forms `/viewform` URL. Set both entries to the same URL for a shared form.
4. Open each Exercise activity and test the Google Form with a student account allowed to upload. Google Forms handles uploads online. The app records manual review locally.

## Course sources

The discussions and quizzes are adapted from the Group 7 Cloud Security and IAS 2 presentation and quiz PDFs. Cloud Security follows the cloud deployment models topic. IAS 2 follows the Snort intrusion detection topic. The original exercise PDFs are in `dist/manuals/`.
