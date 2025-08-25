#!/bin/bash

# Run react-app (React v19.1.1) on host 127.0.0.1, port 3000

SCRIPT_DIR=$(dirname "$0")

cd "${SCRIPT_DIR}/../apps/react-19-app"
npm install
npm run dev
