@echo off
title 🚀 SaaS Afiliados Pro Start

echo ==========================
echo  INICIANDO SAAS COMPLETO
echo ==========================

echo 🔥 Matando processos Node antigos...
taskkill /F /IM node.exe /T >nul 2>&1

timeout /t 2 >nul

echo 🚀 Iniciando BACKEND...
cd backend
start cmd /k npm run dev

timeout /t 2 >nul

echo 🌐 Iniciando FRONTEND...
cd ../frontend
start cmd /k npm run dev

echo ==========================
echo  SAAS RODANDO COM SUCESSO
echo ==========================

pause