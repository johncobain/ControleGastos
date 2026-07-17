#!/bin/bash

set -e

export ASPNETCORE_ENVIRONMENT=Development

echo "Aplicando migrations..."
dotnet ef database update

echo "Iniciando API..."
dotnet watch run