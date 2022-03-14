import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Homepage from "../components/Pages/Homepage";
import Offers from "../components/Pages/Offers";
import Categories from "../components/Pages/Categories";
import Loginpage from "../components/Pages/Loginpage";
import Register from "../components/Pages/Register";
import Searchpage from "../components/Pages/Searchpage";
import Offerpage from "../components/Pages/Offerpage";
import AddNewOffer from "../components/Pages/AddNewOffer";
import DashboardHome from "../components/Pages/DashboardHome";
import DashboardAdmin from "../components/Pages/DashboardAdmin";
import EditErrand from "../components/Pages/EditErrand";
import OffersByCategory from "../components/Pages/OffersByCategory";
import UserErrandsList from "../components/Pages/UserErrandsList";
import UserErrandsListJob from "../components/Pages/UserErrandsListJob";
import EditUser from "../components/Pages/EditUser";
import SendMessage from "../components/Pages/SendMessage";
import Messages from "../components/Pages/Messages";
import GetMessage from "../components/Pages/GetMessage";
import MessageDetails from "../components/Pages/MessageDetails";
import UserProfile from "../components/Pages/UserProfile";
import Ranking from "../components/Pages/Ranking";
import ContactForm from "../components/Pages/ContactForm";
import ErrandAplicants from "../components/Pages/ErrandAplicants";
import TokenPage from "../components/Pages/TokenPage";
import AdminErrands from "../components/Pages/AdminErrands";
import AdminErrandsDone from "../components/Pages/AdminErrandsDone";
import AdminReports from "../components/Pages/AdminReports";
import AdminReportsDone from "../components/Pages/AdminReportsDone";
import ReportPage from "../components/Pages/ReportPage";
import AllUsers from "../components/Pages/AllUsers";
import BannedUsers from "../components/Pages/BannedUsers";
import UserErrandsListDone from "../components/Pages/UserErrandsListDone";
import BanUser from "../components/Pages/BanUser";
import AdminSendMessage from "../components/Pages/AdminSendMessage";
import AllCategories from "../components/Pages/AllCategories";
import AdminAddCategory from "../components/Pages/AdminAddCategory";
import EditUserBio from "../components/Pages/EditUserBio";

export const Routers = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.key}>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/dostepnezlecenia" element={<Offers />} />
      <Route exact path="/kategorie" element={<Categories />} />
      <Route exact path="/logowanie" element={<Loginpage />} />
      <Route exact path="/rejestracja" element={<Register />} />
      <Route exact path="/dashboard/:login" element={<DashboardHome />} />
      <Route exact path="/dashboard" element={<DashboardAdmin />} />
      <Route exact path="/kontakt" element={<ContactForm />} />
      <Route exact path="/profil/:login" element={<UserProfile />} />
      <Route exact path="/dodaj-zlecenie/:login" element={<AddNewOffer />} />
      <Route exact path="/edytuj-zlecenie/:Id" element={<EditErrand />} />
      <Route exact path="/zlecenie/:Id" element={<Offerpage />} />
      <Route
        exact
        path="/zlecenia/kategoria/:Id"
        element={<OffersByCategory />}
      />
      <Route
        exact
        path="/twoje-zlecenia/:login"
        element={<UserErrandsList />}
      />
      <Route
        exact
        path="/przyjete-zlecenia/:login"
        element={<UserErrandsListJob />}
      />
      <Route exact path="/edytuj-dane/:login" element={<EditUser />} />
      <Route exact path="/wyslij/:login" element={<SendMessage />} />
      <Route exact path="/wyslane/:login" element={<Messages />} />
      <Route exact path="/wiadomosci/:login" element={<GetMessage />} />
      <Route exact path="/wiadomosc/:id" element={<MessageDetails />} />
      <Route exact path="/ranking" element={<Ranking />} />
      <Route exact path="/applicants/:id" element={<ErrandAplicants />} />
      <Route exact path="/szukaj/:key" element={<Searchpage />} />
      <Route exact path="/zakup-tokenow" element={<TokenPage />} />
      <Route exact path="/zarzadzaj" element={<AdminErrands />} />
      <Route exact path="/zakonczone" element={<AdminErrandsDone />} />
      <Route exact path="/raporty" element={<AdminReports />} />
      <Route exact path="/raporty-zakonczone" element={<AdminReportsDone />} />
      <Route exact path="/raport/:id" element={<ReportPage />} />
      <Route exact path="/uzytkownicy" element={<AllUsers />} />
      <Route exact path="/uzytkownicy-zbanowani" element={<BannedUsers />} />

      <Route
        exact
        path="/zakonczone-zlecenia/:login"
        element={<UserErrandsListDone />}
      />
      <Route exact path="/banowanie/:id" element={<BanUser />} />
      <Route exact path="/wyslij-wiadomosc" element={<AdminSendMessage />} />
      <Route exact path="/lista-kategorii" element={<AllCategories />} />
      <Route exact path="/dodaj-kategorie" element={<AdminAddCategory />} />
      <Route exact path="/dodaj-biografie/:login" element={<EditUserBio />} />
    </Routes>
  );
};
