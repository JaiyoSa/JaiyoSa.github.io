#!/usr/bin/env bash
cd "$(dirname "$0")"
echo "Starting local portfolio website..."
echo "Open this in your browser: http://localhost:8000"
if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server 8000
else
  python -m http.server 8000
fi
