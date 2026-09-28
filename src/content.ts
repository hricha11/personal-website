/* ==========================================================================
   THE ARCHIVE , content
   --------------------------------------------------------------------------
   Everything written on the site lives in this file. Edit freely; the pages
   in src/pages only read from here.

   Certifications, projects, professional life and achievements come from
   the résumé, which is the source of truth. Books, running, papers and the
   journal are still DRAFTS written to show the shape of each section ,
   replace them with the real thing before publishing.
   ========================================================================== */

export const ARCHIVE = {
  owner: "Hricha Mehra",
  tagline: "a collection of things I’ve built, learned, read, run, and written",
  opening: {
    subtitle: "notes from a life in progress",
  },
  // Contact , shown on the notebook's inside cover and the contents page.
  // The email is also used by “Talk to me about this book”.
  email: "hrichamehra11@gmail.com",
  links: [
    { label: "Email", handle: "hrichamehra11@gmail.com", href: "mailto:hrichamehra11@gmail.com" },
    { label: "LeetCode", handle: "Hriii11", href: "https://leetcode.com/u/Hriii11/" },
    { label: "GitHub", handle: "hricha11", href: "https://github.com/hricha11" },
    { label: "Instagram", handle: "@hricha_11", href: "https://www.instagram.com/hricha_11/" },
  ],
  lastUpdated: "2026-09-28",

  /* ---------------------------------------------------------------------- */
  about: {
    catalogue: "001",
    short: [
      "I’m a software engineer who learns by building things slightly too hard for me.",
      "Off screen, I run, read slowly, and write things down. This archive is where it all meets.",
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
      children: [
        { id: "agrolens", title: "AgroLens", catalogue: "014" },
        { id: "finscope", title: "FinScope", catalogue: "015" },
        { id: "freshpress", title: "FreshPress", catalogue: "016" },
      ],
    },
    {
      id: "professional", wing: "work", catalogue: "020", title: "Professional Life", color: "var(--ink-slate)", petal: "var(--petal-blue)",
      desc: "Where I’ve worked, and what I built there.",
      note: "not a résumé, I promise",
      children: [
        { id: "hhfc", title: "All HHFC projects", catalogue: "021" },
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
      desc: "Decisions I’m glad I made , and, for the record, the prizes.",
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
     (architecture, dataset, model, results, plates) only show when present. */
  projects: {
    lede: "Things I built on my own time, documented as exhibits.",
    items: [
      {
        id: "agrolens",
        exhibit: "01",
        catalogue: "014",
        title: "AgroLens",
        subtitle: "AI-powered agriculture system",
        materials: ["YOLOv8", "Faster R-CNN", "Grad-CAM", "FastAPI", "Python"],
        summary: "A weed detection system: a YOLOv8 model served through a FastAPI inference service and a mobile app that shows each detection with a bounding box and confidence score.",
        built: [
          "Developed a weed detection pipeline on the Weed25 dataset, with an 80:10:10 train–validation–test split for training and evaluation.",
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
          ["Size", "9,000+ field images"],
          ["Classes", "25 weed classes"],
          ["Split", "80 : 10 : 10 train / validation / test"],
        ],
        model: "Benchmarked YOLOv8n, YOLOv8m and Faster R-CNN with hyperparameter tuning. YOLOv8n was selected for deployment for its accuracy and real-time speed (4 ms per image), with Grad-CAM explainability on top.",
        results: {
          note: "YOLOv8n, the deployed model. Inference runs in real time at 4 ms per image.",
          rows: [
            { label: "mAP@0.5", value: 91.1 },
            { label: "Recall", value: 88.3 },
            { label: "F1-score", value: 88.0 },
            { label: "Precision", value: 87.8 },
          ],
        },
        plates: [
          { caption: "Detection result with bounding boxes and confidence scores", src: "" },
          { caption: "Grad-CAM attention map", src: "" },
        ],
      },
      {
        id: "finscope",
        exhibit: "02",
        catalogue: "015",
        title: "FinScope",
        subtitle: "Real-time finance engine + forecasting",
        materials: ["Spring Boot", "React", "MySQL", "Prophet", "JWT"],
        summary: "A personal finance engine: secure APIs for budgets and goals, Prophet forecasts of future spending, and live analytics dashboards.",
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
      },
      {
        id: "freshpress",
        exhibit: "03",
        catalogue: "016",
        title: "FreshPress",
        subtitle: "Multi-source news aggregator",
        materials: ["React", "Express", "RSS Parser", "SendGrid"],
        summary: "A news aggregator that pulls from four Indian newspapers in under a minute and emails a daily digest.",
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
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  professional: {
    lede: "Filed in the order they happened.",
    items: [
      {
        id: "tcet-erp",
        catalogue: "023",
        title: "TCET Open Source ERP",
        org: "TCET Open Source",
        period: "",
        role: "Backend team",
        systems: [] as string[],
        what: "",
        built: [] as string[],
      },
      {
        id: "chrysalis",
        catalogue: "022",
        title: "Chrysalis Technosoft",
        org: "Chrysalis Technosoft",
        period: "Mar 2025 – Jun 2025",
        role: "Web Development Intern",
        systems: ["Node.js", "JWT", "Socket.IO"],
        what: "Backend services for Job247.",
        built: [
          "Built backend services for Job247 with JWT-based authentication, email verification and role-based authorization.",
          "Implemented Socket.IO real-time channels for instant recruiter–candidate updates, reducing latency.",
        ],
      },
      {
        id: "hhfc",
        catalogue: "021",
        title: "All HHFC projects",
        org: "HHFC",
        period: "",
        role: "",
        systems: ["Logistic Regression"],
        what: "",
        built: [] as string[],
        subprojects: [
          {
            title: "Loan Origination System",
            points: [
              "Designed an in-house Loan Origination System with automated amortization schedule generation, removing the dependency on external Loan Management Systems.",
              "Developed a Logistic Regression credit risk model to predict Probability of Default, covering preprocessing, feature engineering and evaluation for underwriting decisions, and integrated it into the workflow.",
              "Built a secure Aadhaar data masking pipeline for sensitive customer information, meeting regulatory compliance while keeping the data usable downstream.",
            ],
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  papers: {
    lede: "Papers I’ve read properly , slowly, with a pencil. The notes are more about what changed in my head than about the paper itself.",
    items: [
      {
        id: "mohanty-2016",
        title: "Using Deep Learning for Image-Based Plant Disease Detection",
        authors: "Sharada P. Mohanty, David P. Hughes, Marcel Salathé",
        year: 2016, venue: "Frontiers in Plant Science", topic: "Computer vision",
        why: "It’s the paper behind PlantVillage, the dataset I started Agnolense with.",
        core: "CNNs trained on a large, labelled set of leaf images can classify 26 diseases across 14 crops with very high accuracy.",
        insight: "The authors themselves note that accuracy drops sharply on images taken in different conditions. I read that sentence and ignored it. I shouldn’t have.",
        changed: "Limitations sections are the most important part of a paper.",
        questions: "How much field data is enough to close the gap? Is there a principled way to know?",
        related: ["agnolense"],
      },
      {
        id: "gradcam-2017",
        title: "Grad-CAM: Visual Explanations from Deep Networks via Gradient-based Localization",
        authors: "Ramprasaath R. Selvaraju, Michael Cogswell, Abhishek Das, et al.",
        year: 2017, venue: "ICCV", topic: "Interpretability",
        why: "I needed to know what my model was actually looking at.",
        core: "Use the gradients flowing into the last convolutional layer to produce a heatmap of the regions that mattered for a prediction.",
        insight: "A model can be right for the wrong reasons, and accuracy alone will never tell you.",
        changed: "I now treat explanation tools as debugging tools, not presentation tools.",
        questions: "How reliable are these heatmaps themselves? When do they mislead?",
        related: ["agnolense"],
      },
      {
        id: "efficientnet-2019",
        title: "EfficientNet: Rethinking Model Scaling for Convolutional Neural Networks",
        authors: "Mingxing Tan, Quoc V. Le",
        year: 2019, venue: "ICML", topic: "Computer vision",
        why: "I needed a model small enough to run on an old phone.",
        core: "Scale depth, width and resolution together with a fixed ratio, rather than scaling one dimension at a time.",
        insight: "Bigger isn’t the only direction. Balanced often beats bigger.",
        changed: "I started thinking about the deployment target before choosing an architecture.",
        questions: "How do these scaling rules change when the input data is very different from ImageNet?",
        related: ["agnolense"],
      },
      {
        id: "resnet-2015",
        title: "Deep Residual Learning for Image Recognition",
        authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
        year: 2015, venue: "CVPR", topic: "Computer vision",
        why: "Everything I read referenced it. I wanted to understand why.",
        core: "Let layers learn a residual on top of an identity shortcut, which makes very deep networks trainable.",
        insight: "Sometimes the breakthrough is making the easy thing , doing nothing , easy for the network.",
        changed: "Simple structural ideas can matter more than clever new components.",
        questions: "Why do skip connections help optimisation so much? I understand the story, not the proof.",
        related: ["agnolense"],
      },
      {
        id: "attention-2017",
        title: "Attention Is All You Need",
        authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, et al.",
        year: 2017, venue: "NeurIPS", topic: "Sequence models",
        why: "To understand the architecture behind the tools I use every day.",
        core: "Replace recurrence entirely with attention, so every token can look at every other token in parallel.",
        insight: "Removing a constraint (sequential processing) unlocked scale more than adding anything did.",
        changed: "I stopped thinking of attention as mysterious. It’s a weighted lookup , a very well-placed one.",
        questions: "What are we losing by making everything attend to everything?",
        related: [],
      },
      {
        id: "isolation-forest-2008",
        title: "Isolation Forest",
        authors: "Fei Tony Liu, Kai Ming Ting, Zhi-Hua Zhou",
        year: 2008, venue: "ICDM", topic: "Anomaly detection",
        why: "Finscope needed to flag unusual transactions without labelled anomalies.",
        core: "Anomalies are few and different, so they’re easier to isolate with random splits. Fewer splits needed → more anomalous.",
        insight: "Instead of modelling “normal”, model how easy it is to separate something from everything else.",
        changed: "Reframing the problem can be more powerful than a better model.",
        questions: "How do you evaluate anomaly detection when you don’t know what the anomalies are?",
        related: ["finscope"],
      },
      {
        id: "prophet-2017",
        title: "Forecasting at Scale",
        authors: "Sean J. Taylor, Benjamin Letham",
        year: 2017, venue: "The American Statistician", topic: "Forecasting",
        why: "After my LSTM lost to a baseline, I wanted to understand what good forecasting actually looks like.",
        core: "A decomposable model , trend, seasonality, holidays , that analysts can understand and adjust.",
        insight: "A forecast people can reason about is worth more than a slightly better one they can’t.",
        changed: "Interpretability is a feature, especially for personal data.",
        questions: "Where’s the line between a model that’s simple enough to trust and too simple to be useful?",
        related: ["finscope"],
      },
      {
        id: "tabular-2021",
        title: "Tabular Data: Deep Learning is Not All You Need",
        authors: "Ravid Shwartz-Ziv, Amitai Armon",
        year: 2021, venue: "Information Fusion", topic: "Machine learning",
        why: "A sanity check after Finscope.",
        core: "On many tabular datasets, gradient-boosted trees still outperform deep models , and they’re cheaper to tune.",
        insight: "Choosing the tool for the data, not for the story you want to tell about the project.",
        changed: "“What’s the simplest thing that could work?” is now my first question.",
        questions: "Which properties of a dataset make deep learning worth it?",
        related: ["finscope"],
      },
      {
        id: "tech-debt-2015",
        title: "Hidden Technical Debt in Machine Learning Systems",
        authors: "D. Sculley, Gary Holt, Daniel Golovin, et al.",
        year: 2015, venue: "NeurIPS", topic: "ML systems",
        why: "Agnolense’s training code was fine. Everything around it was a mess.",
        core: "The model is a small box in the middle of a very large system , data pipelines, configuration, monitoring , and that’s where the debt accumulates.",
        insight: "The famous diagram: the ML code is the tiny square in the middle.",
        changed: "I budget more time for the plumbing than the model now.",
        questions: "What does good ML hygiene look like for a one-person project?",
        related: ["agnolense", "finscope"],
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  books: {
    lede: "My shelf so far, in order. Notes will come book by book , if you’ve read one of these, I’d genuinely like to hear what you thought.",
    // Title and author, plus category and genres where known. `cover` is the
    // spine colour, matched to the book's best-known edition , change freely.
    // `pages` and `height` (mm, trim size) size the spine in true proportion.
    // `highlights`: passages you marked, shown on the open book with page numbers.
    // `shelf: "childhood"` files a book on the “Childhood books I remember reading” shelf. Optional per
    // book, shown on its card when filled in: read ("2025-03"), note, key
    // ("the idea I kept thinking about"), stayed ("what stayed with me").
    items: [
      { title: "The Diary of a Young Girl", author: "Anne Frank", cover: "#C2432F", pages: 352, height: 198, stayed: "Every time I read it, I notice different parts of her story. I first read it in 2020, stuck inside my own house , too young to understand what was happening in her world, or in mine. All I saw was her growing up, and her dreams. Now, knowing more about the fascist regime, it reads completely differently." },
      { title: "The Last Queen", author: "Chitra Banerjee Divakaruni", cover: "#7A1F2B", pages: 368, height: 216, stayed: "Beautiful writing, and such a fun way to learn the history of Punjab. I cried, I got furious, and I enjoyed every bit of it all the way through." },
      { title: "Why I Am an Atheist and Other Works", author: "Bhagat Singh", cover: "#B3261E", pages: 120, height: 198, stayed: "It felt like an honour to meet someone so selfless, so much larger than life, through his own letters. A man of principle and nuance , he lived more in 23 years than I could find the courage to in aeons." },
      { title: "The Forest of Enchantments", author: "Chitra Banerjee Divakaruni", category: "Fiction", genres: ["Mythological Fiction"], cover: "#1F4D3A", pages: 380, height: 222, stayed: "Lovely , I love fresh perspectives on the classics. Seeing Sita drawn so richly, as a princess trained in medicine and combat, gave me so much joy." },
      { title: "Yesteryear", author: "Caro Claire Burke", cover: "#E8B8B0", pages: 336, height: 234, stayed: "Natalie never asked what she wanted, only what she should want. She measured the worst version of a modern woman’s life against the best version of a traditional one , and quietly edited parts of herself to fit the mould." },
      { title: "The Will to Change", author: "bell hooks", cover: "#C8553D", pages: 208, height: 210, stayed: "Loved it. The kind of book that widens your awareness and leaves you a little more empathetic." },
      { title: "The Liberation of Sita", author: "Volga", category: "Fiction", genres: ["Feminist Mythological Fiction"], cover: "#C0502A", pages: 144, height: 198, stayed: "A fresh, beautiful retelling that turns the women of the story into far more than props. I could spend hours discussing it." },
      { title: "Selfish, Shallow, and Self-Absorbed", author: "Meghan Daum", cover: "#F2E6DC", pages: 272, height: 210, stayed: "Most of the writers seem a little sad. Good food for thought.", read: "2026-06", highlights: [{ text: "People who want children are all alike. People who don’t want children don’t want them in their own ways.", page: 6 }, { text: "ricocheted", page: 8 }, { text: "We would gape, shocked that she didn’t consider us all a single being, like a grove of aspens is said to be. Then we would resume our tugging.", page: 14 }, { text: "I’m not sure my life needs redemption.", page: 74 }, { text: "The perfect life, the perfect lie … is one which prevents you from doing that which you would ideally have done (painted, say, or written unpublishable poetry) but which, in fact, you have no wish to do. People need to feel that they have been…", page: 158 }] },
      { title: "The Bell Jar", author: "Sylvia Plath", category: "Fiction", genres: ["Literary Fiction", "Psychological Classic"], cover: "#22333B", pages: 244, height: 198, stayed: "Who am I to rate her writing? Calling it relatable is the worst thing you can say about your mental health , but it was. So little has truly changed; the women who came before me felt this too, and made it art." },
      { title: "Four Thousand Weeks", author: "Oliver Burkeman", cover: "#E9B949", pages: 288, height: 216, stayed: "Maybe we don’t really understand what “life is short” means." },
      { title: "The Housemaid", author: "Freida McFadden", category: "Thriller", genres: ["Psychological Thriller", "Domestic Suspense"], cover: "#2B2B2E", pages: 336, height: 198, stayed: "The twist is amazing , and I loved the moral greyness of every single character." },
      { title: "The Secret", author: "Rhonda Byrne", cover: "#C9A874", pages: 198, height: 229, stayed: "A thin line between manifesting and toxic positivity , if I can’t acknowledge what’s wrong, where do I begin? It did send me off to read about quantum physics, though." },
      { title: "The Prophet", author: "Khalil Gibran", cover: "#3B2F2A", pages: 107, height: 198, read: "2026-03", highlights: [{ text: "Your pain is the breaking of the shell that encloses your understanding.", page: 21 }, { text: "For what is evil but good tortured by its own hunger and thirst?", page: 25 }, { text: "For life and death are one, even as the river and the sea are one.", page: 30 }] },
      { title: "Letters to a Young Poet", author: "Rainer Maria Rilke", cover: "#E8DFCB", pages: 96, height: 178, read: "2026-02", highlights: [{ text: "German", page: 6 }, { text: "You are looking to the outside, and that above all you should not be doing now.", page: 23 }, { text: "Go into yourself. Examine the reason that bids you to write; check whether it reaches its roots into the deepest region of your heart, admit to yourself whether you would die if it should be denied you to write.", page: 23 }, { text: "Then try, like the first human being, to say what you see and experience and love and lose.", page: 24 }, { text: "…depict your sadnesses and desires, passing thoughts and faith in some kind of beauty – depict all this with intense, quiet, humble sincerity and make use of whatever you find about you to express yourself, the images from your dreams and the things in your memory.", page: 24 }, { text: "And even if you were in a prison whose walls did not let any of the sounds of the world outside reach your senses – would you not have your childhood still, this marvellous, lavish source, this treasure-house of memories? Turn your attention towards that.", page: 24 }, { text: "…examine the depths from which your life springs; at its source you will find the answer to the question of whether you have to write.", page: 25 }, { text: "Irony: don’t let yourself be ruled by it, especially not in uncreative moments. In creative ones try to make use of it as one means among many to get a grasp on life.", page: 27 }, { text: "…if you fear your intimacy is growing too much, then turn towards great and serious subjects…", page: 27 }, { text: "To be an artist means: not to calculate and count; to grow and ripen like a tree which does not hurry the flow of its sap and stands at ease in the spring gales without fearing that no summer may follow.", page: 30 }, { text: "Live the questions for now. Perhaps then you will gradually, without noticing it, live your way into the answer, one distant day in the future.", page: 34 }, { text: "Love between one person and another: that is perhaps the hardest thing it is laid on us to do, the utmost, the ultimate trial and test, the work for which all other work is just preparation.", page: 46 }] },
      { title: "Visual Intelligence", author: "Amy E. Herman", category: "Non-fiction", genres: ["Observation", "Critical Thinking"], cover: "#2F6FB0", pages: 320, height: 216, stayed: "Loved it. A new lens to see the world through , it made me appreciate art more.", read: "2026-02", key: "The world is full of magic things, patiently waiting for our senses to grow sharper.", highlights: [{ text: "…and which leg she is leading with.", page: 43 }, { text: "…height based on the comparison of the woman…", page: 43 }, { text: "To mine the most information possible, don’t close your eyes to anything, even someone else’s subjectivity.", page: 69 }, { text: "Yellow bruises typically indicate that at least eighteen hours have passed since the initial impact.", page: 94 }, { text: "Being an artist is not just about what happens when you are in the studio. The way you live, the people you choose to love and the way you love them…", page: 201 }, { text: "We must decide ahead of time which words we will use when communicating to make sure we are painting the most accurate picture possible.", page: 202 }, { text: "Instead of saying “never” or “always,” give a concrete, definitive number. If that isn’t possible, it is better to use “frequently” or “seldom.”", page: 204 }, { text: "Instead of saying “actually,” try using “I don’t believe . . .”", page: 204 }, { text: "Rather than calling an employee’s quarterly sales “terrible,” use indisputable facts: “You missed your sales quota by 30 percent.”", page: 205 }, { text: "Instead of “This doesn’t work for me,” use “What if you tried . . . ?” or better yet, include yourself in the team with “Why don’t we try . . . ?”", page: 205 }, { text: "…indigo or cobalt or ultramarine.", page: 205 }, { text: "They try to wing it, and find they’ve run out of material in 30 seconds. I’ve also seen shy people take the time to prepare and practice, and then deliver moving, funny, impactful messages in a way that influences audiences and advances their own agendas.", page: 213 }] },
      { title: "The Skincare Bible", author: "Anjali Mahto", cover: "#F1B7B5", pages: 368, height: 234 },
      { title: "How to Know a Person", author: "David Brooks", category: "Non-fiction", genres: ["Psychology", "Communication", "Relationships"], cover: "#E8D34A", pages: 320, height: 234 },
      { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", cover: "#E8662A", pages: 224, height: 216, stayed: "Its idea: care about the big things and you won’t have time for the small ones. I’m not sure that’s how it works." },
      { title: "Atlas of the Heart", author: "Brené Brown", category: "Non-fiction", genres: ["Psychology", "Emotional Intelligence"], cover: "#3E7C8C", pages: 336, height: 234, stayed: "As someone who feels a lot, I’d read this again and again." },
      { title: "The Art of Spending Money", author: "Morgan Housel", category: "Non-fiction", genres: ["Personal Finance", "Behavioral Economics"], cover: "#2E5E4E", pages: 240, height: 216, stayed: "A lot of food for thought, at just the right time in my life. I’d reread it." },
      { title: "The Universe Has Your Back", author: "Gabrielle Bernstein", cover: "#9CC6E0", pages: 240, height: 216, stayed: "Too generic for me , half-formed ideas and anecdotes, with little research behind them." },
      { title: "Mastery", author: "Robert Greene", category: "Non-fiction", genres: ["Self-help", "Psychology", "Career"], cover: "#1C1C1C", pages: 352, height: 229 },
      { title: "How to Live", author: "Derek Sivers", cover: "#F2B134", pages: 128, height: 198 },
      { title: "Things My Son Needs to Know about the World", author: "Fredrik Backman", cover: "#3A6EA5", pages: 112, height: 190 },
      { title: "The Hard Questions", author: "Susan Piver", cover: "#EFE3D3", pages: 128, height: 178 },
      { title: "Simple Passion", author: "Annie Ernaux", cover: "#E9E7E2", pages: 64, height: 178 },
      { title: "Strange Pictures", author: "Uketsu", cover: "#D9D2C0", pages: 256, height: 198, stayed: "Eerie from start to finish, and cleverly plotted. The prose is a little plain, but it pulls you completely into its world." },
      { title: "Three Thousand Stitches", author: "Sudha Murty", category: "Non-fiction", genres: ["Memoir", "Inspirational Essays"], cover: "#E5A13B", pages: 176, height: 198, stayed: "Calm and quietly moving. Her values, her empathy and her instinct to help those in need stayed with me , it feels like a small piece of Sudha Murty’s mind." },
      { title: "The Agony of Eros", author: "Byung-Chul Han", cover: "#D24D57", pages: 72, height: 178 },
      { title: "The Inheritance", author: "Trisha Sakhlecha", category: "Thriller", genres: ["Mystery", "Family Drama"], cover: "#5A1E24", pages: 336, height: 198, stayed: "A true page-turner , well written, full of turns I didn’t see coming. A must-read." },
      { title: "The Little Prince", author: "Antoine de Saint-Exupéry", cover: "#2D5DA1", pages: 96, height: 190, shelf: "childhood" },
      { title: "Siddhartha", author: "Hermann Hesse", category: "Fiction", genres: ["Philosophical Fiction", "Classic"], cover: "#D9822B", pages: 152, height: 198 },
      { title: "Ikigai", author: "Héctor García & Francesc Miralles", cover: "#D64933", pages: 208, height: 190 },
      { title: "The Seven Year Slip", author: "Ashley Poston", cover: "#F2B8C6", pages: 352, height: 210, stayed: "A great concept and beautiful writing, but I never quite fell in love with it." },
      { title: "Magnolia Parks", author: "Jessa Hastings", cover: "#F4A9B8", pages: 512, height: 216, stayed: "More drama than it needed , everything that could go wrong, does." },
      { title: "The Luck Factor", author: "Richard Wiseman", category: "Non-fiction", genres: ["Psychology", "Self-help"], cover: "#3E8E41", pages: 288, height: 198, stayed: "Its case for being social and positive felt repetitive at the time , but looking back, it’s one of those books that quietly changes something in you." },
      { title: "The Queen", author: "Kiera Cass", cover: "#7E2F5C", pages: 80, height: 198, shelf: "childhood" },
      { title: "Verity", author: "Colleen Hoover", category: "Thriller", genres: ["Psychological Thriller", "Romantic Suspense"], cover: "#1E1E24", pages: 336, height: 210 },
      { title: "Evidence of the Affair", author: "Taylor Jenkins Reid", cover: "#C9485B", pages: 64, height: 190 },
      { title: "The Silent Patient", author: "Alex Michaelides", category: "Thriller", genres: ["Psychological Thriller"], cover: "#1F3B4D", pages: 352, height: 198, stayed: "I never quite understood one of Theo’s choices , but he made it, and the story runs on it." },
      { title: "Carrie Soto Is Back", author: "Taylor Jenkins Reid", category: "Fiction", genres: ["Sports Fiction", "Literary Fiction"], cover: "#D1392F", pages: 384, height: 216, stayed: "Like every Taylor Jenkins Reid book, I loved it. I have no interest in tennis, yet it’s written so anyone can enjoy it , real, gripping and well-structured, and it comes full circle. She needed to come out of retirement to grow the beautiful way she did." },
      { title: "All the Lovers in the Night", author: "Mieko Kawakami", cover: "#F2C12E", pages: 224, height: 210, stayed: "Poetic, yes , but mostly just very sad and bleak. I don’t have much more to say about it." },
      { title: "Never Lie", author: "Freida McFadden", category: "Thriller", genres: ["Psychological Thriller", "Mystery"], cover: "#5B7FA6", pages: 320, height: 198, stayed: "Thrilling throughout, genuinely unpredictable and very well written, with consistent characters. A couple of choices near the end didn’t quite sit right with me , but it’s a great read." },
      { title: "Untamed", author: "Glennon Doyle", cover: "#F3B23A", pages: 352, height: 229, stayed: "It started off strong and I loved the early chapters, but it grows repetitive and could have been half the length. At times the author’s framing of herself didn’t land for me." },
      { title: "Metamorphosis", author: "Franz Kafka", cover: "#3F5E3A", pages: 112, height: 190 },
      { title: "Veronika Decides to Die", author: "Paulo Coelho", category: "Fiction", genres: ["Philosophical Fiction", "Psychological Drama"], cover: "#3C6E8F", pages: 224, height: 198 },
      { title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni", category: "Fiction", genres: ["Mythological Fiction", "Historical Fiction"], cover: "#A11D2A", pages: 360, height: 216, stayed: "Panchaali’s rebellion and her undying questions , I loved watching her live with passion and conviction. A consistent, well-built character, flaws and strengths alike. A great read." },
      { title: "After I Do", author: "Taylor Jenkins Reid", cover: "#7FB2D6", pages: 352, height: 210 },
      { title: "Harry Potter and the Philosopher’s Stone", author: "J.K. Rowling", cover: "#B22222", pages: 336, height: 198, shelf: "childhood" },
      { title: "A Good Girl’s Guide to Murder", author: "Holly Jackson", cover: "#F0ECE4", pages: 400, height: 198, shelf: "childhood" },
      { title: "Malibu Rising", author: "Taylor Jenkins Reid", category: "Fiction", genres: ["Historical Fiction", "Family Drama"], cover: "#F08A5D", pages: 384, height: 216 },
      { title: "Better Than the Movies", author: "Lynn Painter", cover: "#E8546B", pages: 368, height: 210, stayed: "Light-hearted, funny and predictable in the most comforting way , it ends exactly how you want it to. A warm hug, or cotton candy." },
      { title: "The Meek One", author: "Fyodor Dostoevsky", cover: "#2A2A2A", pages: 80, height: 178, stayed: "Nothing really gripped me. Very open-ended, and I struggled to understand why the characters behaved the way they did." },
      { title: "One True Loves", author: "Taylor Jenkins Reid", cover: "#8EC5E8", pages: 352, height: 210 },
      { title: "The Alchemist", author: "Paulo Coelho", cover: "#E0A43A", pages: 208, height: 198 },
      { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", cover: "#9E2A2B", pages: 320, height: 193, shelf: "childhood" },
      { title: "The Fault in Our Stars", author: "John Green", cover: "#2C6FB7", pages: 320, height: 203, shelf: "childhood" },
      { title: "Everything I Know About Love", author: "Dolly Alderton", category: "Memoir", genres: ["Coming-of-age", "Relationships", "Personal Essays"], cover: "#E8475A", pages: 336, height: 198, stayed: "A comforting read that felt like a warm hug. I related to all the complicated feelings of growing older, and to the love she has for her friends." },
      { title: "Daisy Jones & The Six", author: "Taylor Jenkins Reid", category: "Fiction", genres: ["Historical Fiction", "Music", "Literary Fiction"], cover: "#D9A441", pages: 368, height: 210, stayed: "Absolutely loved it , all the drama, and the moral ambiguity was amazing." },
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
    since: "2024",
    // TODO: real numbers
    stats: [
      { label: "Fastest 5K", value: "27:42", note: "Oct 2025" },
      { label: "Fastest 10K", value: "58:10", note: "Mar 2026" },
      { label: "Total distance", value: "1,248", unit: "km" },
      { label: "Runs logged", value: "214" },
      { label: "Longest run", value: "21.1", unit: "km", note: "first half marathon" },
    ],
    // Monthly distance in km, starting January 2024. Placeholder data.
    monthly: [
      8, 14, 19, 22, 18, 12, 20, 26, 31, 34, 28, 22,
      30, 36, 42, 45, 40, 32, 38, 48, 55, 60, 52, 44,
      50, 56, 62, 58, 46, 40, 44, 52, 57,
    ],
    monthlyStart: "2024-01",
    timeline: [
      { date: "2024-01", text: "First run. Stopped four times in two kilometres." },
      { date: "2024-03", text: "Ran 5 km without stopping. Sat on the pavement afterwards." },
      { date: "2024-08", text: "Started running in the rain on purpose." },
      { date: "2025-02", text: "First 10K. Slow. Very happy." },
      { date: "2025-10", text: "5K under 28 minutes." },
      { date: "2026-01", text: "Two years. Missed maybe six weeks, total." },
      { date: "2026-03", text: "10K under an hour." },
      { date: "2026-08", text: "First half marathon. 2:26. Walked a bit at 17 km. Didn’t care." },
    ],
  },

  /* ---------------------------------------------------------------------- */
  journaling: {
    intro: [
      "Some things aren’t meant to be displayed.",
      "These are the pieces I chose to preserve.",
    ],
    entries: [
      // TODO: your own fragments. kinds: excerpt · question · changed · observation · reflection
      { date: "2024-01-09", kind: "excerpt", text: "Ran today. Not well. But I went, which is the only part I promised myself." },
      { date: "2024-04-22", kind: "question", text: "Do I like programming, or do I like the feeling of finally understanding something? Does it matter?" },
      { date: "2024-07-15", kind: "changed", before: "Being busy means making progress.", after: "Being busy is often how I avoid deciding what matters." },
      { date: "2024-10-03", kind: "observation", text: "I write better code in the morning and better sentences at night. I should stop fighting that." },
      { date: "2025-02-18", kind: "excerpt", text: "The model was 98% accurate and completely wrong. There’s probably a lesson in that about more than models." },
      { date: "2025-06-30", kind: "reflection", text: "Half a year of these pages and the same three worries keep coming back. Maybe that’s what they’re for , to notice what keeps coming back." },
      { date: "2025-09-11", kind: "changed", before: "Asking questions makes me look like I don’t know things.", after: "Asking questions is how I stop not knowing things." },
      { date: "2025-11-19", kind: "observation", text: "Thought about the fig tree again. Maybe the trick isn’t choosing faster , it’s noticing that you can come back for more than one." },
      { date: "2026-01-01", kind: "question", text: "What would I build if no one were ever going to see it?" },
      { date: "2026-05-27", kind: "observation", text: "The rain smelled like the first week of college. Some memories are stored in weather." },
      { date: "2026-09-02", kind: "excerpt", text: "I don’t journal to remember. I journal to find out what I already think." },
    ],
  },
};
