# Project Media Management Guide

How to add images, videos, PDFs, and slides to your projects without coding.

---

## How Media Works Now

Each project can have multiple media files:
- **Images** (PNG, JPG, SVG) — thumbnails, screenshots, plots
- **Videos** (MP4, WebM) — simulations, demonstrations
- **PDFs** (PDF) — reports, papers, research documents
- **Presentations** (PPTX, PDF) — slides, presentations (users download)

When someone clicks your project, they see a **media gallery** with all your files, not just one image.

---

## File Organization

```
assets/images/projects/
├── nutrient-transport/
│   ├── thumbnail.png           ← Shows on the card
│   ├── simulation-snapshot.png  ← In the gallery
│   ├── velocity-field.png
│   ├── simulation-video.mp4     ← Video plays in browser
│   └── research-report.pdf      ← PDF link/download
├── droplet-dynamics/
│   ├── thumbnail.png
│   ├── main-animation.mp4
│   └── experimental-comparison.pdf
└── your-new-project/
    ├── thumbnail.png
    └── ...other media files
```

**OR** keep them flat (easier):

```
assets/images/projects/
├── nutrient-transport-thumbnail.png
├── nutrient-transport-simulation.png
├── nutrient-transport-video.mp4
├── nutrient-transport-report.pdf
└── ...
```

---

## Step-by-Step: Add Media to a Project

### Example: Adding media to "Nutrient Transport" project

**Step 1: Prepare your files**

Get your media ready:
- Screenshot: `nutrient-snapshot.png` (800x500 pixels)
- Video: `nutrient-simulation.mp4` (MP4 format)
- Report: `nutrient-report.pdf`

**Step 2: Upload files to the right folder**

Put all three files in: `assets/images/projects/`

**Step 3: Edit `data/site.json`**

Open `data/site.json` in a text editor and find the "Nutrient Transport" project. It looks like this:

```json
{
  "id": "nutrient-transport",
  "title": "Nutrient Transport in Trabecular Bone",
  "subtitle": "CFD model for convection-diffusion behavior in porous biological flow",
  "category": ["CFD", "Biofluids", "Research"],
  "status": "Research project",
  "image": "assets/images/projects/nutrient-transport-cfd.svg",
  "tools": ["STAR-CCM+", "CFD", "Porous flow", "Convection-diffusion"],
  "summary": "Developing CFD-based models...",
  "details": [
    "Formulated simulation workflows...",
    "Connected transport efficiency...",
    "Designed the project as a bridge..."
  ],
  "links": [
    { "label": "Add thesis link", "url": "#" },
    { "label": "Add project report", "url": "#" }
  ]
}
```

**Add a `media` section after the `image` line:**

```json
{
  "id": "nutrient-transport",
  "title": "Nutrient Transport in Trabecular Bone",
  "subtitle": "CFD model for convection-diffusion behavior in porous biological flow",
  "category": ["CFD", "Biofluids", "Research"],
  "status": "Research project",
  "image": "assets/images/projects/nutrient-transport-cfd.svg",
  "media": [
    {
      "type": "image",
      "url": "assets/images/projects/nutrient-snapshot.png",
      "label": "Simulation snapshot"
    },
    {
      "type": "video",
      "url": "assets/images/projects/nutrient-simulation.mp4",
      "label": "Full simulation video"
    },
    {
      "type": "pdf",
      "url": "assets/images/projects/nutrient-report.pdf",
      "label": "Research report PDF"
    }
  ],
  "tools": ["STAR-CCM+", "CFD", "Porous flow", "Convection-diffusion"],
  "summary": "Developing CFD-based models...",
  "details": [
    "Formulated simulation workflows...",
    "Connected transport efficiency...",
    "Designed the project as a bridge..."
  ],
  "links": [
    { "label": "Add thesis link", "url": "#" },
    { "label": "Add project report", "url": "#" }
  ]
}
```

**Step 4: Save and push**

```
git add -A
git commit -m "Added media gallery to nutrient transport project"
git push
```

Wait 1-2 minutes. Go to your website, click the project, and you'll see the media gallery!

---

## Media Types & Formats

### Images
- **Format:** PNG, JPG, SVG
- **Size:** 800x500 pixels or larger (wider is fine)
- **Best for:** Screenshots, plots, diagrams, photos
- **JSON:**
```json
{
  "type": "image",
  "url": "assets/images/projects/my-screenshot.png",
  "label": "What this image shows"
}
```

### Videos
- **Format:** MP4, WebM
- **Size:** Keep under 50 MB (compress if needed)
- **How to compress MP4:** Use handbrake.fr (free, no coding)
- **Best for:** Animations, simulations, demonstrations
- **JSON:**
```json
{
  "type": "video",
  "url": "assets/images/projects/my-animation.mp4",
  "label": "Simulation animation"
}
```

### PDFs
- **Format:** PDF
- **Best for:** Reports, research papers, technical documents
- **Users can:** View online or download
- **JSON:**
```json
{
  "type": "pdf",
  "url": "assets/images/projects/my-report.pdf",
  "label": "Full research report"
}
```

### PowerPoint / Presentations
- **Format:** PPTX or PDF
- **Best for:** Slides, conference presentations
- **JSON:**
```json
{
  "type": "pdf",
  "url": "assets/images/projects/my-slides.pdf",
  "label": "Conference presentation"
}
```
(Convert PPTX to PDF first using Office or Google Slides)

---

## Copy-Paste Template

Here's a template. Copy this and fill in your own data:

```json
{
  "id": "my-project-id",
  "title": "Your Project Title",
  "subtitle": "One-line description",
  "category": ["CFD", "Research"],
  "status": "Research project",
  "image": "assets/images/projects/my-project-thumbnail.png",
  "media": [
    {
      "type": "image",
      "url": "assets/images/projects/my-project-image1.png",
      "label": "First image label"
    },
    {
      "type": "image",
      "url": "assets/images/projects/my-project-image2.png",
      "label": "Second image label"
    },
    {
      "type": "video",
      "url": "assets/images/projects/my-project-video.mp4",
      "label": "Video demonstration"
    },
    {
      "type": "pdf",
      "url": "assets/images/projects/my-project-report.pdf",
      "label": "Research report"
    }
  ],
  "tools": ["Tool1", "Tool2", "Tool3"],
  "summary": "A short summary of your project.",
  "details": [
    "First detail point.",
    "Second detail point.",
    "Third detail point."
  ],
  "links": [
    { "label": "GitHub repo", "url": "https://github.com/..." },
    { "label": "Paper", "url": "https://..." }
  ]
}
```

---

## Common Questions

**Q: What if I only have one image?**
A: That's fine! Just add one object to the `media` array:
```json
"media": [
  {
    "type": "image",
    "url": "assets/images/projects/my-screenshot.png",
    "label": "Simulation result"
  }
]
```

**Q: Can I mix images and videos?**
A: Yes! Add as many as you want. The gallery will show them all.

**Q: My MP4 video is too large. What do I do?**
A: Use Handbrake (free software) to compress:
1. Download from handbrake.fr
2. Drag your video into Handbrake
3. Click "Start Encode"
4. It'll create a smaller MP4

**Q: Can I add YouTube videos?**
A: Not yet, but I can add that feature. For now, download and upload as MP4.

**Q: What if I mess up the JSON?**
A: Use jsonlint.com to check for errors. It will point out exactly what's wrong.

---

## Troubleshooting

**Media doesn't show up:**
- Check spelling of filenames (case-sensitive on some systems)
- Make sure file extensions match (`.png` not `.jpg`)
- Validate JSON at jsonlint.com
- Push changes: `git add -A && git commit -m "msg" && git push`
- Wait 1-2 minutes and refresh

**Video won't play:**
- File must be MP4 format
- Try compressing with Handbrake
- Check file size (aim for under 50 MB)

**PDF link doesn't work:**
- Check file path is correct
- Validate JSON
- File must actually exist in that folder
