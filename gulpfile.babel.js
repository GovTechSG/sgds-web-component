const concat = require("gulp-concat");
const { src, dest, task } = require("gulp");
const { getFolders } = require("./scripts/buildUtils.js");
const fs = require("fs");
const order = require("gulp-order");

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

exports.default = task("concat-storybook-mdx", done => {
  const components = getFolders("./src/components");
  components.forEach(c => {
    if (fs.existsSync(`stories/templates/${c}/additional.mdx`)) {
      return src([`stories/components/${c}.stories.mdx`, `stories/templates/${c}/additional.mdx`])
        .pipe(concat(`${c}.stories.mdx`))
        .pipe(dest("stories/components"));
    } else return done();
  });
});
