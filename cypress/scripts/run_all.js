const { exec } = require("child_process");

console.log("\x1b[36m%s\x1b[0m", "Opening React, Angular, Vue apps");

exec(`sh ${__dirname}/run_react.sh`, (error, stdout, stderr) => {
  if (error) {
    console.error("\x1b[31m%s\x1b[0m", "Error from React app");
    console.error(error.message);
    return;
  }
  console.log(stdout);
});
exec(`sh ${__dirname}/run_angular.sh`, (error, stdout, stderr) => {
  if (error) {
    console.error("\x1b[31m%s\x1b[0m", "Error from Angular app");
    console.error(error.message);
    return;
  }
  console.log(stdout);
});
exec(`sh ${__dirname}/run_vue.sh`, (error, stdout, stderr) => {
  if (error) {
    console.error("\x1b[31m%s\x1b[0m", "Error from Vue app");
    console.error(error.message);
    return;
  }
  console.log(stdout);
});
