#!/bin/bash

# Script to populate quartz/ directory from ReFi-BCN-Website

SOURCE_DIR="../ReFi-BCN-Website/quartz"
TARGET_DIR="./quartz"

echo "📦 Populating Quartz framework directory..."

if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Source directory not found: $SOURCE_DIR"
    echo "Please run this script from the quartz-refi-template directory"
    exit 1
fi

echo "📂 Copying files from $SOURCE_DIR to $TARGET_DIR..."

# Copy all files except README.md (we want to keep our custom one)
rsync -av --exclude='README.md' "$SOURCE_DIR/" "$TARGET_DIR/"

echo "✅ Quartz framework files copied!"
echo ""
echo "📋 Verifying structure..."
ls -la "$TARGET_DIR" | head -15

echo ""
echo "✨ Done! Quartz directory is now populated."

