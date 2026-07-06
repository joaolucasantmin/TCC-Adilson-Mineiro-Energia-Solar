import express from 'express'
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

const router = express.Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

//Rota de Cadastro
router.post('/cadastro', async(req, res) =>{

    try{
    const user = req.body
    
    const senhaHash = await bcrypt.hash(user.senha_usuario, 10);

    await supabase.auth.signUp({
        data:
            nome_usuario: user.nome_usuario,
            email_usuario: user.email_usuario,
            senha_usuario: senhaHash,
            foto_usuario: user.foto_usuario

    })
    res.status(201).json(user)
    
    } catch(error){
        res.status(500).json{message:'Erro no servidor!'}
    }
})

export default router