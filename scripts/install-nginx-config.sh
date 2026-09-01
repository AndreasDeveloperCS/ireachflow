#!/usr/bin/env bash
set -euo pipefail

APP_PATH="${1:?Usage: install-nginx-config.sh <app-path>}"
CONF_NAME="ireachflow.com.conf"
SRC="$APP_PATH/nginx/$CONF_NAME"
DEST="/etc/nginx/sites-available/$CONF_NAME"
LINK="/etc/nginx/sites-enabled/$CONF_NAME"

if [ ! -f "$SRC" ]; then
  echo "Nginx config not found at $SRC"
  exit 1
fi

mkdir -p /var/www/logs/ireachflow

cp "$SRC" "$DEST"
ln -sf "$DEST" "$LINK"

nginx -t
systemctl reload nginx
