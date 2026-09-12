import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Tractor, ArrowRight, Mail, Lock, AlertCircle, ShieldCheck } from "lucide-react";
import InputField from "@/components/ui/InputField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { authenticateUser, seedInitialAdminIfNeeded } from "@/lib/authService";

const MotionDiv = motion.div;

const loginSchema = z.object({
  email: z.string().min(1, "El correo electrónico es requerido").email("Ingresa un correo electrónico válido"),
  password: z.string().min(1, "La contraseña es requerida").min(4, "La contraseña debe tener al menos 4 caracteres"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    seedInitialAdminIfNeeded().catch(() => {});

    const userId = localStorage.getItem("ganadera_user_id");
    if (userId) {
      navigate("/inventario");
    }
  }, [navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data) {
    setIsLoading(true);
    setServerError(null);
    try {
      const result = await authenticateUser(data.email, data.password);
      if (!result.success) {
        setServerError(result.message || "Correo o contraseña incorrectos.");
        return;
      }

      navigate("/inventario");
    } catch (error) {
      setServerError(error?.message || "Error al iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#F5F7F2] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden selection:bg-emerald-100 selection:text-emerald-900">
      {/* Elementos ambientales de fondo */}
      <div className="w-[420px] h-[420px] bg-emerald-600/[0.07] rounded-full blur-3xl absolute -top-32 -right-32 pointer-events-none" />
      <div className="w-[380px] h-[380px] bg-lime-600/[0.05] rounded-full blur-3xl absolute -bottom-32 -left-32 pointer-events-none" />

      <MotionDiv
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[430px] relative z-10 flex flex-col items-center"
      >
        {/* Cabecera / Identidad de marca */}
        <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#143416] via-[#1B4820] to-[#2B6631] flex items-center justify-center shadow-xl shadow-[#1B4820]/25 ring-4 ring-[#1B4820]/10 transition-transform hover:scale-105 duration-200">
            <Tractor size={38} strokeWidth={1.75} className="text-emerald-100" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold tracking-wider uppercase mt-4 mb-2 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            Sistema Ganadero · PWA
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight m-0">
            Inicio de Sesión
          </h1>
          <p className="font-sans text-xs sm:text-sm font-medium text-neutral-500 mt-1 m-0">
            Gestión Ganadera de Precisión
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="w-full bg-white/95 backdrop-blur-xl border border-neutral-200/80 rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(27,72,32,0.1),0_1px_3px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col">
            <div className="mb-4">
              <InputField
                id="login-email"
                label="Correo Electrónico"
                type="email"
                placeholder="nombre@campo.com"
                autoComplete="email"
                icon={Mail}
                registration={register("email")}
                error={errors.email?.message}
              />
            </div>

            <div className="mb-6">
              <InputField
                id="login-password"
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                icon={Lock}
                registration={register("password")}
                error={errors.password?.message}
              />
            </div>

            <AnimatePresence>
              {serverError && (
                <MotionDiv
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.2 }}
                  role="alert"
                  className="bg-red-50/95 border border-red-200/90 rounded-2xl p-3.5 flex items-start gap-2.5 mb-5 shadow-2xs overflow-hidden"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="font-sans text-xs sm:text-sm font-medium text-red-700 m-0 leading-snug">
                    {serverError}
                  </p>
                </MotionDiv>
              )}
            </AnimatePresence>

            <PrimaryButton type="submit" isLoading={isLoading} fullWidth={true}>
              <span>Iniciar Sesión</span>
              <ArrowRight size={18} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-1" />
            </PrimaryButton>

            {/* Pie de seguridad dentro de la tarjeta */}
            <div className="mt-7 pt-5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-medium">
              <div className="flex items-center gap-1.5 text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Autenticación local y en la nube</span>
              </div>
              <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-semibold">
                v2.0 PWA
              </span>
            </div>
          </form>
        </div>

        <p className="text-center text-[11px] text-neutral-400 mt-6 font-medium tracking-wide">
          Plataforma Ganadera Offline-First
        </p>
      </MotionDiv>
    </div>
  );
}