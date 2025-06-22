# SignEm Backend Documentation

## Routes API Compte

### GET  `/api/compte/auth`

Renvoie les informations du compte authentifié.

```json
{
    "success":true,
    "isLoggedIn":true,
    "role":"Administrateur",
    "nom":"Doe",
    "prenom":"John",
    "session":"none"
}
```

### POST `/api/compte/login`

Renvoie un jeton d'authentification par les cookies.

Cors de requête :

```json
{
	"captchaToken": "<token>",
	"email": "<adresse email>",
	"mdp": "<mot de passe>"
}
```

### GET `/api/compte/logout`

Détruit le jeton d'identification en renvoyant un cookie obsolète.

### GET `/api/compte/formateur/list`

Revoie la liste des stagiaires relié à la même session que celle du compte formateur.

```json
{
    "success":true,
    "comptes":[
        {"_id":"68488fea5d9fdef9484a37f6","nom":"Wick","prenom":"John","email":"wick@email.com"},
        {"_id":"68489e927448de68f163025f","nom":"Doe","prenom":"John","email":"doe@email.com"}
    ]
}
```

### GET `/api/compte/admin/list`

Renvoie la liste des comptes utilisateurs si authentifié avec compte admin.

```json
{
    "success":true,
    "comptes":[
        {"_id":"68488fea5d9fdef9484a37f6","nom":"Wick","prenom":"John","email":"wick@email.com","tel":"1234567890","role":"Administrateur","sessionId":"none"},
        {"_id":"68489dde7448de68f1630256","nom":"Deer","prenom":"John","email":"deer@email.com","tel":"33 1602 17380","role":"Formateur","sessionId":"6848838ae990a4998f7c5c49"},
        {"_id":"68489e927448de68f163025f","nom":"Rambo","prenom":"John","email":"rambo@email.com","tel":"68422","role":"Stagiaire","sessionId":"68488358e990a4998f7c5c36"},
        {"_id":"68489f6c7448de68f163027d","nom":"Doe","prenom":"John","email":"doe@email.com","tel":"06 94 20 42 04 20","role":"Formateur","sessionId":"68488358e990a4998f7c5c36"}
    ]
}
```

### POST `/api/compte/admin/`

Créé un compte utilisateur si authentifié avec un compte admin.
Propriétée role ne peut être que SansDroits, Stagiaire, Formateur ou Administrateur.

Cors de requête :

```json
{
    "nom": "Doe",
    "prenom": "John",
    "email": "doe@email.com",
    "tel": "01234567",
    "mdp": "password",
    "mdpCheck": "password",
    "role": "Stagiaire",
    "sessionId": "none"
}
```

### PUT `/api/compte/admin/<id de compte>`

Modifie un compte utilisateur si authentifié avec un compte admin.
Propriétée role ne peut être que SansDroits, Stagiaire, Formateur ou Administrateur.

Cors de requête :

```json
{
    "nom": "Doe",
    "prenom": "John",
    "email": "doe@email.com",
    "tel": "01234567",
    "role": "Stagiaire",
    "sessionId": "none"
}
```

### DELETE `/api/compte/admin/<id de compte>`

Supprime un compte utilisateur si authentifié avec un compte admin.

## Routes API emargement

### GET `/api/emargement/<emargement id>?dateDebut=<timestamp ou rien>&dateFin=<timestamp ou rien>`

Renvoie la liste des émargement si authentifié.

```json
{
    "success": true,
    "emargements": [
        {
            "_id": "68574dcda1ee33160d7f7aa5",
            "sessionId": "6848838ae990a4998f7c5c49",
            "formateurId": "68489dde7448de68f1630256",
            "formateurSignature": "<svg></svg>",
            "stagiaireId": "6848b6aec56ea184d4cfbe4c",
            "stagiaireSignature": "<svg></svg>",
            "date": "2025-06-22T00:26:53.415Z",
            "__v": 0
        },
        {
            "_id": "68574cdea1ee33160d7f7a74",
            "sessionId": "6848838ae990a4998f7c5c49",
            "formateurId": "68489dde7448de68f1630256",
            "formateurSignature": "<svg></svg>",
            "stagiaireId": "6848b6aec56ea184d4cfbe4c",
            "stagiaireSignature": "<svg></svg>",
            "date": "2025-06-22T00:22:54.989Z",
            "__v": 0
        }
    ]
}


```


### POST `/api/emargement`

Créé un émargement si authentifié avec un compte formateur ou admin.

Cors de requête :

```json
{
    "signature": "<svg></svg>",
    "stagiaires": ["id de compte", "autre id de compte", "ect"]
}
```

### POST `/api/emargement/<token>`

Permet la signature d'un émargement si authentifié avec un compte relié avec un émargement présent de le JWT de la requête.

```json
{
    "signature": "<svg></svg>",
}
```

## Routes API formation

### GET `/api/formation?nom=<nom>&ouverte=<booléen>`

Renvoie la liste des formations si authentifié.

### POST `/api/formation/admin`

Créé une formation si authentifié avec un compte admin.

```json
{
    "nom": "<Nom de la formation>",
    "ouverte": "<booléen>"
}
```

### PUT `/api/formation/admin/<id de formation>`

Modifie une formation si authentifié avec un compte admin.

```json
{
    "nom": "<Nom de la formation>",
    "ouverte": "<booléen>"
}
```

### DELETE `/api/formation/admin/<id de formation>`

Supprime une formation si authentifié avec un compte admin.

## Routes API session

### GET `/api/session?nom=<nom>&formationId=<id>&dateDebut=<date>&dateFin<date>`

Renvoie la liste des sessions si authentifié.

### POST `/api/session/admin`

Créé une session si authentifié avec un compte admin.

```json
{
    "nom": "<Nom de la session>",
    "formationId": "<id de formation>",
    "dateDebut": "<date de début>",
    "dateFin": "<date de fin de la session>",
    "ouverte": "<booléen>"
}
```

### PUT `/api/session/admin/<id de session>`

Modifie une session si authentifié avec un compte admin.

```json
{
    "nom": "<Nom de la session>",
    "formationId": "<id de formation>",
    "dateDebut": "<date de début>",
    "dateFin": "<date de fin de la session>",
    "ouverte": "<booléen>"
}
```

### DELETE `/api/session/admin/<id de session>`

Supprime une session si authentifié avec un compte admin.
