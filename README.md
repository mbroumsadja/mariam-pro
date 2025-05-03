# Élégance Boutique - Boutique en Ligne pour Produits Féminins

Une boutique en ligne moderne avec un design féminin, une mise en page style Pinterest, et toutes les fonctionnalités essentielles d'une boutique en ligne.

## Fonctionnalités

- Interface utilisateur responsive avec design féminin
- Catalogue de produits avec mise en page style Pinterest (masonry)
- Filtrage par catégorie et recherche de produits
- Panier d'achat avec gestion des quantités
- Intégration WhatsApp pour les commandes
- Progressive Web App (PWA) pour installation sur mobile
- Favoris et suggestions de produits

## Technologies utilisées

- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- TypeScript
- Service Worker pour PWA

## Déploiement sur Vercel

1. Créez un compte sur [Vercel](https://vercel.com) si vous n'en avez pas déjà un.
2. Connectez votre compte GitHub, GitLab ou BitBucket.
3. Importez votre projet depuis votre dépôt Git.
4. Vercel détectera automatiquement que c'est un projet Next.js et configurera les paramètres de build.
5. Cliquez sur "Deploy" et votre site sera en ligne en quelques minutes.

## Intégration avec Shopify Buy Button

Pour intégrer Shopify Buy Button à votre boutique :

1. Créez un compte Shopify et configurez votre boutique.
2. Allez dans Shopify Admin > Apps > Shopify Buy Button.
3. Créez un nouveau Buy Button pour chaque produit ou collection.
4. Copiez le code généré et intégrez-le dans votre application.
5. Décommentez le code Shopify dans `app/layout.tsx` et remplacez les valeurs par vos propres identifiants.

## Configuration de ManyChat pour WhatsApp

1. Créez un compte sur [ManyChat](https://manychat.com).
2. Connectez votre compte WhatsApp Business.
3. Créez un bot avec des réponses automatiques pour les commandes.
4. Copiez le script d'intégration et décommentez le code dans `app/layout.tsx`.
5. Remplacez `VOTRE_ID_MANYCHAT` par votre identifiant ManyChat.

## Configuration de Meta Ads

1. Créez un compte Business sur [Meta Business Suite](https://business.facebook.com).
2. Créez un pixel Facebook dans Events Manager.
3. Copiez le code du pixel et décommentez le code dans `app/layout.tsx`.
4. Remplacez `VOTRE_PIXEL_ID` par votre identifiant de pixel.
5. Pour créer des campagnes ciblées :
   - Allez dans Ads Manager > Créer une campagne
   - Choisissez l'objectif "Trafic" ou "Conversions"
   - Définissez votre audience (femmes 18-35 ans)
   - Configurez votre budget (ex: 5000 FCFA/semaine)
   - Créez vos visuels avec Canva et téléchargez-les

## Optimisation des images avec Canva

1. Créez un compte sur [Canva](https://canva.com).
2. Utilisez les templates pour e-commerce pour créer des visuels professionnels.
3. Ajoutez votre logo, texte et bordures aux images de produits.
4. Exportez les images en format optimisé pour le web (JPG ou PNG).
5. Remplacez les placeholders dans le code par vos images optimisées.

## Activation de la PWA

Pour tester l'installation de la PWA :

1. Déployez votre site sur Vercel ou un autre hébergeur avec HTTPS.
2. Ouvrez le site sur Chrome mobile.
3. Vous devriez voir une bannière "Ajouter à l'écran d'accueil".
4. Si la bannière n'apparaît pas, allez dans le menu Chrome > Ajouter à l'écran d'accueil.
5. L'application sera installée sur votre appareil et fonctionnera même hors ligne.

## Personnalisation

- Modifiez les couleurs dans `tailwind.config.ts` pour adapter la palette à votre marque.
- Ajoutez vos propres produits dans `lib/products.ts`.
- Personnalisez les textes et images dans `app/page.tsx`.
- Modifiez le logo et les icônes dans le dossier `public`.
