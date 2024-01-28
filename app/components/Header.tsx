// "use client";
// // Header.tsx
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "../constants/route";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../firebase/config";
// import { useRouter } from "next/navigation";
// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsLoggedIn(!!user);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setIsLoggedIn(false);
//       router.push(LOGIN_ROUTE)
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <header className="h-20 flex bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-400/60 px-10 drop-shadow-[0px_2px_10px_rgba(2,0,0)]">
//       <nav className="w-full flex justify-between items-center text-black font-serif text-xl">
//         <Link href={HOME_ROUTE}>
//           <div>
//             <Image src="/logo.png" alt="Pokemon Logo" height={36} width={96} priority style={{ width: "auto" }} />
//           </div>
//         </Link>
//         <ul className="flex gap-4">
//           {!isLoggedIn && (
//             <>
//               <Link href={LOGIN_ROUTE}>
//                 <li>Login</li>
//               </Link>
//               <Link href={REGISTER_ROUTE}>
//                 <li>Register</li>
//               </Link>
//             </>
//           )}
//           {isLoggedIn && (
//             <>
//               <Link href={PROFILE_ROUTE}>
//                 <li>Profile</li>
//               </Link>
//               <li onClick={handleLogout}>Logout</li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;
// Header.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "../constants/route";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push(LOGIN_ROUTE)
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="h-20 flex bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-400/60 px-10 drop-shadow-[0px_2px_10px_rgba(2,0,0)]">
      <nav className="w-full flex justify-between items-center text-black font-serif text-xl">
        <Link href={HOME_ROUTE}>
          <div>
            <Image src="/logo.png" alt="Pokemon Logo" height={36} width={96} priority style={{ width: "auto" }} />
          </div>
        </Link>
        <ul className="flex gap-4">
          {!isLoggedIn && (
            <>
              <Link href={LOGIN_ROUTE}>
                <li>Login</li>
              </Link>
              <Link href={REGISTER_ROUTE}>
                <li>Register</li>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link href={PROFILE_ROUTE}>
                <li>Profile</li>
              </Link>
              <li onClick={handleLogout}>Logout</li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
