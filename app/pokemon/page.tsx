// /** @format */
// import React from "react";
// import PokeCard from "./components/PokeCard";
// import Filters from "./components/Filters";
// import ClientSide from "./components/ClientSide";
// import { useAllTypes } from "../utils/datafetch";


// // get search query parameter
// type Props = {
//   searchParams: {
//     gen: string;
//   };
// };

// export default async function Pokemon({ searchParams }: Props) {

//   const allTypes = await useAllTypes();

//   const { gen } = searchParams;
  
//   return (
//     <>
//       <ClientSide gen={gen ? Number(gen) : 1} allTypes={allTypes}/>
//     </>
//   );
// }
// Pokemon.tsx
"use client";
import React from "react";
import ClientSide from "./components/ClientSide";

// Define la interfaz para los parámetros de búsqueda
type SearchParams = {
  gen: string;
};

// Define la interfaz para los tipos de Pokémon
type AllTypes = string[];

// Componente Pokemon que acepta los parámetros de búsqueda y los tipos de Pokémon como propiedades
const Pokemon = ({ searchParams, allTypes }: { searchParams: SearchParams; allTypes: AllTypes }) => {
  const { gen } = searchParams;

  return (
    <>
      {/* Renderiza el componente ClientSide con los tipos de Pokémon y la generación */}
      <ClientSide gen={gen ? Number(gen) : 1} allTypes={allTypes} />
    </>
  );
};

export default Pokemon;

