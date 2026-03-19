#step 1: build 
FROM node:25-alpine3.22 AS builder

# step 2 build bash ,git ,and  buid tools 
RUN apk add --no-cache bash git openssh

# seep 3 set working directory 
WORKDIR /app 

# step 4 copy package.json and package-lock.json to the working directory
COPY package*.json ./

# step 5 install dependencies
RUN npm install


# staep 6 copy the rest of the application code to the working directory
COPY . .

# step 7 build the application
RUN npm run build

# step 8: production image


