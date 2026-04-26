# Sagar Gharti Interactive Portfolio Website

This is a complete static portfolio website system. It is designed for GitHub Pages, but it also runs locally from your computer.

You do not need to learn HTML, CSS, or JavaScript for normal updates. Most routine updates are done by editing simple text files:

- `data/site.json` for your profile, projects, skills, education, thesis links, and publication links
- `posts/*.md` for blog posts
- `posts/posts.json` for the list of blog posts
- `assets/images/projects/` for project pictures
- `assets/cv/Sagar-Gharti-CV.pdf` for your CV

## What is included

- Interactive homepage
- Animated hero background
- Dark and light mode toggle
- Project search and filter system
- Project pop-up detail cards
- Placeholder image for every project
- Blog system using Markdown files
- Thesis and publication placeholder section
- Local computer server scripts
- Beginner guide
- GitHub Pages ready file structure

## Folder map

```text
sagar-gharti-interactive-portfolio/
├── index.html                     Main website page
├── blog.html                      Blog list page
├── post.html                      Individual blog post page
├── content-editor.html            Helper page to generate blog post files
├── styles.css                     Website design
├── script.js                      Website interactivity
├── data/
│   └── site.json                  Main editable portfolio content
├── posts/
│   ├── posts.json                 List of blog post files
│   ├── 2026-04-25-welcome.md      Sample blog post
│   └── 2026-04-25-research-notes-template.md
├── assets/
│   ├── cv/Sagar-Gharti-CV.pdf
│   └── images/
│       ├── profile-placeholder.svg
│       ├── blog/blog-placeholder.svg
│       └── projects/              Project placeholder images
├── docs/
│   └── START_HERE.md              Detailed beginner instructions
├── start-local-windows.bat        Double-click on Windows
├── start-local-mac-linux.sh       Run on Mac or Linux
└── .nojekyll                      Keeps GitHub Pages simple for this static site
```

## Run it from your computer

### Windows

1. Unzip the website folder.
2. Open the folder.
3. Double-click `start-local-windows.bat`.
4. Your browser should open `http://localhost:8000`.

If it does not open automatically, manually open this address in your browser:

```text
http://localhost:8000
```

### Mac or Linux

1. Unzip the website folder.
2. Open Terminal.
3. Go to the folder.
4. Run:

```bash
chmod +x start-local-mac-linux.sh
./start-local-mac-linux.sh
```

Then open:

```text
http://localhost:8000
```

## Important note

Do not open `index.html` by double-clicking it. Some blog and project data may not load correctly because browsers block local file loading. Use the local server scripts instead.

## How to edit your projects

Open:

```text
data/site.json
```

Find this section:

```json
"projects": [
```

Each project has fields like:

```json
{
  "id": "nutrient-transport",
  "title": "Nutrient Transport in Trabecular Bone",
  "subtitle": "CFD model for convection-diffusion behavior in porous biological flow",
  "category": ["CFD", "Biofluids", "Research"],
  "image": "assets/images/projects/nutrient-transport-cfd.svg",
  "summary": "Short project summary here.",
  "links": [
    { "label": "Add thesis link", "url": "#" }
  ]
}
```

Change the text inside the quotation marks. Be careful with commas.

## How to replace project pictures

Easy method:

1. Go to `assets/images/projects/`.
2. Find the placeholder image for the project.
3. Replace it with your real image using the exact same file name.
4. Refresh the website.

For example, replace:

```text
assets/images/projects/droplet-coaxial-jet.svg
```

with your own image. If your image is PNG or JPG and you change the filename, update the `image` path in `data/site.json`.

Recommended image size: 1200 by 900 px.

## How to add a blog post

### Method 1: Use the included helper page

1. Run the local website.
2. Open:

```text
http://localhost:8000/content-editor.html
```

3. Fill out the form.
4. Click `Download Markdown post`.
5. Move the downloaded `.md` file into the `posts` folder.
6. Open `posts/posts.json`.
7. Add the new file name to the list.

Example:

```json
[
  "2026-04-25-welcome.md",
  "2026-04-25-research-notes-template.md",
  "2026-05-01-my-new-post.md"
]
```

### Method 2: Copy the template

1. Copy this file:

```text
posts/2026-04-25-research-notes-template.md
```

2. Rename it using this format:

```text
YYYY-MM-DD-short-title.md
```

3. Edit the title, date, tags, excerpt, and main content.
4. Add the new filename to `posts/posts.json`.

## How to add thesis and publication links

Open:

```text
data/site.json
```

Find this section:

```json
"publications": [
```

Change placeholders like this:

```json
{
  "type": "Thesis",
  "title": "Your thesis title",
  "venue": "ERAU Scholarly Commons",
  "year": "2026",
  "url": "https://your-link-here",
  "status": "Published"
}
```

## Recommended beginner workflow

1. Edit locally on your computer.
2. Run the local server.
3. Check the website in your browser.
4. Fix mistakes if needed.
5. Commit and push changes to GitHub.
6. GitHub Pages updates the public website.

## GitHub Pages deployment summary

The simplest setup is:

1. Create a GitHub account.
2. Create a new repository named exactly:

```text
yourusername.github.io
```

3. Upload all files from this folder into that repository.
4. Go to repository `Settings`.
5. Go to `Pages`.
6. Choose `Deploy from a branch`.
7. Choose branch `main` and folder `/root`.
8. Save.
9. Your website should appear at:

```text
https://yourusername.github.io
```

Official GitHub Pages docs:

- https://docs.github.com/pages/quickstart
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Common mistakes

### My blog does not show up

Check that the new post filename is listed in `posts/posts.json`.

### My website does not load locally

Make sure you opened it through:

```text
http://localhost:8000
```

Do not open the file directly.

### My project image is broken

Check the image path in `data/site.json`. The file name must match exactly.

### GitHub Pages is not updating

Wait a few minutes, then check the repository `Actions` tab or the `Settings > Pages` page.

## Safe public website note

I did not put your phone number on the website because public websites are easy for bots to scrape. Your email and LinkedIn are included.
