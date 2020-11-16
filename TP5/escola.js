const http = require('http');
const axios = require('axios');

var servidor = http.createServer(function(req, res) {
    console.log(req.method + ' ' + req.url);

    if (req.method == 'GET') {
        if (req.url == '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>');
            res.write('<li><a href=\"http://localhost:3001/alunos\">Lista de alunos</a></li>')
            res.write('<li><a href=\"http://localhost:3001/cursos\">Lista de cursos</a></li>')
            res.write('<li><a href=\"http://localhost:3001/instrumentos\">Lista de instrumentos</a></li>')
            res.write('</ul>');
            res.end();
            //alunos
        } else if (req.url == '/alunos') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/alunos')
                .then((resp) => {
                    alunos = resp.data;
                    res.write('<ul>');
                    alunos.forEach(a => {
                        res.write(`<li><a href=\"http://localhost:3001/alunos/${a.id}"+"\">${a.id}, ${a.nome}</a></li>`); //TODO
                        console.log(`${a.id}, ${a.nome}, ${a.instrumento}`);
                    });
                    res.write('</ul>');
                    res.write('<a href=\"http://localhost:3001/\">Voltar ao Inicio</a>')
                    res.end();
                }).catch((err) => {
                    console.log('Erro: ' + err);
                    res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
                    res.end();
                });
        } else if (req.url.match(/\/alunos\/[AE]+[0-9-]+/)) {
            var num = req.url.split("/")[2];

            axios.get('http://localhost:3000/alunos/'+ num)
                .then((resp) => {

                    res.writeHead(200, {
                        'Content-type': 'text/html; charset=utf-8'
                    })

                    aluno = resp.data;
                    res.write('<ul>');
                    
                    res.write(`<h3>Aluno ${aluno.id}</h3>`);
                    res.write(`<p>Nome: ${aluno.nome}</p>`);
                    res.write(`<p>Número de aluno: ${aluno.id}</p>`);
                    res.write(`<p>Data de Nascimento: ${aluno.dataNasc}</p>`);
                    res.write(`<p>Curso: <a href=\"http://localhost:3001/cursos/${aluno.curso}\">${aluno.curso}</a></p>`);
                    console.log(aluno.curso);
                    res.write(`<p>Ano do Curso: ${aluno.anoCurso}</p>`);
                    res.write(`<p>Instrumento: ${aluno.instrumento}</a></p>`);

                    res.write('<p><a href=\"http://localhost:3001/alunos\">Voltar aos Alunos</a></p>');
                    res.write('<a href=\"http://localhost:3001/\">Voltar ao Inicio</a>');

                    res.write('</ul>');
                    res.end();
                }).catch((err) => {
                    console.log('Erro :'+err);
                    res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
                    res.end();
                });
        }

        //Cursos
        
        else if (req.url == '/cursos') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/cursos')
                .then((resp) => {
                    cursos = resp.data;
                    res.write('<ul>');
                    cursos.forEach(c => {
                        res.write(`<li><a href=\"http://localhost:3001/cursos/${c.id}/\">${c.id}, ${c.designacao}</a></li>`)
                        console.log(`<li>${c.id}, ${c.designacao}</li>`);
                    });
                    res.write('</ul>');
                    res.write('<a href=\"http://localhost:3001/\">Voltar ao Inicio</a>')
                    res.end();
                }).catch((err) => {
                    console.log('Erro: ' + err);
                    res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
                    res.end();
                });
        } else if(req.url.match(/\/cursos\/[CBS]+[0-9]+/)){
            console.log(req.url);
            var i = req.url.split("/")[2];
            axios.get('http://localhost:3000/cursos/'+ i)
                .then((resp) => {
                    res.writeHead(200, {
                        'Content-type': 'text/html; charset=utf-8'
                    })
                    c = resp.data;
                    res.write('<ul>');
                    res.write(`<h3>Curso</h3>`);
                    res.write(`<p>Id: ${c.id}</p>`);
                    res.write(`<p>Designação: ${c.designacao}</p>`);
                    res.write(`<p>Duração: ${c.duracao}</p>`);
                    res.write(`<p>Instrumento: ${aluno.instrumento}</a></p>`);
                    res.write('<p><a href=\"http://localhost:3001/cursos\">Voltar aos Cursos</a></p>');
                    res.write('<a href=\"http://localhost:3001/\">Voltar ao Inicio</a>');
                    res.write('</ul>');
                    res.end();
                }).catch((err) => {
                    console.log('Erro :'+err);
                    res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
                    res.end();
                });
        }
        // Instrumentos
        else if (req.url == '/instrumentos') {
            res.writeHead(200, {
                'Content-type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/instrumentos')
                .then((resp) => {
                    instrumentos = resp.data;
                    res.write('<ul>');
                    instrumentos.forEach(i => {
                        res.write(`<li><a href=\"http://localhost:3001/instrumentos/${i.id}/\">${i.id}, ${i["#text"]}</a></li>`)
                        console.log(`<li>${i.id}, ${i["#text"]}<li>`);
                    });
                    res.write('<ul>');
                    res.write('<a href=\"http://localhost:3001/\">Voltar ao Inicio</a>')
                    res.end();
                }).catch((err) => {
                    console.log('Erro: ' + err);
                    res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
                    res.end();
                });
        }
    }else if(req.url.match(/\/instrumentos\/I[0-9]+/)){
        var i = req.url.split("/")[2];
        axios.get('http://localhost:3000/instrumentos?id='+ i)
            .then((resp) => {
                res.writeHead(200, {
                    'Content-type': 'text/html; charset=utf-8'
                })
                c = resp.data[0];
                res.write('<ul>');
                res.write(`<h3>Instrumento</h3>`);
                res.write(`<p>Id: ${c.id}</p>`);
                res.write(`<p>Designação: ${c["#text"]}</p>`);                
                res.write('<p><a href=\"http://localhost:3001/instrumentos\">Voltar aos Instrumentos</a></p>');
                res.write('<a href=\"http://localhost:3001/\">Voltar ao Inicio</a>');
                res.write('</ul>');
                res.end();
            }).catch((err) => {
                console.log('Erro :'+err);
                res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
                res.end();
            });



        }
         else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
        res.end();
    }
})
servidor.listen(3001);
console.log('Listening 3001');