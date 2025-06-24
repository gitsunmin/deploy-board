# Deploy Board

Project to show the progress of deployment when multiple services are deployed simultaneously

## Usage

### Development

```shell
# Install dependencies
bun install

# Start the server
bun watch:all
```

## Web

### Hosting

```shell
bunx localtunnel --port 3000 --subdomain boroployment --print-requests
```

## Server

### https

Generate SSL Key on `/apps/server/ssl`

```shell
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=KR/ST=Seoul/L=Seoul/O=Development/OU=IT Department/CN=localhost"
```

## Todo-List
- [x] Show the progress of deployment
- [x] Show the progress of deployment for each service
- [x] Change root page ui to Board Style
- [x] Environment variables
- [x] Implement UI to display deployment order
- [ ] Create Admin Account System
    - [ ] Develop Admin Login Page
    - [ ] Implement Admin Authentication
- [x] Provide individual deployment complete button
- [ ] Apply Relay
