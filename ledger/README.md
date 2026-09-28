# Ledger

Ledger is a standalone, bilingual Theme for [escaping](https://github.com/geoqiao/escaping),
part of the [escaping-themes](https://github.com/geoqiao/escaping-themes) repository.
Its layout takes cues from a printed field journal: warm paper, ruled sections, compact dates, and a restrained accent. It uses only local CSS and JavaScript assets.

## Compatibility

- Theme API **4**.
- No `extends` dependency and no external font or JavaScript CDN.
- Interface strings are included for English (`en`) and Chinese (`zh`); `zh-CN` selects the Chinese strings.
- The accent is a typed colour option. Theme-owned assets use escaping's `url` filter and work under a site path.

## Pages

Ledger provides a template for every API 4 page kind:

- `home.html`, `blog.html`, `post.html`
- `ideas.html`, `idea.html`
- `about.html`
- `tags.html`, `tag.html`
- `projects.html`
- `page` templates `now.html` and `project.html`
- `404.html`

All standard sections are enabled in the example below. A site may turn off Ideas, About, Tags, or Projects with the corresponding `pages.*: false`; Home and the Blog remain available. The per-project page requires a project list. Comments require the site's Utterances setup; Mermaid diagrams use the runtime bundled with escaping.

## Use it

```yaml
theme:
  use: github.com/geoqiao/escaping-themes/ledger@v1.0.0
  options:
    accent_color: "#b65d3f"
    show_issue_number: false
    now_text: "正在整理开源工具、记录过程，并持续学习。"
```

With escaping 0.4.0 or later, point `theme.use` at that GitHub address;
escaping downloads the Theme. To update, change the version after `@`. To
customize a few files, make a site-owned folder with a `theme.yaml`
containing `api: 4` and
`extends: github.com/geoqiao/escaping-themes/ledger@v1.0.0`, set
`theme: {use: ./theme}`, and add only the files you want to replace —
`@ledger/` reaches the originals. See escaping's
[guide to using a Theme from GitHub](https://github.com/geoqiao/escaping/blob/main/docs/themes/authoring.md#using-a-theme-from-github).

With escaping 0.3.0, which does not download Themes, copy this folder into
your site as `themes/ledger/` and set `theme: {use: ./themes/ledger}`.

`accent_color` accepts an empty value, `#rgb`, or `#rrggbb`. `show_issue_number` is a boolean that controls the Issue reference on post, idea, and Issue-backed About pages. `now_text` is the short text shown on `/now/`.

## Site page settings

Add these settings for the extra pages and moved Blog used by Ledger:

```yaml
pages:
  blog: /posts/
  ideas: true
  tags: true
  projects: true
  about: true
  extra:
    - path: /now/
      template: now.html
    - path: /projects/{slug}/
      template: project.html
      for_each: projects
```

The project detail page links to each configured project's repository or website. A website-only project needs both a `slug` and a `title`. Site navigation is configured separately under `site.navigation.items`.

## Search, comments, and diagrams

The search form reads escaping's generated `/search.json` index. It searches titles, summaries, and tags in the browser and creates result links with `textContent`. The Theme does not need a search service or index build step.

Issue-backed post, idea, and About templates render the shared comments script when `comments.enabled` is true. Configure an Utterances repository and authorize the [Utterances GitHub App](https://github.com/apps/utterances) there. Profile-based About pages do not show comments.

Post, idea, and Issue-backed About pages include escaping's Mermaid loader, which activates for Mermaid code blocks. The loader and runtime are supplied by escaping.

Before deploying, run `escpe theme check --config config.yaml` and build the site with its saved Issues.

## License

MIT, see [LICENSE](LICENSE).
