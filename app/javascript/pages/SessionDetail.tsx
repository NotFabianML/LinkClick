"use client";
import React, { useState, useRef, useEffect } from "react";
import { SessionPageProps } from "../types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import {
  Calendar,
  Clock,
  Send,
  FileText,
  Palette,
  Paperclip,
  Smile,
  MoreVertical,
  Users,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Share2,
  Download,
  Sparkles,
  UserPlus,
  Brain,
  Target,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const mockRecommendedUsers = [
  {
    id: "1",
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ET",
    role: "Senior React Developer",
    compatibilityScore: 95,
    matchingSkills: ["React Hooks", "Performance Optimization", "Custom Hooks"],
    experience: "5+ years",
    rating: 4.9,
    completedSessions: 127,
    reason: "Expert in React Hooks with extensive teaching experience",
    isOnline: true,
  },
  {
    id: "2",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DK",
    role: "Frontend Architect",
    compatibilityScore: 88,
    matchingSkills: ["React", "JavaScript", "Code Review"],
    experience: "7+ years",
    rating: 4.8,
    completedSessions: 89,
    reason: "Strong background in React patterns and mentoring",
    isOnline: false,
  },
  {
    id: "3",
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PP",
    role: "React Specialist",
    compatibilityScore: 92,
    matchingSkills: ["React Hooks", "State Management", "Testing"],
    experience: "4+ years",
    rating: 4.7,
    completedSessions: 156,
    reason: "Specializes in advanced React concepts and has great reviews",
    isOnline: true,
  },
  {
    id: "4",
    name: "Carlos Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "CR",
    role: "Full Stack Developer",
    compatibilityScore: 85,
    matchingSkills: ["React", "Node.js", "Problem Solving"],
    experience: "6+ years",
    rating: 4.6,
    completedSessions: 203,
    reason: "Well-rounded developer with strong communication skills",
    isOnline: true,
  },
];

const SessionDetailPage = (props: SessionPageProps) => {
  const { session_data, i18n, current_user_role } = props;
  const [session, setSession] = useState(session_data);
  const [messages, setMessages] = useState(session_data.messages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sharedProps = (window as any).sharedProps || {};
  const currentUserEmail = sharedProps.user?.email;

  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [notepadContent, setNotepadContent] = useState(session.notepad_content);

  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [recommendedUsers, setRecommendedUsers] =
    useState(mockRecommendedUsers);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (Math.random() > 0.7) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO: Enviar el mensaje al backend con Axios (POST /sessions/:id/messages)
      // y actualizar el estado con la respuesta del servidor.

      const message = {
        id: messages.length + 1,
        sender_name: "Tú",
        sender_initials: "TÚ",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        is_current_user: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  if (!session) {
    return <div>Cargando sesión...</div>;
  }

  const handleNotepadChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotepadContent(e.target.value);
    // TODO: Aquí podrías añadir una lógica para auto-guardar cada cierto tiempo
  };

  const markdownComponents = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const renderActionButtons = () => {
    if (current_user_role.is_creator) {
      return <Button>Editar Sesión</Button>;
    }
    if (current_user_role.is_participant) {
      return <Badge variant="secondary">Ya eres participante</Badge>;
    }
    return <Button>Solicitar Unirse</Button>;
  };

  const refreshRecommendations = () => {
    setIsLoadingRecommendations(true);
    setTimeout(() => {
      setIsLoadingRecommendations(false);
    }, 2000);
  };

  const inviteUser = (userId: string) => {
    console.log(`Inviting user ${userId} to session`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold ...">{session.title}</h1>
            <Badge variant="default" className="animate-pulse">
              {session.status}
            </Badge>
            <div className="flex items-center gap-2">
              {renderActionButtons()}
            </div>
          </div>
          <div className="flex items-center gap-6 text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {session.event_data.scheduled_date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {session.event_data.scheduled_time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Participantes:
            </span>
            <div className="flex -space-x-2">
              {session.participants.map((participant) => (
                <div key={participant.id} className="relative">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="text-xs">
                      {participant.initials}
                    </AvatarFallback>
                  </Avatar>
                  {participant.is_online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-[700px] flex flex-col ...">
              <CardHeader>
                <CardTitle>Chat de la Sesión</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto space-y-4 p-4 ...">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.is_current_user
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="flex items-start gap-3 max-w-[80%]">
                        {!message.is_current_user && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback>
                              {message.sender_initials}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="space-y-1">
                          <div
                            className={`rounded-2xl p-4 ... ${
                              message.is_current_user
                                ? "bg-primary text-primary-foreground"
                                : "bg-background"
                            }`}
                          >
                            {!message.is_current_user && (
                              <p className="text-xs font-medium mb-2 ...">
                                {message.sender_name}
                              </p>
                            )}
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-2 ...">
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t ...">
                  <div className="flex gap-2 items-end">
                    <Input
                      placeholder="Escribe tu mensaje..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="..."
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-[700px] shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <Tabs defaultValue="details" className="h-full flex flex-col">
                <CardHeader className="pb-3 border-b bg-muted/30">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details" className="text-xs">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="ai-suggestions" className="text-xs">
                      AI Suggest
                    </TabsTrigger>
                    <TabsTrigger value="notepad" className="text-xs">
                      Notepad
                    </TabsTrigger>
                    <TabsTrigger value="whiteboard" className="text-xs">
                      Whiteboard
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden p-4">
                  <TabsContent value="details" className="h-full space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Descripción de la Sesión
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
                          {session.description}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Horario
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              {session.event_data.scheduled_date ||
                                "Fecha no definida"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-sm">
                              {session.event_data.scheduled_time ||
                                "Hora no definida"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ai-suggestions" className="h-full">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">
                              AI Recommendations
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              Perfect matches for your session
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={refreshRecommendations}
                          disabled={isLoadingRecommendations}
                        >
                          {isLoadingRecommendations ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          ) : (
                            <Sparkles className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-3">
                        {recommendedUsers.map((user) => (
                          <div
                            key={user.id}
                            className="p-4 rounded-xl bg-gradient-to-r from-card to-card/50 border border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-md"
                          >
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                <Avatar className="h-12 w-12 border-2 border-background">
                                  <AvatarImage
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.name}
                                  />
                                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                    {user.initials}
                                  </AvatarFallback>
                                </Avatar>
                                {user.isOnline && (
                                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className="font-semibold text-sm truncate">
                                    {user.name}
                                  </h4>
                                  <div className="flex items-center gap-1">
                                    <Target className="h-3 w-3 text-primary" />
                                    <span className="text-xs font-bold text-primary">
                                      {user.compatibilityScore}%
                                    </span>
                                  </div>
                                </div>

                                <p className="text-xs text-muted-foreground mb-2">
                                  {user.role}
                                </p>

                                <div className="flex flex-wrap gap-3 mb-2 text-xs text-muted-foreground">
                                  {user.matchingSkills
                                    .slice(0, 2)
                                    .map((skill, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20"
                                      >
                                        {skill}
                                      </Badge>
                                    ))}
                                  {user.matchingSkills.length > 2 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs px-2 py-0.5"
                                    >
                                      +{user.matchingSkills.length - 2}
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                  {user.reason}
                                </p>

                                <Button
                                  size="sm"
                                  className="w-full h-8 text-xs"
                                  onClick={() => inviteUser(user.id)}
                                >
                                  <UserPlus className="h-3 w-3 mr-1" />
                                  Invite to Session
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            AI Matching
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Recommendations based on session topic, required
                          skills, user ratings, and availability.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Pestaña de Bloc de Notas */}
                  <TabsContent value="notepad" className="h-full">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <h3 className="font-semibold">Notas Colaborativas</h3>
                        </div>
                        <div className="flex items-center gap-1 bg-muted p-1 rounded-md">
                          <Button
                            onClick={() => setViewMode("edit")}
                            variant={
                              viewMode === "edit" ? "secondary" : "ghost"
                            }
                            size="sm"
                            className="px-3 h-8"
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() => setViewMode("preview")}
                            variant={
                              viewMode === "preview" ? "secondary" : "ghost"
                            }
                            size="sm"
                            className="px-3 h-8"
                          >
                            Preview
                          </Button>
                        </div>
                      </div>

                      {viewMode === "edit" ? (
                        <Textarea
                          placeholder="Comienza a tomar notas colaborativas aquí usando Markdown..."
                          className="flex-1 resize-none border-0 bg-muted/30 focus:bg-background transition-colors"
                          value={notepadContent}
                          onChange={handleNotepadChange}
                        />
                      ) : (
                        <div className="prose prose-sm dark:prose-invert flex-1 overflow-y-auto rounded-md bg-muted/30 p-4">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                          >
                            {notepadContent}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="whiteboard" className="h-full">
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
                        <Palette className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">
                          Digital Whiteboard
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Collaborative whiteboard for sketching ideas and
                          diagrams
                        </p>
                        <Button className="w-full">Launch Whiteboard</Button>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SessionDetailPage;
