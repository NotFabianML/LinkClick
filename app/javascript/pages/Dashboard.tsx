import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Calendar, Clock, Users, BookOpen, Trophy, TrendingUp, Plus, Star, Target, Zap, Activity } from "lucide-react"

// Mock data for demonstration
const mockUser = {
  name: "Alex Rodriguez",
  firstName: "Alex",
  avatar: "/placeholder.svg?height=40&width=40",
  initials: "AR",
}

const mockStats = {
  sessionsCompleted: 24,
  hoursLearned: 156,
  connectionsGained: 18,
  skillsAcquired: 12,
}

const mockUpcomingSessions = [
  {
    id: 1,
    title: "React Hooks Deep Dive",
    date: "2024-01-15",
    time: "2:00 PM",
    type: "Workshop",
    difficulty: "Intermediate",
    participants: [
      { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32", initials: "SC" },
      { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "MJ" },
      { name: "Lisa Wang", avatar: "/placeholder.svg?height=32&width=32", initials: "LW" },
    ],
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    date: "2024-01-18",
    time: "4:30 PM",
    type: "Study Group",
    difficulty: "Advanced",
    participants: [
      { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32", initials: "DK" },
      { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "ED" },
    ],
  },
]

const mockRecentActivity = [
  {
    id: 1,
    type: "session_completed",
    title: "Completed 'JavaScript Fundamentals'",
    time: "2 hours ago",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    id: 2,
    type: "connection_made",
    title: "Connected with Maria Garcia",
    time: "5 hours ago",
    icon: Users,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "session_joined",
    title: "Joined 'Python for Beginners'",
    time: "1 day ago",
    icon: BookOpen,
    color: "text-green-500",
  },
]

const mockSuggestedConnections = [
  {
    id: 1,
    name: "Maria Garcia",
    role: "Teacher",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "MG",
    topSkills: ["JavaScript", "Node.js", "MongoDB"],
    rating: 4.9,
    sessions: 127,
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Student",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "JW",
    topSkills: ["Python", "Django", "PostgreSQL"],
    rating: 4.7,
    sessions: 43,
  },
  {
    id: 3,
    name: "Sophie Turner",
    role: "Teacher",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "ST",
    topSkills: ["React", "GraphQL", "AWS"],
    rating: 4.8,
    sessions: 89,
  },
  {
    id: 4,
    name: "Carlos Martinez",
    role: "Student",
    avatar: "/placeholder.svg?height=48&width=48",
    initials: "CM",
    topSkills: ["Java", "Spring", "Docker"],
    rating: 4.6,
    sessions: 31,
  },
]

const mockLearningGoals = [
  {
    id: 1,
    title: "Master React Hooks",
    progress: 75,
    target: "Complete by Feb 15",
  },
  {
    id: 2,
    title: "Learn TypeScript",
    progress: 45,
    target: "Complete by Mar 1",
  },
  {
    id: 3,
    title: "Build Full-Stack App",
    progress: 20,
    target: "Complete by Apr 15",
  },
]

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border-0 shadow-xl">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              Welcome back, {mockUser.firstName}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">Here's what's happening in your learning journey today.</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Stats */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
                <TrendingUp className="h-6 w-6 text-primary" />
                Your Progress
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{mockStats.sessionsCompleted}</div>
                    <div className="text-sm text-muted-foreground">Sessions Completed</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{mockStats.hoursLearned}</div>
                    <div className="text-sm text-muted-foreground">Hours Learned</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{mockStats.connectionsGained}</div>
                    <div className="text-sm text-muted-foreground">Connections</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{mockStats.skillsAcquired}</div>
                    <div className="text-sm text-muted-foreground">Skills Acquired</div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
                <Zap className="h-6 w-6 text-primary" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/create-session">
                  <Card className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-900 border-0 hover:from-teal-100 hover:to-blue-100 dark:hover:from-teal-900 dark:hover:to-blue-800 transition-all duration-300 cursor-pointer group shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Plus className="h-8 w-8 text-teal-600 dark:text-teal-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-foreground">Create Session</h3>
                      <p className="text-sm text-muted-foreground mt-1">Start a new learning session</p>
                    </CardContent>
                  </Card>
                </a>
                <a href="/browse">
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-900 border-0 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900 dark:hover:to-pink-800 transition-all duration-300 cursor-pointer group shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-foreground">Browse Users</h3>
                      <p className="text-sm text-muted-foreground mt-1">Find learning partners</p>
                    </CardContent>
                  </Card>
                </a>
                <a href="/profile">
                  <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-900 border-0 hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900 dark:hover:to-red-800 transition-all duration-300 cursor-pointer group shadow-lg">
                    <CardContent className="p-6 text-center">
                      <Target className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-foreground">My Profile</h3>
                      <p className="text-sm text-muted-foreground mt-1">Update your information</p>
                    </CardContent>
                  </Card>
                </a>
              </div>
            </section>

            {/* Upcoming Sessions */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
                <Calendar className="h-6 w-6 text-primary" />
                Upcoming Sessions
              </h2>
              {mockUpcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {mockUpcomingSessions.map((session) => (
                    <Card
                      key={session.id}
                      className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">{session.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {session.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {session.time}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {session.type}
                              </Badge>
                              <Badge
                                variant={
                                  session.difficulty === "Advanced"
                                    ? "destructive"
                                    : session.difficulty === "Intermediate"
                                      ? "default"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {session.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Join Session
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div className="flex -space-x-2">
                            {session.participants.map((participant, index) => (
                              <Avatar key={index} className="h-8 w-8 border-2 border-background">
                                <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                                <AvatarFallback className="text-xs">{participant.initials}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground ml-2">
                            {session.participants.length} participant{session.participants.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2 text-foreground">No upcoming sessions</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You don't have any sessions scheduled. Browse available sessions or create your own.
                    </p>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Browse Sessions</Button>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Learning Goals */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Target className="h-5 w-5 text-primary" />
                Learning Goals
              </h2>
              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 space-y-4">
                  {mockLearningGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-foreground">{goal.title}</h4>
                        <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">{goal.target}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </h2>
              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`p-2 rounded-full bg-muted/50 ${activity.color}`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Suggested Connections */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5 text-primary" />
                Suggested Connections
              </h2>
              <div className="space-y-4">
                {mockSuggestedConnections.slice(0, 3).map((connection) => (
                  <Card
                    key={connection.id}
                    className="bg-card/50 backdrop-blur-sm border-0 hover:bg-card/70 transition-all duration-300 shadow-lg"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                          <AvatarFallback>{connection.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground">{connection.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={connection.role === "Teacher" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {connection.role}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-muted-foreground">{connection.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {connection.topSkills.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{connection.sessions} sessions completed</p>
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground">
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage;