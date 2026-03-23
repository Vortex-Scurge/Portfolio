================================================================================
    ARAVINDAN'S PORTFOLIO WEBSITE — COMPLETE CUSTOMIZATION GUIDE
================================================================================

    This guide explains everything step by step — how to run, deploy,
    and customize your portfolio website. Even if you're new to this,
    just follow the steps carefully and you'll be fine!

================================================================================
TABLE OF CONTENTS
================================================================================

  1. How to Run Locally
  2. How to Deploy on Vercel (Free)
  3. How to Edit After Deployment
  4. Folder Structure Explained
  5. How to Add Your Resume
  6. How to Add a New Project
  7. How to Add a New Blog Post
  8. How to Update Skills
  9. How to Add Social Links
  10. How to Add Certifications / Achievements
  11. How to Update the Contact Form (EmailJS)
  12. How to Add Images / Screenshots
  13. How to Change Colors / Fonts
  14. How to Update the Honeypot GitHub Link


================================================================================
1. HOW TO RUN LOCALLY (On Your Computer)
================================================================================

  This lets you preview your website before putting it online.

  METHOD 1 — Using Python (Easiest):
  -----------------------------------
  Step 1: Open your terminal (Command Prompt / PowerShell / Terminal)
  Step 2: Navigate to the portfolio folder:
          cd /path/to/portfolio
  Step 3: Run this command:
          python3 -m http.server 8080
  Step 4: Open your browser and go to:
          http://localhost:8080
  Step 5: You should see your website!
  Step 6: To stop: press Ctrl + C in the terminal

  METHOD 2 — Using VS Code:
  --------------------------
  Step 1: Install VS Code if not already installed
  Step 2: Open the portfolio folder in VS Code
  Step 3: Install the "Live Server" extension:
          - Click the Extensions icon (left sidebar, looks like a square)
          - Search "Live Server"
          - Click Install
  Step 4: Right-click on index.html
  Step 5: Click "Open with Live Server"
  Step 6: Your browser opens automatically with the website


================================================================================
2. HOW TO DEPLOY ON VERCEL (Free Hosting — Website Goes Online)
================================================================================

  After this, your website will have a real URL anyone can visit.

  FIRST TIME SETUP:
  ------------------
  Step 1: Go to https://github.com and create an account (if you don't have one)

  Step 2: Create a new repository on GitHub:
          a. Click the "+" button (top right corner) → "New repository"
          b. Name it: portfolio
          c. Keep it Public
          d. Do NOT check "Add a README"
          e. Click "Create repository"

  Step 3: Push your portfolio code to GitHub:
          Open your terminal and run these commands one by one:

          cd /path/to/portfolio
          git init
          git add .
          git commit -m "First upload of portfolio"
          git branch -M main
          git remote add origin https://github.com/Vortex-Scurge/portfolio.git
          git push -u origin main

          (Replace the URL if your GitHub username or repo name is different)

  Step 4: Go to https://vercel.com and sign up with your GitHub account

  Step 5: On Vercel dashboard, click "Add New" → "Project"

  Step 6: Find your "portfolio" repository and click "Import"

  Step 7: Leave all settings as default → Click "Deploy"

  Step 8: Wait about 30 seconds. Vercel will give you a URL like:
          https://portfolio-abc123.vercel.app

  Step 9: Done! Your website is now live! Share this URL with anyone.

  OPTIONAL — Custom Domain:
  -------------------------
  If you buy a domain (e.g., aravindan.dev):
  - Go to Vercel → your project → Settings → Domains
  - Add your domain and follow Vercel's DNS instructions


================================================================================
3. HOW TO EDIT YOUR WEBSITE AFTER DEPLOYMENT
================================================================================

  Once deployed, whenever you change a file and push to GitHub,
  Vercel automatically updates your live website in about 30 seconds.

  HERE'S THE SIMPLE PROCESS:
  ---------------------------

  Step 1: Open the file you want to edit on your computer
          (e.g., index.html, projects.html, etc.)

  Step 2: Make your changes and save the file

  Step 3: Test locally (optional but recommended):
          python3 -m http.server 8080
          → Open http://localhost:8080 to check it looks good

  Step 4: Push changes to GitHub (this updates the live website):

          cd /path/to/portfolio
          git add .
          git commit -m "describe what you changed"
          git push

          Examples of commit messages:
          git commit -m "added new project"
          git commit -m "updated skills"
          git commit -m "added blog post"
          git commit -m "added resume pdf"

  Step 5: Wait 30 seconds → Visit your Vercel URL → Changes are live!

  EDITING FROM GITHUB WEBSITE (No Terminal Needed):
  --------------------------------------------------
  You can also edit files directly on github.com:

  Step 1: Go to your repository page on GitHub
  Step 2: Click on the file you want to edit (e.g., index.html)
  Step 3: Click the pencil icon (Edit this file) in the top right
  Step 4: Make your changes directly in the browser
  Step 5: Scroll down, type a commit message, click "Commit changes"
  Step 6: Vercel automatically deploys the update in ~30 seconds


================================================================================
4. FOLDER STRUCTURE EXPLAINED
================================================================================

  portfolio/
  ├── index.html                  ← Home page (the main page)
  ├── projects.html               ← Projects listing page
  ├── blog.html                   ← Blog / writeups listing page
  ├── experience.html             ← Experience page
  ├── resume.html                 ← Resume page
  ├── contact.html                ← Contact page with form
  ├── vercel.json                 ← Vercel deployment config (don't touch)
  │
  ├── css/
  │   └── style.css               ← All the design and colors
  │
  ├── js/
  │   └── main.js                 ← Animations, menu, contact form
  │
  ├── images/                     ← Put all images and resume PDF here
  │   └── resume.pdf              ← Your resume (add when ready)
  │
  ├── projects/
  │   ├── honeypot-monitoring-system.html    ← Honeypot project detail
  │   └── secure-image-encryption.html       ← Encryption project detail
  │
  ├── blog_posts/
  │   └── sample-post.html        ← Blog post template (copy for new posts)
  │
  └── README.txt                  ← This file


================================================================================
5. HOW TO ADD YOUR RESUME
================================================================================

  Step 1: Save your resume as "resume.pdf"

  Step 2: Copy resume.pdf into the images/ folder:
          portfolio/images/resume.pdf

  Step 3: Open resume.html in a text editor

  Step 4: Find this section (around line 53-58):
          <!-- RESUME PREVIEW — replace this div ... -->
          <div class="resume-preview fade-in">
            <div style="text-align: center; ...

  Step 5: DELETE everything from <div class="resume-preview...> to its
          closing </div></div> and REPLACE with this:

          <div class="resume-preview fade-in">
            <iframe src="images/resume.pdf"
                    style="width:100%; height:800px; border:1px solid var(--border-color); border-radius:var(--radius-md);">
            </iframe>
          </div>

  Step 6: Save the file

  Step 7: Push to GitHub:
          git add .
          git commit -m "added resume"
          git push


================================================================================
6. HOW TO ADD A NEW PROJECT
================================================================================

  Let's say you built a "Port Scanner" tool. Here's how to add it:

  STEP A — Create the project detail page:
  -----------------------------------------
  Step 1: Open the projects/ folder

  Step 2: Copy the file "honeypot-monitoring-system.html"

  Step 3: Rename the copy to "port-scanner.html"

  Step 4: Open "port-scanner.html" in a text editor

  Step 5: Change the <title> tag (around line 6):
          BEFORE: <title>Honeypot Monitoring System | Aravindan</title>
          AFTER:  <title>Port Scanner | Aravindan</title>

  Step 6: Change the h1 heading:
          BEFORE: <h1>Honeypot Monitoring System</h1>
          AFTER:  <h1>Port Scanner</h1>

  Step 7: Update the badges:
          <span class="project-card-badge">Tool</span>
          <span class="project-card-badge"...>Python</span>
          <span class="project-card-badge"...>Networking</span>

  Step 8: Update the GitHub link:
          <a href="https://github.com/Vortex-Scurge/port-scanner" ...>

  Step 9: Update the Description, Problem Statement, Features,
          Tech Stack, What I Learned, and Future Improvements sections
          (just change the text inside the <p> and <li> tags)

  Step 10: Save the file


  STEP B — Add a card on the projects listing page:
  --------------------------------------------------
  Step 1: Open projects.html

  Step 2: Find the line: <div class="projects-grid">

  Step 3: AFTER the last </div> of the last project card (but BEFORE
          the closing </div> of projects-grid), paste this:

          <!-- Project: Port Scanner -->
          <div class="project-card fade-in" data-category="tool">
            <div class="project-card-header">
              <span class="project-card-badge">Tool</span>
              <h3>Port Scanner</h3>
              <p>A custom port scanning tool that scans for open ports
                 and detects running services.</p>
            </div>
            <div class="project-card-body">
              <div class="project-tech">
                <span>Python</span><span>Networking</span><span>Socket</span>
              </div>
            </div>
            <div class="project-card-footer">
              <a href="projects/port-scanner.html"
                 class="btn btn-primary btn-sm">View Details</a>
              <a href="https://github.com/Vortex-Scurge/port-scanner"
                 target="_blank" class="btn btn-outline btn-sm">
                <i class="fab fa-github"></i> Code
              </a>
            </div>
          </div>

  Step 4: If you need a new filter category, add a button in the
          filter-bar section:
          <button class="filter-btn" data-filter="tool">Tools</button>

  Step 5: Save the file


  STEP C (OPTIONAL) — Feature on Home Page:
  ------------------------------------------
  Step 1: Open index.html

  Step 2: Find section id="projects" (search for "Featured Work")

  Step 3: Copy one existing project card block and paste below the last one

  Step 4: Update the project name, description, tech tags, and links

  Step 5: Save the file


  STEP D — Push to make it live:
  ------------------------------
          git add .
          git commit -m "added port scanner project"
          git push


================================================================================
7. HOW TO ADD A NEW BLOG POST
================================================================================

  Let's say you want to add a TryHackMe writeup:

  STEP A — Create the blog post page:
  ------------------------------------
  Step 1: Open the blog_posts/ folder

  Step 2: Copy "sample-post.html"

  Step 3: Rename the copy to "tryhackme-basic-pentesting.html"

  Step 4: Open the new file in a text editor

  Step 5: Change the <title> tag:
          <title>TryHackMe: Basic Pentesting | Aravindan</title>

  Step 6: Change the badge tag:
          <span class="blog-card-tag">Writeup</span>

  Step 7: Change the h1 title:
          <h1>TryHackMe: Basic Pentesting — Walkthrough</h1>

  Step 8: Change the meta info:
          <span><i class="fas fa-calendar"></i> March 2026</span>
          <span><i class="fas fa-clock"></i> 10 min read</span>
          <span><i class="fas fa-tag"></i> TryHackMe</span>

  Step 9: Replace the "Coming Soon" placeholder div with your content.
          Use these HTML tags for formatting:

          <h2>Section Title</h2>
          <h3>Smaller Title</h3>
          <p>Normal paragraph text.</p>
          <pre><code>nmap -sV 10.10.10.1</code></pre>
          <code>inline code</code>
          <ul>
            <li>Bullet point</li>
            <li>Another point</li>
          </ul>
          <img src="../images/screenshot.png" alt="description">

  Step 10: Save the file


  STEP B — Update the blog listing page:
  ----------------------------------------
  Step 1: Open blog.html

  Step 2: Find the "TryHackMe Writeups" card

  Step 3: Change the date:
          BEFORE: <span class="blog-card-date">Coming Soon</span>
          AFTER:  <span class="blog-card-date">March 2026</span>

  Step 4: Update the "Read More" link:
          BEFORE: href="blog_posts/sample-post.html"
          AFTER:  href="blog_posts/tryhackme-basic-pentesting.html"

  Step 5: Save the file


  STEP C — Push to make it live:
  ------------------------------
          git add .
          git commit -m "added tryhackme basic pentesting writeup"
          git push


================================================================================
8. HOW TO UPDATE SKILLS
================================================================================

  TO ADD A NEW SKILL:
  --------------------
  Step 1: Open index.html

  Step 2: Search for "skill-tags" to find the skills sections

  Step 3: Find the right category (Programming, Cybersecurity, Tools, etc.)

  Step 4: Add a new skill tag inside that section:
          <span class="skill-tag">New Skill Name</span>

          Example — adding "Golang" to Programming Languages:
          Find the Programming Languages section and add:
          <span class="skill-tag">Golang</span>

  Step 5: Save and push:
          git add . && git commit -m "added golang skill" && git push


  TO REMOVE A SKILL:
  -------------------
  Step 1: Open index.html
  Step 2: Find the skill tag you want to remove
  Step 3: Delete the entire line: <span class="skill-tag">......</span>
  Step 4: Save and push


  TO ADD A NEW TOOL ICON:
  -----------------------
  Step 1: Open index.html
  Step 2: Find section id="tools"
  Step 3: Add a new tool item:

          <div class="tool-item">
            <div class="tool-icon"><i class="fab fa-rust"></i></div>
            <span>Rust</span>
          </div>

  Step 4: Find icon names at: https://fontawesome.com/icons
          Common ones:
          fab fa-python     → Python
          fab fa-java        → Java
          fab fa-rust        → Rust
          fab fa-golang      → Go
          fas fa-database    → Database
          fas fa-server      → Server


================================================================================
9. HOW TO ADD SOCIAL LINKS (Twitter, Discord, etc.)
================================================================================

  TO ADD TO CONTACT PAGE:
  -----------------------
  Step 1: Open contact.html

  Step 2: Find <div class="contact-links">

  Step 3: Add a new link BEFORE the closing </div>:

          <a href="https://twitter.com/yourusername" target="_blank"
             class="contact-link">
            <span class="contact-link-icon">
              <i class="fab fa-twitter"></i>
            </span>
            twitter.com/yourusername
          </a>


  TO ADD TO FOOTER (shows on all pages):
  ----------------------------------------
  You need to update the footer in EVERY HTML file. The footer section
  looks like this on each page:

          <div class="footer-links">
            <a href="..." aria-label="GitHub"><i class="fab fa-github"></i></a>
            <a href="..." aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            <a href="..." aria-label="Email"><i class="fas fa-envelope"></i></a>
          </div>

  Add your new link BEFORE the closing </div>:

          <a href="https://twitter.com/yourusername" target="_blank"
             aria-label="Twitter">
            <i class="fab fa-twitter"></i>
          </a>

  FILES TO UPDATE (footer appears in all of these):
    - index.html
    - projects.html
    - blog.html
    - experience.html
    - resume.html
    - contact.html
    - projects/honeypot-monitoring-system.html
    - projects/secure-image-encryption.html
    - blog_posts/sample-post.html

  ICON NAMES:
    Twitter  → fab fa-twitter
    Discord  → fab fa-discord
    Medium   → fab fa-medium
    YouTube  → fab fa-youtube
    Telegram → fab fa-telegram


================================================================================
10. HOW TO ADD CERTIFICATIONS / ACHIEVEMENTS
================================================================================

  Step 1: Open index.html

  Step 2: Search for section id="achievements"

  Step 3: Find the <div class="achievements-grid">

  Step 4: Copy an existing achievement card and paste below the last one:

          <div class="achievement-card fade-in">
            <div class="achievement-icon">📜</div>
            <div>
              <h4>CompTIA Security+</h4>
              <p>Earned CompTIA Security+ certification - 2026</p>
            </div>
          </div>

  Step 5: Change the emoji, title, and description

  Good emojis to use:
    📜  Certificate
    🏆  Trophy / Winner
    🥇  First place
    🎓  Education
    🛡️  Security
    💡  Idea / Innovation
    🏴  CTF / Flag
    🔬  Research
    🎯  Target / Goal achieved
    ⭐  Star / Special

  Step 6: Save and push:
          git add . && git commit -m "added security+ cert" && git push


================================================================================
11. HOW TO SET UP CONTACT FORM (EmailJS)
================================================================================

  Right now the contact form shows a demo message. To make it actually
  send emails to aravinanravichandiran@gmail.com, follow these steps:

  Step 1: Go to https://www.emailjs.com/ and click "Sign Up Free"
          (Free plan = 200 emails per month — more than enough)

  Step 2: After signing up, go to "Email Services" (left menu)

  Step 3: Click "Add New Service" → Choose "Gmail"
          - Connect your Gmail account
          - Finish setup
          - Note down your SERVICE ID (looks like: service_abc123)

  Step 4: Go to "Email Templates" (left menu)

  Step 5: Click "Create New Template"

  Step 6: Set up the template:
          Subject: New Portfolio Contact: {{from_name}}
          Content:
            Name: {{from_name}}
            Email: {{from_email}}
            Message: {{message}}
          To Email: aravinanravichandiran@gmail.com

  Step 7: Save the template
          Note down your TEMPLATE ID (looks like: template_abc123)

  Step 8: Go to "Account" → "API Keys"
          Note down your PUBLIC KEY (looks like: abcDEF_123xyz)

  Step 9: Open js/main.js in your text editor

  Step 10: Find these three lines (around line 80-82):
           const serviceID = 'YOUR_SERVICE_ID';
           const templateID = 'YOUR_TEMPLATE_ID';
           const publicKey = 'YOUR_PUBLIC_KEY';

  Step 11: Replace with YOUR values:
           const serviceID = 'service_abc123';      ← your service ID
           const templateID = 'template_abc123';     ← your template ID
           const publicKey = 'abcDEF_123xyz';        ← your public key

  Step 12: Open index.html and find this line near the bottom:
           <!-- <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script> -->

  Step 13: REMOVE the <!-- and --> to uncomment it:
           <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

  Step 14: Do the same thing in contact.html (same line near the bottom)

  Step 15: Save all files and push:
           git add .
           git commit -m "configured emailjs for contact form"
           git push

  Step 16: Test it! Go to your website → Contact page → Send a message
           You should receive an email!


================================================================================
12. HOW TO ADD IMAGES / SCREENSHOTS
================================================================================

  Step 1: Save your image file (screenshot, photo, etc.)
          Recommended: PNG or JPG, around 1200x800 pixels

  Step 2: Copy the image to: portfolio/images/
          Example: portfolio/images/honeypot-dashboard.png

  Step 3: To use the image in a PROJECT detail page:
          Open the project file (e.g., projects/honeypot-monitoring-system.html)
          Find the "Screenshots" section
          Replace the placeholder div with:
          <img src="../images/honeypot-dashboard.png" alt="Honeypot Dashboard">

  Step 4: To use in a BLOG post:
          <img src="../images/screenshot-name.png" alt="description">

  Step 5: Push to make it live:
          git add .
          git commit -m "added project screenshots"
          git push


================================================================================
13. HOW TO CHANGE COLORS / FONTS
================================================================================

  CHANGE ACCENT COLOR (the neon green):
  --------------------------------------
  Step 1: Open css/style.css

  Step 2: Find these lines near the top (around line 3-6):
          --accent: #00ff88;
          --accent-dim: rgba(0, 255, 136, 0.1);
          --accent-medium: rgba(0, 255, 136, 0.3);

  Step 3: Change the hex color code:
          Blue:   --accent: #00d4ff;
          Orange: --accent: #ff6b35;
          Purple: --accent: #a855f7;
          Red:    --accent: #ff4444;

  Step 4: Update the dim and medium versions too:
          For blue (#00d4ff):
          --accent-dim: rgba(0, 212, 255, 0.1);
          --accent-medium: rgba(0, 212, 255, 0.3);

  Step 5: Save and push


  CHANGE FONTS:
  ---------------
  Step 1: Go to https://fonts.google.com and pick a font

  Step 2: Open css/style.css

  Step 3: Find the @import line at the very top of the file

  Step 4: Replace with your chosen font's import URL

  Step 5: Find --font-heading and --font-body and change the font names


================================================================================
14. HOW TO UPDATE THE HONEYPOT GITHUB LINK
================================================================================

  When you create the GitHub repo for your honeypot project:

  Step 1: Open EACH of these 3 files and search for href="#":

          File 1: index.html
          - Find the "Honeypot Monitoring System" card
          - Change: href="#"
          - To:     href="https://github.com/Vortex-Scurge/honeypot"

          File 2: projects.html
          - Find the "Honeypot Monitoring System" card
          - Change: href="#"
          - To:     href="https://github.com/Vortex-Scurge/honeypot"

          File 3: projects/honeypot-monitoring-system.html
          - Find the "View on GitHub" button
          - Change: href="#"
          - To:     href="https://github.com/Vortex-Scurge/honeypot"

  Step 2: Save all 3 files

  Step 3: Push:
          git add .
          git commit -m "added honeypot github link"
          git push


================================================================================
QUICK CHEAT SHEET — Common Changes
================================================================================

  CHANGE                  FILE TO EDIT            WHAT TO SEARCH FOR
  -----------------------------------------------------------------------
  Your name               All HTML files          "Aravindan"
  Email address            All HTML files          "aravinanravichandiran"
  GitHub link              All HTML files          "Vortex-Scurge"
  LinkedIn link            All HTML files          "aravindan-ravichandran"
  Hero description         index.html             "hero-desc"
  About bio                index.html             "about-text"
  Skills                   index.html             "skill-tag"
  Education                index.html             "NIT Puducherry"
  Typed text titles        js/main.js             "const strings"
  Accent color             css/style.css          "--accent"
  Footer text              All HTML files          "Built with passion"

================================================================================
