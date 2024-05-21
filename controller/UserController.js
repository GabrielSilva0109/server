const bcrypt = require('bcrypt')
const connection = require('../config')

// Função para gerar um número aleatório
const generateRandomNumber = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000)
    return randomNumber.toString()
}

// Retorna todos os Usuários
const getUsers = (req, res) => {
    connection.query('SELECT * FROM users', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message })
        }
        res.status(200).json(results)
    })
}

// Retorna Usuário por ID
const getUserById = (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM users WHERE `id` = ?;', [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(results[0])
    })
}

// Cria um Usuário
const createUser = (req, res) => {
    const { name, password, email, birth, cpf, cep } = req.body

    if (!name || !password || !email) {
        return res.status(400).json({ error: 'Required fields are missing' })
    }

    // Aqui você pode adicionar validações adicionais, como formato de email ou CPF
    const hashedPassword = bcrypt.hashSync(password, 10)

    connection.query(
        "INSERT INTO users (`name`, `password`, `email`, `birth`, `cpf`, `cep`) VALUES (?, ?, ?, ?, ?, ?);",
        [name, hashedPassword, email, birth || null, cpf || null, cep || null], 
        (error, results) => {
            if (error) {
                // Verifica se o erro é devido a uma violação de chave única (email duplicado)
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already exists' })
                }
                return res.status(500).json({ error: error.message })
            }
            res.status(201).json({ id: results.insertId, name, email })
        }
    )
}

// Atualiza os dados do usuário
const updateUser = (req, res) => {
    const userId = req.params.id
    const { name, password, email, birth, cpf, cep, picture } = req.body

    if (!name && !password && !email && !birth && !cpf && !cep && !picture) {
        return res.status(400).json({ error: 'Nenhum dado de atualização fornecido' })
    }

    const updatedFields = {}

    if (name) updatedFields.name = name
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10)
        updatedFields.password = hashedPassword
    }
    if (email) updatedFields.email = email
    if (birth) updatedFields.birth = birth
    if (cpf) updatedFields.cpf = cpf
    if (cep) updatedFields.cep = cep
    if (picture) updatedFields.picture = picture

    const fieldsToUpdate = Object.keys(updatedFields)
    const placeholders = fieldsToUpdate.map((field) => `${field}=?`).join(', ')

    const q = `UPDATE users SET ${placeholders} WHERE id=?`
    const values = [...fieldsToUpdate.map((field) => updatedFields[field]), userId]

    connection.query(q, values, (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro ao atualizar usuário' })

        return res.status(200).json('Usuário atualizado com sucesso!')
    })
}

// Deleta o usuário
const deleteUser = (req, res) => {
    const userId = req.params.id

    const q = "DELETE FROM users WHERE `id`=?"
    connection.query(q, [userId], (error, data) => {
        if (error) return res.status(500).json({ error: 'Erro ao deletar usuário' })

        return res.status(200).json('Usuário deletado com sucesso!')
    })
}

// Realiza o login
const loginUser = async (req, res) => {
    try {
        const { cpf, password } = req.body
        const q = "SELECT * FROM users WHERE cpf=?"
        const result = await new Promise((resolve, reject) => {
            connection.query(q, [cpf], (error, result) => {
                if (error) {
                    console.error('Erro ao obter usuário:', error)
                    reject(error)
                } else {
                    if (result.length > 0) {
                        const user = result[0]
                        // Compara a senha fornecida com o hash armazenado no banco de dados
                        const passwordMatch = bcrypt.compareSync(password, user.password)

                        if (passwordMatch) {
                            res.status(200).json(user)
                        } else {
                            res.status(401).json({ message: 'Credenciais inválidas: Senha incorreta' })
                        }
                    } else {
                        res.status(401).json({ message: 'Credenciais inválidas: Usuario não encontrado' })
                    }
                    resolve(result)
                }
            })
        })
    } catch (error) {
        console.error('Erro ao processar a solicitação de login:', error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}
