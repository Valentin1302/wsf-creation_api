# WSF Creation API - API REST de Gestion de Jeux vidéos

## Description

Création d'une API REST avec Node.js et Express permettant la gestion d'un catalogue de jeux vidéo. Celui-ci implémente le versioning, l'internationalisation et HATEOAS.

## Fonctionnalités

### Gestion des ressources
- **Jeux (Games)** : CRUD complet avec relations vers éditeurs et catégories
- **Éditeurs (Publishers)** : Consultation des éditeurs de jeux
- **Catégories (Categories)** : Consultation des catégories de jeux

### Fonctionnalités avancées
- **Multi-format** : JSON, YAML et XML via négociation de contenu
- **Versioning API** : Support de plusieurs versions d'API (v1, v2)
- **Internationalisation (i18next)** : Support multilingue (EN/FR) avec `Accept-Language`
- **HATEOAS** : Liens hypermédias automatiques pour la navigation REST
- **Validation** : Validation des données entrantes

## Architecture

### Structure du projet

```
wsf-creation_api/
├── server.js              # Point d'entrée de l'application
├── compose.yml            # Configuration Docker Compose
├── package.json           # Dépendances Node.js
├── migrate.js             # Scripts de migration/seed DB
├── game.http              # Exemples de requêtes HTTP
├── controllers/           # Logique métier
│   └── game.js
├── models/                # Modèles Sequelize (ORM)
│   ├── game.js
│   ├── publisher.js
│   ├── category.js
│   ├── connection.js
│   └── index.js
├── routes/                # Définition des routes
│   └── v1/
│       └── game.js
├── middlewares/           # Middlewares Express
│   ├── versioning.js     # Gestion du versioning
│   ├── i18.js            # Internationalisation
│   ├── hateoas.js        # Liens hypermédias
│   ├── format.js         # Négociation de contenu
│   ├── game.js           # Validation
│   └── index.js
├── lib/                   # Utilitaires
│   ├── i18next.js        # Configuration i18next
│   └── versioning.js     # Logique de versioning
└── locales/               # Fichiers de traduction
    ├── en.json
    └── fr.json
```

### Technologies utilisées

- **Node.js** avec **Express 5.x**
- **PostgreSQL** (base de données)
- **Sequelize** (ORM)
- **i18next** (internationalisation)
- **js-yaml** (support YAML)
- **jsontoxml** (support XML)
- **Docker Compose** (conteneurisation)

## Installation

### Prérequis

- Node.js (v14+)
- Docker & Docker Compose
- npm ou yarn

### Installation et démarrage

1. **Cloner le projet**
```bash
git clone <repository-url>
cd wsf-creation_api
```

2. **Démarrer avec Docker Compose**
```bash
docker compose up
```

3. **Installation**
```bash
docker compose exec backend npm install
```

3. **Initialiser la base de données**
```bash
node migrate.js
```

## Configuration

### Variables d'environnement

Les variables sont configurées dans `compose.yml` :

```yaml
- PORT=3000
- DATABASE_URL=postgres://user:password@db:5432/mydatabase
```

## Utilisation de l'API

### Routes disponibles

#### Jeux (Games)

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/v1/games` | Liste tous les jeux |
| POST | `/v1/games` | Crée un nouveau jeu |
| GET | `/v1/games/:id` | Récupère un jeu spécifique |
| PATCH | `/v1/games/:id` | Modifie partiellement un jeu |
| DELETE | `/v1/games/:id` | Supprime un jeu |

### Exemples de requêtes

#### 1. Récupérer tous les jeux (JSON)

```http
GET http://localhost:3000/v1/games
Accept: application/json
```