FROM mkenney/npm:node-9-debian

RUN mkdir -p /var/app
WORKDIR /var/app

ADD . ./
RUN npm install
ENTRYPOINT ["npm", "start"]
