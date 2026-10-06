import { Routes, Route } from "react-router-dom";
import CategorySelect from "./pages/CategorySelect.jsx";
import StateSelect from "./pages/StateSelect.jsx";
import PlacesList from "./pages/PlacesList.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Vlogs from "./pages/Vlogs.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CategorySelect />} />
      <Route path="/state/:categorySlug" element={<StateSelect />} />
      <Route path="/places/:categorySlug/:stateSlug" element={<PlacesList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/vlogs" element={<Vlogs />} />
    </Routes>
  );
}
