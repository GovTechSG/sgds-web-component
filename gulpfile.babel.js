const concat = require("gulp-concat");
const { src, dest, task } = require("gulp");
const { getFolders } = require("./scripts/buildUtils.js");
const fs = require("fs");

exports.default = task("build-readme", () => {
  return src("docs/*.md").pipe(concat("README.md")).pipe(dest("."));
});

exports.default = task("concat-storybook-mdx", (done) => {
  const components = getFolders("./src");
  components.forEach(c => {
    if (fs.existsSync(`stories/templates/${c}/additional.mdx`)) {
      return src([`stories/components/${c}.stories.mdx`, `stories/templates/${c}/additional.mdx`])
        .pipe(concat(`${c}.stories.mdx`))
        .pipe(dest("stories/components"));
    } else return done();
  });
});
