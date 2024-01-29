// En el archivo SubmitButton.tsx

import React from "react";

interface SubmitButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode; // Permitir que el botón contenga elementos hijos
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  onClick,
  className = "",
  children, // Permitir que el botón contenga elementos hijos
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none ${className}`}
    >
      {children || label} {/* Mostrar los elementos hijos si existen, de lo contrario, mostrar el texto del botón */}
    </button>
  );
};

export default SubmitButton;
