#!/bin/bash

# Run angular-app (Angular v17.0.0) on host 127.0.0.1, port 4200

SCRIPT_DIR=$(dirname "$0")

cd "${SCRIPT_DIR}/../apps/angular-app"
npm install
npm start
