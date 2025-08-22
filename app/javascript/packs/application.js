import "./application.css";
import "@hotwired/turbo-rails";

// 0. Lógica para registrar los componentes de React
import ReactOnRails from "react-on-rails";
import withProviders from "../lib/withProviders";

// 1. Importa los componentes de Devise
import LogInComponent from "../pages/devise/LogIn";
import SignUpComponent from "../pages/devise/SignUp";
import ForgotPasswordComponent from "../pages/devise/ForgotPassword";

// 2. Importa tus componentes originales
import NavbarComponent from "../components/layout/Navbar";
import HomeComponent from "../pages/Home";
import DashboardComponent from "../pages/Dashboard"
import BrowseComponent from "../pages/Browse"
import MyProfileComponent from "../pages/MyProfile";
import UserProfileComponent from "../pages/UserProfile";
import CreateSessionComponent from "../pages/CreateSession";
import SessionDetailComponent from "../pages/SessionDetail";
import DiscoverSessionsComponent from "../pages/DiscoverSessions";
import LeaderboardComponent from "../pages/Leaderboard"
import AdminComponent from "../pages/Admin";


// 3. Envuelve cada componente que necesite los providers
const LogIn = withProviders(LogInComponent);
const SignUp = withProviders(SignUpComponent);
const ForgotPassword = withProviders(ForgotPasswordComponent);
const Navbar = withProviders(NavbarComponent);
const Home = withProviders(HomeComponent);
const Dashboard = withProviders(DashboardComponent);
const Browse = withProviders(BrowseComponent);
const MyProfile = withProviders(MyProfileComponent);
const UserProfile = withProviders(UserProfileComponent);
const CreateSession = withProviders(CreateSessionComponent);
const SessionDetail = withProviders(SessionDetailComponent);
const DiscoverSessions = withProviders(DiscoverSessionsComponent);
const Leaderboard = withProviders(LeaderboardComponent);
const Admin = withProviders(AdminComponent);

// 4. Registra las versiones finales "envueltas"
ReactOnRails.register({
  LogIn,
  SignUp,
  ForgotPassword,
  Navbar,
  Home,
  Dashboard,
  Browse,
  MyProfile,
  UserProfile,
  CreateSession,
  SessionDetail,
  DiscoverSessions,
  Leaderboard,
  Admin
});



document.addEventListener("turbo:load", () => {
  ReactOnRails.reactOnRailsPageLoaded();
});
