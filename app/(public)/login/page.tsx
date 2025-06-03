import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React, { useId } from "react";

const LoginPage = () => {
  const id = useId();
  return (
    <div className="w-full flex gap-8 p-12 h-screen">
      <div className="w-7/12 flex items-center p-12">
        <div>
          <h1 className="text-7xl font-semibold">Hola,</h1>
          <h1 className="text-6xl">Bienvenido de nuevo</h1>
          <p className="text-xl mt-5">
            Por favor, ingresa tus credenciales para iniciar sesión
          </p>
          <form action="" className="mt-20 flex flex-col gap-5 max-w-xl">
            <div className="*:not-first:mt-2">
              <Label htmlFor={id}>Usuario</Label>
              <Input
                id={id}
                className="bg-muted border-transparent shadow-none py-6 rounded-xl"
                placeholder="Usuario"
                type="email"
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={id}>Contraseña</Label>
              <Input
                id={id}
                className="bg-muted border-transparent shadow-none py-6 rounded-xl"
                placeholder="Contraseña"
                type="password"
              />
            </div>
            <button
              className="bg-gradient-to-b from-blue-600 to-blue-700 text-white p-2 rounded-xl w-fit py-4 px-8 text-md mt-10"
              type="submit"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
      <div className="w-5/12 flex flex-col gap-8 items-center justify-between p-12 bg-gradient-to-b from-blue-600 to-blue-700 rounded-3xl shadow-lg">
        <div className="flex flex-col gap-2 text-center">
          <h3 className="text-2xl font-light text-white -mb-2">
            UNIVERSIDAD NACIONAL DE CAÑETE
          </h3>
          <h3 className="text-3xl font-thin text-white">
            Sistema de Asistencia
          </h3>
        </div>
        <Image
          src="/logo-cepre-white.png"
          alt="CEPRE logo"
          width={360}
          height={120}
        />
        <h6 className="text-white text-center font-thin">
          Powered by AllDev Software
        </h6>
      </div>
    </div>
  );
};

export default LoginPage;
