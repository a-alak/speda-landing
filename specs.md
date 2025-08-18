# Technical specification – SPEDA single‑page website ([https://ali96823.wixsite.com/my-site-11](https://ali96823.wixsite.com/my-site-11))

## 1 Overview

* **Site type:** single‑page marketing site for SPEDA, a MedTech startup. The site is built with Wix; navigation items are anchors that scroll to sections on the same page rather than separate pages.
* **Purpose:** pitch SPEDA’s solution for automatic data extraction from electronic health records (EHR), explain the problem it solves, provide social proof (testimonials and logos), introduce the team, answer common questions and encourage visitors to make contact.
* **Pages:** there is only one page. The top navigation bar contains anchors for `Solution`, `Why Us`, `About`, `Team`, and `FAQ`.  A `Contact Us` button appears in the header and again near the bottom. Clicking `Contact Us` opens a modal overlay containing a contact form.
* **Primary colour scheme:** off‑white background with purple highlights (SPEDA’s primary purple ≈ #8B4DEF), black typography and occasional dark backgrounds.
* **Typography:** headings use a bold sans serif font (likely Wix’s default), body copy uses a clean sans serif font with good line spacing.
* **Responsive behaviour:** sections stack vertically and the navigation anchors scroll to them. Buttons have hover states.

## 2 Global layout

| Area                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Header**             | Fixed at top with the SPEDA logo on the left, navigation items in the centre and a `Contact Us` CTA on the right. It remains visible while scrolling. The logo uses a purple geometric motif and is text‑accompanied.                                                                                                                                                                                                                                            |
| **Navigation anchors** | Clicking `Solution`, `Why Us`, `About`, `Team`, or `FAQ` scrolls to the corresponding section (IDs likely assigned in Wix). Each anchor highlights when section is in view.                                                                                                                                                                                                                                                                                      |
| **Contact button**     | A purple‑outlined button labelled `Contact Us` appears in the header and again near the bottom. When clicked, it triggers a modal overlay called **“Let’s Meet”** containing a form with fields for *First name*, *Last name*, *Email* and *Message*. It includes a reCAPTCHA checkbox and a `Send` button along with a note that enquiries can also be sent to `hi@speda.io`. The modal has its own close button in the top right and dims the page underneath. |
| **Footer**             | At the bottom of the page is a call‑to‑action “Want to know more about SPEDA? Contact Us”, again linking to the modal form. Beneath it, a small footer lists the company name **SPEDA ApS**, address “Bryghusgade 8, Christianshavn” and icons for email and LinkedIn.                                                                                                                                                                                           |

## 3 Section‑by‑section structure and content

This section outlines each anchor section in the order they appear, including layout, behaviour and text.  Use the section names as IDs for anchor links when reconstructing the site.

### 3.1 Hero (“Solution”)

* **Layout:** large hero banner with a grey background on which a photographic anatomical model sits on the right. On the left, large headline text reads **“Automating Data Extraction and Structuring from Health Records”** with a `Learn More` button below.
* **Functionality:** the `Learn More` button scrolls to the next section (`The Issue`).
* **Image:** hero background of a half‑body anatomical model (not downloadable via context menu; reproduction requires similar anatomical illustration).

### 3.2 The Issue (anchor: `Solution`)

* **Heading:** “The Issue”.
* **Description text:** explains that researchers manually extract data from electronic health records which is like **“searching for a needle in a haystack”**.  The process is time‑consuming, error‑prone, drains resources and lacks tools for integration and categorisation.
* **Image:** digital illustration of a heart overlaid with neural‑network‑style connections (file: {{file\:file-LbGx7so4cbnS9cvqWmhYZY}}).
* **Layout:** text appears on left side with the image on the right.

### 3.3 Our Solution

* **Heading:** “Our Solution”.
* **Content:** describes SPEDA’s technology: it automates extraction of patient information from EHRs via API when available or via AI‑based screen scraping when no API exists, integrates with electronic health record systems, transfers data securely into EDC systems and remains on‑premise to preserve security. It emphasises that their AI can transform unstructured doctor notes into structured, ready‑for‑analysis data.
* **Image:** photograph of a stethoscope on top of clinical forms (file: {{file\:file-Xc4e25k38NPAW2fgsH17n5}}).
* **Layout:** text on left and image on right.

### 3.4 Supported By

* **Purpose:** shows logos of supporting organisations on a dark background.
* **Logos:** (1) **KU Lighthouse** (file: {{file\:file-9Q2Fwhv7KJhKsy2ST4kQCt}}); (2) **Innovation Fund Denmark** (file: {{file\:file-RP1U8n2wjjiz9AEFKFVMup}}); (3) **Micro Grant** by the Danish Foundation for Entrepreneurship (file: {{file\:file-9vKZdFVRtXsJzUKkNLCEbY}}). Each logo sits inside a card with white text beneath.

### 3.5 Why you should work with us (anchor: `Why Us`)

* **Heading & tagline:** “Why you should work with us” with a sub‑headline explaining that SPEDA accelerates research by automating data transfers.

* **Three feature columns:**

  | Column        | Heading     | Description                                                                                                            | Icon                                                                                    |
  | ------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
  | **Automatic** | “Automatic” | Data flows automatically from health records to the research platform so researchers spend time analysing, not typing. | An illustrated calendar icon is used (must be replicated using vector or icon library). |
  | **Fast**      | “Fast”      | The transfer happens in real time or multiple times per day to ensure the research database is always up to date.      | Lightning bolt icon.                                                                    |
  | **Secure**    | “Secure”    | Data transfer reduces the number of people accessing raw health records, improving compliance with data regulations.   | Padlock icon.                                                                           |

* **Infographic:** an image showing an arrow between two illustrated windows labelled “Data packages” (containing lab results, vitals, etc.) and “Patient record & Research platform” (file: {{file\:file-8TYShCVyjAUsu9XSbXjxuf}}).

### 3.6 Our Story & Our Vision (anchor: `About`)

* **Our Story:** describes SPEDA as a young MedTech company based in Copenhagen.  It tells how founder **Ali Al‑Alak** experienced manual data extraction during COVID, envisioned a better approach and assembled a team with support from Copenhagen University’s innovation hub. The team is working with customers and medical researchers to develop privacy‑preserving data extraction.
* **Our Vision:** emphasises harnessing data to drive healthcare research and imagines a future where data flows securely while insights are gleaned quickly. It highlights balancing data utility and privacy and states SPEDA builds high‑security systems to enable a new era of research.
* **Images:**

  * Overhead photo of a team collaborating (file: {{file\:file-U86N3kc4LJX7PmshDXhBxr}}) next to the “Our Story” text.
  * Photo of a scientist analysing DNA on monitors (file: {{file\:file-RJE1RYBL3k3MeNKxhmJyGk}}) next to the “Our Vision” text.

### 3.7 Our Team (anchor: `Team`)

* **Heading:** “Our Team”.

* **Layout:** a grid of cards containing each team member’s photo, name, role and a LinkedIn icon linking to their profiles. The cards have purple borders and rounded corners.

* **Team members:**

  | Name                 | Role                           | Notes                                            |
  | -------------------- | ------------------------------ | ------------------------------------------------ |
  | **Nikola Burger**    | Chief Commercial Officer (CCO) | Photo shows a young man with a beard and suit.   |
  | **Ali Al‑Alak**      | Chief Executive Officer (CEO)  | Founder; pictured smiling in desert environment. |
  | **Tom Quast**        | Chief Technology Officer (CTO) | Wearing glasses and speaking into a microphone.  |
  | **Jesper Gür**       | Medical Associate              | Photo shows man with shaved head and glasses.    |
  | **Persefoni Nastou** | Business Developer             | Pictured with long hair and business attire.     |

* **Image extraction challenge:** the team portraits load dynamically from Wix and cannot be downloaded via context‑menu (Wix replaces them with a blue pattern when right‑clicked). If exact photos are required, they should be extracted via the Wix media manager or by taking screenshots of each card.  The specification should provide placeholders and instruct the dev team to substitute them with the correct images when available.

### 3.8 Testimonials

* **Section:** horizontally centred slider with a testimonial from a medical researcher in the Danish Capital Region.  The testimonial praises the SPEDA team’s support, high‑quality data, clear overview of processes and potential time savings.  The slider includes left/right arrow buttons for navigation and shows the Region Hovedstaden logo.

### 3.9 FAQ (anchor: `FAQ`)

* **Layout:** series of collapsible Q\&A rows. Each question expands when clicked.
* **Questions and answers:**

  | Question                                                                    | Answer                                                                                                                                                                                                                              |
  | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | **How does your system extract data from health records?**                  | They use APIs when available but more commonly rely on an AI‑based approach that navigates the EHR interface like a human but faster.                                                                                               |
  | **What kinds of data can be extracted from health records?**                | Virtually any data stored in the EHR: vital signs, treatment plans, medical history, doctors’ notes, medication prescriptions, laboratory results, etc..                                                                            |
  | **How is the extraction of sensitive data legally permitted?**              | The solution runs on‑premise; data never leaves the hospital. SPEDA uses the same access rights that researchers already have, so no additional permissions are needed.                                                             |
  | **What measures are in place to ensure data security and patient privacy?** | Data security and privacy are top priorities. The system never moves data off the researcher’s server and transfers it directly to their secure EDC system.                                                                         |
  | **To which systems can you export the data?**                               | Integration primarily targets REDCap but they can export to virtually any electronic data capture system.                                                                                                                           |
  | **Are any approvals needed for your data extraction service?**              | SPEDA does not handle ethical approvals; researchers must ensure they have them. Because the system is on‑premise and SPEDA does not access the data, no additional approvals are typically required besides internal IT clearance. |
  | **Which health record systems and locations are currently supported?**      | Currently focusing on the EPIC system and expanding across Denmark. They are open to other systems after assessment.                                                                                                                |
  | **What does your software cost?**                                           | Pricing is based on number of patients and data points; they aim to be cheaper than manual extraction and provide customised offers.                                                                                                |
  | **How can researchers verify the accuracy of the extracted data?**          | They have not encountered accuracy issues but are conducting a study to demonstrate accuracy. They offer to extract a small dataset and compare it with manual extraction.                                                          |

### 3.10 Final CTA and Contact Form

* **Call‑to‑action:** A large banner with the text **“Want to know more about SPEDA? Contact Us”** followed by a `Contact Us` button.
* **Modal form:** Clicking the button opens the “Let’s Meet” overlay. The overlay includes fields for first name, last name, email and message, a reCAPTCHA checkbox and a `Send` button. It also displays an email icon with the address `hi@speda.io`.

## 4 Assets

The following files were extracted from the site.  They are provided separately and should be used when recreating the site.

| File                                                                             | Description                                                                                                  |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **{{file\:file-LbGx7so4cbnS9cvqWmhYZY}}**                                        | Digital heart illustration used in **The Issue** section.                                                    |
| **{{file\:file-Xc4e25k38NPAW2fgsH17n5}}**                                        | Stethoscope on forms used in **Our Solution**.                                                               |
| **{{file\:file-9Q2Fwhv7KJhKsy2ST4kQCt}}**                                        | KU Lighthouse logo in **Supported By** section.                                                              |
| **{{file\:file-RP1U8n2wjjiz9AEFKFVMup}}**                                        | Innovation Fund Denmark logo.                                                                                |
| **{{file\:file-9vKZdFVRtXsJzUKkNLCEbY}}**                                        | Micro Grant logo.                                                                                            |
| **{{file\:file-8TYShCVyjAUsu9XSbXjxuf}}**                                        | Infographic showing data packages and patient record windows.                                                |
| **{{file\:file-U86N3kc4LJX7PmshDXhBxr}}**                                        | Overhead team collaboration photo for **Our Story**.                                                         |
| **{{file\:file-RJE1RYBL3k3MeNKxhmJyGk}}**                                        | Researcher with DNA screens image for **Our Vision**.                                                        |
| **{{file\:file-AmMbfRTyS3pWgiSwF9w46r}}, {{file\:file-UUmVB9cTDyQjN39aXZAGWp}}** | Placeholder patterns downloaded when attempting to save team photos. These are not used in the final design. |

## 5 Implementation notes

1. **Platform:** the original site uses Wix. A replica can be built with any CMS or static site generator.
2. **Navigation:** implement smooth scrolling to section IDs.  Maintain the fixed header on scroll.  The `Contact Us` button should trigger a modal with an overlay.
3. **Modal implementation:** ensure the contact modal traps focus and can be closed via an `X` button or by clicking outside.  Include a reCAPTCHA widget if needed; in development a placeholder may be used.
4. **Assets placement:** images in the hero, issue, solution, why us (infographic), story and vision sections should have descriptive alt text.  Support logos should link to partner websites if desired.
5. **Testimonials slider:** implement a simple carousel with navigation arrows.  Only one testimonial is currently shown; design should allow adding more.
6. **FAQ accordion:** implement an accordion component where only one answer is expanded at a time.  Use accessible markup (`<button>` for headings, `<div>` for content) and ARIA attributes.
7. **Responsive design:** ensure all sections stack appropriately on narrow screens.  Images should resize while maintaining aspect ratio.

## 6 Content summary

Below is the raw text content of the site, organised by section.  Use it directly when constructing the copy.

### Hero

> Automating Data Extraction and Structuring from Health Records

Button: **Learn More**

### The Issue

> Researchers often spend huge amounts of time manually extracting data from electronic health records – a process described on the site as *“searching for a needle in a haystack.”*  It is time‑consuming, error‑prone and drains resources because there are no simple tools to integrate and categorise the data.

### Our Solution

> SPEDA automates extraction of patient information directly from electronic health records.  When an API is available they use it; when there isn’t one, an AI‑based approach navigates the system like a human, but much faster.  Their solution integrates with existing EHR systems and transfers data securely to an electronic data capture system.  It stays on‑premise for maximum security and uses AI to transform unstructured doctor notes into structured, analysis‑ready data.

### Why you should work with us

**Automatic** – Data flows automatically from health records to the research platform, freeing researchers to analyse rather than copy information.
**Fast** – Data transfers occur in real time or several times per day to keep the research database up to date.
**Secure** – Fewer people handle raw data, which improves compliance with data regulations.

### Our Story

> SPEDA is a young MedTech company based in Copenhagen.  It was founded by **Ali Al‑Alak** who, during the COVID pandemic, personally experienced the inefficiencies of manual data extraction in research projects.  He envisioned a better solution and, with support from Copenhagen University’s innovation hub, assembled a team.  Today SPEDA works on customer projects and collaborates with medical researchers to develop software that adheres to high privacy standards while increasing efficiency.

### Our Vision

> SPEDA’s vision is to harness data to drive healthcare research while respecting patient privacy.  They aim to remove barriers presented by outdated systems and imagine a future where data flows securely and insights are gleaned rapidly.  Their mission emphasises balancing data utility and privacy, building systems with the highest security and ushering in a new era of healthcare innovation.

### Team

* **Nikola Burger** – CCO.
* **Ali Al‑Alak** – CEO.
* **Tom Quast** – CTO.
* **Jesper Gür** – Medical Associate.
* **Persefoni Nastou** – Business Developer.

(Photos must be obtained from the Wix media library or replaced with similar headshots.)

### Testimonial

> “Working with this team has been incredibly beneficial.  They’re easily accessible and quick to respond, which I really appreciate.  They consistently provided a clear overview of the data and storage procedures, demonstrating a firm grasp on where and how we would retrieve the information.  The data they delivered was high‑quality and user‑friendly, though I did need to manually look up some details that were not included in the initial extraction.  I would definitely use their services again and wouldn’t hesitate to recommend them to others, especially for projects involving 100 patients or more.  For larger datasets, I see tremendous potential for time savings.  Overall, their service has significantly streamlined our research process.”

### FAQ – Q\&A (see table above for details)

### Images

- Digital heart illustration: images/d22758_bf5e60ff5ec1487c97e2a57d58c7db2a~mv2.avif
- Stethoscope on forms: images/d22758_18c109c7f6a04c62bae393d40840f5cc~mv2.avif
- KU Lighthouse logo: images/LH--mini-logo_03.avif
- Innovation Fund Denmark logo: images/d22758_3b2eeed0bdeb4fe8af3232dbb4d13c8c~mv2.avif
- Micro Grant logo: images/Micro-grant-high.avif
- Infographic (data packages to patient record): images/d22758_b1344c8854b3441f912ae2f2627b6eae~mv2.avif
- Team collaboration photo: images/11062b_afa48ab6ade4434c882e28c65f76a373~mv2.avif
- Researcher working with DNA screens: images/d22758_4acc70661f4a47388a4a35d8f19a0c24~mv2.avif
- Placeholder patterns: images/4.avif, images/4 (1).avif

---
