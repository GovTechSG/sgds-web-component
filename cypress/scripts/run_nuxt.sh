#!/bin/bash

# Run nuxt-app (Nuxt v3.13.0) on host 127.0.0.1, port 3003

SCRIPT_DIR=$(dirname "$0")

cd "${SCRIPT_DIR}/../apps/nuxt-app"
npm install
npm run dev
