const concat = require('gulp-concat');
const { src, dest } = require('gulp');

exports.default = function() {
  return src('docs/*.md')
    .pipe(concat('README.md'))
    .pipe(dest('.'));
}