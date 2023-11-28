#!/bin/bash

# Run react-app (React v18.2.0) on host 0.0.0.0, port 3000

SCRIPT_DIR=$(dirname "$0")

cd "${SCRIPT_DIR}/../apps/react-app"
npm install
npm start
