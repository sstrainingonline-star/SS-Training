# SS Training — course catalogue update

Use this complete website ZIP in place of the uploaded `SS-Training-main (1).zip`. It is based on that exact upload, not the earlier separate course-function package.

## Changes

- All ten existing live courses, their ten-hour allocations, lesson content and original artwork are retained.
- All ten existing live course prices are exactly half their previous prices.
- Removed the 100-hour collection headline. Each card prominently displays its own CPD hours.
- Added free **Modern Barber Teaching & Learner Engagement**: nine modules, five planned CPD hours (270 minutes of learning and activities plus 30 minutes assessment).
- Added free **Barbering Risks, Hazards & Health and Safety**: nine modules, two planned CPD hours (105 minutes of learning and activities plus 15 minutes assessment).
- Both have an image per module, a quick check, practical activity, written response and 20-question final. 16/20 passes. Teaching responses require 120 words; safety responses require 60 words to fit the shorter course.
- The certificate uses the existing design, with the individual course title and hours.
- Fixed the existing word-count check (it previously counted characters), escaped saved reflections when rendering them, and connected the dashboard Continue button.
- No Stripe connection, payment processing or new backend function has been added.

## Upload to GitHub

1. Unzip the download.
2. Open the inner `SS-Training-main` folder.
3. Upload its **contents** to the root of `sstrainingonline-star/SS-Training`, where `index.html` already sits. Replace matching files and keep folder paths. Do not upload the ZIP itself, or create an extra nested SS-Training-main folder.
4. Commit the changes. Your existing Appwrite Sites deployment can rebuild from the connected branch. No hosting settings or domain changes are required by this patch.
5. Open the live site and refresh. Confirm 12 course cards, the new prices, and the 5-hour and 2-hour free courses.

This package has not been pushed or published on your behalf. Keep your original ZIP/commit for rollback.

## Free account access at this stage

The free-course buttons use the existing Appwrite project and endpoint in your upload. New learners can create an email/password account with their full name; existing users can sign in. The free courses do not request a card or a payment.

The existing site has browser-based progress. This update retains that approach and separates free-course records by authenticated Appwrite user ID on the browser. The dashboard clearly explains that progress does **not** yet sync between devices. Assessment marking and certificate generation are browser-side at this stage. They are not independently verified server records or secure proctored assessment.

Before public learner launch, test registration/sign-in against the live Appwrite project, ensure email/password login is enabled and your site hostname is registered as a web platform. This package does not change the existing Appwrite settings or add email verification/recovery workflows. Central progress, certificates and secure paid entitlements remain part of the later backend/Stripe work; do not switch on paid sales just by adding a payment link.

## Add your videos later

Open **free-course-videos.js**. There are two rows:

- `11`: teaching modules 1–9.
- `12`: safety modules 1–9.

Replace a blank entry with a local MP4/WebM path or a YouTube/Vimeo embed URL. Example: `media/teaching-01.mp4`. Upload that media file at the matching path. Blank entries keep the image and written lesson available and display “Supporting video to follow”. You do not need to edit the learning engine or buy another service to reserve the video slots.

Do not add large video files directly to GitHub if they exceed its limits; a suitable video host can supply the embed URL instead. We can choose that when your videos are ready.

## Research and course scope

References are linked inside every new module and in `course-content/course-11.md` and `course-content/course-12.md`. See `RESEARCH-AND-LEGISLATION.md` for the legal framework and scope.

These are provider-issued introductory CPD courses, not regulated teaching, first-aid or safeguarding qualifications. Learning hours are planned allocations, not measured seat time. The two-hour safety course covers key barbering duties and everyday risks; it cannot certify compliance with every workplace law or replace the shop's own assessments and procedures.

## Validation

Automated DOM tests completed both courses and checked all 12 catalogue cards, exact half prices, individual hours, account sign-in gating, all 18 module completions, 20-question finals, 75% failure and 80% pass, correct certificates, sign-out and separated account progress. Tests use simulated Appwrite responses, not your live account.

Original ten-course content, original images, CSS, Appwrite configuration and domain files were checked against the uploaded ZIP. Only the requested catalogue/learning additions and small supporting engine changes differ.

Check desktop/mobile layout, live authentication and certificate Print/Save PDF after upload. No live payments or live deployment were tested.

The unused older `Public/`, `Data/` and `src/` scaffold files in your ZIP are preserved. The live root `index.html` reads root `courses.json`; do not change the hosting output to one of those old scaffold folders.
