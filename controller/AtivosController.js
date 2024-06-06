const connection = require('../config')

// Retorna todos os ATIVOS
const getAtivos = async (req, res) => {
    const q = "SELECT * FROM ativos;"
    connection.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao trazer os Ativos" })
        return res.status(200).json(data)
    })
}

// Retorna ATIVO por ID
const getAtivoById = async (req, res) => {
    const q = "SELECT * FROM ativos WHERE `id`=?;";
    connection.query(q, [req.params.id], (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao trazer Ativo por ID" });
        return res.status(200).json(data[0]);
    });
}

// Retorna ATIVOS por ID da WALLET
const getAtivosByWalletId = async (req, res) => {
    const q = "SELECT * FROM ativos WHERE `wallet_id`=?"
    connection.query(q, [req.params.id], (error, data) => {
        if(error) return res.status(500).json({error: "Erro ao trazer os Ativos dessa Wallet"})
        return res.status(200).json(data)
    })
}

// Cria o ATIVO
const createAtivo = async (req, res) => {
    const { wallet_id, titulo, valor, observacao, categoria, fonte, data } = req.body

    if (!titulo || !valor || !wallet_id) {
        return res.status(400).json({ error: "Campos Obrigatórios!" })
    }

    const q = "INSERT INTO ativos(`wallet_id`, `titulo`, `valor`, `observacao`, `categoria`, `fonte`, `data`) VALUES (?,?,?,?,?,?,?)"
    connection.query(q, [wallet_id, titulo, valor, observacao, categoria, fonte, data], (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao Cadastrar o Ativo" })
        return res.status(201).json("Cadastrado Ativo!")
    })
}

// Atualiza o ATIVO
const updateAtivo = async (req, res) => {
    const ativoId = req.params.id;
    const { titulo, valor, observacao, categoria, fonte, data } = req.body;

    // Construir a parte SET dinamicamente com base nos campos fornecidos pelo usuário
    const setFields = [];
    if (titulo !== undefined) setFields.push("titulo=?");
    if (valor !== undefined) setFields.push("valor=?");
    if (observacao !== undefined) setFields.push("observacao=?");
    if (categoria !== undefined) setFields.push("categoria=?");
    if (fonte !== undefined) setFields.push("fonte=?");
    if (data !== undefined) setFields.push("data=?");

    if (setFields.length === 0) {
        return res.status(400).json({ error: "Nenhum campo fornecido para atualização" });
    }

    const q = `UPDATE ativos SET ${setFields.join(", ")} WHERE id=?;`;

    connection.query(q, [...Object.values(req.body).filter(value => value !== undefined), ativoId], (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao Atualizar o Ativo" });
        return res.status(200).json("Ativo Atualizado!");
    })
}

// Excluir o ATIVO
const deleteAtivo = async (req, res) => {
    const ativoId = req.params.id;

    const q = "DELETE FROM ativos WHERE id=?;";

    connection.query(q, [ativoId], (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao Excluir o Ativo" });
        return res.status(200).json("Ativo Excluído!");
    })
}

module.exports = {
    getAtivos,
    getAtivoById,
    getAtivosByWalletId,
    createAtivo,
    updateAtivo,
    deleteAtivo
}