FROM node:lts-alpine
############ Prepare the env ###########
# # RUN apk update && apk add git
# RUN apk add --no-cache bash \
#     && apk add --no-cache curl \
#     && echo 'alias ll="ls -rlta"' >> ~/.bashrc
#----------Switch to bash (sh is used by default----
# SHELL ["/bin/bash", "-c"] 
#--------------------------
# RUN echo 'alias ll="ls -rlta"' >> ~/.bashrc
########################################
####### ENVIRONMENT VARIABLES ###############
ENV NODE_ENV=production
ARG PORT_ARG=3333
ARG SERVER_TIMEOUT_ARG=20000
ARG DS_URL_ARG='mongodb+srv://'
ARG AUTH_SERVER_ARG=http://localhost:3002
ARG CERTID_ARG=5

ENV PORT=$PORT_ARG
ENV SERVER_CERT=$SERVER_CERT_ARG
ENV CERTID=$CERTID_ARG
ENV SERVER_TIMEOUT=$SERVER_TIMEOUT_ARG
ENV DS_URL=$DS_URL_ARG
ENV ARG AUTH_SERVER=$ARG AUTH_SERVER_ARG
###############################################
# -- these configuration command are executed in the root user namespace --
RUN mkdir -p /home/node/app/node_modules \
    && chown -R node:node /home/node/app/node_modules
WORKDIR /home/node/app
COPY ["package.json", "./"]
# -- Switch user (application user) --
USER node
# -- Update the application user profile (add aliases and other configurations) --
RUN echo 'alias ll="ls -rlta"' >> ~/.bashrc
COPY ["package-lock.json*", "./"]
COPY --chown=node:node ./package-lock.json .
RUN npm install
COPY --chown=node:node . .
EXPOSE $PORT
ENTRYPOINT ["npm", "run", "beapizer"]
