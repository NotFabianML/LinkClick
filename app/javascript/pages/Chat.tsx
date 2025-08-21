"use client";

import { useState } from "react";
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
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  Circle,
  MessageSquare,
  Plus,
} from "lucide-react";

const mockUser = {
  name: "Alex Rodriguez",
  firstName: "Alex",
  avatar: "/placeholder.svg?height=40&width=40",
  initials: "AR",
};

const mockConversations = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SC",
    lastMessage: "Thanks for the React tips! Really helpful 🚀",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    role: "Teacher",
  },
  {
    id: "2",
    name: "Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MJ",
    lastMessage: "Are you available for the TypeScript session tomorrow?",
    timestamp: "15 min ago",
    unread: 0,
    online: true,
    role: "Student",
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "EW",
    lastMessage:
      "The project collaboration went great! Let's do it again soon.",
    timestamp: "1 hour ago",
    unread: 0,
    online: false,
    role: "Student",
  },
  {
    id: "4",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DK",
    lastMessage: "I found some great resources for Node.js",
    timestamp: "3 hours ago",
    unread: 1,
    online: false,
    role: "Teacher",
  },
  {
    id: "5",
    name: "Lisa Park",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "LP",
    lastMessage: "See you in the next session!",
    timestamp: "Yesterday",
    unread: 0,
    online: true,
    role: "Student",
  },
];

const mockMessages = [
  {
    id: "1",
    senderId: "2",
    senderName: "Mike Johnson",
    content:
      "Hey Alex! I was wondering if you could help me with some React concepts?",
    timestamp: "10:30 AM",
    isCurrentUser: false,
  },
  {
    id: "2",
    senderId: "current",
    senderName: "Alex Rodriguez",
    content:
      "Of course! I'd be happy to help. What specific concepts are you struggling with?",
    timestamp: "10:32 AM",
    isCurrentUser: true,
  },
  {
    id: "3",
    senderId: "2",
    senderName: "Mike Johnson",
    content:
      "I'm having trouble understanding useEffect and its dependencies. Sometimes it runs infinitely and I can't figure out why.",
    timestamp: "10:33 AM",
    isCurrentUser: false,
  },
  {
    id: "4",
    senderId: "current",
    senderName: "Alex Rodriguez",
    content:
      "Ah, that's a common issue! The infinite loop usually happens when you forget to include dependencies in the dependency array, or when you're modifying state that's also a dependency.",
    timestamp: "10:35 AM",
    isCurrentUser: true,
  },
  {
    id: "5",
    senderId: "current",
    senderName: "Alex Rodriguez",
    content:
      "Let me show you a quick example. Would you like to hop on a quick call or should I create a small demo session?",
    timestamp: "10:36 AM",
    isCurrentUser: true,
  },
  {
    id: "6",
    senderId: "2",
    senderName: "Mike Johnson",
    content: "Are you available for the TypeScript session tomorrow?",
    timestamp: "10:45 AM",
    isCurrentUser: false,
  },
];

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    mockConversations[1]
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-foreground">Messages</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect and collaborate with the LinkClick community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm h-full flex flex-col">
              <CardHeader className="border-b bg-muted/30 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Conversations
                  </CardTitle>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1">
                <ScrollArea className="h-full">
                  <div className="p-2">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2 ${
                          selectedConversation?.id === conversation.id
                            ? "bg-primary/10 border border-primary/30"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={conversation.avatar || "/placeholder.svg"}
                                alt={conversation.name}
                              />
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {conversation.initials}
                              </AvatarFallback>
                            </Avatar>
                            {conversation.online && (
                              <Circle className="absolute -bottom-1 -right-1 h-3 w-3 fill-green-500 text-green-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-foreground truncate">
                                {conversation.name}
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {conversation.timestamp}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-sm text-muted-foreground truncate">
                                {conversation.lastMessage}
                              </p>
                              {conversation.unread > 0 && (
                                <Badge className="h-5 w-5 p-0 text-xs bg-primary text-primary-foreground">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {conversation.role}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {selectedConversation ? (
              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b bg-muted/30 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              selectedConversation.avatar || "/placeholder.svg"
                            }
                            alt={selectedConversation.name}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {selectedConversation.initials}
                          </AvatarFallback>
                        </Avatar>
                        {selectedConversation.online && (
                          <Circle className="absolute -bottom-1 -right-1 h-3 w-3 fill-green-500 text-green-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {selectedConversation.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.online
                            ? "Online"
                            : "Last seen 2 hours ago"}{" "}
                          • {selectedConversation.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="h-9 w-9">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-9 w-9">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-9 w-9">
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-9 w-9">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      {mockMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isCurrentUser
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] ${
                              message.isCurrentUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted/50 text-foreground"
                            } rounded-2xl px-4 py-2`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.isCurrentUser
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="border-t bg-muted/30 p-4">
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="h-9 w-9">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        className="pr-10"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the sidebar to start chatting
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
