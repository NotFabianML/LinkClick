"use client";

import React, { useState, useEffect } from "react";
import { SharedProps, UserProfileData, MyProfileI18n } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  User,
  Settings,
  Activity,
  Shield,
  Save,
  Edit,
  Plus,
  X,
  Globe,
  Github,
  Linkedin,
  Award,
  Star,
  MessageSquare,
  Users,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "axios";

type MyProfilePageProps = SharedProps & {
  user_data: UserProfileData;
  i18n: MyProfileI18n;
};

const MyProfilePage = (props: MyProfilePageProps) => {
  const [user, setUser] = useState(props.user_data);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState("profile");
  const [newSkill, setNewSkill] = useState("");
  const [newInterest, setNewInterest] = useState("");

  useEffect(() => {
    setUser(props.user_data);
  }, [props.user_data]);

  if (!user) {
    return <div className="container mx-auto p-8">Cargando perfil...</div>;
  }

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;
    const locale =
      (window as any).sharedProps?.locale_data?.current_locale || "en";

    try {
      await axios.patch(
        `/${locale}/profile`,
        { user: user },
        { headers: { "X-CSRF-Token": csrfToken } }
      );
      setIsEditing(false);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      const errorMessages = error.response?.data?.errors || [
        "Ocurrió un error inesperado.",
      ];
      setSaveError(errorMessages.join(", "));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSettingChange = async (key: string, value: any) => {
    const originalUser = { ...user };

    const updatedField = key.split(".");
    if (updatedField.length > 1) {
      setUser((prevUser) => {
        const parent = prevUser[updatedField[0] as keyof typeof prevUser];
        return {
          ...prevUser,
          [updatedField[0]]:
            parent && typeof parent === "object"
              ? {
                  ...parent,
                  [updatedField[1]]: value,
                }
              : { [updatedField[1]]: value },
        };
      });
    }

    const csrfToken = document.querySelector<HTMLMetaElement>(
      "meta[name='csrf-token']"
    )?.content;
    const locale =
      (window as any).sharedProps?.locale_data?.current_locale || "en";

    try {
      await axios.patch(
        `/${locale}/profile`,
        { user: { [updatedField[1]]: value } },
        { headers: { "X-CSRF-Token": csrfToken } }
      );
    } catch (error) {
      console.error("Error saving setting:", error);
      setUser(originalUser);
    }
  };

  const addSkill = () => {
    if (
      newSkill.trim() &&
      !user.skills.some((skill) => skill.name === newSkill.trim())
    ) {
      setUser({
        ...user,
        skills: [...user.skills, { id: Date.now(), name: newSkill.trim() }],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setUser({ ...user, skills: user.skills.filter((s) => s.name !== skill) });
  };

  const addInterest = () => {
    if (
      newInterest.trim() &&
      !user.interests.some((interest) => interest.name === newInterest.trim())
    ) {
      setUser({
        ...user,
        interests: [
          ...user.interests,
          { id: Date.now(), name: newInterest.trim() },
        ],
      });
      setNewInterest("");
    }
  };

  const removeInterest = (interestId: number) => {
    setUser({
      ...user,
      interests: user.interests.filter((i) => i.id !== interestId),
    });
  };

  const userInitials = `${user.first_name?.[0] || ""}${
    user.last_name?.[0] || ""
  }`.toUpperCase();
  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Mi Perfil
              </h1>
              <p className="text-muted-foreground mt-2">
                Gestiona tu información de perfil y la configuración de tu
                cuenta.
              </p>
            </div>
            <Button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="gap-2"
              variant={isEditing ? "default" : "outline"}
              disabled={isSaving}
            >
              {isEditing ? (
                isSaving ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" /> Guardar Cambios
                  </>
                )
              ) : (
                <>
                  <Edit className="h-4 w-4" /> Editar Perfil
                </>
              )}
            </Button>
          </div>
          {saveError && (
            <p className="text-red-500 text-center mt-2">{saveError}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Columna Lateral del Perfil */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg mx-auto">
                    <AvatarImage
                      src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${user.email}`}
                      alt={fullName}
                    />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mt-4">{fullName}</h2>
                  <Badge className="mt-2">{user.role}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {user.stats.sessions_joined}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Sesiones
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-bold">
                        {user.stats.rating}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenido Principal con Pestañas */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2">
                  <Activity className="h-4 w-4" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="privacy" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              {/* Pestaña de Perfil */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Información Personal
                    </CardTitle>
                    <CardDescription>
                      Actualiza tus datos personales e información de contacto.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* --- Nombre --- */}
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          value={user.first_name || ""}
                          onChange={(e) =>
                            setUser({ ...user, first_name: e.target.value })
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      {/* --- Apellido --- */}
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          value={user.last_name || ""}
                          onChange={(e) =>
                            setUser({ ...user, last_name: e.target.value })
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      {/* --- Email (No editable por seguridad) --- */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          disabled
                        />
                      </div>

                      {/* --- Teléfono --- */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={user.phone || ""}
                          onChange={(e) =>
                            setUser({ ...user, phone: e.target.value })
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      {/* --- País --- */}
                      <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Input
                          id="country"
                          value={user.country || ""}
                          onChange={(e) =>
                            setUser({ ...user, country: e.target.value })
                          }
                          disabled={!isEditing}
                        />
                      </div>

                      {/* --- Universidad --- */}
                      <div className="space-y-2">
                        <Label htmlFor="university">Universidad</Label>
                        <Input
                          id="university"
                          value={user.university || ""}
                          onChange={(e) =>
                            setUser({ ...user, university: e.target.value })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {/* --- Biografía --- */}
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía</Label>
                      <Textarea
                        id="bio"
                        value={user.bio || ""}
                        onChange={(e) =>
                          setUser({ ...user, bio: e.target.value })
                        }
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Cuéntanos un poco sobre ti..."
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      Links Sociales
                    </CardTitle>
                    <CardDescription>
                      Conecta tus perfiles sociales y profesionales
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* --- Sitio Web --- */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="website"
                          className="flex items-center gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          Sitio Web
                        </Label>
                        <Input
                          id="website"
                          value={user.website || ""}
                          onChange={(e) =>
                            setUser({ ...user, website: e.target.value })
                          }
                          disabled={!isEditing}
                          placeholder="https://tuwebsite.com"
                        />
                      </div>

                      {/* --- GitHub --- */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="github"
                          className="flex items-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </Label>
                        <Input
                          id="github"
                          value={user.github_url || ""}
                          onChange={(e) =>
                            setUser({ ...user, github_url: e.target.value })
                          }
                          disabled={!isEditing}
                          placeholder="tu-usuario"
                        />
                      </div>

                      {/* --- LinkedIn --- */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="linkedin"
                          className="flex items-center gap-2"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </Label>
                        <Input
                          id="linkedin"
                          value={user.linkedin_url || ""}
                          onChange={(e) =>
                            setUser({ ...user, linkedin_url: e.target.value })
                          }
                          disabled={!isEditing}
                          placeholder="tu-usuario"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-primary" />
                      Intereses y Habilidades
                    </CardTitle>
                    <CardDescription>
                      Los temas que te interesan y las tecnologías que dominas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {user.interests.map((interest) => (
                        <Badge
                          key={interest.id}
                          variant="secondary"
                          className="gap-1"
                        >
                          {interest.name}
                          {isEditing && (
                            <button
                              onClick={() => removeInterest(interest.id)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Añadir nuevo interés o habilidad..."
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addInterest()}
                        />
                        <Button
                          onClick={addInterest}
                          size="icon"
                          variant="outline"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña de Actividad */}
              <TabsContent value="activity" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                    <CardContent className="p-6 text-center">
                      <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {user.stats.sessions_joined}
                      </div>
                      <div className="text-sm text-blue-600">
                        Sesiones Participadas
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                    <CardContent className="p-6 text-center">
                      <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {user.stats.hours_learned}
                      </div>
                      <div className="text-sm text-green-600">
                        Horas Aprendidas
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                    <CardContent className="p-6 text-center">
                      <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                        {user.stats.connections}
                      </div>
                      <div className="text-sm text-purple-600">Conexiones</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Actividad Reciente
                    </CardTitle>
                    <CardDescription>
                      Tus últimas acciones e logros en la plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {user.recent_activity.length > 0 ? (
                        user.recent_activity.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
                          >
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                              {activity.type === "session" && (
                                <MessageSquare className="h-5 w-5 text-primary" />
                              )}
                              {activity.type === "achievement" && (
                                <Award className="h-5 w-5 text-primary" />
                              )}
                              {activity.type === "connection" && (
                                <Users className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">
                                {activity.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {activity.date}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No hay actividad reciente para mostrar.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña de Configuración */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-primary" />
                      Configuración de la Cuenta
                    </CardTitle>
                    <CardDescription>
                      Gestiona tus preferencias y notificaciones de la cuenta.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      {/* Notificaciones por Email */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">
                            Notificaciones por Email
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe actualizaciones por correo sobre tus
                            sesiones.
                          </p>
                        </div>
                        <Switch
                          checked={user.settings.email_notifications}
                          onCheckedChange={(checked) =>
                            handleSettingChange(
                              "settings.email_notifications",
                              checked
                            )
                          }
                        />
                      </div>
                      {/* Recordatorios de Sesión */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">
                            Recordatorios de Sesión
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe notificaciones antes de que comiencen tus
                            sesiones.
                          </p>
                        </div>
                        <Switch
                          checked={user.settings.session_reminders}
                          onCheckedChange={(checked) =>
                            handleSettingChange(
                              "settings.session_reminders",
                              checked
                            )
                          }
                        />
                      </div>
                      {/* Solicitudes de Conexión */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">
                            Solicitudes de Conexión
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Permite que otros usuarios te envíen solicitudes de
                            conexión.
                          </p>
                        </div>
                        <Switch
                          checked={user.settings.connection_requests}
                          onCheckedChange={(checked) =>
                            handleSettingChange(
                              "settings.connection_requests",
                              checked
                            )
                          }
                        />
                      </div>
                      {/* Emails de Marketing */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">
                            Emails de Marketing
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recibe actualizaciones sobre nuevas funcionalidades
                            y noticias.
                          </p>
                        </div>
                        <Switch
                          checked={user.settings.marketing_emails}
                          onCheckedChange={(checked) =>
                            handleSettingChange(
                              "settings.marketing_emails",
                              checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="text-red-600">
                      Zona de Peligro
                    </CardTitle>
                    <CardDescription>
                      Acciones irreversibles y destructivas.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-900/50 rounded-lg">
                      <div>
                        <Label className="text-base font-medium text-red-600">
                          Eliminar Cuenta
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Elimina permanentemente tu cuenta y todos los datos
                          asociados.
                        </p>
                      </div>
                      <Button variant="destructive">Eliminar Cuenta</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pestaña de Privacidad */}
              <TabsContent value="privacy" className="space-y-6">
                <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="border-b bg-muted/30">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Configuración de Privacidad
                    </CardTitle>
                    <CardDescription>
                      Controla quién puede ver tu información y actividad.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      {/* Visibilidad del Perfil */}
                      <div className="space-y-2">
                        <Label className="text-base font-medium">
                          Visibilidad del Perfil
                        </Label>
                        <Select
                          value={user.privacy.profile_visibility}
                          onValueChange={(value) =>
                            handleSettingChange(
                              "privacy.profile_visibility",
                              value
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public_profile">
                              Público - Cualquiera puede verlo
                            </SelectItem>
                            <SelectItem value="connections_only">
                              Solo Conexiones
                            </SelectItem>
                            <SelectItem value="private_profile">
                              Privado - Solo yo
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Mostrar Email */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium flex items-center gap-2">
                            {user.privacy.show_email ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                            Mostrar Correo Electrónico
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Permitir que otros vean tu email.
                          </p>
                        </div>
                        <Switch
                          checked={user.privacy.show_email}
                          onCheckedChange={(checked) =>
                            handleSettingChange("privacy.show_email", checked)
                          }
                        />
                      </div>

                      {/* Mostrar Teléfono */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium flex items-center gap-2">
                            {user.privacy.show_phone ? (
                              <Eye className="h-4 w-4" />
                            ) : (
                              <EyeOff className="h-4 w-4" />
                            )}
                            Mostrar Número de Teléfono
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Permitir que otros vean tu teléfono.
                          </p>
                        </div>
                        <Switch
                          checked={user.privacy.show_phone}
                          onCheckedChange={(checked) =>
                            handleSettingChange("privacy.show_phone", checked)
                          }
                        />
                      </div>

                      {/* Mostrar Actividad */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">
                            Mostrar Actividad
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Mostrar tu actividad reciente a otros.
                          </p>
                        </div>
                        <Switch
                          checked={user.privacy.show_activity}
                          onCheckedChange={(checked) =>
                            handleSettingChange(
                              "privacy.show_activity",
                              checked
                            )
                          }
                        />
                      </div>

                      {/* Permitir Mensajes */}
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">
                            Permitir Mensajes
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Dejar que otros te envíen mensajes directos.
                          </p>
                        </div>
                        <Switch
                          checked={user.privacy.allow_messages}
                          onCheckedChange={(checked) =>
                            handleSettingChange(
                              "privacy.allow_messages",
                              checked
                            )
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

const Spinner = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default MyProfilePage;
