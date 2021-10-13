#base image 
FROM node:current-alpine3.11

#specifying the workdir
WORKDIR /app

#copy the package.json file
COPY package.json .

RUN npm install

#copy everything else
COPY . .

#run command
CMD ["npm","start"]
