# Discord-Message-Forwarder
 Weiterleitung von Nachrichten aus einem Channel an ein oder mehrere Webhooks um so mehrere Server miteinander zu verknüpfen.

## Installation
### Docker-Compose
Für die Installation per Docker-Compose kannst du entweder die docker-compose.yml Datei aus dem Repository nutzen oder mit folgendem Code deine docker-compose.yml Datei erstellen:
```yaml
version: '3'
services:
  app:
    restart: unless-stopped
    image: ghcr.io/diepfeiffe/discord-message-forwarder:latest
    environment:
      - DISCORD_TOKEN=DEIN_DISCORD_BOT_TOKEN
      - FORWARD_CONFIG={"channel_id":["WEBHOOK_URL_1","WEBHOOK_URL_2"]} # https://pfeifferserver.de/discord-message-forward-generator.html
```
### Docker
```bash
docker run -d --restart unless-stopped \
  -e DISCORD_TOKEN=DEIN_DISCORD_BOT_TOKEN \
  -e FORWARD_CONFIG='{"channel_id":["WEBHOOK_URL_1","WEBHOOK_URL_2"]}' \
  ghcr.io/diepfeiffe/discord-message-forwarder:latest
```
### Node
```bash
git clone https://github.com/DiePfeiffe/discord-message-forwarder.git
cd discord-message-forwarder
cp .env.example .env
npm install
npm run build
npm run start
```
#### Konfiguration
.env Datei erstellen und folgende Variablen eintragen:
```env
DISCORD_TOKEN=DEIN_DISCORD_BOT_TOKEN
FORWARD_CONFIG={"channel_id":["WEBHOOK_URL_1","WEBHOOK_URL_2"]} # https://pfeifferserver.de/discord-message-forward-generator.html
```
