"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { DiscoverSessionsPageProps, DiscoverSessionCardData } from "../types";
import { useI18n } from "../contexts/I18nContext";

import DiscoverSessionsHeader from "../components/discover-sessions/DiscoverSessionsHeader";
import SessionFilters from "../components/discover-sessions/SessionFilters";
import FeaturedSessions from "../components/discover-sessions/FeaturedSessions";
import SessionGrid from "../components/discover-sessions/SessionGrid";

const DiscoverSessionsPage = (props: DiscoverSessionsPageProps) => {
  const i18n = useI18n();

  const [allSessions, setAllSessions] = useState<DiscoverSessionCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const locale = (window as any).sharedProps?.locale_data?.current_locale || "en";
        const response = await axios.get(`/${locale}/sessions.json`);
        setAllSessions(response.data);
      } catch (err) {
        console.error("Error fetching sessions:", err);
        setError("Could not load sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const filteredSessions = useMemo(() => {
    return allSessions
      .filter((session) => {
        const matchesSearch =
          session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          session.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
          session.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesType = selectedType === "all" || session.type === selectedType;
        const matchesDifficulty = selectedDifficulty === "all" || session.difficulty === selectedDifficulty;
        const matchesSkills = selectedSkills.length === 0 || selectedSkills.every((skill) => session.skills.includes(skill));

        return matchesSearch && matchesType && matchesDifficulty && matchesSkills;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "date": return new Date(a.date).getTime() - new Date(b.date).getTime();
          case "popularity": return b.current_participants - a.current_participants;
          case "rating": return b.host_rating - a.host_rating;
          default: return 0;
        }
      });
  }, [allSessions, searchQuery, selectedType, selectedDifficulty, selectedSkills, sortBy]);

  const featuredSessions = useMemo(() => {
    return filteredSessions.filter((session) => session.featured).slice(0, 3);
  }, [filteredSessions]);

  // Handlers para los filtros
  const handleSkillChange = (skill: string, checked: boolean) => {
    setSelectedSkills(prev => checked ? [...prev, skill] : prev.filter(s => s !== skill));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedDifficulty("all");
    setSelectedSkills([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <DiscoverSessionsHeader />
        <SessionFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(prev => !prev)}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          availableSkills={props.available_skills}
          selectedSkills={selectedSkills}
          onSkillChange={handleSkillChange}
          onClearFilters={clearFilters}
        />
        <FeaturedSessions sessions={featuredSessions} />
        <SessionGrid
          sessions={filteredSessions}
          loading={loading}
          error={error}
          onClearFilters={clearFilters}
        />
      </main>
    </div>
  );
};

export default DiscoverSessionsPage;
