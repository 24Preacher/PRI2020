var http = require('http')
var axios = require('axios')
var fs = require('fs')

var {parse} = require('querystring')


// Funções auxilidares
function recuperaInfo(request, callback){
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data',bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}


function myFunction() {
    var list = document.getElementById("myList");
    list.removeChild(list.childNodes[0]);
  }
// Template para a página com to do List ------------------
function geraPagList( lista, d){
    let pagHTML = `
      <html>
          <head>
              <title>To Do List</title>
              <meta charset="utf-8"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
              <div class="w3-container w3-teal">
                  <h2>To Do List</h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Data criç\ão </th>
                      <th>Data limite</th>
                      <th>Responsável</th>
                      <th>Descrição</th>
                      <th>Feito</th>
                      <th>Cancelado</th>
                      
                  </tr>
    `
      lista.forEach(a => {
          var d =a.data
          pagHTML += `
          
              <tr>
    
                  <form class="w3-container" action="/confirmation" method="POST">
                    <td> ${a.dateCreated}  </td>
                    <td> ${a.dateDued} </td>
                    <td> ${a.responsavel} </td>
                    <td> ${a.descricao}</td>
                    <td><input class="w3-btn w3-blue-teal" type="submit" value="✔️"/></td>
                  </form>
                  <form class="w3-container" action="/cancel" method="POST">
    
                    <td><input class="w3-btn w3-blue-teal" type="submit" value="x"/></td>
                  </form>
              </tr>
          `
      });
      
    pagHTML += `
          </table>
          <div class="w3-container w3-teal">
        
          </div>
      </body>
      </html>
    `
    return pagHTML
}

  // Template para o formulário de aluno ------------------
function geraFormList( d ){
    return `
    <html>
        <head>
            <title>Nova Tarefa</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Nova Tarefa</h2>
            </div>
            <form class="w3-container" action="/toDoList" method="POST">
                <label class="w3-text-teal"><b>Data Cria\ção</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dateCreated">
                <label class="w3-text-teal"><b>Data Limite</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dateDued">
          
                <label class="w3-text-teal"><b>Descriçao</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
                <label class="w3-text-teal"><b>Responsavel</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">
                <input class="w3-btn w3-blue-teal" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-teal" type="reset" value="Limpar valores"/>
            </form>
        </body>
    </html>
    `
}


// Criação do servidor

var toDoListServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    switch(req.method){
        case "GET": 
        if((req.url == "/") || (req.url == "/toDoList")){
            axios.all([
                axios.get('http://localhost:3000/toDoList?_sort=dateCreated.responsavel'),
                ]).then(axios.spread((toListRes) => {
                  lista = toListRes.data
                  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                  res.write(geraFormList(d ))
                  res.write(geraPagList(lista,d))
                  res.end()
             }))

        }
        else if(/w3.css$/.test(req.url)){
            fs.readFile("w3.css", function(erro, dados){ 
            if(!erro){
                res.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'})
                 res.write(dados)
                 res.end()
            }
            })
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
            res.end()
        }
        break

        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
})

toDoListServer.listen(3001)
console.log('Servidor à escuta na porta 3001...')