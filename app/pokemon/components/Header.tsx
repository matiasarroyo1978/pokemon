"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/FirebaseAuthContext";

const Header = () => {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [isPokemonPage, setIsPokemonPage] = useState(false); // Estado para controlar si el usuario está en la página de los pokemones
  console.log("currentUser:", currentUser);
  console.log("logout:", logout);

  // Efecto para ejecutar acciones cuando cambia el estado de autenticación
  useEffect(() => {
    if (!currentUser) {
      // Usuario deslogueado, redireccionar a la página de login
      router.push('/login');
    }
  }, [currentUser, router]); // Se ejecutará cada vez que currentUser cambie
  useEffect(() => {
    setIsPokemonPage(!!currentUser);
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      // Después de desloguearse, redireccionar a la página de login
      router.push('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="h-20 flex bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-400/60 px-10 drop-shadow-[0px_2px_10px_rgba(2,0,0)]">
      <nav className="w-full flex justify-between items-center text-black font-serif text-xl">
        <div>
          <Image
            src="/logo.png"
            alt="Pokemon Logo"
            height={36}
            width={96}
            priority
            style={{ height: "auto", width: "auto" }}
          />
        </div>
        <ul className="flex gap-4">
          {/* Mostrar enlaces de Profile y Logout si está en la página de los pokemones */}
          {isPokemonPage && (
            <>
              <Link href="">
                <li onClick={handleLogout}>LogOut</li>
              </Link>
            </>
          )}
          {/* Mostrar enlaces de Login y Register si no está en la página de los pokemones */}
          {!isPokemonPage && (
            <>
              <Link href={'/login'}>
                <li>Login</li>
              </Link>
              <Link href={'/register'}>
                <li>Register</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
