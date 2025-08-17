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
import PostsViewerComponent from "../pages/PostsViewer";
import DashboardComponent from "../pages/Dashboard"
import BrowseComponent from "../pages/Browse"
import MyProfileComponent from "../pages/MyProfile";
import UserProfileComponent from "../pages/UserProfile";
import CreateSessionComponent from "../pages/CreateSession";
import SessionDetailComponent from "../pages/SessionDetail";


// 3. Envuelve cada componente que necesite los providers
const LogIn = withProviders(LogInComponent);
const SignUp = withProviders(SignUpComponent);
const ForgotPassword = withProviders(ForgotPasswordComponent);
const Navbar = withProviders(NavbarComponent);
const Home = withProviders(HomeComponent);
const PostsViewer = withProviders(PostsViewerComponent);
const Dashboard = withProviders(DashboardComponent);
const Browse = withProviders(BrowseComponent);
const MyProfile = withProviders(MyProfileComponent);
const UserProfile = withProviders(UserProfileComponent);
const CreateSession = withProviders(CreateSessionComponent);
const SessionDetail = withProviders(SessionDetailComponent);

// 4. Registra las versiones finales "envueltas"
ReactOnRails.register({
  LogIn,
  SignUp,
  ForgotPassword,
  Navbar,
  Home,
  PostsViewer,
  Dashboard,
  Browse,
  MyProfile,
  UserProfile,
  CreateSession,
  SessionDetail
});

document.addEventListener("turbo:load", () => {
  ReactOnRails.reactOnRailsPageLoaded();
});
