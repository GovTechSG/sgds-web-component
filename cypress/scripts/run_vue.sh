#!/bin/bash

# Run vue-app (Vue v3.3.4) on host 127.0.0.1, port 3001

SCRIPT_DIR=$(dirname "$0")

cd "${SCRIPT_DIR}/../apps/vue-app"
npm install
npm run dev
