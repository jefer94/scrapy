FROM node:13

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
    --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src

COPY package.json .
COPY yarn.lock .

# RUN npm i -g yarn 
RUN yarn

COPY . .

CMD ["yarn", "start"]