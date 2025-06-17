# MyAch Pro Tir List - Client

Клиентское приложение для Telegram WebApp, позволяющее пользователям голосовать за игроков и создавать тир-листы.

## Установка

```bash
npm install
```

## Настройка окружения

Создайте файл `src/config.ts` со следующим содержимым:

```typescript
// API URL - путь к вашему бэкенду
export const API_URL = 'http://localhost:3000/api';
```

Для продакшена можно использовать переменные окружения. Создайте `.env` или `.env.production`:

```
VITE_API_URL=https://your-backend-url.com/api
```

## Запуск для разработки

```bash
npm run dev
```

## Сборка для продакшена

```bash
npm run build
```

## Telegram WebApp интеграция

### Тестирование в режиме разработки

1. Запустите бэкенд и клиент локально
2. Используйте [ngrok](https://ngrok.com/) для создания публичного URL:
   ```bash
   ngrok http 5173  # или другой порт, на котором запущен Vite
   ```
3. Используйте полученный URL для настройки WEB_APP_URL в бэкенде
4. Перейдите к боту в Telegram и нажмите кнопку "Открыть Тир-лист игроков"

### Структура проекта

- `src/api.ts` - API клиент для взаимодействия с бэкендом
- `src/types/` - TypeScript интерфейсы
- `src/contexts/` - React контексты для управления состоянием
  - `UserContext.tsx` - Управление данными пользователя Telegram
  - `GameContext.tsx` - Управление процессом игры и голосования
- `src/pages/` - Страницы приложения
  - `Welcome.page.tsx` - Приветственный экран
  - `Guide.page.tsx` - Инструкции для пользователя
  - `Game.page.tsx` - Основной игровой процесс

## Взаимодействие с Telegram WebApp

В приложении используются следующие возможности Telegram WebApp:

- `window.Telegram.WebApp.initData` - Получение данных пользователя
- `window.Telegram.WebApp.ready()` - Сигнал о готовности приложения
- `window.Telegram.WebApp.expand()` - Развертывание на весь экран

При разработке без Telegram окружения, вы можете использовать заглушки для этих методов.
