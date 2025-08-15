"use client";

import React, { useEffect, useState } from "react";
import { User } from "../types/users.types";
import { SharedProps } from "../types";
import axios from "axios";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  Users,
  Calendar,
  Clock,
  Star,
  Video,
  Users2,
} from "lucide-react";

const mockCurrentUser = {
  name: "Alex Rodriguez",
  firstName: "Alex",
  avatar: "/placeholder.svg?height=40&width=40",
  initials: "AR",
};

const mockSessions = [
  {
    id: "1",
    title: "React Hooks Deep Dive",
    description: "Master React Hooks with hands-on examples and best practices",
    host: "Sarah Chen",
    hostAvatar: "/placeholder.svg?height=32&width=32",
    hostInitials: "SC",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "2 hours",
    type: "Workshop",
    difficulty: "Intermediate",
    maxParticipants: 12,
    currentParticipants: 8,
    skills: ["React", "JavaScript", "Hooks"],
    location: "Online",
    price: "Free",
  },
  {
    id: "2",
    title: "TypeScript Fundamentals",
    description:
      "Learn TypeScript from scratch and improve your JavaScript development",
    host: "David Kim",
    hostAvatar: "/placeholder.svg?height=32&width=32",
    hostInitials: "DK",
    date: "2024-01-18",
    time: "4:30 PM",
    duration: "3 hours",
    type: "Tutorial",
    difficulty: "Beginner",
    maxParticipants: 15,
    currentParticipants: 12,
    skills: ["TypeScript", "JavaScript"],
    location: "Online",
    price: "Free",
  },
  {
    id: "3",
    title: "Full-Stack Project Collaboration",
    description:
      "Build a complete web application together using modern technologies",
    host: "Emma Davis",
    hostAvatar: "/placeholder.svg?height=32&width=32",
    hostInitials: "ED",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: "4 hours",
    type: "Project",
    difficulty: "Advanced",
    maxParticipants: 6,
    currentParticipants: 4,
    skills: ["React", "Node.js", "MongoDB", "GraphQL"],
    location: "Online",
    price: "Free",
  },
  {
    id: "4",
    title: "Python for Data Science",
    description: "Introduction to data analysis and visualization with Python",
    host: "Carlos Martinez",
    hostAvatar: "/placeholder.svg?height=32&width=32",
    hostInitials: "CM",
    date: "2024-01-22",
    time: "6:00 PM",
    duration: "2.5 hours",
    type: "Study Group",
    difficulty: "Intermediate",
    maxParticipants: 10,
    currentParticipants: 7,
    skills: ["Python", "Pandas", "NumPy", "Matplotlib"],
    location: "Online",
    price: "Free",
  },
  {
    id: "5",
    title: "Vue.js Component Architecture",
    description:
      "Design scalable Vue.js applications with proper component structure",
    host: "Lisa Wang",
    hostAvatar: "/placeholder.svg?height=32&width=32",
    hostInitials: "LW",
    date: "2024-01-25",
    time: "3:00 PM",
    duration: "2 hours",
    type: "Workshop",
    difficulty: "Intermediate",
    maxParticipants: 8,
    currentParticipants: 5,
    skills: ["Vue.js", "JavaScript", "Component Design"],
    location: "Online",
    price: "Free",
  },
];

const availableInterests = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "Django",
  "PostgreSQL",
  "JavaScript",
  "Vue.js",
  "MongoDB",
  "Java",
  "Spring",
  "Docker",
  "GraphQL",
  "AWS",
  "Machine Learning",
  "TensorFlow",
];

const sessionTypes = ["Workshop", "Tutorial", "Study Group", "Project"];
const difficultyLevels = ["Beginner", "Intermediate", "Advanced"];

const BrowsePage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState<string | null>(null);

  const sharedProps: SharedProps = (window as any).sharedProps || {};

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const locale = sharedProps.locale_data?.current_locale || "en";
        const response = await axios.get(`/${locale}/users.json`);

        const transformedUsers: User[] = response.data.map((user: any) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          role: user.role,
          avatar: `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user.email}`,
          topInterests: ["React", "TypeScript", "Node.js"],
          rating: 4.9,
          sessions: 127,
        }));

        setUsers(transformedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        setErrorUsers("Could not load users. Please try again later.");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const [selectedSessionType, setSelectedSessionType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole =
      selectedRole === "all" || user.role.toLowerCase() === selectedRole;
    const matchesInterests =
      selectedInterests.length === 0 ||
      selectedInterests.some((interest) =>
        user.topInterests?.includes(interest)
      );

    return matchesSearch && matchesRole && matchesInterests;
  });

  const filteredSessions = mockSessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType =
      selectedSessionType === "all" || session.type === selectedSessionType;
    const matchesDifficulty =
      selectedDifficulty === "all" || session.difficulty === selectedDifficulty;
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => session.skills.includes(skill));

    return matchesSearch && matchesType && matchesDifficulty && matchesSkills;
  });

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    }
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRole("all");
    setSelectedInterests([]);
    setSelectedSessionType("all");
    setSelectedDifficulty("all");
    setSelectedSkills([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
            Browse & Discover
          </h1>
          <p className="text-muted-foreground text-lg">
            Find learning partners and join exciting sessions
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Sessions
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 bg-card/50 backdrop-blur-sm border-0 shadow-lg">
                <div className="p-6 space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder={
                          activeTab === "users"
                            ? "Search users..."
                            : "Search sessions..."
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-muted/30"
                      />
                    </div>
                  </div>

                  <TabsContent value="users" className="space-y-6 mt-0">
                    {/* Role Filter */}
                    <div className="space-y-3">
                      <Label>Role</Label>
                      <RadioGroup
                        value={selectedRole}
                        onValueChange={setSelectedRole}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="student" id="student" />
                          <Label htmlFor="student">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="teacher" id="teacher" />
                          <Label htmlFor="teacher">Teacher</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Interests Filter */}
                    <div className="space-y-3">
                      <Label>Interests</Label>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {availableInterests.map((interest) => (
                          <div
                            key={interest}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`interest-${interest}`}
                              checked={selectedInterests.includes(interest)}
                              onCheckedChange={(checked) =>
                                handleInterestChange(
                                  interest,
                                  checked as boolean
                                )
                              }
                            />
                            <Label
                              htmlFor={`interest-${interest}`}
                              className="text-sm"
                            >
                              {interest}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sessions" className="space-y-6 mt-0">
                    {/* Session Type Filter */}
                    <div className="space-y-2">
                      <Label>Session Type</Label>
                      <Select
                        value={selectedSessionType}
                        onValueChange={setSelectedSessionType}
                      >
                        <SelectTrigger className="bg-muted/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {sessionTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Difficulty Filter */}
                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select
                        value={selectedDifficulty}
                        onValueChange={setSelectedDifficulty}
                      >
                        <SelectTrigger className="bg-muted/30">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Levels</SelectItem>
                          {difficultyLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Skills Filter */}
                    <div className="space-y-3">
                      <Label>Skills</Label>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {availableInterests.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`skill-${skill}`}
                              checked={selectedSkills.includes(skill)}
                              onCheckedChange={(checked) =>
                                handleSkillChange(skill, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={`skill-${skill}`}
                              className="text-sm"
                            >
                              {skill}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full bg-transparent"
                  >
                    Clear Filters
                  </Button>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <TabsContent value="users">
                {loadingUsers && <p>Loading users...</p>}
                {errorUsers && <p className="text-red-500">{errorUsers}</p>}
                {!loadingUsers && !errorUsers && (
                  <>
                    <div className="mb-6">
                      <p className="text-muted-foreground">
                        {filteredUsers.length} user
                        {filteredUsers.length !== 1 ? "s" : ""} found
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredUsers.map((user) => (
                        <a key={user.id} href={`/users/${user.id}`}>
                          <Card className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 cursor-pointer shadow-lg">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4 mb-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.name}
                                  />
                                  <AvatarFallback className="text-lg">
                                    {user.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-lg text-foreground">
                                    {user.name}
                                  </h3>
                                  <Badge
                                    variant={
                                      user.role === "Teacher"
                                        ? "default"
                                        : "secondary"
                                    }
                                  >
                                    {user.role}
                                  </Badge>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                    <span className="text-xs text-muted-foreground">
                                      {user.rating}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      • {user.sessions} sessions
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                  Top Interests:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {(user.topInterests ?? [])
                                    .slice(0, 3)
                                    .map((interest, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {interest}
                                      </Badge>
                                    ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </a>
                      ))}
                    </div>

                    {filteredUsers.length === 0 && (
                      <div className="text-center py-12">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          No users found matching your criteria.
                        </p>
                        <Button variant="outline" onClick={clearFilters}>
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>

              <TabsContent value="sessions">
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    {filteredSessions.length} session
                    {filteredSessions.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSessions.map((session) => (
                    <a key={session.id} href={`/session/${session.id}`}>
                      <Card className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 cursor-pointer shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-foreground mb-2">
                                {session.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {session.description}
                              </p>
                            </div>
                            <Badge
                              variant={
                                session.difficulty === "Advanced"
                                  ? "destructive"
                                  : session.difficulty === "Intermediate"
                                  ? "default"
                                  : "secondary"
                              }
                              className="ml-2"
                            >
                              {session.difficulty}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={session.hostAvatar || "/placeholder.svg"}
                                alt={session.host}
                              />
                              <AvatarFallback className="text-xs">
                                {session.hostInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {session.host}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {session.type}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {session.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {session.time}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Video className="h-4 w-4" />
                                {session.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users2 className="h-4 w-4" />
                                {session.currentParticipants}/
                                {session.maxParticipants}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Skills:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {session.skills
                                .slice(0, 3)
                                .map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              {session.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{session.skills.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>

                {filteredSessions.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No sessions found matching your criteria.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default BrowsePage;
