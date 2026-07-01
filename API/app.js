const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const porta = 3306;
const app = express();

app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.post('/tbusuario', async (req, res) => {
    const { nome_usuario, email_usuario, senha_usuario, foto_usuario } = req.body;

    if (!email_usuario || !senha_usuario) {
        return res.status(400).json({ error: 'Senha e email são obrigatórios.' });
    }

    const { data, error } = await supabase
        .from('tbusuario')
        .insert([{ nome_usuario, email_usuario, senha_usuario, foto_usuario }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: 'Usuário inserido com sucesso', data });
});
app.get('/tbusuario', async (req, res) => {
    const { nome_usuario, email_usuario, senha_usuario, foto_usuario } = req.body;


    const { data, error } = await supabase
        .from('tbusuario')
        .select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ usuario: data });
});


app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});