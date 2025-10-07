const concat = require("gulp-concat");
const { src, dest, task } = require("gulp");
const { getFolders } = require("./scripts/buildUtils.js");
const fs = require("fs");
const order = require("gulp-order");
const replace = require("gulp-replace");
const { version } = require("./package.json");
const { default: generateSri } = require("./scripts/generateSri.mjs");

exports.default = task("build-readme", () => {
  return src("docs/*.md")
    .pipe(
      order([
        "HEADER.md",
        "INSTALLATION.md",
        "Imports.md",
        "Attributes.md",
        "Events.md",
        "Slots.md",
        "Stylings.md",
        "Angular.md",
        "React.md",
        "Vue.md"
      ])
    )
    .pipe(concat("README.md"))
    .pipe(dest("."));
});

exports.default = task("concat-stories-js", done => {
  const components = getFolders("./src/components");
  components.forEach(c => {
    if (fs.existsSync(`stories/templates/${c}/additional.stories.js`)) {
      return src([`stories/components/${c}.stories.js`, `stories/templates/${c}/additional.stories.js`])
        .pipe(concat(`${c}.stories.js`))
        .pipe(dest("stories/components"));
    } else return done();
  });
});

exports.default = task("concat-storybook-mdx", done => {
  const components = getFolders("./src/components");
  components.forEach(c => {
    if (fs.existsSync(`stories/templates/${c}/additional.mdx`)) {
      return src([`stories/components/${c}.mdx`, `stories/templates/${c}/additional.mdx`])
        .pipe(concat(`${c}.mdx`))
        .pipe(dest("stories/components"));
    } else return done();
  });
});

exports.default = task("replace-version-and-sri", async () => {
  return src("docs/templates/INSTALLATION.md")
    .pipe(replace(/<version>/g, version))
    .pipe(replace(/<subresource-integrity-entrypoint>/g, await generateSri("lib/index.umd.min.js")))
    .pipe(replace(/<subresource-integrity-masthead>/g, await generateSri("lib/components/Masthead/index.umd.min.js")))
    .pipe(dest("./docs"));
});
