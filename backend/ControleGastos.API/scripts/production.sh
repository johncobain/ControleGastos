#!/bin/bash

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

if [ ! -f "appsettings.Production.json" ]; then
  echo "Arquivo appsettings.Production.json nao encontrado"
  exit 1
fi

export ASPNETCORE_ENVIRONMENT=Production

echo "Aplicando migrations..."
dotnet ef database update --launch-profile Production

echo "Iniciando API..."
dotnet watch run --launch-profile Production