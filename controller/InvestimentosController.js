const connection = require('../config')


// Retorna todos os Investimentos
const getInvestimentos = async (req, res) => {
    const q = "SELECT * FROM investimentos;";
    connection.query(q, (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao trazer os Investimentos" });
        return res.status(200).json(data);
    });
};

// Retorna Investimento por ID
const getInvestimentoById = async (req, res) => {
    const q = "SELECT * FROM investimentos WHERE `id`=?;";

    connection.query(q, [req.params.id], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao trazer Ativo por ID" });
        return res.status(200).json(data[0]);
    });
};

// Retorna Investimento por ID da WALLET
const getInvestimentoByWalletId = async (req, res) => {
    const q = "SELECT * FROM investimentos WHERE `wallet_id`=?";

    connection.query(q, [req.params.id], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao trazer os Investimentos dessa Wallet" });
        return res.status(200).json(data);
    });
};

// Cria o Investimento
const createInvestimento = async (req, res) => {
    const { wallet_id, titulo, valor, observacao, quantidade, categoria, data } = req.body;

    if (!titulo || !valor || !wallet_id) {
        return res.status(400).json({ erro: "Campos Obrigatórios!" });
    }

    const q = "INSERT INTO investimentos(`wallet_id`, `titulo`, `valor`, `observacao`, `quantidade`, `categoria`, `data`) VALUES (?,?,?,?,?,?,?);";
    connection.query(q, [wallet_id, titulo, valor, observacao, quantidade, categoria, data], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Cadastrar o Investimento" });
        return res.status(201).json("Investimento Cadastrado!");
    });
};

// Atualiza o Investimento 
const updateInvestimento = async (req, res) => {
    const ativoId = req.params.id;
    const { titulo, valor, observacao, quantidade, categoria, data } = req.body;

    // Construir a parte SET dinamicamente com base nos campos fornecidos pelo usuário
    const setFields = [];
    if (titulo !== undefined) setFields.push("titulo=?");
    if (valor !== undefined) setFields.push("valor=?");
    if (observacao !== undefined) setFields.push("observacao=?");
    if (quantidade !== undefined) setFields.push("quantidade=?");
    if (categoria !== undefined) setFields.push("categoria=?");
    if (data !== undefined) setFields.push("data=?");

    if (setFields.length === 0) {
        return res.status(400).json({ erro: "Nenhum campo fornecido para atualização" });
    }

    const q = `UPDATE investimentos SET ${setFields.join(", ")} WHERE id=?;`;

    connection.query(q, [...Object.values(req.body).filter(value => value !== undefined), ativoId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Atualizar o Investimento" });
        return res.status(200).json("Investimento Atualizado!");
    });
};

// Excluir o Investimento
const deleteInvestimento = async (req, res) => {
    const ativoId = req.params.id;

    const q = "DELETE FROM investimentos WHERE id=?;";

    connection.query(q, [ativoId], (erro, data) => {
        if (erro) return res.status(500).json({ erro: "Erro ao Excluir o Investimento " });
        return res.status(200).json("Investimento Excluído!");
    });
};

module.exports = {
    getInvestimentos,
    getInvestimentoById,
    getInvestimentoByWalletId,
    createInvestimento,
    updateInvestimento,
    deleteInvestimento
};
