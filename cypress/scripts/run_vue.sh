#!/bin/bash

# Run vue-app (Vue v3.3.4) on host 0.0.0.0, port 3001

SCRIPT_DIR=$(dirname "$0")

cd "${SCRIPT_DIR}/../apps/vue-app"
npm install
npm run dev
