#!/bin/bash

# Run next-app (Next 14) on host 127.0.0.1, port 3002

SCRIPT_DIR=$(dirname "$0")

cd "${SCRIPT_DIR}/../apps/next-app"
npm install
npm run build
npm start
