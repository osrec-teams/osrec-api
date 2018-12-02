# Osrec API

Osrect est une application qui permet de créer ou de participer à des chatrooms.
Ce dépot est la partie API du projet. Pour pouvoir lancer l'application il vous faudra le dépot de la partie client web d'Osrec (LIEN!!!).

# Prè-requis

Avant de pouvoir continuer vous devez avec installé sur votre système :

- Docker (https://docs.docker.com/install/)
- NPM (https://www.npmjs.com/get-npm)
- Node (https://nodejs.org/en/download/package-manager/)

# Installation et lancement

1. Installation de l'API

   Nous utilisons docker-compose pour gérer et facilité l'installation de notre projet.

   Pour commencer il faut lancer linstallation des paquets grâce au gestionnaire npm avec la commande suivante:
   ``
   npm install
   ``

   Pour commencer il vous faudra lancer l'instance Docker avec la commande suivante :
   ``
   sudo systemctl start docker
   ``

   Ensuite, il vous faudra lancer docker-compose grâce à la commande suivante:
   ``
   docker-compose up
   ``

   Pour plus de précision voici le docker-compose.yml :
   ```
   version: '3'
      services:
        db:
          image: postgres:latest
          container_name: osrec-pg
          hostname: osrec-pg
          restart: unless-stopped
          network_mode: "host"
          environment: - POSTGRES_DB=osrec - POSTGRES_USER=${USER} volumes: - ./db/data:/var/lib/postgresql/data
    ```

# Commandes

Si vous le souhaitez vous pouvez lancer les commandes suivantes :

- Pour lancer l'API :
  ``
  npm run start
  ``

- Pour set-up l'API:
  ``
  npm run setup
  ``

- Pour lancer les tests de l'API:
  ``
  npm test
  ``

- Pour executer le linter sur les fichiers de l'API:
  ``
  npm run lint
  ``

- Pour lancer le demon de l'API:
  ``
  npm run nodemon
  ``

- Pour créer une migration des données de la base de données postGres:
  ``
  npm run migrate:make
  ``

- Pour utiliser la dernière migration des données de la base de données postGres:
  ``
  npm migrate:latest
  ``

- Pour faire un retour en arrière des données de la base de données postGres:
  ``
  npm migrate:rollback
  ``

# Contributions

Thibault Miranda de Oliveira (@agaryen) -- thibault@mirandadeoliveira.com

Adrien Muzika (@Muzishell) -- adrienmuzika@gmail.com

Nicolas Godfrin (@Takuan-zero) -- n.godfrin@gmail.com

# License

The MIT License (MIT)

Copyright (c) 2018 Osrec Team

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
