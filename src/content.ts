/* ==========================================================================
   THE ARCHIVE · content
   --------------------------------------------------------------------------
   Everything written on the site lives in this file. Edit freely; the pages
   in src/pages only read from here.

   Certifications, projects, professional life, education, skills and
   achievements come from the résumé, which is the source of truth. Books
   are Hricha’s own. Papers and the journal are hidden: their drafts live in
   content-hidden.ts so they don't ship (see HIDDEN_SECTIONS.md). Running is from a Strava export.
   ========================================================================== */

/* The shape of one exhibit. Everything marked optional only shows when it's
   filled in. Exhibit numbers (EXHIBIT 01, 02…) are not stored: they come from
   each project's position among the published ones (see lib/archive.ts). */
export type Project = {
  id: string
  title: string
  subtitle: string
  materials: string[]
  summary: string
  built: string[]
  architecture: { label: string; note: string }[]
  hidden?: boolean          // true = unpublished: not shown, not numbered
  note?: string             // a short line on the object label (a generic one is used when empty)
  highlight?: string        // the headline result, shown on the card and the label
  links?: { repo?: string; demo?: string; video?: string }
  problem?: string
  training?: [string, string][]
  decisions?: { decision: string; why: string }[]
  challenges?: string[]
  next?: string[]
  dataset?: [string, string][]
  model?: string
  results?: { note: string; rows: { label: string; value: number }[] }
  plates?: { caption: string; src: string }[]
}

export const ARCHIVE = {
  owner: "Hricha Mehra",
  tagline: "a collection of things I’ve built, learned, read, run, and written",
  opening: {
    subtitle: "notes from a life in progress",
    // under the closed notebook, for anyone in a hurry
    headline: "software engineer · HomeFirst Finance, Mumbai",
  },
  // Contact , shown on the notebook's inside cover and the contents page.
  // The email is also used by “Talk to me about this book”.
  email: "hrichamehra11@gmail.com",
  links: [
    { label: "Email", handle: "hrichamehra11@gmail.com", href: "mailto:hrichamehra11@gmail.com" },
    { label: "Résumé", handle: "download PDF", href: "/Hricha_Mehra_Resume.pdf" },
    { label: "GitHub", handle: "hricha11", href: "https://github.com/hricha11" },
    { label: "LinkedIn", handle: "hrichamehra", href: "https://www.linkedin.com/in/hrichamehra" },
    { label: "LeetCode", handle: "Hriii11", href: "https://leetcode.com/u/Hriii11/" },
    { label: "Instagram", handle: "@hricha_11", href: "https://www.instagram.com/hricha_11/" },
  ],
  lastUpdated: "2026-10-03",

  /* ---------------------------------------------------------------------- */
  about: {
    catalogue: "001",
    short: [
      "I’m a software engineer at HomeFirst Finance in Mumbai, and I learn by building things slightly too hard for me.",
      "I want to work where software engineering meets intelligent systems. Off screen, I run, read slowly, and write things down. This archive is where it all meets.",
    ],
  },

  /* The two wings of the archive: "work" is the notebook’s left page,
     "life" the right page. The index groups the same way. */
  wings: [
    { id: "work", label: "Wing A", title: "Professional", note: "what I’ve built, studied, and been trusted with", color: "var(--ink-slate)", petal: "var(--petal-blue)" },
    { id: "life", label: "Wing B", title: "Personal", note: "what I carry with me outside of work", color: "var(--ink-rose)", petal: "var(--petal-pink)" },
  ],

  /* The eight sections. Order within a wing = order in the contents.
     `color` is the section's ink and `petal` its pastel (see the --ink-* and
     --petal-* palettes in archive.css): together they tint that section's
     flower in the contents and every accent on its pages. */
  sections: [
    // ---- Wing A · Professional
    {
      id: "certifications", wing: "work", catalogue: "007", title: "Certifications", color: "var(--ink-ochre)", petal: "var(--petal-butter)",
      desc: "Learning milestones, framed on a gallery wall.",
      note: "less about the paper, more about the week after",
    },
    {
      id: "projects", wing: "work", catalogue: "012", title: "Personal Projects", color: "var(--ink-teal)", petal: "var(--petal-leaf)",
      desc: "Three things I built, documented as exhibits.",
      note: "built at odd hours",
      // its pages (one per published project) are listed from `projects` below
    },
    {
      id: "professional", wing: "work", catalogue: "020", title: "Professional Life", color: "var(--ink-slate)", petal: "var(--petal-blue)",
      desc: "Where I’ve worked, and what I built there.",
      note: "not a résumé, I promise",
      children: [
        { id: "hffc", title: "All HFFC projects", catalogue: "021" },
        { id: "chrysalis", title: "Chrysalis Technosoft", catalogue: "022" },
        { id: "tcet-erp", title: "TCET Open Source ERP", catalogue: "023" },
      ],
    },
    // HIDDEN for now , see HIDDEN_SECTIONS.md to bring it back
    // {
    //   id: "papers", wing: "work", catalogue: "027", title: "Research Papers Read", color: "var(--ink-plum)", petal: "var(--petal-lilac)",
    //   desc: "Annotated notes on papers that changed how I think.",
    //   note: "margins full of questions",
    // },

    // ---- Wing B · Personal
    {
      id: "did-right", wing: "life", catalogue: "030", title: "Things I Think I Did Right", color: "var(--ink-sage)", petal: "var(--petal-mint)",
      desc: "For the record: the prizes, roles and milestones so far.",
      note: "the honest list",
    },
    {
      id: "books", wing: "life", catalogue: "032", title: "Books", color: "var(--ink-rust)", petal: "var(--petal-pink)",
      desc: "A small library inside the museum.",
      note: "no star ratings here",
    },
    {
      id: "running", wing: "life", catalogue: "041", title: "Running", color: "var(--ink-terracotta)", petal: "var(--petal-peach)",
      desc: "An ongoing experiment in consistency.",
      note: "slow, mostly",
    },
    // HIDDEN for now , see HIDDEN_SECTIONS.md to bring it back
    // {
    //   id: "journaling", wing: "life", catalogue: "048", title: "My Love for Journaling", color: "var(--ink-rose)", petal: "var(--petal-mauve)",
    //   desc: "A personal archive. The pieces I chose to preserve.",
    //   note: "the quiet room",
    // },
  ],

  /* ---------------------------------------------------------------------- */
  certifications: {
    lede: "I’ve stopped thinking of certificates as proof. They’re closer to bookmarks: a record of the month I decided to take something seriously.",
    // `note`: what you think about it, written on the back of the frame.
    // Optional per item: image (a scan, e.g. "img/aws.jpg"), link (credential
    // URL), date ("2024-06") , they show up on the placard when filled in.
    items: [
      { title: "Machine Learning Specialization", issuer: "DeepLearning.AI (Andrew Ng)", image: "/img/certs/ml.jpg", link: "https://www.coursera.org/account/accomplishments/specialization/WQRP6TT4UB5F", date: "2024-12", note: "" },
      { title: "Full-Stack Development", issuer: "Angela Yu", image: "/img/certs/fullstack.jpg", link: "https://www.udemy.com/certificate/UC-bd1614c7-2d02-44f4-af74-cfa81203ac0d/", date: "2025-08", note: "" },
      { title: "AWS Cloud Practitioner Essentials", issuer: "Amazon Web Services", image: "/img/certs/aws.jpg", link: "https://drive.google.com/file/d/1PPcS1IWKxdJRglB30HEy-BEo2dckBdla/view?usp=sharing", date: "2026-07", note: "" },
      { title: "Meta Front-End Developer Certification", issuer: "Meta", image: "/img/certs/meta.jpg", link: "https://www.coursera.org/account/accomplishments/verify/B5O0579M1C9D", date: "2025-10", note: "" },
    ],
  },

  /* ---------------------------------------------------------------------- */
  didRight: {
    lede: "",
    // Reflections (title, when, text, optional note) go here when written.
    items: [] as { title: string; when: string; text: string; note?: string }[],
    // Achievements , shown under "For the record".
    // kind: "prize" gets a rosette; "role" and "count" are plain entries.
    record: [
      { kind: "prize", place: "1st Place", what: "Multicon 2026", detail: "paper presentation" },
      { kind: "prize", place: "1st Runner-Up", what: "HerSpark Ideathon", detail: "Aether 2025" },
      { kind: "prize", place: "2nd Place", what: "Multicon 2023", detail: "C/C++ workshop" },
      { kind: "role", place: "Webmaster", what: "CSI-TCET", detail: "" },
      { kind: "role", place: "Backend team", what: "TCET Open Source", detail: "" },
      { kind: "role", place: "Documentation team", what: "TCET Shastra", detail: "" },
      { kind: "count", place: "550+", what: "LeetCode problems solved", detail: "" },
    ],
    closing: "The things I got wrong are a different archive. I keep that one too.",
  },

  /* ---------------------------------------------------------------------- */
  /* Everything below is from the résumé. Optional fields on an exhibit
     (see the Project type at the top) only show when present. */
  projects: {
    lede: "Things I built on my own time, documented as exhibits.",
    // shown on an exhibit's label when it has no `note` of its own
    genericNote: "A personal project exploring the practical application of software engineering concepts through design, implementation, and iteration.",
    items: [
      {
        id: "agrolens",
        title: "AgroLens",
        subtitle: "AI-powered agriculture system",
        links: { repo: "https://github.com/hricha11/AgroLens" },
        highlight: "YOLOv8n: 88.0% F1 · 87.8% precision · 88.3% recall · 4 ms per image",
        materials: ["YOLOv8", "Faster R-CNN", "Grad-CAM", "FastAPI", "Python"],
        summary: "A weed detection system: a YOLOv8 model served through a FastAPI inference service and a mobile app that shows each detection with a bounding box and confidence score.",
        problem: "Weeds cause around 15–20% of crop yield loss every year, and controlling them costs farmers roughly ₹2,000–4,000 per acre. Can a model spot weeds in a field photo quickly and reliably enough to help?",
        training: [
          ["Preprocessing", "corrupted or noisy images removed, resized to 640 × 640, pixels normalised to 0–1, YOLO-format labels"],
          ["Augmentation", "horizontal and vertical flips, rotation, scaling, brightness, cropping"],
          ["Hardware", "Google Colab, single NVIDIA T4 GPU"],
          ["Batch size", "16"],
          ["Epochs", "20, with early stopping (patience 15)"],
          ["Loss", "box regression (CIoU) + objectness + classification (binary cross-entropy)"],
          ["Confidence threshold", "about 0.4–0.6, where the F1 curve peaks"],
        ],
        decisions: [
          { decision: "YOLOv8n over YOLOv8m and Faster R-CNN", why: "Faster R-CNN was the most precise (92%), but took about 120 ms per image; YOLOv8m took 21.8 ms. YOLOv8n ran at 4 ms with close to the same precision and recall, which makes it the one that can live on a phone or an edge device." },
          { decision: "Grad-CAM on every detection", why: "A farmer has no reason to trust a box on a photo. Heatmaps show the model is looking at leaf shape, edges and veins, not the soil, and they help us catch false positives." },
          { decision: "Favour recall over precision", why: "In a field, a missed weed costs more than a false alarm, so the threshold leans towards catching every weed." },
          { decision: "Roboflow instead of hand-rolled preprocessing", why: "Consistent formats and augmentation across iterations, without error-prone manual conversion." },
        ],
        challenges: [
          "Weeds and crops can look almost identical.",
          "The same plant looks different at different growth stages.",
          "Lighting, soil and weather change every photo.",
          "Class imbalance, handled with augmentation and class-weighted loss.",
          "Dense clusters of overlapping weeds, where single detections are still sometimes missed.",
        ],
        next: [
          "Export to ONNX / TensorRT and run on a Jetson or a Raspberry Pi with a Coral TPU, for drones and field cameras.",
          "Ship a quantized model inside the mobile app so it works offline.",
          "Retrain for other crops, such as maize or wheat, with transfer learning.",
          "Test on our own field dataset, photographed directly in fields, to close the gap between Weed25 and real conditions. Collection is underway.",
          "Add SHAP and LIME next to Grad-CAM, and spatial attention for dense weed clusters.",
        ],
        built: [
          "Developed a weed detection pipeline on the Weed25 dataset: 25 weed species, 7,656 training and 1,897 validation images.",
          "Performed hyperparameter tuning and benchmarked YOLOv8n, YOLOv8m and Faster R-CNN.",
          "Selected YOLOv8n for deployment, with real-time inference at 4 ms per image, and integrated Grad-CAM to visualise where the model looks.",
          "Built a FastAPI inference service exposing REST APIs for image upload and real-time predictions, and integrated it with a mobile app.",
        ],
        architecture: [
          { label: "Mobile app", note: "image upload" },
          { label: "FastAPI", note: "REST inference service" },
          { label: "YOLOv8n", note: "weed detection · 4 ms / image" },
          { label: "Grad-CAM", note: "attention maps" },
          { label: "Results", note: "bounding boxes · confidence scores" },
        ],
        dataset: [
          ["Dataset", "Weed25"],
          ["Source", "Roboflow, photos taken in natural light across field conditions"],
          ["Size", "9,553 images (7,656 training · 1,897 validation)"],
          ["Classes", "25 weed species"],
          ["Split", "80 : 20 train / validation"],
        ],
        model: "Benchmarked YOLOv8n, YOLOv8m and Faster R-CNN with hyperparameter tuning. YOLOv8n was selected for deployment for its accuracy and real-time speed (4 ms per image), with Grad-CAM explainability on top.",
        results: {
          note: "YOLOv8n, the deployed model. Inference runs in real time at 4 ms per image.",
          rows: [
            { label: "Recall", value: 88.3 },
            { label: "F1-score", value: 88.0 },
            { label: "Precision", value: 87.8 },
            { label: "mAP@0.5", value: 58.0 },
          ],
        },
        plates: [
          { caption: "YOLOv8n predictions: Asiatic Smartweed and Alligatorweed, with confidence scores", src: "/img/agrolens/predictions-smartweed.jpg" },
          { caption: "YOLOv8n predictions: Alligatorweed under changing light and clutter", src: "/img/agrolens/predictions-alligatorweed.jpg" },
          { caption: "Grad-CAM: the model looks at the central leaf structure, 74% sure of Alligatorweed", src: "/img/agrolens/gradcam-a.jpg" },
          { caption: "Grad-CAM: still finding the weed against bare soil and debris", src: "/img/agrolens/gradcam-b.jpg" },
          { caption: "Grad-CAM: leaf edges and veins pick out Black nightshade", src: "/img/agrolens/gradcam-c.jpg" },
          { caption: "Grad-CAM: a dense patch of overlapping weeds, each found", src: "/img/agrolens/gradcam-d.jpg" },
          { caption: "System architecture: from field photo to detection and explanation", src: "/img/agrolens/architecture.png" },
          { caption: "Training and validation curves over 20 epochs", src: "/img/agrolens/training-curves.png" },
          { caption: "Precision–recall curve, per weed class and on average", src: "/img/agrolens/precision-recall.png" },
          { caption: "F1–confidence curve: the best threshold sits around 0.4–0.6", src: "/img/agrolens/f1-confidence.png" },
        ],
      },
      {
        id: "finscope",
        title: "FinScope",
        subtitle: "Real-time finance engine + forecasting",
        links: { repo: "https://github.com/hricha11/FinScope" },
        materials: ["Spring Boot", "React", "MySQL", "Prophet", "JWT"],
        summary: "A personal finance engine: secure APIs for budgets and goals, Prophet forecasts of future spending, and live analytics dashboards.",
        problem: "Money moves in many small pieces: income, bills, budgets, goals. I wanted one place that keeps the balance honest and shows where spending is heading.",
        decisions: [
          { decision: "JWT, stateless authentication", why: "No sessions stored on the server, so it scales simply. Every token carries the userId, and every API checks it against the resource owner, which keeps each user’s data isolated." },
          { decision: "A relational database (MySQL)", why: "Transactions, budgets and goals are structured and related, and ACID matters for money. Each user has many transactions and goals, linked by userId." },
          { decision: "Atomic balance updates", why: "Each transaction insert and its balance update run inside a single MySQL transaction, so two transactions arriving at once can’t leave the balance wrong." },
          { decision: "Prophet in its own Python service", why: "Spending is aggregated into a time series (ds, y) and sent to Prophet, which is simple and handles seasonality well on small datasets." },
        ],
        challenges: [
          "Keeping the real-time balance correct under concurrent writes.",
          "Fetching large transaction histories quickly: pagination, indexes on userId and timestamp, and income / expense filters.",
          "Validating every input (@Valid, a central @ControllerAdvice) and returning clear status codes: 400, 401, 404.",
          "Hashing and salting passwords, and checking every request against the token’s userId.",
        ],
        next: [
          "Cache dashboard summaries and run forecasting asynchronously, so a slow model never blocks the API.",
          "Scale the API horizontally behind a load balancer, with read replicas for the database.",
        ],
        built: [
          "Built secure REST APIs for budget tracking and financial goal management, with JWT-based user data isolation.",
          "Integrated Prophet-based forecasting pipelines, trained on historical spending patterns, to predict future expenses.",
          "Developed analytics dashboards visualising category-wise spending, financial trends and live balance updates for personalised insights.",
        ],
        architecture: [
          { label: "React", note: "analytics dashboards" },
          { label: "Spring Boot", note: "REST APIs · JWT isolation" },
          { label: "MySQL", note: "budgets · goals · spending" },
          { label: "Prophet", note: "expense forecasting" },
        ],
        plates: [
          { caption: "The dashboard: monthly income, allocations, savings, a budget breakdown by category, goals and recent transactions", src: "/img/finscope/dashboard.png" },
        ],
      },
      {
        id: "freshpress",
        title: "FreshPress",
        subtitle: "Multi-source news aggregator",
        links: { demo: "https://fresh-press-orpin.vercel.app/" },
        materials: ["React", "Express", "RSS Parser", "SendGrid"],
        summary: "A news aggregator that pulls from four Indian newspapers in under a minute and emails a daily digest.",
        problem: "Information overload: to compare what different papers say, you open four apps. Aggregators like Inshorts summarise and hide the source; I wanted the source to come first.",
        decisions: [
          { decision: "RSS over news APIs or scraping", why: "News APIs are rate-limited, paid, or missing for many publishers; scraping breaks easily and sits in a legal grey zone. RSS is free, legal, simple and has no rate limit." },
          { decision: "Source-first design", why: "Filtering by newspaper lets readers compare what each major source is reporting, and in what tone." },
          { decision: "React + Tailwind, not Next.js", why: "There was no need for server-side rendering or SEO-heavy pages, and utility-first styling kept the UI fast to build and consistent." },
          { decision: "Vercel for the frontend, Render for the API", why: "Every push to main redeploys automatically: Vercel in seconds, Render in minutes. Secrets live in each platform’s environment variables, never in Git." },
        ],
        challenges: [
          "Normalising feeds that format the same fields differently. rss-parser turns raw XML into consistent JSON: title, summary, link, source, pubDate.",
          "Keeping the digest modular: news fetching and email sending are separate services, and the /send-digest route only orchestrates them.",
        ],
        next: [
          "Fetch feeds in the background every 30–60 seconds with node-cron and serve them from a Redis cache.",
        ],
        built: [
          "Built an RSS ingestion pipeline aggregating TOI, Indian Express, LiveMint and The Hindu with under 60 s latency.",
          "Integrated SendGrid email digests to deliver daily news summaries.",
          "Delivered a feature-complete UI with source filtering, preview summaries and mobile responsiveness.",
        ],
        architecture: [
          { label: "RSS feeds", note: "TOI · Indian Express · LiveMint · The Hindu" },
          { label: "Express", note: "ingestion · < 60 s latency" },
          { label: "React", note: "source filters · previews" },
          { label: "SendGrid", note: "daily email digests" },
        ],
        plates: [
          { caption: "The front page: live headlines from The Hindu, Indian Express, Times of India and LiveMint, filterable by source", src: "/img/freshpress/home.png" },
        ],
      },
    ] satisfies Project[] as Project[],
  },

  /* ---------------------------------------------------------------------- */
  professional: {
    lede: "Filed in the order they happened.",
    education: [
      { what: "B.E. Computer Engineering", where: "Mumbai University", detail: "CGPA 8.91 / 10", when: "2022 – 2026" },
      { what: "HSC", where: "CBSE", detail: "80.4%", when: "2022" },
      { what: "SSC", where: "ICSE", detail: "95.6%", when: "2020" },
    ],
    skills: [
      { group: "Languages", items: ["C++", "Python", "JavaScript"] },
      { group: "ML", items: ["YOLO", "CNNs", "Grad-CAM", "OpenCV", "Prophet"] },
      { group: "Backend", items: ["Node.js", "Express.js", "Spring Boot", "Socket.IO", "MongoDB", "MySQL"] },
      { group: "Frontend", items: ["React", "HTML", "CSS"] },
      { group: "Cloud", items: ["AWS", "Docker", "Salesforce"] },
      { group: "Tools", items: ["Git", "Postman", "Vercel", "Render"] },
      { group: "Core CS", items: ["DSA", "OOP", "DBMS"] },
    ],
    items: [
      {
        id: "tcet-erp",
        catalogue: "023",
        title: "TCET Open Source ERP",
        org: "TCET Open Source",
        period: "First year of engineering",
        role: "Backend team",
        systems: ["Node.js", "MongoDB", "Git"],
        what: "My first real codebase: the college’s open-source ERP, built by students.",
        built: [
          "Worked on a modular backend, including bulk attendance.",
          "Optimised MongoDB queries.",
        ],
        learned: [
          "I walked in knowing basic JavaScript and walked out understanding version control, maintainers and pull requests, and cross-team collaboration.",
          "Write modular code, keep Git discipline, and document clearly, so others can understand and extend your work.",
        ],
      },
      {
        id: "chrysalis",
        catalogue: "022",
        title: "Chrysalis Technosoft",
        org: "Chrysalis Technosoft",
        period: "Mar 2025 – Jun 2025",
        role: "Web Development Intern",
        systems: ["Node.js", "Express", "MongoDB", "JWT", "Socket.IO"],
        what: "Job247, a MERN hiring platform connecting recruiters and candidates. I worked on its backend.",
        platform: [
          "A job board built from scratch by a small team over a three-month internship: TypeScript, React, Node.js / Express, MongoDB and Socket.IO.",
          "Three roles (candidate, recruiter, admin) with role-based access.",
          "A tiered verification system for recruiters, based on email domain and company details; higher tiers unlock features like bulk job posting.",
          "Bulk job upload from CSV / Excel files, resume uploads, and pattern-based moderation that flags suspicious job posts for admin review.",
        ],
        challenges: [
          { problem: "Three months, and more good ideas than time", approach: "We cut down to the core features by asking two questions: would users immediately notice this missing, and does it give us an edge? That delivered a working platform with REST APIs, dashboards and role-based access on time." },
          { problem: "Usability versus feasibility", approach: "Listen to every idea, then agree on a simpler first version with a plan to grow it later." },
        ],
        hindsight: "I’d have prioritised resume parsing. It didn’t seem essential then, but it was a gateway to so much: skill extraction, automated matching.",
        built: [
          "Built backend services for Job247 with JWT-based authentication, email verification and role-based authorization.",
          "Implemented Socket.IO real-time channels for instant recruiter–candidate updates, reducing latency.",
        ],
      },
      {
        id: "hffc",
        catalogue: "021",
        title: "All HFFC projects",
        org: "HomeFirst Finance Company India Ltd.",
        period: "Jan 2026 – Present",
        role: "Software Engineer",
        systems: ["Salesforce", "Apex", "SOQL", "Playwright", "TypeScript", "Logistic Regression"],
        what: "Four projects so far at HomeFirst Finance: UI test automation, an in-house loan origination system, access auditing, and test-data automation.",
        built: [] as string[],
        subprojects: [
          {
            title: "LMS UI Test Automation",
            points: [
              "Built a black-box Playwright + TypeScript suite for the Loan Management System’s Salesforce screens: about 560 tests across 14 stages, from contract creation to closure.",
              "Mirrored the QA workbook step by step, with scripts that write each run’s results back into it.",
              "Added an end-to-end flow that takes one loan through its whole life, checking amounts and the repayment schedule after every step. Sandbox-only by design.",
            ],
          },
          {
            title: "Loan Origination System",
            points: [
              "Designed an in-house Loan Origination System with automated amortization schedule generation, removing the dependency on external Loan Management Systems.",
              "Developed a Logistic Regression credit risk model to predict Probability of Default, covering preprocessing, feature engineering and evaluation for underwriting decisions, and integrated it into the workflow.",
              "Built a secure Aadhaar data masking pipeline for sensitive customer information, meeting regulatory compliance while keeping the data usable downstream.",
            ],
          },
          {
            title: "Security Control Center",
            points: [
              "Designed a centralised access-control auditing framework that runs periodic org-wide scans.",
              "Used dynamic SOQL on metadata to resolve each user’s effective permissions accurately, giving clear visibility into who can access what.",
            ],
          },
          {
            title: "Test Data Generator",
            points: [
              "Engineered an Apex-based test-data automation framework that generates dependency-aware datasets across 20+ objects, streamlining test-data generation and execution.",
              "Designed a layer that turns a testing requirement into an executable data-generation configuration.",
            ],
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  books: {
    lede: "My shelf so far, in order. Notes will come book by book. If you’ve read one of these, I’d genuinely like to hear what you thought.",
    // Title and author, plus category and genres where known. `cover` is the
    // spine colour, matched to the book's best-known edition , change freely.
    // `pages` and `height` (mm, trim size) size the spine in true proportion.
    // `highlights`: passages you marked, shown on the open book with page numbers.
    // `shelf: "childhood"` files a book on the “Childhood books I remember reading” shelf. Optional per
    // book, shown on its card when filled in: read ("2025-03"), note, key
    // ("the idea I kept thinking about"), stayed ("what stayed with me").
    items: [
      { title: "The Diary of a Young Girl", author: "Anne Frank", cover: "#C2432F", pages: 352, height: 198, stayed: "Every time I read it, I notice different parts of her story. I first read it in 2020, stuck inside my own house, too young to understand what was happening in her world, or in mine. All I saw was her growing up, and her dreams. Now, knowing more about the fascist regime, it reads completely differently." },
      { title: "The Last Queen", author: "Chitra Banerjee Divakaruni", cover: "#7A1F2B", pages: 368, height: 216, stayed: "Beautiful writing, and such a fun way to learn the history of Punjab. I cried, I got furious, and I enjoyed every bit of it all the way through." },
      { title: "Why I Am an Atheist and Other Works", author: "Bhagat Singh", cover: "#B3261E", pages: 120, height: 198, stayed: "It felt like an honour to meet someone so selfless, so much larger than life, through his own letters. A man of principle and nuance, he lived more in 23 years than I could find the courage to in aeons." },
      { title: "The Forest of Enchantments", author: "Chitra Banerjee Divakaruni", category: "Fiction", genres: ["Mythological Fiction"], cover: "#1F4D3A", pages: 380, height: 222, stayed: "Lovely, I love fresh perspectives on the classics. Seeing Sita drawn so richly, as a princess trained in medicine and combat, gave me so much joy." },
      { title: "Yesteryear", author: "Caro Claire Burke", cover: "#E8B8B0", pages: 336, height: 234, stayed: "Natalie never asked what she wanted, only what she should want. She measured the worst version of a modern woman’s life against the best version of a traditional one, and quietly edited parts of herself to fit the mould." },
      { title: "The Will to Change", author: "bell hooks", cover: "#C8553D", pages: 208, height: 210, stayed: "Loved it. The kind of book that widens your awareness and leaves you a little more empathetic." },
      { title: "The Liberation of Sita", author: "Volga", category: "Fiction", genres: ["Feminist Mythological Fiction"], cover: "#C0502A", pages: 144, height: 198, stayed: "A fresh, beautiful retelling that turns the women of the story into far more than props. I could spend hours discussing it." },
      { title: "Selfish, Shallow, and Self-Absorbed", author: "Meghan Daum", cover: "#F2E6DC", pages: 272, height: 210, stayed: "Most of the writers seem a little sad. Good food for thought.", read: "2026-06", highlights: [{ text: "People who want children are all alike. People who don’t want children don’t want them in their own ways.", page: 6 }, { text: "ricocheted", page: 8 }, { text: "We would gape, shocked that she didn’t consider us all a single being, like a grove of aspens is said to be. Then we would resume our tugging.", page: 14 }, { text: "I’m not sure my life needs redemption.", page: 74 }, { text: "The perfect life, the perfect lie … is one which prevents you from doing that which you would ideally have done (painted, say, or written unpublishable poetry) but which, in fact, you have no wish to do. People need to feel that they have been…", page: 158 }] },
      { title: "The Bell Jar", author: "Sylvia Plath", category: "Fiction", genres: ["Literary Fiction", "Psychological Classic"], cover: "#22333B", pages: 244, height: 198, stayed: "Who am I to rate her writing? Calling it relatable is the worst thing you can say about your mental health, but it was. So little has truly changed; the women who came before me felt this too, and made it art." },
      { title: "Four Thousand Weeks", author: "Oliver Burkeman", cover: "#E9B949", pages: 288, height: 216, stayed: "Maybe we don’t really understand what “life is short” means." },
      { title: "The Housemaid", author: "Freida McFadden", category: "Thriller", genres: ["Psychological Thriller", "Domestic Suspense"], cover: "#2B2B2E", pages: 336, height: 198, stayed: "The twist is amazing, and I loved the moral greyness of every single character." },
      { title: "The Secret", author: "Rhonda Byrne", cover: "#C9A874", pages: 198, height: 229, stayed: "A thin line between manifesting and toxic positivity, if I can’t acknowledge what’s wrong, where do I begin? It did send me off to read about quantum physics, though." },
      { title: "The Prophet", author: "Khalil Gibran", cover: "#3B2F2A", pages: 107, height: 198, read: "2026-03", highlights: [{ text: "Your pain is the breaking of the shell that encloses your understanding.", page: 21 }, { text: "For what is evil but good tortured by its own hunger and thirst?", page: 25 }, { text: "For life and death are one, even as the river and the sea are one.", page: 30 }] },
      { title: "Letters to a Young Poet", author: "Rainer Maria Rilke", cover: "#E8DFCB", pages: 96, height: 178, read: "2026-02", highlights: [{ text: "German", page: 6 }, { text: "You are looking to the outside, and that above all you should not be doing now.", page: 23 }, { text: "Go into yourself. Examine the reason that bids you to write; check whether it reaches its roots into the deepest region of your heart, admit to yourself whether you would die if it should be denied you to write.", page: 23 }, { text: "Then try, like the first human being, to say what you see and experience and love and lose.", page: 24 }, { text: "…depict your sadnesses and desires, passing thoughts and faith in some kind of beauty – depict all this with intense, quiet, humble sincerity and make use of whatever you find about you to express yourself, the images from your dreams and the things in your memory.", page: 24 }, { text: "And even if you were in a prison whose walls did not let any of the sounds of the world outside reach your senses – would you not have your childhood still, this marvellous, lavish source, this treasure-house of memories? Turn your attention towards that.", page: 24 }, { text: "…examine the depths from which your life springs; at its source you will find the answer to the question of whether you have to write.", page: 25 }, { text: "Irony: don’t let yourself be ruled by it, especially not in uncreative moments. In creative ones try to make use of it as one means among many to get a grasp on life.", page: 27 }, { text: "…if you fear your intimacy is growing too much, then turn towards great and serious subjects…", page: 27 }, { text: "To be an artist means: not to calculate and count; to grow and ripen like a tree which does not hurry the flow of its sap and stands at ease in the spring gales without fearing that no summer may follow.", page: 30 }, { text: "Live the questions for now. Perhaps then you will gradually, without noticing it, live your way into the answer, one distant day in the future.", page: 34 }, { text: "Love between one person and another: that is perhaps the hardest thing it is laid on us to do, the utmost, the ultimate trial and test, the work for which all other work is just preparation.", page: 46 }] },
      { title: "Visual Intelligence", author: "Amy E. Herman", category: "Non-fiction", genres: ["Observation", "Critical Thinking"], cover: "#2F6FB0", pages: 320, height: 216, stayed: "Loved it. A new lens to see the world through, it made me appreciate art more.", read: "2026-02", key: "The world is full of magic things, patiently waiting for our senses to grow sharper.", highlights: [{ text: "…and which leg she is leading with.", page: 43 }, { text: "…height based on the comparison of the woman…", page: 43 }, { text: "To mine the most information possible, don’t close your eyes to anything, even someone else’s subjectivity.", page: 69 }, { text: "Yellow bruises typically indicate that at least eighteen hours have passed since the initial impact.", page: 94 }, { text: "Being an artist is not just about what happens when you are in the studio. The way you live, the people you choose to love and the way you love them…", page: 201 }, { text: "We must decide ahead of time which words we will use when communicating to make sure we are painting the most accurate picture possible.", page: 202 }, { text: "Instead of saying “never” or “always,” give a concrete, definitive number. If that isn’t possible, it is better to use “frequently” or “seldom.”", page: 204 }, { text: "Instead of saying “actually,” try using “I don’t believe . . .”", page: 204 }, { text: "Rather than calling an employee’s quarterly sales “terrible,” use indisputable facts: “You missed your sales quota by 30 percent.”", page: 205 }, { text: "Instead of “This doesn’t work for me,” use “What if you tried . . . ?” or better yet, include yourself in the team with “Why don’t we try . . . ?”", page: 205 }, { text: "…indigo or cobalt or ultramarine.", page: 205 }, { text: "They try to wing it, and find they’ve run out of material in 30 seconds. I’ve also seen shy people take the time to prepare and practice, and then deliver moving, funny, impactful messages in a way that influences audiences and advances their own agendas.", page: 213 }] },
      { title: "The Skincare Bible", author: "Anjali Mahto", cover: "#F1B7B5", pages: 368, height: 234 },
      { title: "How to Know a Person", author: "David Brooks", category: "Non-fiction", genres: ["Psychology", "Communication", "Relationships"], cover: "#E8D34A", pages: 320, height: 234 },
      { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", cover: "#E8662A", pages: 224, height: 216, stayed: "Its idea: care about the big things and you won’t have time for the small ones. I’m not sure that’s how it works." },
      { title: "Atlas of the Heart", author: "Brené Brown", category: "Non-fiction", genres: ["Psychology", "Emotional Intelligence"], cover: "#3E7C8C", pages: 336, height: 234, stayed: "As someone who feels a lot, I’d read this again and again." },
      { title: "The Art of Spending Money", author: "Morgan Housel", category: "Non-fiction", genres: ["Personal Finance", "Behavioral Economics"], cover: "#2E5E4E", pages: 240, height: 216, stayed: "A lot of food for thought, at just the right time in my life. I’d reread it." },
      { title: "The Universe Has Your Back", author: "Gabrielle Bernstein", cover: "#9CC6E0", pages: 240, height: 216, stayed: "Too generic for me, half-formed ideas and anecdotes, with little research behind them." },
      { title: "Mastery", author: "Robert Greene", category: "Non-fiction", genres: ["Self-help", "Psychology", "Career"], cover: "#1C1C1C", pages: 352, height: 229 },
      { title: "How to Live", author: "Derek Sivers", cover: "#F2B134", pages: 128, height: 198 },
      { title: "Things My Son Needs to Know about the World", author: "Fredrik Backman", cover: "#3A6EA5", pages: 112, height: 190 },
      { title: "The Hard Questions", author: "Susan Piver", cover: "#EFE3D3", pages: 128, height: 178 },
      { title: "Simple Passion", author: "Annie Ernaux", cover: "#E9E7E2", pages: 64, height: 178 },
      { title: "Strange Pictures", author: "Uketsu", cover: "#D9D2C0", pages: 256, height: 198, stayed: "Eerie from start to finish, and cleverly plotted. The prose is a little plain, but it pulls you completely into its world." },
      { title: "Three Thousand Stitches", author: "Sudha Murty", category: "Non-fiction", genres: ["Memoir", "Inspirational Essays"], cover: "#E5A13B", pages: 176, height: 198, stayed: "Calm and quietly moving. Her values, her empathy and her instinct to help those in need stayed with me, it feels like a small piece of Sudha Murty’s mind." },
      { title: "The Agony of Eros", author: "Byung-Chul Han", cover: "#D24D57", pages: 72, height: 178 },
      { title: "The Inheritance", author: "Trisha Sakhlecha", category: "Thriller", genres: ["Mystery", "Family Drama"], cover: "#5A1E24", pages: 336, height: 198, stayed: "A true page-turner, well written, full of turns I didn’t see coming. A must-read." },
      { title: "The Little Prince", author: "Antoine de Saint-Exupéry", cover: "#2D5DA1", pages: 96, height: 190, shelf: "childhood" },
      { title: "Siddhartha", author: "Hermann Hesse", category: "Fiction", genres: ["Philosophical Fiction", "Classic"], cover: "#D9822B", pages: 152, height: 198 },
      { title: "Ikigai", author: "Héctor García & Francesc Miralles", cover: "#D64933", pages: 208, height: 190 },
      { title: "The Seven Year Slip", author: "Ashley Poston", cover: "#F2B8C6", pages: 352, height: 210, stayed: "A great concept and beautiful writing, but I never quite fell in love with it." },
      { title: "Magnolia Parks", author: "Jessa Hastings", cover: "#F4A9B8", pages: 512, height: 216, stayed: "More drama than it needed, everything that could go wrong, does." },
      { title: "The Luck Factor", author: "Richard Wiseman", category: "Non-fiction", genres: ["Psychology", "Self-help"], cover: "#3E8E41", pages: 288, height: 198, stayed: "Its case for being social and positive felt repetitive at the time, but looking back, it’s one of those books that quietly changes something in you." },
      { title: "The Queen", author: "Kiera Cass", cover: "#7E2F5C", pages: 80, height: 198, shelf: "childhood" },
      { title: "Verity", author: "Colleen Hoover", category: "Thriller", genres: ["Psychological Thriller", "Romantic Suspense"], cover: "#1E1E24", pages: 336, height: 210 },
      { title: "Evidence of the Affair", author: "Taylor Jenkins Reid", cover: "#C9485B", pages: 64, height: 190 },
      { title: "The Silent Patient", author: "Alex Michaelides", category: "Thriller", genres: ["Psychological Thriller"], cover: "#1F3B4D", pages: 352, height: 198, stayed: "I never quite understood one of Theo’s choices, but he made it, and the story runs on it." },
      { title: "Carrie Soto Is Back", author: "Taylor Jenkins Reid", category: "Fiction", genres: ["Sports Fiction", "Literary Fiction"], cover: "#D1392F", pages: 384, height: 216, stayed: "Like every Taylor Jenkins Reid book, I loved it. I have no interest in tennis, yet it’s written so anyone can enjoy it, real, gripping and well-structured, and it comes full circle. She needed to come out of retirement to grow the beautiful way she did." },
      { title: "All the Lovers in the Night", author: "Mieko Kawakami", cover: "#F2C12E", pages: 224, height: 210, stayed: "Poetic, yes, but mostly just very sad and bleak. I don’t have much more to say about it." },
      { title: "Never Lie", author: "Freida McFadden", category: "Thriller", genres: ["Psychological Thriller", "Mystery"], cover: "#5B7FA6", pages: 320, height: 198, stayed: "Thrilling throughout, genuinely unpredictable and very well written, with consistent characters. A couple of choices near the end didn’t quite sit right with me, but it’s a great read." },
      { title: "Untamed", author: "Glennon Doyle", cover: "#F3B23A", pages: 352, height: 229, stayed: "It started off strong and I loved the early chapters, but it grows repetitive and could have been half the length. At times the author’s framing of herself didn’t land for me." },
      { title: "Metamorphosis", author: "Franz Kafka", cover: "#3F5E3A", pages: 112, height: 190 },
      { title: "Veronika Decides to Die", author: "Paulo Coelho", category: "Fiction", genres: ["Philosophical Fiction", "Psychological Drama"], cover: "#3C6E8F", pages: 224, height: 198 },
      { title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni", category: "Fiction", genres: ["Mythological Fiction", "Historical Fiction"], cover: "#A11D2A", pages: 360, height: 216, stayed: "Panchaali’s rebellion and her undying questions, I loved watching her live with passion and conviction. A consistent, well-built character, flaws and strengths alike. A great read." },
      { title: "After I Do", author: "Taylor Jenkins Reid", cover: "#7FB2D6", pages: 352, height: 210 },
      { title: "Harry Potter and the Philosopher’s Stone", author: "J.K. Rowling", cover: "#B22222", pages: 336, height: 198, shelf: "childhood" },
      { title: "A Good Girl’s Guide to Murder", author: "Holly Jackson", cover: "#F0ECE4", pages: 400, height: 198, shelf: "childhood" },
      { title: "Malibu Rising", author: "Taylor Jenkins Reid", category: "Fiction", genres: ["Historical Fiction", "Family Drama"], cover: "#F08A5D", pages: 384, height: 216 },
      { title: "Better Than the Movies", author: "Lynn Painter", cover: "#E8546B", pages: 368, height: 210, stayed: "Light-hearted, funny and predictable in the most comforting way, it ends exactly how you want it to. A warm hug, or cotton candy." },
      { title: "The Meek One", author: "Fyodor Dostoevsky", cover: "#2A2A2A", pages: 80, height: 178, stayed: "Nothing really gripped me. Very open-ended, and I struggled to understand why the characters behaved the way they did." },
      { title: "One True Loves", author: "Taylor Jenkins Reid", cover: "#8EC5E8", pages: 352, height: 210 },
      { title: "The Alchemist", author: "Paulo Coelho", cover: "#E0A43A", pages: 208, height: 198 },
      { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", cover: "#9E2A2B", pages: 320, height: 193, shelf: "childhood" },
      { title: "The Fault in Our Stars", author: "John Green", cover: "#2C6FB7", pages: 320, height: 203, shelf: "childhood" },
      { title: "Everything I Know About Love", author: "Dolly Alderton", category: "Memoir", genres: ["Coming-of-age", "Relationships", "Personal Essays"], cover: "#E8475A", pages: 336, height: 198, stayed: "A comforting read that felt like a warm hug. I related to all the complicated feelings of growing older, and to the love she has for her friends." },
      { title: "Daisy Jones & The Six", author: "Taylor Jenkins Reid", category: "Fiction", genres: ["Historical Fiction", "Music", "Literary Fiction"], cover: "#D9A441", pages: 368, height: 210, stayed: "Absolutely loved it, all the drama, and the moral ambiguity was amazing." },
      { title: "Percy Jackson & the Olympians: The Lightning Thief", author: "Rick Riordan", category: "Fiction", genres: ["Fantasy", "Young Adult", "Greek Mythology", "Adventure"], cover: "#2E6DB4", pages: 377, height: 203, shelf: "childhood" },
      { title: "Percy Jackson & the Olympians: The Sea of Monsters", author: "Rick Riordan", category: "Fiction", genres: ["Fantasy", "Young Adult", "Greek Mythology", "Adventure"], cover: "#C0392B", pages: 279, height: 203, shelf: "childhood" },
      { title: "Percy Jackson & the Olympians: The Titan's Curse", author: "Rick Riordan", category: "Fiction", genres: ["Fantasy", "Young Adult", "Greek Mythology", "Adventure"], cover: "#5B4B8A", pages: 312, height: 203, shelf: "childhood" },
      { title: "Percy Jackson & the Olympians: The Battle of the Labyrinth", author: "Rick Riordan", category: "Fiction", genres: ["Fantasy", "Young Adult", "Greek Mythology", "Adventure"], cover: "#D9772B", pages: 361, height: 203, shelf: "childhood" },
      { title: "Percy Jackson & the Olympians: The Last Olympian", author: "Rick Riordan", category: "Fiction", genres: ["Fantasy", "Young Adult", "Greek Mythology", "Adventure"], cover: "#A82C2C", pages: 381, height: 203, shelf: "childhood" },
      { title: "My Life in Full", author: "Indra Nooyi", category: "Non-fiction", genres: ["Memoir", "Leadership", "Business"], cover: "#F2E8D8", pages: 320, height: 234 },
      { title: "The Mountain Is You", author: "Brianna Wiest", category: "Non-fiction", genres: ["Self-help", "Psychology", "Emotional Growth"], cover: "#6E8FB0", pages: 240, height: 190 },
      { title: "1984", author: "George Orwell", category: "Fiction", genres: ["Dystopian", "Political Fiction", "Science Fiction"], cover: "#B01F1F", pages: 328, height: 198 },
      { title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", category: "Fiction", genres: ["Historical Fiction", "LGBTQ+", "Literary Fiction"], cover: "#1E5E4A", pages: 400, height: 210 },
      { title: "101 Essays That Will Change the Way You Think", author: "Brianna Wiest", cover: "#EDE6DA", pages: 448, height: 216, stayed: "Loved it, and would recommend it. It teaches the importance of noticing things.", read: "2026-04", highlights: [{ text: "…organize, cultivate, teach, practice, habituate and pass down a world suited for our survival.", page: 6 }, { text: "Your brain can only perceive what it’s known, so when you choose what you want for the future, you’re actually just recreating a solution or an ideal of the past.", page: 8 }, { text: "Accomplishing goals is not success. How much you expand in the process is.", page: 9 }, { text: "Fear = interest.", page: 9 }, { text: "If you want to change your beliefs, go out and have experiences that make them real to you. Not the opposite way around.", page: 10 }, { text: "The things you love about others are the things you love about yourself. The things you hate about others are the things you cannot see in yourself.", page: 11 }, { text: "Happiness, we infer, comes from the perpetual seeking of “more,” regardless what it’s “more” of.", page: 13 }, { text: "Happiness is not experiencing something else; it’s continually experiencing what you already have in new and different ways.", page: 14 }] },
      { title: "Cleopatra and Frankenstein", author: "Coco Mellors", category: "Fiction", genres: ["Literary Fiction", "Romance"], cover: "#F3C94B", pages: 384, height: 216, read: "2026-06", highlights: [{ text: "What men feared most was pity, and what women feared most was envy. And it resonated with me. For a guy envy can be empowering, but for a girl it just means you’re going to get attacked or excluded.", page: 94 }] },
    ] as { title: string; author: string; shelf?: "childhood"; cover?: string; pages?: number; height?: number; highlights?: { text: string; page?: number }[]; category?: string; genres?: string[]; read?: string; topic?: string; note?: string; key?: string; stayed?: string }[],
  },

  /* ---------------------------------------------------------------------- */
  running: {
    // From my Strava export (36 runs, 8 Feb – 5 Sep 2026). Re-export and update
    // these numbers by hand; nothing here is fetched live.
    since: "Feb 2026",
    stats: [
      { label: "Fastest 5K", value: "43:01", note: "Jun 2026" },
      { label: "Longest run", value: "10", unit: "km", note: "my first 10K · May 2026" },
      { label: "Total distance", value: "83.4", unit: "km" },
      { label: "Runs logged", value: "36" },
      { label: "Best month", value: "53.3", unit: "km", note: "May 2026 · 18 runs" },
    ],
    hypothesis: [
      ["Hypothesis", "Consistency beats intensity."],
      ["Method", "Log every run on Strava. Any distance, any pace: one kilometre still counts."],
      ["What happened", "May: 18 runs, 53 km, a first 5K and a first 10K. Then it slipped."],
      ["Status", "Starting over."],
    ] as [string, string][],
    // Kilometres per month, starting February 2026.
    monthly: [8.4, 1.0, 5.0, 53.3, 11.0, 1.0, 0.7, 3.0],
    monthlyStart: "2026-02",
    chartNote: "May was the month it clicked",
    timeline: [
      { date: "2026-02-08", text: "First run: 1.05 km. I called it “First Run”." },
      { date: "2026-03-21", text: "One run all month, 1 km, titled “Better than nothing 💀”." },
      { date: "2026-05-16", text: "First 5K, listening to The Bell Jar by Sylvia Plath." },
      { date: "2026-05-25", text: "First 10K, in 1:33:25." },
      { date: "2026-05-31", text: "18 runs and 53 km in one month. Finished Strava’s May Ten Days Active and 400-minute challenges." },
      { date: "2026-06-13", text: "Fastest 5K so far: 43:01." },
      { date: "2026-07-12", text: "One kilometre, titled “starting over?”" },
      { date: "2026-09-05", text: "3 km, titled “yup lost touch”. Picking it back up." },
    ],
    // the latest runs, newest first
    recent: [
      { date: "2026-09-05", name: "yup lost touch", km: "3.00", time: "24:45", pace: "8:15" },
      { date: "2026-08-22", name: "Evening Run", km: "0.67", time: "5:42", pace: "8:30" },
      { date: "2026-07-12", name: "starting over?", km: "1.00", time: "8:50", pace: "8:50" },
      { date: "2026-06-20", name: "Evening Run", km: "1.00", time: "7:43", pace: "7:43" },
      { date: "2026-06-13", name: "Evening Run", km: "5.00", time: "43:01", pace: "8:36" },
    ],
  },
};
