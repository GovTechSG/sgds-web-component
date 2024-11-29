const concat = require("gulp-concat");
const { src, dest, task } = require("gulp");
const { getFolders } = require("./scripts/buildUtils.js");
const fs = require("fs");
const order = require("gulp-order");
const replace = require("gulp-replace");
const { version } = require("./package.json");

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

exports.default = task("replace-version", () => {
  return src("docs/templates/INSTALLATION.md")
    .pipe(replace(/<version>/g, version))
    .pipe(dest("./docs"));
});
