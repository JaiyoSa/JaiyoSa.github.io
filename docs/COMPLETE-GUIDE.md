# Sagar Gharti Portfolio — Complete Guide

A step-by-step manual for publishing, updating projects, and writing blog posts.

---

## Part 1: Installing Git (One-Time Setup)

Git is the tool that uploads your files to GitHub. You only install it once.

### Windows

1. Go to https://git-scm.com/download/win
2. Download the installer and run it
3. Click "Next" through every screen (the defaults are fine)
4. When finished, open the Start menu and search for "Git Bash" — this is your terminal

### Mac

1. Open the Terminal app (search "Terminal" in Spotlight)
2. Type `git --version` and press Enter
3. If Git is not installed, macOS will prompt you to install it — click "Install"

### Verify it works

Open Git Bash (Windows) or Terminal (Mac) and type:

```
git --version
```

You should see something like `git version 2.xx.x`. If you do, Git is ready.

---

## Part 2: Creating a GitHub Account

1. Go to https://github.com and click "Sign up"
2. Use your ERAU email (ghartis@my.erau.edu) — student emails unlock free private repos
3. Choose a username (suggestion: `sgharti3` to match your LinkedIn)
4. Complete the verification steps

---

## Part 3: Publishing Your Portfolio (First Time)

### Step 1 — Create a repository on GitHub

1. Log in to GitHub
2. Click the green "New" button (or go to https://github.com/new)
3. Repository name: type exactly `sgharti3.github.io` (replace sgharti3 with your actual username)
   - This special name tells GitHub to host it as your personal site
4. Set it to **Public**
5. Do NOT check "Add a README" or any other box
6. Click "Create repository"

### Step 2 — Unzip the portfolio

1. Download the portfolio zip file
2. Unzip it — you will get a folder called `portfolio_new`
3. Go INSIDE that folder — you should see files like `index.html`, `styles.css`, `script.js`, etc.

### Step 3 — Upload using Git

Open Git Bash (Windows) or Terminal (Mac), then type these commands one at a time.

First, navigate to the portfolio folder:

```
cd /path/to/portfolio_new
```

Replace `/path/to/portfolio_new` with the actual path. For example:
- Windows: `cd "C:/Users/Sagar/Downloads/portfolio_new"`
- Mac: `cd ~/Downloads/portfolio_new`

Now set up Git and push:

```
git init
git add -A
git commit -m "Initial portfolio upload"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username (e.g., `sgharti3`).

Git will ask for your GitHub credentials. Use your username and a **Personal Access Token** (not your password):
- Go to GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
- Click "Generate new token (classic)"
- Give it a name like "portfolio"
- Check the "repo" checkbox
- Click "Generate token"
- Copy the token and paste it as your password when Git asks

### Step 4 — Enable GitHub Pages

1. Go to your repository on GitHub (https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io)
2. Click the **Settings** tab
3. In the left sidebar, click **Pages**
4. Under "Source", select **Deploy from a branch**
5. Branch: select **main**, folder: **/ (root)**
6. Click **Save**

### Step 5 — Visit your live site

Wait 1-2 minutes, then go to:

```
https://YOUR_USERNAME.github.io
```

Your portfolio is now live on the internet.

---

## Part 4: How Files Are Organized

```
portfolio_new/
├── index.html          ← Main page (you rarely edit this)
├── blog.html           ← Blog listing page
├── post.html           ← Individual blog post page
├── styles.css          ← All visual styling
├── script.js           ← All interactive behavior
├── data/
│   └── site.json       ← YOUR MAIN DATA FILE (projects, skills, experience, etc.)
├── assets/
│   ├── cv/
│   │   └── Sagar-Gharti-CV.pdf  ← Your CV/resume PDF
│   └── images/
│       ├── profile-placeholder.svg  ← Your headshot (replace this!)
│       ├── projects/                ← Project images (one per project)
│       │   ├── nutrient-transport-cfd.svg
│       │   ├── droplet-coaxial-jet.svg
│       │   ├── wind-tunnel-rans-les.svg
│       │   ├── fsi-bone-stress.svg
│       │   ├── pid-cfd-control.svg
│       │   ├── potential-flow-solver.svg
│       │   ├── plate-heat-transfer.svg
│       │   ├── heat-flux-sensor.svg
│       │   └── structural-fea-industrial.svg
│       └── blog/
│           └── blog-placeholder.svg  ← Default blog post image
└── posts/
    ├── posts.json              ← List of blog post filenames
    ├── 2026-04-25-welcome.md   ← Example blog post
    └── 2026-04-25-research-notes-template.md
```

Key rule: You primarily edit TWO things:
1. `data/site.json` for projects, skills, experience, and personal info
2. Files in `posts/` folder for blog content

---

## Part 5: Replacing Project Images

Each project has a placeholder SVG image. Here is how to replace them with your own simulation screenshots or plots.

### Step 1 — Prepare your image

- Take a screenshot of your simulation result, plot, or lab photo
- Save it as `.png` or `.jpg` (PNG is preferred for plots, JPG for photos)
- Recommended size: at least 800 x 500 pixels (wider is better)

### Step 2 — Name it to match

Each project image has a specific filename. Match the name exactly:

| Project | Replace this file |
|---------|-------------------|
| Nutrient Transport in Trabecular Bone | `nutrient-transport-cfd.png` |
| Levitating Droplet in Vertical Wind Tunnel | `droplet-coaxial-jet.png` |
| RANS and LES Coaxial Jet Modeling | `wind-tunnel-rans-les.png` |
| Fluid-Structure Interaction in Bone Mechanics | `fsi-bone-stress.png` |
| PID Control in CFD Models | `pid-cfd-control.png` |
| Potential Flow Solver | `potential-flow-solver.png` |
| 2-D Plate Heat Transfer Solver | `plate-heat-transfer.png` |
| Heat Flux Sensor Build | `heat-flux-sensor.png` |
| Industrial Structural Design and FEA | `structural-fea-industrial.png` |

### Step 3 — Put image in the right folder

Put your new image in: `assets/images/projects/`

Delete (or overwrite) the old `.svg` placeholder with the same name.

### Step 4 — Update site.json (only if you changed the file extension)

If your old image was `.svg` and your new one is `.png`, open `data/site.json` and find the line:

```json
"image": "assets/images/projects/nutrient-transport-cfd.svg",
```

Change `.svg` to `.png`:

```json
"image": "assets/images/projects/nutrient-transport-cfd.png",
```

### Step 5 — Replace your headshot

Put your headshot photo in `assets/images/` and name it `profile.jpg` (or `.png`).

Then open `data/site.json` and change:

```json
"headshot": "assets/images/profile-placeholder.svg"
```

to:

```json
"headshot": "assets/images/profile.jpg"
```

---

## Part 6: Adding or Editing Projects

All project data lives in `data/site.json`. Open this file in any text editor (VS Code, Notepad++, or even regular Notepad).

### Editing an existing project

Find the project by its title. For example:

```json
{
  "id": "nutrient-transport",
  "title": "Nutrient Transport in Trabecular Bone",
  "subtitle": "CFD model for convection-diffusion behavior in porous biological flow",
  "category": ["CFD", "Biofluids", "Research"],
  "status": "Research project",
  "image": "assets/images/projects/nutrient-transport-cfd.svg",
  "tools": ["STAR-CCM+", "CFD", "Porous flow", "Convection-diffusion"],
  "summary": "Developing CFD-based models to describe nutrient transport...",
  "details": [
    "Formulated simulation workflows for convection-diffusion...",
    "Connected transport efficiency to flow behavior...",
    "Designed the project as a bridge between bio-fluid mechanics..."
  ],
  "links": [
    { "label": "Add thesis link", "url": "#" },
    { "label": "Add project report", "url": "#" }
  ]
}
```

You can change any field:
- `title` and `subtitle`: What appears on the card
- `summary`: Short description shown on the card
- `details`: Bullet points shown in the modal popup
- `category`: Tags used for filtering (these must match existing filter chips)
- `tools`: Technical tools shown in the modal
- `links`: Button labels and URLs (replace `"#"` with real links like `"https://github.com/..."`)

### Adding a brand new project

1. Prepare an image for it (see Part 5)
2. Put the image in `assets/images/projects/`
3. In `data/site.json`, find the `"projects": [` section
4. Add a new project block at the end (before the closing `]`):

```json
,
{
  "id": "my-new-project",
  "title": "My New Project Title",
  "subtitle": "One-line description of the project",
  "category": ["CFD", "Research"],
  "status": "Research project",
  "image": "assets/images/projects/my-new-project.png",
  "tools": ["Python", "STAR-CCM+", "VOF"],
  "summary": "A longer description of what this project does.",
  "details": [
    "First bullet point about what you did.",
    "Second bullet point about methodology.",
    "Third bullet point about results."
  ],
  "links": [
    { "label": "GitHub repo", "url": "https://github.com/..." },
    { "label": "Report PDF", "url": "assets/cv/my-report.pdf" }
  ]
}
```

IMPORTANT: Note the comma `,` before the opening `{`. This is required between items in a JSON list. The LAST item should NOT have a trailing comma.

### Available categories for filtering

These are the built-in filter tags: `CFD`, `Biofluids`, `Research`, `Multiphase`, `FSI`, `FEA`, `Turbulence`, `Control`, `Coding`, `Aerodynamics`, `Class project`, `Heat transfer`, `Experimental`, `Structures`, `Industry`

If you use a new category name, it will automatically appear as a new filter chip.

---

## Part 7: Writing Blog Posts

Blog posts are written as plain Markdown files. No HTML knowledge needed.

### Step 1 — Create a new Markdown file

Create a new text file with a name like:

```
2026-05-01-my-post-title.md
```

The naming pattern is: `YYYY-MM-DD-short-title.md`

### Step 2 — Write the post

Every post needs a header block at the top (called "front matter"), followed by your content:

```markdown
---
title: My Post Title
date: 2026-05-01
tags: CFD, simulation, research
excerpt: A short summary that appears on the blog listing card.
cover: assets/images/blog/blog-placeholder.svg
---

# My Post Title

Write your content here using regular Markdown.

## Subheading

You can use **bold text** and `inline code`.

Here is a list:

- First item
- Second item
- Third item

You can include images:

![Alt text](assets/images/blog/my-image.png)

And links:

[Click here](https://example.com)

Code blocks work too:

```python
import numpy as np
x = np.linspace(0, 1, 100)
```
```

### Step 3 — Add a cover image (optional)

If you want a custom cover image for the blog card:

1. Put the image in `assets/images/blog/`
2. Update the `cover` line in your post's front matter:

```
cover: assets/images/blog/my-custom-cover.png
```

If you skip this, the default placeholder image will be used.

### Step 4 — Register the post

Open `posts/posts.json` and add your new filename to the list:

Before:
```json
[
  "2026-04-25-welcome.md",
  "2026-04-25-research-notes-template.md"
]
```

After:
```json
[
  "2026-05-01-my-post-title.md",
  "2026-04-25-welcome.md",
  "2026-04-25-research-notes-template.md"
]
```

Put the newest post first. The blog will sort by date automatically, but this order affects which loads first.

### Step 5 — Test locally (optional)

Before pushing to GitHub, you can preview your post locally:

Windows: Double-click `start-local-windows.bat`
Mac/Linux: Run `sh start-local-mac-linux.sh`

Then open `http://localhost:8000` in your browser.

---

## Part 8: Pushing Updates to GitHub

After making any changes (new project, new blog post, image replacement), you need to push the changes to GitHub. This is the same process every time.

Open Git Bash (Windows) or Terminal (Mac) and navigate to your portfolio folder:

```
cd /path/to/portfolio_new
```

Then run these three commands:

```
git add -A
git commit -m "Describe what you changed"
git push
```

Example commit messages:
- `git commit -m "Added droplet simulation screenshot"`
- `git commit -m "New blog post about turbulence modeling"`
- `git commit -m "Updated CV and contact info"`

Your changes will be live on your website within 1-2 minutes after pushing.

---

## Part 9: Updating Your Personal Info

Open `data/site.json` and edit the `"person"` section at the top:

```json
"person": {
  "name": "Sagar Gharti",
  "role": "Aerospace Engineering PhD Candidate",
  "location": "Daytona Beach, Florida",
  "email": "ghartis@my.erau.edu",
  "linkedin": "https://www.linkedin.com/in/sgharti3/",
  "cv": "assets/cv/Sagar-Gharti-CV.pdf",
  "tagline": "I build computational models for aerodynamics...",
  "summary": "Highly motivated aerospace engineer...",
  "headshot": "assets/images/profile-placeholder.svg"
}
```

To update your CV: Replace the PDF file at `assets/cv/Sagar-Gharti-CV.pdf` with your new one (keep the same filename, or update the path in site.json).

---

## Part 10: Quick Reference Card

| I want to...                  | What to edit                          |
|-------------------------------|---------------------------------------|
| Change my name, email, bio    | `data/site.json` → `person` section   |
| Add/edit a project            | `data/site.json` → `projects` section |
| Replace a project image       | Drop image in `assets/images/projects/`, update site.json |
| Replace my headshot           | Drop image in `assets/images/`, update site.json |
| Update my CV                  | Replace `assets/cv/Sagar-Gharti-CV.pdf` |
| Write a new blog post         | Create `.md` file in `posts/`, add filename to `posts/posts.json` |
| Add a blog cover image        | Drop image in `assets/images/blog/` |
| Add skills or coursework      | `data/site.json` → `skills` or `coursework` section |
| Add experience                | `data/site.json` → `experience` section |
| Add a publication             | `data/site.json` → `publications` section |
| Push changes live             | `git add -A` then `git commit -m "msg"` then `git push` |

---

## Troubleshooting

**"Website data did not load"**
You opened `index.html` directly by double-clicking. Use the local server script instead (`start-local-windows.bat` or `start-local-mac-linux.sh`). On GitHub Pages, this error will not occur.

**"JSON parse error"**
You have a typo in `data/site.json`. Common causes:
- Missing comma between items
- Extra comma after the last item in a list
- Missing quotation marks around a string
- Use a JSON validator like https://jsonlint.com to find the error

**"Changes not showing on live site"**
- Make sure you ran `git push`
- Wait 1-2 minutes for GitHub Pages to rebuild
- Hard-refresh your browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**"Git says 'permission denied'"**
Your Personal Access Token may have expired. Generate a new one in GitHub > Settings > Developer settings > Personal access tokens.
