# Quiet Notes

A small Theme for [escaping](https://github.com/geoqiao/escaping) that
extends the built-in Quiet Theme, part of the
[escaping-themes](https://github.com/geoqiao/escaping-themes) repository.
Theme API 4.

Quiet Notes changes four things about Quiet:

- A different Home introduction (`home-intro.html`).
- Its own stylesheet and a web font, added to every page's `<head>`
  (`head-extra.html`, `static/css/quiet-notes.css`,
  `static/fonts/quiet-notes-display.ttf`).
- A `now_text` option and a template for a `/now/` page.
- Quiet's `footer_thanks` string, in English and Chinese.

Everything else — every other page, all of Quiet's options and strings —
comes from Quiet unchanged.

## Pages

Quiet Notes has all of Quiet's templates (it only replaces two partials), so
every Quiet page works: Home, Blog, a post, Ideas, an Idea, About, Tags, a
tag, Projects and 404. No `pages.*: false` is required.

It additionally ships a template for one extra page. To turn it on, add this
to the site's `config.yaml`:

```yaml
pages:
  extra:
    - path: /now/
      template: now.html
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `now_text` | string | `Working on notes.` | Shown on `/now/` and in a `<meta name="x-now">` tag on every page. |

All of Quiet's own options (`tagline`, `featured_posts`, `footer_text`,
`show_powered_by`, `accent_color`, `accent_color_dark`, `comments_theme`,
`comments_theme_mode`) are still available; see escaping's
[Quiet docs](https://github.com/geoqiao/escaping/blob/main/docs/themes/quiet.md).

Set options under `theme.options` in `config.yaml`:

```yaml
theme:
  use: github.com/geoqiao/escaping-themes/quiet-notes@v1.0.0
  options:
    tagline: Researcher / tool builder
    now_text: Reading about static site generators and writing small tools.
pages:
  extra:
    - path: /now/
      template: now.html
```

## Use it

With escaping 0.4.0 or later, point `theme.use` at the GitHub address shown
above; escaping downloads the Theme. To update, change the version after
`@`. To customize a few files, make a site-owned folder with a `theme.yaml`
containing `api: 4` and
`extends: github.com/geoqiao/escaping-themes/quiet-notes@v1.0.0`, set
`theme: {use: ./theme}`, and add only the files you want to replace —
`@quiet-notes/` reaches the originals. See escaping's
[guide to using a Theme from GitHub](https://github.com/geoqiao/escaping/blob/main/docs/themes/authoring.md#using-a-theme-from-github).

With escaping 0.3.0, which does not download Themes, copy this folder into
your site as `themes/quiet-notes/` and set `theme: {use: ./themes/quiet-notes}`.

## License

MIT, see [LICENSE](LICENSE).
`static/fonts/quiet-notes-display.ttf` is an original, minimal placeholder
font generated for this Theme (not a redistribution of an existing font); it
is covered by the same MIT license.
