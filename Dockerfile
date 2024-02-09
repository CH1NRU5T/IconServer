FROM node:20-alpine
# using alpine to reduce the size of the image
WORKDIR /app
# making a directory in the container named app
COPY package.json .
# copying the package.json file to the container
# doing this first so that the dependencies are installed only when the package.json file changes
RUN npm install
# installing the dependencies
COPY . .
# copying the rest of the files to the container
RUN npm run build
# building the project
EXPOSE 8080
# exposing the port 8080
CMD [ "npm", "run", "dev" ]
# running the dev script
