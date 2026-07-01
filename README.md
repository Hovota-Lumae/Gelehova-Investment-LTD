# Building Construction Co.

A template for a static website for a fictitious building/construction company.
The site consists of a handful of HTML pages with associated CSS and
JavaScript and can be viewed in any modern browser.  It’s intended as a
simple demo or starter template for a brochure‑style company site.

---

##  Project structure

```
BuildingConstruction.Co/
├── index.html           ← home page
├── about.html           ← company overview
├── services.html        ← list of services offered
├── projects.html        ← portfolio of completed work
├── team.html            ← staff / contact info
├── quote.html           ← request a quote form
├── contact.html         ← contact details / map
├── css/
│   └── styles.css       ← global styles
└── js/
    └── script.js        ← site scripting (e.g. form handling)
```

Each of the top‑level HTML files links to the others via a common
navigation bar.  The CSS directory holds the stylesheet, and `js/`
contains any client‑side scripts.

---

##  Getting started

1. **Clone the repository**

   ```sh
   git clone https://github.com/christian-fx/BuildingConstruction.Co.git
   cd BuildingConstruction.Co
   ```

2. **Open in browser**

   Simply open any of the `.html` files in your browser, for example:

   ```sh
   start index.html      # Windows
   open index.html       # macOS
   ```

   (No server is required; the site is entirely static.)

3. **Edit**

   Feel free to modify the HTML, CSS and JavaScript to suit your own
   company’s branding, content, or layout.

---

## 🛠️ Development & Deployment

- **Development**  
  Use your preferred editor (VS Code) to make changes. Refresh the
  browser to see updates.

- **Deployment**  
  Copy the contents of this directory (all `.html`, `css/`, `js/`, etc.)
  to any static‑hosting service such as GitHub Pages, Netlify, Vercel,
  or a traditional web server.

---

##  Notes

- This repository is a simple template and does not include a build
  process, package manager, or server‑side code.
- JavaScript is minimal; enhance as needed for form validation,
  analytics, etc.

---

## 🧾 License

You can add your own license here.  For example, include an
[MIT](https://opensource.org/licenses/MIT) or other open‑source license
if you intend to share the code publicly.

---

Happy building! 
