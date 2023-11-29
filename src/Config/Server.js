const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
var  id_user;

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'mulher_segura'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.post('/cadastrar', async (req, res) => {
  const {
    tipoDocumento,
    documento,
    nomeCompleto,
    nomeSocial,
    nomeMae,
    dataNasc,
    email,
    senha,
  } = req.body;

  try {
    // Gera um salt para criptografia
    const salt = await bcrypt.genSalt(10);
    // Gera o hash da senha usando o salt
    const hashedSenha = await bcrypt.hash(senha, salt);

    const sql = 'INSERT INTO usuaria (tipoDocumento, documentoNumero, nomeCompleto, nomeSocial, nomeMae, dataNasc, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      tipoDocumento,
      documento,
      nomeCompleto,
      nomeSocial,
      nomeMae,
      dataNasc,
      email,
      hashedSenha,
    ];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Erro ao cadastrar usuário no banco de dados:', error);
        return res.json({ success: false, message: 'Erro ao cadastrar usuário.' });
      }
      console.log('Usuário cadastrado com sucesso:', results);
      res.json({ success: true, message: 'Usuário cadastrado com sucesso.' });
    });
  } catch (error) {
    console.error('Erro ao gerar hash da senha:', error);
    res.json({ success: false, message: 'Erro interno do servidor.' });
  }
});

app.post('/verificarUsuario', (req, res) => {
  const { cpf, rg, email } = req.body;

  let sql;
  let values;

  if (cpf) {
    sql = 'SELECT * FROM usuaria WHERE documentoNumero = ?';
    values = [cpf];
  } else if (rg) {
    sql = 'SELECT * FROM usuaria WHERE documentoNumero = ?';
    values = [rg];
  } else if (email) {
    sql = 'SELECT * FROM usuaria WHERE email = ?';
    values = [email];
  } else {
    return res.json({ existeUsuario: false, message: 'Parâmetros inválidos.' });
  }

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao verificar usuário no banco de dados:', error);
      return res.json({ existeUsuario: false, error: 'Erro interno do servidor' });
    }

    if (results.length > 0) {
      res.json({ existeUsuario: true, message: 'Já existe um usuário com estes dados.' });
    } else {
      res.json({ existeUsuario: false, message: 'Usuário não encontrado.' });
    }
  });
});






app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const sql = 'SELECT * FROM usuaria WHERE email = ?';
  const values = [email];

  connection.query(sql, values, async (error, results) => {
    if (error) {
      console.error('Erro ao realizar login:', error);
      return res.json({ success: false, message: 'Erro interno do servidor' });
    }

    if (results.length > 0) {
      id_user = results[0].id_usuaria;
      console.log(id_user+" usuaria teste");
      const senhaCorrespondente = results[0].senha;
      const senhaCorreta = await bcrypt.compare(senha, senhaCorrespondente);

      if (senhaCorreta) {
        res.json({ success: true, message: 'Login bem-sucedido' });
      } else {
        res.json({ success: false, message: 'Credenciais inválidas' });
      }
    } else {
      res.json({ success: false, message: 'Credenciais inválidas' });
    }
  });
});


app.post('/cadastrarRede', async (req, res) => {
  const {
    nomeCompleto,
    tel,
  } = req.body;

  try {
    const sql = 'INSERT INTO rede_apoio (id_usuaria, nomeCompleto, tel) VALUES (?, ?, ?)';
    const values = [
      id_user,
      nomeCompleto,
      tel,
    ];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Erro ao cadastrar usuário no banco de dados:', error);
        return res.json({ success: false, message: 'Erro ao cadastrar usuário.' });
      }
      console.log('Usuário cadastrado com sucesso:', results);
      res.json({ success: true, message: 'Usuário cadastrado com sucesso.' });
    });
  } catch (error) {
    console.error('Erro ao gerar hash da senha:', error);
    res.json({ success: false, message: 'Erro interno do servidor.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});