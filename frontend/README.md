# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


Exercice : Création d'une petite application de gestion de tâches (Todo List)

Contexte : 
Tu es chargé de développer une application simple de gestion de tâches qui permet à l'utilisateur d'ajouter, de voir, de modifier et de supprimer des tâches. Cette application sera développée en utilisant NodeJs pour le backend et ReactJs pour le frontend.

Instructions :

1. Backend (NodeJs)
- Crée un serveur Express qui expose un API REST.
- L'API doit permettre de créer une tâche (POST), récupérer la liste des tâches (GET), modifier une tâche (PUT), et supprimer une tâche (DELETE). Les tâches peuvent être stockées en mémoire, pas besoin de base de données.
- Chaque tâche doit avoir un id unique, un titre et un statut indiquant si la tâche a été accomplie ou non.

2. Frontend (ReactJs)
- Crée une interface utilisateur qui interagit avec ton API REST.
- L'interface doit permettre à l'utilisateur d'afficher la liste des tâches, d'ajouter une nouvelle tâche, de marquer une tâche comme accomplie et de supprimer une tâche.
- Assure-toi que l'UI est suffisamment intuitive et réactive.

3. Bonus (optionnel)
- Ajoute une fonctionnalité de filtrage des tâches pour voir toutes les tâches, uniquement les tâches actives ou les tâches complétées.
- Style l'application en utilisant CSS ou Sass pour une meilleure expérience utilisateur.

Contraintes :
- L'application doit être responsive et fonctionnelle sur les dernières versions des navigateurs majeurs.
- Respecte les bonnes pratiques de développement, notamment en ce qui concerne la structure du code et la sécurité.
- Documente brièvement l'API (les endpoints, les méthodes disponibles et le format attendu des requêtes/réponses).

Pour soumettre ton travail, assure-toi que ton code est propre et bien organisé, puis zippe ton projet et upload le dossier ici.