import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export default function TelaMain() {

    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {

    const buscarUsuario = async () => {

        const token = localStorage.getItem("token");

        console.log(token);

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await api.get("API/perfil", { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsuario(response.data);

            console.log(response.data);

        } catch (error) {
            console.log(error);
        }

    };

    buscarUsuario();

}, []);

    return (
        <div>
            <h2 className="text-2xl font-bold">Bem Vindo, {usuario?.nome_usuario}!</h2>
        </div>
    );
}