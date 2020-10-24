FROM keymetrics/pm2:10-alpine
RUN apk add --no-cache gcc g++ make python git
ENV NODE_ENV ropsten
WORKDIR /app
ADD package.json /app
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "pm2-runtime", "start", "ecosystem.config.js"]
