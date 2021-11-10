CREATE SCHEMA IF NOT EXISTS LasCopas;

USE LasCopas;

CREATE TABLE IF NOT EXISTS Login(
	id_login SMALLINT UNSIGNED AUTO_INCREMENT,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL,
    admin SMALLINT UNSIGNED DEFAULT 0,
    PRIMARY KEY(id_login)
);


CREATE TABLE IF NOT EXISTS Clientes(
	id_cliente INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(120) NOT NULL,
    sobrenome VARCHAR (100),
    dt_nascimento date,
    cadastro ENUM('fisica','juridico'),
    documento char(25),
    id_login SMALLINT UNSIGNED,
    PRIMARY KEY(id_cliente),
    FOREIGN KEY(id_login) REFERENCES Login(id_login)
);


CREATE TABLE IF NOT EXISTS Enderecos(
	id_endereco INT UNSIGNED AUTO_INCREMENT,
    cep CHAR(10),
    endereco VARCHAR(100) NOT NULL,
    complemento VARCHAR(50),
    numero char(5),
    cidade VARCHAR(45) NOT NULL,
    uf CHAR(2),
    id_cliente INT UNSIGNED,
    PRIMARY KEY(id_endereco),
    FOREIGN KEY(id_cliente) REFERENCES Clientes(id_cliente)
);

CREATE TABLE IF NOT EXISTS Uvas(
	id_uva INT UNSIGNED AUTO_INCREMENT,
    nome_uva VARCHAR(20),
    PRIMARY KEY(id_uva)
);

CREATE TABLE IF NOT EXISTS Produtos(
	id_produto INT UNSIGNED AUTO_INCREMENT,
    finca VARCHAR(45) NOT NULL,
    cosecha ENUM('tardia','temprana'),
    tipo ENUM('tinto', 'branco', 'rosé', 'frisante'),
    ano CHAR(5),
    valor DOUBLE,
    origem VARCHAR(20),
    rotulo VARCHAR(200),
    ativo ENUM('ativo','inativo'),
    descricao TEXT,
    PRIMARY KEY(id_produto)
);

CREATE TABLE IF NOT EXISTS Produtos_Uvas(
	produto_id INT UNSIGNED,
    uva_id INT UNSIGNED,
    FOREIGN KEY (produto_id) REFERENCES Produtos(id_produto),
    FOREIGN KEY (uva_id) REFERENCES Uvas(id_uva)
);

CREATE TABLE IF NOT EXISTS Pedidos(
	id_pedido INT UNSIGNED AUTO_INCREMENT,
    id_endereco INT UNSIGNED,
    id_cliente INT UNSIGNED,
    PRIMARY KEY (id_pedido),
    FOREIGN KEY (id_endereco) REFERENCES Enderecos(id_endereco),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

CREATE TABLE IF NOT EXISTS Pedidos_Produtos(
	id_pedido INT UNSIGNED,
    id_produto INT UNSIGNED,
    quantidade INT UNSIGNED,
    valor DOUBLE,
    FOREIGN KEY(id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY(id_produto) REFERENCES Produtos(id_produto)
);

insert into uvas (nome_uva) values ('syrrah');
insert into uvas (nome_uva) values ('malbec');
insert into uvas (nome_uva) values ('tempranillo');
insert into uvas (nome_uva) values ('cabernet');
insert into uvas (nome_uva) values ('pinot');
insert into uvas (nome_uva) values ('merlot');


-- Inserindo usuario administrador
insert into Login (email, senha, admin) values ('admin@lascopas.com', '$2a$10$6TJeD5WOUtSswXle2ixGR.sIDOeAuI9yYDfcoTxP/5FNqh9f4bU56', 1);
-- senha padrão - 123456 - Utilizando BCryptJS, Hash com salt=10;

insert into Clientes(nome,id_login) values ('Administrador',1);

-- Inserindo Usuario padrão
insert into login (email, senha)
values ('teste@gmail.com','$2a$10$6TJeD5WOUtSswXle2ixGR.sIDOeAuI9yYDfcoTxP/5FNqh9f4bU56');

insert into Clientes (nome, sobrenome, dt_nascimento, cadastro, documento, id_login)
values ('Teste', 'COPAS', '1996-07-20', 'fisica', '37820040077', 2);

insert into Produtos (finca, cosecha, tipo, ano, valor, origem, rotulo, ativo, descricao) values 
('Estancia Mendoza','tardia', 'tinto','2020' , '199.00', 'Argentina', 'images/uploads/rotulos/EM-roble.png', 'ativo', 'Um vinho de color ruby, sabor amadeirado com notas de frutos do bosque');

insert into Produtos (finca, cosecha, tipo, ano, valor, origem, rotulo, ativo, descricao) values 
('Trapiche', 'tardia', 'tinto', '2019', '99.98', 'Argentina', 'images/uploads/rotulos/Trapiche - cabernet.png', 'ativo', 'Um vinho de color marcante, sabor caracteristico da uva cabernet com notas amadeiradas');


INSERT INTO Produtos_Uvas (produto_id, uva_id) values (1, 1);
INSERT INTO Produtos_Uvas (produto_id, uva_id) values (1, 2);
INSERT INTO Produtos_Uvas (produto_id, uva_id) values (2, 4);
INSERT INTO Produtos_Uvas (produto_id, uva_id) values (2, 2);

-- alter table produtos add column ano varchar(5);

select * from produtos;

