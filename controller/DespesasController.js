const connection = require('../config');

// Retorna todos os DESPESAS
const getDespesas = async (req, res) => {
    const q = "SELECT * FROM despesas;";
    connection.query(q, (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao trazer os Despesas" });
        return res.status(200).json(data);
    });
};

// Retorna DESPESA por ID
const getDespesaById = async (req, res) => {
    const q = "SELECT * FROM despesas WHERE `id`=?;";
    connection.query(q, [req.params.id], (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao trazer Despesa por ID" });
        return res.status(200).json(data[0]);
    });
};

// Retorna DESPESAS por ID da WALLET
const getDespesasByWalletId = async (req, res) => {
    const q = "SELECT * FROM despesas WHERE `wallet_id`=?";
    connection.query(q, [req.params.id], (error, data) => {
        if(error) return res.status(500).json({error: "Erro ao trazer as Despesas dessa Wallet"});
        return res.status(200).json(data);
    });
};

// Cria a DESPESA
const createDespesa = async (req, res) => {
    const { wallet_id, titulo, valor, observacao, categoria, fonte, data } = req.body;

    if (!titulo || !valor || !wallet_id) {
        return res.status(400).json({ error: "Campos Obrigatórios!" });
    }

    const q = "INSERT INTO despesas(`wallet_id`, `titulo`, `valor`, `observacao`, `categoria`, `fonte`, `data`) VALUES (?,?,?,?,?,?,?);";
    connection.query(q, [wallet_id, titulo, valor, observacao, categoria, fonte, data], (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao Cadastrar a Despesa" });
        return res.status(201).json("Despesa Cadastrada!");
    });
};

// Atualiza a DESPESA
const updateDespesa = async (req, res) => {
    const despesaId = req.params.id;
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

    const q = `UPDATE despesas SET ${setFields.join(", ")} WHERE id=?;`;

    connection.query(q, [...Object.values(req.body).filter(value => value !== undefined), despesaId], (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao Atualizar a Despesa" });
        return res.status(200).json("Despesa Atualizada!");
    });
};

// Excluir a DESPESA
const deleteDespesa = async (req, res) => {
    const despesaId = req.params.id;

    const q = "DELETE FROM despesas WHERE id=?;";

    connection.query(q, [despesaId], (error, data) => {
        if (error) return res.status(500).json({ error: "Erro ao Excluir o Desesa" });
        return res.status(200).json("Despesa Excluída!");
    });
};


module.exports = {
    getDespesas,
    getDespesaById,
    getDespesasByWalletId,
    createDespesa,
    updateDespesa,
    deleteDespesa
}