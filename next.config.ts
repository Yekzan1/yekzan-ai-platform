
import type { NextConfig } from "next";
import withTM from "next-transpile-modules";

const nextConfig: NextConfig = {
  // Ajoutez d'autres configurations Next.js ici si nécessaire
};

// Liste des modules à transfiler. Cela inclut les composants UI et potentiellement d'autres modules.
// Le problème de 'module-not-found' pour les composants UI et tailwind.config.ts
// peut être résolu en les transfilant explicitement.
const transpiledModules = [
  // Transfiler les dossiers complets pour les composants UI, lib, hooks, contexts
  "@/components", 
  "@/lib", 
  "@/hooks", 
  "@/contexts", 
  // Transfiler spécifiquement le fichier tailwind.config.ts s'il est importé directement
  "tailwind.config.ts", 
];

export default withTM(transpiledModules)(nextConfig);

