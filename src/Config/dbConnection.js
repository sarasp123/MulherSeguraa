// dbConnection.js
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mulher_segura.db');

// Criação da tabela usuaria
/* db.transaction((tx) => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS usuaria (
      id_usuaria INTEGER PRIMARY KEY AUTOINCREMENT,
      tipoDocumento TEXT,
      documentoNumero TEXT,
      nomeCompleto TEXT,
      nomeSocial TEXT,
      nomeMae TEXT,
      dataNasc TEXT,
      email TEXT,
      senha TEXT
    );`
  );
}); */

export default db;
