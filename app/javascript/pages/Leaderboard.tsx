"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { LeaderboardPageProps, LeaderboardUser } from "../types";
import { useI18n } from "../contexts/I18nContext";

// Importa todos los componentes hijos que hemos construido
import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader";
import LeaderboardTabs from "../components/leaderboard/LeaderboardTabs";
import LeaderboardSidebar from "../components/leaderboard/LeaderboardSidebar";

// Define la estructura de los datos que esperamos del API
interface LeaderboardData {
  topLearners: LeaderboardUser[];
  topTeachers: LeaderboardUser[];
  mostActive: LeaderboardUser[];
}

const LeaderboardPage = (props: LeaderboardPageProps) => {
  const i18n = useI18n();
  
  // Estado para los datos, el filtro de tiempo y el estado de carga/error
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [timePeriod, setTimePeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto para obtener los datos del backend cada vez que cambia el período de tiempo
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const locale = (window as any).sharedProps?.locale_data?.current_locale || "en";
        const response = await axios.get(`/${locale}/leaderboard.json?period=${timePeriod}`);
        setLeaderboardData(response.data.leaderboard_data);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError("Could not load leaderboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [timePeriod]); // Se ejecuta cada vez que 'timePeriod' cambia

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <LeaderboardHeader
          timePeriod={timePeriod}
          onTimePeriodChange={setTimePeriod}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contenido Principal */}
          <div className="lg:col-span-3">
            {loading && <p className="text-center text-muted-foreground py-12">Loading leaderboard...</p>}
            {error && <p className="text-center text-destructive py-12">{error}</p>}
            
            {/* Solo renderizamos las pestañas si tenemos datos */}
            {!loading && !error && leaderboardData && (
              <LeaderboardTabs
                data={leaderboardData}
                timePeriod={timePeriod}
              />
            )}
          </div>

          {/* Barra Lateral */}
          <LeaderboardSidebar />
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
