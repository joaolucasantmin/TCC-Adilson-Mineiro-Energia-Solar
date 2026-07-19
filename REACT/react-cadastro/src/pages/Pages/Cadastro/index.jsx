import { FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import logo from "/src/assets/logo.png";
import fundo from "/src/assets/fundo.jpg";

export default function Cadastro() {
    return (
        //Fundo
        <main className="min-h-screen flex items-center justify-center min-h bg-[url(/src/assets/fundo.jpg)] bg-cover bg-[center_82%] bg-no-repeat">

            <div className="w-[450px] rounded-3xl bg-white shadow-xl px-8 py-10">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-44"
                    />
                </div>

                {/* Formulário */}
                <form className="space-y-4">

                    {/* Email */}
                    <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="email"
                            placeholder="Digite seu email..."
                            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-orange-500
                                                                                                             focus:ring-2
                                                                                                             focus:ring-orange-200"
                        />
                    </div>

                    {/* Senha */}
                    <div className="relative">
                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="password"
                            placeholder="Digite sua senha..."
                            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-orange-500
                                                                                                             focus:ring-2
                                                                                                             focus:ring-orange-200"
                        />
                    </div>

                    {/* Confirmar senha */}
                    <div className="relative">
                        <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="password"
                            placeholder="Confirme sua senha..."
                            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-orange-500
                                                                                                             focus:ring-2
                                                                                                             focus:ring-orange-200"
                        />
                    </div>

                    {/* Botão */}
                    <button
                        type="submit"
                       className="w-full rounded-xl bg-orange-500 py-3 text-white font-semibold transition-all duration-300 hover:bg-orange-600 hover:scale-[1.02]"
                    >
                        Cadastrar
                    </button>

                    {/* Link */}
                    <p className="text-center text-sm text-gray-500">
                        Já tem uma conta?{" "}
                        <a
                            href="/login"
                            className="font-medium text-orange-500 hover:underline"
                        >
                            Faça o Login
                        </a>
                    </p>

                </form>

            </div>

        </main>
    );
}