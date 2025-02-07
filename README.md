## Documentation for Privasee AI

Video demo of the application:

https://www.loom.com/share/35bd455b0713407b9074d4bdf24df4d4?sid=6cce7d8d-e260-4f67-8b3b-22e276f2a8bb




## Deployment & Packaging

The project is available for setup using Docker or using npm 

## For Frontend

**NOTE:** Please make sure to create and populate the .env file before trying to run the project
 
### Using Docker

```
git clone https://github.com/Toheeb-Ojuolape/privasee-ai.git
cd privasee-app
docker-compose up --build

```

### Using npm

```

git clone https://github.com/Toheeb-Ojuolape/privasee-ai.git
cd privasee-app
npm i
npm run dev

```


## For Backend

**NOTE:** Please make sure to create and populate the .env file before trying to run the project

### Using npm

```

git clone https://github.com/Toheeb-Ojuolape/privasee-ai.git
cd privasee-api
npm install
npm run start

```

### Using Docker for Backend

```

git clone https://github.com/Toheeb-Ojuolape/privasee-ai.git
cd privasee-api
docker-compose up --build

```



## Note
For best experience deploying, I would recommend running the backend first on docker, then running the frontend using npm 
