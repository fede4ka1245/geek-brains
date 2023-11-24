## Backend documentation
### Run in dev mode
* Make .env file with these vars:
```
REACT_APP_API_URL= //url where your bot (backend) is located
REACT_APP_ABOUT_LINK= //Optional. The link with article (or smth) where you describe your bot.
```
* Run commands:
```
npm i
npm run start
```

### Architecture
* **/ui** - bricks components to build app
* **/components** - components build from ui but doesnt have business logic
* **/modules** - components that have zone of own zone responsibility and own business logic
* **/pages** - components where modules grouped
* **/shared and /hooks** - logic to work with other global
  pieces (currently store stickers in Cloud Storage)

## Modules
**Saved stickers** - place where user can get their saved sticker

**App feedback** - async functions which emit custom prompt, confirm, alert

