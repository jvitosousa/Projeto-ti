$(document).ready(function () {
    listar();
});

function listar () {    
    $("#timeline").html(` `);
    let categoria = $("#Categoria").val();
    let lista_inicial = JSON.parse(localStorage.getItem('lista-relatos') || '[]');
    for (let index = 0; index < lista_inicial.length; index++) {
        const element = lista_inicial[index];
        let likes = parseInt(element.like);
        let date = new Date(element.data);
        if(categoria == 'Todos' ||categoria == element.tipo){
            $("#timeline").prepend(`
            <div class="RelatoUnico">
                <h4>Categoria: ${element.tipo} -- Data de envio: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}</h4>
                <p>
                ${element.relato}
                </p>
                <p><input type="button" onclick="curtida()" value="Curtir"> Curtidas - ${likes}</p>     
            </div>         
        `);
        }
        
    }
}
/*
function curtida(num){
    let lista_inicial = JSON.parse(localStorage.getItem('lista-relatos') || '[]');
    const element = lista_inicial[num];
    let likes = parseInt(element.like);
    likes = likes + 1;
    element.like = likes;
}*/


function enviarRelato() {
    let relato = $("#Relato").val();
    let tipos = $("#Tipo").val();
    let email = $("#emailID").val();
    $("#Relato").val("");
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

function alteraEmail(){
    campo = document.getElementById ('Email');
    if(campo.style.display == 'inline'){
        campo.style.display = 'none';
    }else {
        campo.style.display = 'inline';
    } 
}