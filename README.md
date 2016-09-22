# PostCSS Exclude Classes [![Build Status][ci-img]][ci]

[PostCSS] plugin to exclude named classes. Blacklist items are parsed as regular expressions.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/danielsamuels/postcss-exclude-classes.svg
[ci]:      https://travis-ci.org/danielsamuels/postcss-exclude-classes

```css
.foo {
    /* Input example */
}

.bar {

}
```

```css
.bar {

}
```

## Usage

```js
postcss([ require('postcss-exclude-classes')({
  blacklist: ['\.foo']
}) ])
```

See [PostCSS] docs for examples for your environment.
