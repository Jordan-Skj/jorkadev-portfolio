# Portfolio JorkaDev — version améliorée

Cette version regroupe le site complet, le responsive, les animations, les métadonnées SEO, le référencement local et les fichiers nécessaires à l’indexation.

## 1. Installation

Dans le dossier du projet :

```bash
npm install
npm run dev
```

Vite affiche ensuite l’adresse locale du site. Les changements dans `index.html`, `src/input.css` et `src/script.js` sont surveillés pendant le développement.

Pour générer la version de production :

```bash
npm run build
```

Le résultat optimisé se trouve dans le dossier `dist/`.

## 2. Polices

Inter et Space Grotesk sont déjà incluses localement au format WOFF2. Aucun service de police externe n’est nécessaire.

## 3. Images de projets

Copie tes captures dans `src/images/projects/` avec les noms suivants :

- `gscom.png`
- `socotem.png`
- `piskas-holding.png`

Si une image manque, le site affiche une couverture propre avec le nom du projet au lieu d’une image cassée.

## 4. Publication sur GitHub Pages

Le projet contient déjà le workflow `.github/workflows/deploy-pages.yml`. À chaque envoi sur la branche `main`, GitHub construit le site et publie automatiquement le dossier `dist/`.

1. Crée un dépôt GitHub et envoie ce projet sur la branche `main`.
2. Dans le dépôt, ouvre **Settings → Pages**.
3. Dans **Build and deployment**, choisis **GitHub Actions**.
4. Ouvre l’onglet **Actions** pour suivre le premier déploiement.

Grâce à `base: "./"` dans `vite.config.js`, les images, polices, scripts et styles fonctionnent aussi avec une adresse de type :

```text
https://USERNAME.github.io/REPOSITORY/
```

## 5. Étape SEO obligatoire avant la publication

Remplace partout :

```text
https://VOTRE-DOMAINE.com/
```

par ton vrai domaine HTTPS, dans :

- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

Si tu n’achètes pas encore de domaine, utilise l’adresse GitHub Pages complète fournie après le déploiement. Exemple :

```text
https://USERNAME.github.io/REPOSITORY/
```

Commande pratique depuis le dossier du projet :

```bash
rg -n "VOTRE-DOMAINE" .
```

Cette vérification doit retourner zéro résultat avant la publication.

## 6. Référencement déjà intégré

- titre et description optimisés pour Kinshasa et la RDC ;
- URL canonique et balises de langue `fr-CD` ;
- métadonnées Open Graph et Twitter ;
- robots autorisant l’indexation ;
- sitemap XML ;
- données structurées JSON-LD pour JorkaDev, Jourdain, les trois offres et la FAQ ;
- coordonnées, zone de service et contenu local visibles ;
- structure sémantique avec un seul `h1` ;
- images avec textes alternatifs, navigation accessible et animations compatibles avec `prefers-reduced-motion`.

Je n’ai pas ajouté de balise `meta keywords` ni de fichier spécial pour les moteurs d’IA : ils ne remplacent pas un contenu utile, indexable et correctement structuré.

## 7. Après la mise en ligne

1. Ajoute le site dans Google Search Console.
2. Envoie l’URL du sitemap : `https://ton-domaine.com/sitemap.xml`.
3. Teste la page avec le Rich Results Test de Google.
4. Crée ou vérifie ton Google Business Profile si ton activité respecte les conditions d’éligibilité.
5. Garde exactement les mêmes nom, téléphone et zone de service sur le site, Facebook et ton profil d’entreprise.
6. Si tu affiches une adresse professionnelle publique, complète `streetAddress`, le code postal et les coordonnées dans les données structurées. N’ajoute pas d’adresse fictive.

## 8. Ce qui reste manuel

- remplacer les URL SEO par l’adresse GitHub Pages réelle ;
- connecter un nom de domaine personnalisé uniquement si tu en achètes un plus tard ;
- ajouter les vraies captures de projets ;
- renseigner un identifiant Google Analytics uniquement si tu décides d’utiliser Analytics ;
- demander l’indexation après la publication.

Les boutons WhatsApp, l’adresse e-mail et le lien Facebook utilisent déjà les coordonnées fournies.
