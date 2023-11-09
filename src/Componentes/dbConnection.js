const mysql=require('mysql'); //importando o mysql para a variavel mysql

	const connMySQL=function(){
		console.log('Conexão com bd foi estabelecida')
	return mysql.createConnection(
		{ //tem 1 parametro que é um objeto
			host: 'localhost', //a porta que será inserido as url's
			user: 'root', //usuario que fica no worbench, tem que ser root pois é o usuário "mais poderoso"
			password: 'batata', //a senha para entrar no worbench
			database: 'Mulher_Segura' //o nome do banco de dados
		});

}

module.exports = function(){
	console.log('O autolad carregou o módulo de conxão com o bd')
	return connMySQL;
}