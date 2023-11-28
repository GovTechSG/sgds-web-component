#!/bin/bash

# Run angular-app (Angular v17.0.0) on host 0.0.0.0, port 4200

SCRIPT_DIR=$(dirname "$0")

cd "${SCRIPT_DIR}/../apps/angular-app"
npm install
npm start
