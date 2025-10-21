
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
      <div className="text-center p-8">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur notre plateforme IA</h1>
        <p className="text-xl mb-8">Transformez vos idées en réalité avec la puissance de l'IA.</p>
        <a href="/dashboard" className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-6 rounded-full text-lg transition duration-300">
          Commencer Gratuitement
        </a>
      </div>
    </div>
  );
}

