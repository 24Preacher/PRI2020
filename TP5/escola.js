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
                //Cursos
        } else if (req.url == '/cursos') {
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
                // Instrumentos
        } else if (req.url == '/instrumentos') {
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
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
        res.end();
    }
})
servidor.listen(3001);
console.log('Listening 3001');