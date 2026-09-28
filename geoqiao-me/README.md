# geoqiao.me

A Chinese-first personal writer Theme for [escaping](https://github.com/geoqiao/escaping),
made for **Theme API 4** (escaping 0.3.0 and later). It is the design that shipped as
escaping's built-in `geoqiao.me` Theme until 0.2, ported to API 4: neutral light
and deep-plum dark surfaces with a magenta-and-mint `GQ` mark, a Home that leads
with the newest post, borderless editorial index rows, a 720px reading column
with an Issue-number rail and a section outline, numbered project rows and a tag
matrix. It uses system fonts and no remote files. The first visit follows the
system's light or dark setting, and a visitor's own choice is remembered. On
narrow screens the menu becomes a panel that closes with Escape and makes the
rest of the page inert while it is open. It does not depend on Quiet.

![Home page, light mode](screenshot.png)

## Install

Write one line in your site's `config.yaml`:

```yaml
theme:
  use: github.com/geoqiao/escaping-themes/geoqiao-me@v1.0.0
```

escaping 0.4.0 and later download this folder at that version on every build.
To update, change the version. To replace a few files, make a folder of your
own with a `theme.yaml` that says `api: 4` and
`extends: github.com/geoqiao/escaping-themes/geoqiao-me@v1.0.0`, add only the files
you change, and set `theme: {use: ./theme}`; `@geoqiao-me/` reaches the
originals. See
[Using a Theme from GitHub](https://github.com/geoqiao/escaping/blob/main/docs/themes/authoring.md#using-a-theme-from-github).
With escaping 0.3.0, copy this folder into your site and set
`use: ./geoqiao-me` instead.

## Pages

Every page escaping knows has a template, so no `pages.*: false` is needed.
Ideas, About, Tags and Projects can each be turned off; the Theme then shows no
link to them, and tags on posts become plain text.

| Page | Template |
| --- | --- |
| Home: the newest post, then the next four | `home.html` |
| Blog and its older pages | `blog.html` |
| Ideas | `blog.html` |
| One tag's posts | `blog.html` |
| Post | `post.html` |
| Idea | `post.html` |
| About (from an Issue or from the profile) | `about.html` |
| Tags | `tags.html` |
| Projects | `projects.html` |
| 404 | `404.html` |

`base.html`, `_macros.html` and `_article_tools.html` are shared parts, not
pages. The Theme ships no templates for `pages.extra`. To add one, put a
template such as `now.html` in this folder:

```jinja
{% extends 'base.html' %}
{% set page_title = 'Now' %}
{% block content %}
<section class="page-shell index-page">
  <header class="page-intro"><h1>Now</h1><p>What I am working on.</p></header>
</section>
{% endblock %}
```

and list it in `config.yaml` under `pages.extra` (`- {path: /now/, template: now.html}`).
A menu item with the page's address is marked as the current page.

The Theme works for sites under a path, such as `https://alice.github.io/notes/`.

## Options

Set these under `theme.options` in `config.yaml`. All of them are optional.

| Option | Type | Default | What it does |
| --- | --- | --- | --- |
| `author_mark` | url | `""` | Image next to the byline on posts and beside the About heading. Empty uses `profile.avatar`, or the bundled `GQ` mark when the site has no avatar. |
| `favicon` | url | `""` | Browser icon. It is also the link-preview image when `seo.social_image` is empty. Empty uses the bundled `GQ` mark. |
| `blog_intro` | string | `""` | The line under the Blog heading. Empty uses the Theme's own text. |
| `show_powered_by` | boolean | `true` | Show the "Source" link in the footer. |
| `powered_by_url` | url | `https://github.com/geoqiao/escaping` | Where the "Source" link points. |
| `comments_theme` | choice | `github-light` | Utterances theme used when `comments_theme_mode` is `fixed`: `github-light`, `github-dark`, `preferred-color-scheme`, `github-dark-orange`, `icy-dark`, `dark-blue`, `photon-dark`, `boxy-light`, `gruvbox-dark`. |
| `comments_theme_mode` | choice | `auto` | `auto` follows the page's light or dark mode; `fixed` always uses `comments_theme`. |

```yaml
theme:
  use: github.com/geoqiao/escaping-themes/geoqiao-me@v1.0.0
  options:
    author_mark: https://github.com/alice.png
    favicon: /assets/images/favicon.png
    blog_intro: 关于代码、阅读和生活的笔记。
```

### Your own mark

The `GQ` mark in `static/images/author-mark.png` and `static/images/favicon.png`
is Geo Qiao's personal mark. On your own site, set `author_mark` and `favicon`
to your images: an HTTPS address, or a file you add to this folder's `static/`
(for example `static/images/me.png`, written as `/assets/images/me.png`).
Replacing the two files with your own under the same names also works. A site
with a `profile.avatar` shows the avatar instead of the mark unless
`author_mark` is set. The two small squares next to the author name in the
header are drawn in CSS.

### Moving from the built-in geoqiao.me Theme

| escaping 0.2 Config | Now |
| --- | --- |
| `theme: {source: builtin, name: geoqiao.me}` | `theme: {use: github.com/geoqiao/escaping-themes/geoqiao-me@v1.0.0}` |
| `branding.show_powered_by` | `theme.options.show_powered_by` |
| `branding.powered_by_url` | `theme.options.powered_by_url` |
| `comments.theme`, `comments.theme_mode` | `theme.options.comments_theme`, `theme.options.comments_theme_mode` |

Assets moved from `/templates/geoqiao.me/static/` to `/assets/`. The stored
light/dark choice keeps its `localStorage` key (`theme`), so returning readers
keep their setting.

## Language

Interface text follows `site.language`: Chinese for `zh` and `zh-CN`, English
otherwise. Section names (Blog, Ideas, Projects, Tags, About) and "Issue" stay
in English in the Chinese text, as in the original design. The menu itself
comes from `site.navigation` in `config.yaml`.

## Comments, diagrams, code

- **Comments** appear on posts, Ideas and an About page from an Issue when
  `comments.enabled: true` in `config.yaml`. They use escaping's shared
  Utterances script; install the [Utterances GitHub App](https://github.com/apps/utterances)
  on the comments repository. A profile About has no comments.
- **Mermaid** diagrams on posts, Ideas and an About page from an Issue use the
  loader and runtime escaping publishes under `/assets/escaping/`; they follow
  the page's light or dark mode when the page loads.
- **Code** is highlighted in the browser by the bundled Prism, with a copy
  button. Code blocks stay dark in both modes.
- There is no search box. escaping still writes `search.json`.

## Credits and licenses

The Theme is MIT licensed; see [LICENSE](LICENSE). It includes one third-party
file:

- `static/js/prism.js` — [PrismJS](https://prismjs.com/) 1.29.0 (languages
  markup, css, clike, javascript, bash, c, csharp, cpp, git, go, java, plsql,
  python, r, ruby, rust, scala, sql, swift, typescript, typoscript, yaml, zig;
  plugins toolbar, copy-to-clipboard, treeview). MIT License:

  > Copyright (c) 2012 Lea Verou
  >
  > Permission is hereby granted, free of charge, to any person obtaining a copy
  > of this software and associated documentation files (the "Software"), to deal
  > in the Software without restriction, including without limitation the rights
  > to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  > copies of the Software, and to permit persons to whom the Software is
  > furnished to do so, subject to the following conditions:
  >
  > The above copyright notice and this permission notice shall be included in
  > all copies or substantial portions of the Software.
  >
  > THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  > IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  > FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  > AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  > LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  > OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  > THE SOFTWARE.

The Mermaid runtime and the comments script are not part of this folder;
escaping publishes them, with their own licenses, under `/assets/escaping/`.
