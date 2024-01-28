// MainLayout.tsx
"use client";
import { useEffect, useState } from "react";
import CustomRouter from "./CustomRouter";
import Header from "./Header";
import Login from "../login/page"; // Importa tu componente de login
import Pokemon from "../pokemon/page"; // Importa tu componente de inicio
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { HOME_ROUTE, LOGIN_ROUTE } from "../constants/route";
import { useAllTypes } from "../utils/datafetch";
import { ReactNode } from 'react';

type MainLayoutProps = {
    children: ReactNode; // El contenido que se renderizará dentro de MainLayout
    isLoggedIn: boolean; // Indica si el usuario está autenticado
  };

const MainLayout = ({ children, isLoggedIn }: MainLayoutProps) => {
  
  const [allTypes, setAllTypes] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log("Ejecutando useEffect");
    // Función asincrónica para cargar los tipos de Pokémon
    const fetchTypes = async () => {
      try {
        const types = await useAllTypes();
        console.log("Tipos obtenidos:", types);
        // Convierte el objeto de tipos en una matriz de cadenas
        const typesArray = Object.keys(types);
        setAllTypes(typesArray);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    // Llama a la función para cargar los tipos de Pokémon
    fetchTypes();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Cambio en la autenticación:", user);
  

      if (user) {
        console.log("Usuario logueado, redirigiendo a HOME_ROUTE");
        router.push(HOME_ROUTE); // Si el usuario está logueado, redirige a la página de perfil
      } else {
        console.log("Usuario no logueado, redirigiendo a LOGIN_ROUTE");
        router.push(LOGIN_ROUTE); // Si el usuario no está logueado, redirige a la página de login
      }
    });
    return () => unsubscribe();
  }, []);
  console.log("Renderizando MainLayout, isLoggedIn:", isLoggedIn);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <CustomRouter>
        {isLoggedIn && allTypes.length > 0 ? (
          <Pokemon searchParams={{ gen: "1" }} allTypes={allTypes} />
        ) : (
          <Login />
        )}{" "}
        {/* Renderiza Home si está logueado, de lo contrario, renderiza Login */}
      </CustomRouter>
    </>
  );
};

export default MainLayout;
