$(document).ready(function () {
    listar();
    listarTelefone();
    listarCategoria();
    carregarNoticias();
    mostrarCat();
});

function listar() {
    $("#timeline").html(` `);
    let categoria = $("#CategoriaLista2").val();
    let lista_inicial = JSON.parse(localStorage.getItem('lista-relatos') || '[]');
    for (let index = 0; index < lista_inicial.length; index++) {
        const element = lista_inicial[index];
        let likes = parseInt(element.like);
        let date = new Date(element.data);
        if (categoria == 'Todos' || categoria == element.tipo) {
            $("#timeline").prepend(`
            <div class=" row">
              <div class="col col-md-12">
              <h3>
                <label> Categoria: </label> 
                <label>${element.tipo} -- </label>
                <label> Data de envio:</label>
                <label>${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}</label>
              </h3>
              <h5>
                  <label> ${element.relato}</label>
              </h5>
              <div>
                <input id="apoio" type="button" class="btn btn-outline-primary" onclick="curtida(this)" value="Mandar o seu apoio">
              </div>
              <br> 
            </div>                   
        `);
        }

    }
}

function curtida(elemento){
  campo = $(elemento).val();
    if (campo == "Mandar o seu apoio") {
        $(elemento).val("Voce demonstrou seu Apoio");
    } else {
        $(elemento).val("Mandar o seu apoio");
    }
}


function enviarRelato() {
    let relato = $("#RelatoTexto").val();
    let tipos = $("#CategoriaLista1").val();
    let email = $("#emailID").val();
    $("#RelatoTexto").val("");
    let date = new Date();
    var likes = 0;
    var lista_relatos = JSON.parse(localStorage.getItem('lista-relatos') || '[]');
    lista_relatos.push({
        tipo: tipos,
        identificacao: email,
        data: date,
        relato: relato,
        like: likes
    });
    localStorage.setItem("lista-relatos", JSON.stringify(lista_relatos));
    //console.log('Salva com sucesso.');
    listar();
}

function alteraEmail() {
    campo = document.getElementById('Email');
    if (campo.style.display == 'inline') {
        campo.style.display = 'none';
    } else {
        campo.style.display = 'inline';
    }
}

function mostrarTel() {
    campo = document.getElementById('formTel');
    if (campo.style.display == 'none') {
        campo.style.display = 'inline';
    } else {
        campo.style.display = 'none';
    }
}

function mostrarCategoria() {
    campo2 = document.getElementById('formCat');
    if (campo2.style.display == 'none') {
        campo2.style.display = 'inline';
    } else {
        campo2.style.display = 'none';
    }
}

function enviarTelefone() {
    let numero = $("#numTel").val();
    let nome = $("#contatoTel").val();
    let mail = $("#EmailTel").val();
    $("#numTel").val("");
    $("#contatoTel").val("");
    $("#EmailTel").val("");
    var lista_contatos = JSON.parse(localStorage.getItem('lista-contatos') || '[]');
    lista_contatos.push({
        contato: nome,
        numTel: numero,
        email: mail
    });
    localStorage.setItem("lista-contatos", JSON.stringify(lista_contatos));
    //console.log('Salva com sucesso.');
    listarTelefone();
}

function listarTelefone() {
    $("#elementosTel").html(` `);
    let lista_contatos = JSON.parse(localStorage.getItem('lista-contatos') || '[]');
    for (let index = 0; index < lista_contatos.length; index++) {
        const element = lista_contatos[index];
        $("#elementosTel").append(`
        <div class=" row">
              <div class="col col-md-12">          
              <center>  
                <h4  style="font-size: 40px;">
                  Contato ${index + 1}
                </h4>
              </center>
              <h3>
                <label style="font-size: 30px;">Nome:</label>
                <label>${element.contato}</label>
              </h3>

              <h3>
                <label style="font-size: 30px;">Telefone:</label>
                <label>${element.numTel}</label>
              </h3>

              <h3>
                <label style="font-size: 30px;">E-mail:</label>
                <label>${element.email}</label>
              </h3>
              <br> 
            </div>              
        `);
    }
}
//448*24
function mostrarCat() {
    $("#elementosCat").html(` `);
    let lista_categorias = JSON.parse(localStorage.getItem('lista-categoria') || '[]');
    for (let index = 0; index < lista_categorias.length; index++) {
        const element = lista_categorias[index];
        $("#elementosCat").prepend(`
            <tr class="row">
                <td class="col col-md-6">${element.cat}</td>
                <td class="col col-md-6">${element.resumo}</td>
            </tr>              
        `);
    }
}

function enviarCategoria() {
    let categoria = $("#inputCategoria").val();
    let definicao = $("#inputResumoCat").val();
    $("#inputCategoria").val("");
    $("#inputResumoCat").val("");
    var lista_categoria = JSON.parse(localStorage.getItem('lista-categoria') || '[]');
    lista_categoria.push({
        cat: categoria,
        resumo: definicao
    });
    localStorage.setItem("lista-categoria", JSON.stringify(lista_categoria));
    //console.log('Salva com sucesso.');
    mostrarCat();
}

function listarCategoria() {
    $("#CategoriaLista1").html(` `);
    $("#CategoriaLista2").html(` `);
    let lista_categoria = JSON.parse(localStorage.getItem('lista-categoria') || '[]');
    $("#CategoriaLista1").prepend(`
        <option value="Outros">Outros</option>
        <option value="Racismo">Racismo</option>
        <option value="Machismo">Machismo</option>
        <option value="Homofobia">Homofobia</option>
        <option value="Gordofobia">Gordofobia</option> 
    `);
    $("#CategoriaLista2").prepend(`
        <option value="Todos">Todos</option>
        <option value="Outros">Outros</option>
        <option value="Racismo">Racismo</option>
        <option value="Machismo">Machismo</option>
        <option value="Homofobia">Homofobia</option>
        <option value="Gordofobia">Gordofobia</option>         
    `);
    for (let index = 0; index < lista_categoria.length; index++) {
        const element = lista_categoria[index];
        $("#CategoriaLista1").prepend(`
            <option value="${element.cat}">${element.cat}</option>
         `);
        $("#CategoriaLista2").prepend(`
            <option value="${element.cat}">${element.cat}</option>         
        `);
    }
}





function templateNoticia({
    img,
    titulo,
    subtitulo,
    link,
   }) {            
    return `
    <div class="col-12 col-sm-12 col-md-6 col-lg-3 h-100" >
        <div class="card" style="width: 18rem;">
        <img src="${img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <p class="card-text">${subtitulo}</p>
            <a href="${link}" class="btn btn-dark">Dar uma olhada</a>
        </div>
        </div>
    </div>
    `;         
  } 
  async function carregarNoticias(tema) {  
    console.log( "=== INICIO DA PAGINA ===" );
    let query = "Preconceito"
    let API_KEY = "3F72D34347084172B740708898220387"
    let url = `https://api.breakingapi.com/news?q=${query}&type=headlines&locale=pt-BR&api_key=${API_KEY}`;
    const resultadoDaApi = await fetch(url, {
      method: 'GET'
    });  
    const resultadoComoJson = await resultadoDaApi.json();
    const artigoPrincipal = resultadoComoJson.articles[0];
    const artigos = resultadoComoJson.articles.slice(0, 12);  
    console.log( artigoPrincipal );
    console.log( artigos );
    const listaDeNoticias = artigos.map(artigo => {
      return templateNoticia({
        img: artigo.primary_image_link,
        data: artigo.date_published,
        titulo: artigo.title,
        subtitulo: artigo.snippet,
        link: artigo.link,
      });
    })
    $('#lista-todas-noticias').html("");  
    listaDeNoticias.forEach(noticia => {
      $('#lista-todas-noticias').append(noticia);
    });  
  };

  $(async function() {
    carregarNoticias();
  });




