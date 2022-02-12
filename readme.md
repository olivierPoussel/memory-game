# Memory card game 
> **Stack Technique : Symfony API Plateform et React sur Rasberry pi.**

## Prérequis
Installer au minimum :

* git
* php
* [composer](https://getcomposer.org/download/)
* [nodejs LTS](https://snapcraft.io/install/node/raspbian)
* [symfony cli](https://symfony.com/download)
  * Vérifier les dépendances PHP nécessaires pour Symfony
    * ```bash
        symfony check:requirements
      ``` 
## Récupération du projet
```bash
git clone https://github.com/olivierPoussel/memory-game.git
```
## Configurer la BDD et l'API
Dans le fichier .env à la racine du projet, modifier la ligne DATABASE_URL avec les informations de votre utilisateur MySQL. Modifier ausis la ligne API_URL, avec l'ip externe de votre serveur et le port si ce n'est pas le port 80.
```conf
# [...]
DATABASE_URL="mysql://<db_user>:<db_password>@127.0.0.1:3306/memory"
# [...]
API_URL="'http://<IpDeVotreServeur>:<LePort?>/'"
```
## Initialisation du projet
```bash
composer install
npm install
npm run build
php bin/console doctrine:database:create
php bin/console doctrine:migration:migrate
php bin/console doctrine:fixtures:load
```

## Démarrer le serveur php manuellement
Si vous avez symfony-cli :
```bash
symfony server:start
# ou 
symfony serve
```
Si vous n'avez pas symfony-cli :
```bash
php -S localhost:8000 -t public
```
Le site est maintenant disponible sur l'adresse http://localhost:8000/

## Vhost Apache2

voir le cours, [la doc apache](https://httpd.apache.org/docs/current/vhosts/) ou [la doc symfony](https://symfony.com/doc/current/setup/web_server_configuration.html#web-server-apache-mod-php)
