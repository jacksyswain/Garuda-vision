#!/bin/bash

CAMERA_NAME=$1
RTSP_URL=$2

CONFIG_FILE="../mediamtx.yml"

if [ -z "$CAMERA_NAME" ] || [ -z "$RTSP_URL" ]; then
  echo "Usage: ./generate-path.sh <camera_name> <rtsp_url>"
  exit 1
fi

echo "Adding camera: $CAMERA_NAME"

cat >> $CONFIG_FILE <<EOL

  $CAMERA_NAME:
    source: $RTSP_URL
EOL

echo "Camera path added to mediamtx.yml"
echo "Restart MediaMTX to apply changes."