# How to Add New Projects & Publications

**No coding required.** Just copy-paste and fill in your information.

---

## Adding a New Project (Easy Method)

### Step 1: Create a folder for your project

Create a new folder in `assets/images/projects/`:

```
assets/images/projects/your-project-name/
```

For example: `my-cfd-simulation` or `wind-tunnel-experiment`

### Step 2: Add media files to the folder

Put your files inside:
- `thumbnail.png` — shows on the portfolio card
- `screenshot1.png`, `plot.png` — other images
- `animation.mp4` — simulation video
- `report.pdf` — research paper
- etc.

```
assets/images/projects/my-cfd-simulation/
├── thumbnail.png
├── velocity-field.png
├── pressure-contour.png
├── simulation-video.mp4
└── technical-report.pdf
```

### Step 3: Copy the project template

Open `data/site.json` and find the `"projects"` array. Copy this template and fill it in:

```json
{
  "id": "my-cfd-simulation",
  "title": "Your Project Title",
  "subtitle": "Short one-line description of what this project does",
  "category": ["CFD", "Research"],
  "status": "Research project",
  "image": "assets/images/projects/my-cfd-simulation/thumbnail.png",
  "media": [
    {
      "type": "image",
      "url": "assets/images/projects/my-cfd-simulation/velocity-field.png",
      "label": "Velocity contours at mid-plane"
    },
    {
      "type": "image",
      "url": "assets/images/projects/my-cfd-simulation/pressure-contour.png",
      "label": "Pressure distribution"
    },
    {
      "type": "video",
      "url": "assets/images/projects/my-cfd-simulation/simulation-video.mp4",
      "label": "Full simulation animation"
    },
    {
      "type": "pdf",
      "url": "assets/images/projects/my-cfd-simulation/technical-report.pdf",
      "label": "Technical report"
    }
  ],
  "tools": ["STAR-CCM+", "Python", "MATLAB"],
  "summary": "A longer summary of your project in 2-3 sentences. What problem does it solve? What did you learn?",
  "details": [
    "First thing you did or learned.",
    "Second accomplishment or finding.",
    "Third result or outcome.",
    "Fourth insight or application."
  ],
  "links": [
    { "label": "GitHub repository", "url": "https://github.com/your-username/repo-name" },
    { "label": "Paper on ResearchGate", "url": "https://researchgate.net/..." },
    { "label": "Conference poster", "url": "assets/images/projects/my-cfd-simulation/poster.pdf" }
  ]
}
```

### Step 4: Replace placeholders

Fill in:
- `"id"` — unique short name (no spaces, use hyphens)
- `"title"` — full project name
- `"subtitle"` — one-liner
- `"image"` — path to your thumbnail
- `"media"` — add your actual files here
- `"tools"` — tools you used
- `"summary"` — 2-3 sentence description
- `"details"` — bullet points of what you did
- `"links"` — GitHub, papers, downloads, etc.

### Step 5: Push to GitHub

```
git add -A
git commit -m "Added new project: my-cfd-simulation"
git push
```

Done! Your project appears on your portfolio within 1-2 minutes.

---

## Adding a New Publication

Same as projects! Just fill out the template with publication details.

```json
{
  "id": "my-paper-2026",
  "title": "Research Paper Title",
  "subtitle": "Journal name, 2026",
  "category": ["Research", "Published"],
  "status": "Published research",
  "image": "assets/images/projects/my-paper-2026/thumbnail.png",
  "media": [
    {
      "type": "image",
      "url": "assets/images/projects/my-paper-2026/first-page.png",
      "label": "Paper first page"
    },
    {
      "type": "pdf",
      "url": "assets/images/projects/my-paper-2026/full-paper.pdf",
      "label": "Full paper PDF"
    }
  ],
  "tools": ["CFD", "Research"],
  "summary": "Abstract or summary of the paper.",
  "details": [
    "Main contribution or finding.",
    "Methodology or approach used.",
    "Key results.",
    "Impact or applications."
  ],
  "links": [
    { "label": "Published on journal website", "url": "https://..." },
    { "label": "ResearchGate", "url": "https://researchgate.net/..." }
  ]
}
```

---

## Important Rules

**Commas:** Between items in arrays, use commas. The **LAST** item should NOT have a comma.

```json
"media": [
  { "type": "image", "url": "...", "label": "First" },
  { "type": "image", "url": "...", "label": "Second" }
  ← NO COMMA after last item
]
```

**Quotes:** All field names and string values must have quotes:
```json
✓ "title": "My Project"
✗ title: My Project
```

**File paths:** Use forward slashes `/`, not backslashes:
```json
✓ "assets/images/projects/my-project/file.png"
✗ "assets\images\projects\my-project\file.png"
```

---

## Valid Categories

Use these for filtering on your portfolio:

- CFD
- Biofluids
- Research
- Multiphase
- FSI
- FEA
- Turbulence
- Control
- Coding
- Aerodynamics
- Class project
- Heat transfer
- Experimental
- Structures
- Industry
- Published

Or add new ones — they automatically become filter chips!

---

## Check Your JSON

If you get an error, check for typos:

1. Go to https://jsonlint.com
2. Paste your `site.json`
3. Click "Validate JSON"
4. It will tell you exactly what's wrong

Common mistakes:
- Missing comma between items
- Extra comma after last item
- Missing quotes around text
- Unclosed brackets

---

## Full Project Template (Copy-Paste)

```json
{
  "id": "new-project",
  "title": "Project Title",
  "subtitle": "One-line description",
  "category": ["CFD"],
  "status": "Research project",
  "image": "assets/images/projects/new-project/thumbnail.png",
  "media": [
    {
      "type": "image",
      "url": "assets/images/projects/new-project/image1.png",
      "label": "First image"
    },
    {
      "type": "video",
      "url": "assets/images/projects/new-project/video.mp4",
      "label": "Animation"
    },
    {
      "type": "pdf",
      "url": "assets/images/projects/new-project/report.pdf",
      "label": "Report"
    }
  ],
  "tools": ["Tool1", "Tool2"],
  "summary": "Summary in 2-3 sentences.",
  "details": [
    "Accomplishment 1",
    "Accomplishment 2",
    "Accomplishment 3"
  ],
  "links": [
    { "label": "Link label", "url": "https://..." }
  ]
}
```

---

## Quick Workflow for Adding Projects

1. **Create folder:** `assets/images/projects/my-project/`
2. **Drop files:** `.png`, `.mp4`, `.pdf` into that folder
3. **Edit site.json:** Copy template, fill in your info
4. **Check JSON:** Use jsonlint.com
5. **Push:** `git add -A && git commit -m "Added project" && git push`
6. **Wait 1-2 minutes, refresh browser**
7. **Done!**

That's it. No coding, just organizing files and editing text.
