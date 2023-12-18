const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
var id_user;

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
        console.error('Erro ao cadastrar usuária no banco de dados:', error);
        return res.json({ success: false, message: 'Erro ao cadastrar usuária.' });
      }
      console.log('Usuária cadastrado com sucesso:', results);
      res.json({ success: true, message: 'Usuária cadastrado com sucesso.' });
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
      console.error('Erro ao verificar usuária no banco de dados:', error);
      return res.json({ existeUsuario: false, error: 'Erro interno do servidor' });
    }

    if (results.length > 0) {
      res.json({ existeUsuario: true, message: 'Já existe uma usuária com estes dados.' });
    } else {
      res.json({ existeUsuario: false, message: 'Usuária não encontrado.' });
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
      console.log("id_usuaria "+id_user);
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
 
  const sql = 'SELECT * FROM rede_apoio WHERE id_usuaria = ?';
  const values = [id_user];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao verificar número na rede de apoio:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (results.length > 0) {
     
      return res.json({ success: false, message: 'Usuária já possui um número na rede de apoio.' });
     
    }
    else{
      const { nomeCompleto, tel } = req.body;
      const sql = 'INSERT INTO rede_apoio (id_usuaria, nomeCompleto, tel) VALUES (?, ?, ?)';
      const values = [id_user, nomeCompleto, tel];
  
      connection.query(sql, values, (error, results) => {
        if (error) {
          console.error('Erro ao cadastrar usuária no banco de dados:', error);
          return res.json({ success: false, message: 'Erro ao cadastrar usuária.' });
        }
  
        console.log('Usuária cadastrado com sucesso:', results);
        res.json({ success: true, message: 'Usuária cadastrado com sucesso.' });
      });

    }
  });
});
app.post('/atualizarRede', (req, res) => {
  const { nomeCompleto, tel } = req.body;

  const sql = 'UPDATE rede_apoio SET nomeCompleto = ?, tel = ? WHERE id_usuaria = ?';
  const values = [nomeCompleto, tel, id_user];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao atualizar dados da rede de apoio:', error);
      /* return res.status(500).json({ error: 'Erro interno do servidor' }); */
    }

    res.json({ success: true, message: 'Dados da rede atualizados com sucesso.' });
  });
});

app.post('/verificarRede', (req, res) => {

  const sql = 'SELECT * FROM rede_apoio WHERE id_usuaria = ?';
  const values = [id_user];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao obter dados do perfil:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (results.length > 0) {
      const redeData = results[0];
      res.json(redeData);
    } /* else {
      res.status(404).json({ error: 'Rede de apoio não encontrado.' });
    } */
  });
});




app.get('/perfil', async (req, res) => {

  const sql = 'SELECT * FROM usuaria WHERE id_usuaria = ?';
  const values = [id_user];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao obter dados do perfil:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }

    if (results.length > 0) {
      const userData = results[0];
      res.json(userData);
    } else {
      res.status(404).json({ error: 'Usuária não encontrado.' });
    }
  });
});


app.post('/atualizarPerfil', (req, res) => {
  const { nomeCompleto, nomeSocial, dataNasc, email, senha } = req.body;

  const sql = 'UPDATE usuaria SET nomeCompleto = ?, nomeSocial = ?, dataNasc= ?, email =?, senha=? WHERE id_usuaria = ?';
  const values = [nomeCompleto, nomeSocial, dataNasc, email, senha, id_user];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao atualizar dados da usuária:', error);
      /* return res.status(500).json({ error: 'Erro interno do servidor' }); */
    }

    res.json({ success: true, message: 'Dados da usuária atualizados com sucesso.' });
  });
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});