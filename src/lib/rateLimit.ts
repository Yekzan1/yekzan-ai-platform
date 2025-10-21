
import { createSupabaseServerClient } from "./supabaseServer";

const FREE_TIER_LIMIT = 5; // 5 requêtes IA/jour pour les utilisateurs Gratuits

export async function checkRateLimit(userId: string): Promise<{ allowed: boolean; remaining: number; resetTime?: string }> {
  const supabase = createSupabaseServerClient();

  // Récupérer le profil utilisateur pour vérifier le plan
  const { data: profile, error: profileError } = await supabase
    .from("profiles") // Supposons une table 'profiles' avec un champ 'plan'
    .select("plan, daily_requests")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Error fetching user profile:", profileError);
    return { allowed: false, remaining: 0 };
  }

  if (profile?.plan === "premium") {
    return { allowed: true, remaining: -1 }; // -1 pour illimité
  }

  // Logique de limite pour le plan gratuit
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Récupérer le nombre de requêtes pour aujourd'hui
  const { data: requests, error: requestsError } = await supabase
    .from("ai_requests") // Supposons une table 'ai_requests' pour suivre les requêtes
    .select("id")
    .eq("user_id", userId)
    .gte("created_at", today.toISOString())
    .lt("created_at", tomorrow.toISOString());

  if (requestsError) {
    console.error("Error fetching AI requests:", requestsError);
    return { allowed: false, remaining: 0 };
  }

  const currentRequests = requests?.length || 0;
  const remaining = FREE_TIER_LIMIT - currentRequests;

  if (remaining > 0) {
    // Enregistrer la nouvelle requête
    const { error: insertError } = await supabase
      .from("ai_requests")
      .insert({ user_id: userId });

    if (insertError) {
      console.error("Error inserting AI request:", insertError);
      return { allowed: false, remaining: 0 };
    }
    return { allowed: true, remaining: remaining - 1 };
  } else {
    return { allowed: false, remaining: 0, resetTime: tomorrow.toISOString() };
  }
}

// NOTE: Vous devrez créer les tables 'profiles' et 'ai_requests' dans votre base de données Supabase.
// Exemple de schéma pour 'profiles':
// CREATE TABLE profiles (
//   id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
//   plan TEXT DEFAULT 'free' NOT NULL, // 'free' ou 'premium'
//   daily_requests INTEGER DEFAULT 0
// );

// Exemple de schéma pour 'ai_requests':
// CREATE TABLE ai_requests (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   user_id UUID REFERENCES auth.users NOT NULL,
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
// );

