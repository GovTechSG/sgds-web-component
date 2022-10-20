//
// This script runs the Custom Elements Manifest analyzer to generate custom-elements.json
//
const { execSync } = require("child_process");
const commandLineArgs = require("command-line-args");

const { outdir } = commandLineArgs({ name: "outdir", type: String });

// Run the analyzer
console.log("Generating component metadata");
execSync(`cem analyze --litelement --outdir "${outdir}"`, { stdio: "inherit" });
