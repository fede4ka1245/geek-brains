## Backend documentation
### Run in dev mode
* Make .env file with these vars:
```
REACT_APP_SERVER_API= //url where your bot (backend) is located
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


