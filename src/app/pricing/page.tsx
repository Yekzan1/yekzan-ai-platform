
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Plans Tarifaires
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Choisissez le plan qui correspond le mieux à vos besoins en IA.
        </p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row gap-8">
        {/* Free Plan */}
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white w-full md:w-96">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Plan Gratuit
            </h3>
            <div className="mt-4 flex items-baseline text-6xl font-extrabold">
              Gratuit
              <span className="ml-1 text-2xl font-medium text-gray-500">/mois</span>
            </div>
            <p className="mt-5 text-base text-gray-500">
              Idéal pour découvrir la puissance de notre IA.
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
            <ul role="list" className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-700">
                  5 requêtes IA par jour
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Accès aux fonctionnalités de base
                </p>
              </li>
            </ul>
            <div className="mt-8">
              <Link
                href="/dashboard"
                className="block w-full bg-blue-600 border border-blue-600 rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-blue-700"
              >
                Commencer Gratuitement
              </Link>
            </div>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white w-full md:w-96">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Plan Premium
            </h3>
            <div className="mt-4 flex items-baseline text-6xl font-extrabold">
              9€
              <span className="ml-1 text-2xl font-medium text-gray-500">/mois</span>
            </div>
            <p className="mt-5 text-base text-gray-500">
              Libérez tout le potentiel de l'IA sans limites.
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
            <ul role="list" className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Requêtes IA illimitées
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Accès à toutes les fonctionnalités premium
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-700">
                  Support prioritaire
                </p>
              </li>
            </ul>
            <div className="mt-8">
              <form action="/api/stripe/checkout" method="POST">
                <input type="hidden" name="priceId" value="price_12345" /> {/* Remplacez par votre vrai Price ID Stripe */}
                <button
                  type="submit"
                  className="block w-full bg-blue-600 border border-blue-600 rounded-md py-3 text-sm font-semibold text-white text-center hover:bg-blue-700"
                >
                  Passer au Premium
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

