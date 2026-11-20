#!/bin/bash
# Exporte chaque écran HTML de ce dossier en PNG (2x) dans assets/images/screens/.
# Utilisation : bash mockups/screens/export.sh   (depuis la racine du projet)
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="../../assets/images/screens"
mkdir -p "$OUT"
taille() {
  case "$1" in
    ordi-*) echo "960,480" ;;
    tel-*)  echo "360,760" ;;
    tab-*)  echo "760,480" ;;
  esac
}
for f in ordi-*.html tel-*.html tab-*.html; do
  nom="${f%.html}"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
    --virtual-time-budget=4000 --window-size="$(taille "$f")" \
    --screenshot="$PWD/$OUT/$nom.png" "file://$PWD/$f" >/dev/null 2>&1
  echo "✓ $nom.png"
done
