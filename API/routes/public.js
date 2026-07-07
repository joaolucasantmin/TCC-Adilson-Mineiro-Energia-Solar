import express from 'express';
import bcrypt from 'bcrypt';
import supabase from '../config/supabase.js';

const router = express.Router();



router.post('/cadastro', async (req, res) => {

    try {

        const user = req.body;

        // Validando campos obrigatórios
        if (!user.nome_usuario || !user.email_usuario || !user.senha_usuario) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios.'
            });
        }

        // Verifica se já existe usuário com mesmo e-mail ou nome
        const { data: usuarioExistente, error: erroBusca } = await supabase
            .from('usuarios')
            .select('id, nome_usuario, email_usuario')
            .or(`email_usuario.eq.${user.email_usuario},nome_usuario.eq.${user.nome_usuario}`);

        if (erroBusca) {
            return res.status(500).json({
                error: erroBusca.message
            });
        }

        if (usuarioExistente.length > 0) {

            if (usuarioExistente.some(u => u.email_usuario === user.email_usuario)) {
                return res.status(409).json({
                    error: 'Este e-mail já está cadastrado.'
                });
            }

            if (usuarioExistente.some(u => u.nome_usuario === user.nome_usuario)) {
                return res.status(409).json({
                    error: 'Este nome de usuário já está em uso.'
                });
            }
        }

        // Criptografa a senha
        const senhaHash = await bcrypt.hash(user.senha_usuario, 10);

        // Insere o usuário
        const { data, error } = await supabase
            .from('usuarios')
            .insert([{
                nome_usuario: user.nome_usuario,
                email_usuario: user.email_usuario,
                senha_usuario: senhaHash,
                foto_usuario: user.foto_usuario
            }])
            .select();

        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        return res.status(201).json(data);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

});



// Rota de Consulta (GET)
router.get('/usuarios', async (req, res) => {

    const { data, error } = await supabase
        .from('usuarios')
        .select('*');

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    return res.status(200).json({
        usuarios: data
    });

});

// Rota de Exclusão (DELETE)
router.delete('/usuarios/:id', async (req, res) => {

    const { id } = req.params;

    const { data, error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    return res.status(200).json({
        message: 'Usuário deletado com sucesso!',
        data
    });

});




// Rota de Atualização (PUT)
router.put('/usuarios/:id', async (req, res) => {

    const { id } = req.params;
    const { nome_usuario, email_usuario, senha_usuario, foto_usuario } = req.body;

    let dadosAtualizados = {
        nome_usuario,
        email_usuario,
        foto_usuario
    };

    // Se enviou uma nova senha, criptografa ela
    if (senha_usuario) {
        dadosAtualizados.senha_usuario = await bcrypt.hash(senha_usuario, 10);
    }

    const { data, error } = await supabase
        .from('usuarios')
        .update(dadosAtualizados)
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({
            error: error.message
        });
    }

    return res.status(200).json({
        message: 'Usuário atualizado com sucesso!',
        data
    });

});


export default router;