#!/usr/bin/env bash
set -euo pipefail

# Manage host cron entry for periodic app-links status refresh.

ACTION="${1:-install}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
NPM_BIN="${NPM_BIN:-$(command -v npm || true)}"
CRON_SCHEDULE="${CRON_SCHEDULE:-*/30 * * * *}"
LOG_FILE="${LOG_FILE:-/var/log/realtoken-link-check.log}"
LOCK_FILE="${LOCK_FILE:-/tmp/realtoken-link-check.lock}"
JOB_TAG="# realtoken-app-links-check"

if [[ -z "${NPM_BIN}" ]]; then
  echo "npm not found in PATH. Set NPM_BIN=/absolute/path/to/npm."
  exit 1
fi

JOB_CMD="cd \"${ROOT_DIR}\" && /usr/bin/flock -n \"${LOCK_FILE}\" \"${NPM_BIN}\" run check:app-links >> \"${LOG_FILE}\" 2>&1"
JOB_LINE="${CRON_SCHEDULE} ${JOB_CMD} ${JOB_TAG}"

read_crontab() {
  crontab -l 2>/dev/null || true
}

install_job() {
  local current
  current="$(read_crontab)"
  if printf '%s\n' "${current}" | grep -Fq "${JOB_TAG}"; then
    echo "Cron job already installed."
    exit 0
  fi

  {
    printf '%s\n' "${current}"
    printf '%s\n' "${JOB_LINE}"
  } | crontab -

  echo "Cron job installed:"
  echo "${JOB_LINE}"
}

remove_job() {
  local current
  current="$(read_crontab)"

  if ! printf '%s\n' "${current}" | grep -Fq "${JOB_TAG}"; then
    echo "Cron job not found."
    exit 0
  fi

  printf '%s\n' "${current}" | grep -Fv "${JOB_TAG}" | crontab -
  echo "Cron job removed."
}

status_job() {
  local current
  current="$(read_crontab)"
  printf '%s\n' "${current}" | grep -F "${JOB_TAG}" || echo "Cron job not installed."
}

case "${ACTION}" in
  install)
    install_job
    ;;
  remove)
    remove_job
    ;;
  status)
    status_job
    ;;
  *)
    echo "Usage: $0 [install|remove|status]"
    exit 1
    ;;
esac
