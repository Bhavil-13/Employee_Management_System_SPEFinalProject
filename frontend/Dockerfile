FROM node:18.9.1
WORKDIR /app
COPY package.json .
RUN npm install
ENV REACT_APP_API_URL=http://backend:5050
EXPOSE 5173
COPY . .
CMD ["npm", "run", "dev"]