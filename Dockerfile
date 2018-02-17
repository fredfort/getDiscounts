# Web app
FROM nginx
ADD get_discounts_web/build /usr/share/nginx/html


# NodeJS server
FROM node:carbon
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY get_discounts_api/package*.json ./

 CMD [ "npm", "install" ]
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]
# RUN npm start