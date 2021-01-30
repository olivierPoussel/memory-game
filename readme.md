# Memory card game

## Prérequis
Installer au minimum :

* [git](https://git-scm.com/download/win)
* [php](https://www.apachefriends.org/download.html)
* [composer](https://getcomposer.org/download/)
* [nodejs LTS](https://nodejs.org/en/download/)
* [symfony cli](https://symfony.com/download)

## Récupération du projet
```bash
git clone <repo>
```
## Initialisation du projet
```bash
composer install
npm install
npm run build
```

## Démarrer le serveur php
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
