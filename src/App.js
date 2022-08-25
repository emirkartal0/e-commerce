import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { Route, Routes } from "react-router-dom";
import { auth } from "./Firebase";
import Sidebar from "./components/Sidebar";
import Admin from "./pages/Admin";
import Redirect from "./pages/Redirect";
import Basket from "./pages/Basket";
import Favorites from "./pages/Favorites";
import Products from "./pages/Products";
import HomePage from "./pages/HomePage";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/products" element={<Products user={user} />} />
        <Route path="/favorites" element={<Favorites user={user} />} />
        <Route path="/basket" element={<Basket user={user} />} />
        <Route path="/redirect" element={<Redirect user={user} />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
