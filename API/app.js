import express from 'express';
//import publicRoutes from './routes/public.js';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const porta = 3000;
const app = express();

/*3 Rotas
Públicas
    Cadastro e Login

Privadas
    Listar Usuários    
*/

app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


//registro de usuário
app.post('/tbusuario', async (req, res) => {
    const { nome_usuario, email_usuario, senha_usuario, foto_usuario } = req.body;

    //Validando se todos os campos estao preenchidos
    if (!email_usuario || !senha_usuario || !nome_usuario) {
        return res.status(400).json({ 
            error: 'Todos os campos são obrigatorios são obrigatórios.'
        });
    }

    //Criptografação da senha
    //const senhaHash = await bcrypt.hash(senha_usuario, 10); 

    const { data, error } = await supabase
        .from('tbusuario')
        .insert([{ nome_usuario, 
                   email_usuario, 
                   senha_usuario: senhaHash, //Salva o hash, nao a senha original
                   foto_usuario }])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ message: 'Usuário inserido com sucesso', data });
});



// consulta de usuário
    app.get('/tbusuario', async (req, res) => {
    const { data, error } = await supabase
        .from('tbusuario')
        .select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ usuario: data });
});

// deleta usuario
    app.delete('/tbusuario/:id', async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase // Removido o select daqui que tava dando ruim
        .from('tbusuario')
        .delete()
        .eq('id', id)
        .select(); 

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Usuário deletado com sucesso', data });
});




// atualiza usuario
    app.put('/tbusuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome_usuario, email_usuario, senha_usuario, foto_usuario } = req.body;

    const { data, error } = await supabase
        .from('tbusuario')
        .update({ nome_usuario, email_usuario, senha_usuario, foto_usuario })
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Usuário atualizado com sucesso', data });
});


app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});