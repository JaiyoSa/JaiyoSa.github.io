# Start Here: Beginner Guide for Your Portfolio Website

This guide assumes you are new to HTML, CSS, JavaScript, and GitHub.

The good news: for normal updates, you mostly edit text files and replace image files.

## 1. What this website is

This is a static website. That means it does not need a paid server, database, login system, or backend.

It uses:

- HTML for page structure
- CSS for design
- JavaScript for interactivity
- JSON for project and profile content
- Markdown for blog posts

You usually do not need to touch the HTML, CSS, or JavaScript files.

## 2. Install the recommended tools

### Required

Install Python if your computer does not already have it. Python is used only to run the local preview server.

### Strongly recommended

Install Visual Studio Code. It makes editing easier.

Install GitHub Desktop. This is easier than using Git commands when you are new to GitHub.

## 3. Run the website locally

### On Windows

Double-click:

```text
start-local-windows.bat
```

Then open:

```text
http://localhost:8000
```

### On Mac or Linux

Open Terminal in the website folder and run:

```bash
chmod +x start-local-mac-linux.sh
./start-local-mac-linux.sh
```

Then open:

```text
http://localhost:8000
```

## 4. The three files you will edit most

### A. Portfolio content

```text
data/site.json
```

Use this to edit:

- Name
- Role
- Summary
- Skills
- Projects
- Experience
- Education
- Thesis links
- Publication links

### B. Blog post list

```text
posts/posts.json
```

Use this to tell the website which blog posts to display.

### C. Individual blog posts

```text
posts/your-post-name.md
```

Use Markdown files for each blog post.

## 5. How JSON works in simple terms

JSON is a structured text file. It uses pairs like this:

```json
"title": "My Project Title"
```

Only edit the text inside quotation marks unless you know what you are doing.

Important rules:

- Keep quotation marks.
- Keep commas between items.
- Do not add a comma after the last item in a list.
- Use plain double quotes, not smart quotes.

Good:

```json
"title": "Droplet Dynamics"
```

Bad:

```json
"title": “Droplet Dynamics”
```

## 6. Add or update a project

Open:

```text
data/site.json
```

Find:

```json
"projects": [
```

Copy an existing project block and paste it below another project block.

Change:

- `id`
- `title`
- `subtitle`
- `category`
- `status`
- `image`
- `tools`
- `summary`
- `details`
- `links`

Keep the same structure.

## 7. Replace project images

Go to:

```text
assets/images/projects/
```

You can replace the placeholders with:

- STAR-CCM+ screenshots
- Mesh images
- Contour plots
- Streamline plots
- Experimental photos
- CAD screenshots
- Conference poster thumbnails

Simplest way:

Use the same filename as the placeholder. Then you do not have to edit `site.json`.

Example:

Replace:

```text
droplet-coaxial-jet.svg
```

with your real image using the same name.

## 8. Add a blog post

### Step 1

Open the local website and go to:

```text
http://localhost:8000/content-editor.html
```

### Step 2

Fill the form and download the Markdown file.

### Step 3

Move the downloaded file into:

```text
posts/
```

### Step 4

Open:

```text
posts/posts.json
```

Add the new filename.

Example:

```json
[
  "2026-04-25-welcome.md",
  "2026-04-25-research-notes-template.md",
  "2026-05-01-cfd-mesh-note.md"
]
```

## 9. Blog post format

Each blog post starts like this:

```text
---
title: My Blog Title
date: 2026-05-01
tags: cfd, thesis, star-ccm
excerpt: One sentence summary of the post.
cover: assets/images/blog/blog-placeholder.svg
---
```

Then write your post below it.

Use headings like:

```text
# Main heading
## Section heading
### Smaller heading
```

Use bullets like:

```text
- First point
- Second point
```

Use links like:

```text
[Link text](https://example.com)
```

Use images like:

```text
![Image description](assets/images/blog/my-image.png)
```

## 10. Upload to GitHub Pages using GitHub Desktop

### First time only

1. Create a GitHub account if you do not have one.
2. Install GitHub Desktop.
3. Create a new repository named exactly:

```text
yourusername.github.io
```

Replace `yourusername` with your GitHub username.

4. Copy all website files into that repository folder.
5. In GitHub Desktop, write a commit message like:

```text
Initial portfolio website
```

6. Click `Commit to main`.
7. Click `Publish repository`.

### Enable GitHub Pages

1. Go to the repository on GitHub.com.
2. Click `Settings`.
3. Click `Pages`.
4. Under source, choose `Deploy from a branch`.
5. Choose `main`.
6. Choose `/root`.
7. Save.

Your site will be:

```text
https://yourusername.github.io
```

## 11. Normal update workflow after the first upload

Every time you update your site:

1. Edit files locally.
2. Run the local server.
3. Check the website in the browser.
4. Open GitHub Desktop.
5. Review changed files.
6. Write a commit message.
7. Click `Commit to main`.
8. Click `Push origin`.
9. Wait for GitHub Pages to update.

## 12. What not to touch at first

Avoid editing these until you are comfortable:

- `script.js`
- `styles.css`
- `index.html`
- `blog.html`
- `post.html`

You can still customize them later, but most content changes do not require touching them.

## 13. What to change first

Start with these small changes:

1. Replace `assets/images/profile-placeholder.svg` with your headshot.
2. Replace 2 or 3 project placeholder images.
3. Update thesis and publication links in `data/site.json`.
4. Add one real blog post.
5. Check the website locally.
6. Upload to GitHub.

## 14. Privacy reminder

Your phone number is not included on the public webpage. Public portfolio websites are crawled by bots, so email and LinkedIn are safer.
