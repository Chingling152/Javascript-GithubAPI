let URL = "https://api.github.com/users/{0}/repos?sort=created&per_page=10";
let repositorios = [];
let usuario = document.querySelector("#proprietario-nome");

document.querySelector("#formulario").addEventListener("submit", function (event) {
    event.preventDefault();
    informacoesRepositorio();
});

function informacoesRepositorio() {
    event.preventDefault();
    fetch(URL.replace("{0}", usuario.value), {
        method: 'GET',
        headers: {
            Authorization: 'Basic Q2hpbmdsaW5nMTUyOjIyMTA4YTcxNDIzMzY='
        }
    })
        .then(res => res.json())
        .then(data => gerarTabela(data))
        .catch(erro => alert(erro));
}

function gerarTabela(data) {
    let tabela = document.querySelector('#tabela-repositorios-resultados');
    tabela.innerHTML = '';
    data.map(i =>
        tabela.appendChild(gerarLinha(i))
    );

}

function gerarLinha(item){
    let linha = document.createElement("tr")
    let id = document.createElement("td");
    let url = document.createElement("td");
    let des = document.createElement("td");
    let cre = document.createElement("td");
    let siz = document.createElement("td");
    id.innerText = item.id;
    url.innerHTML = "<a href={0} rel='noopener noreferrer' target='_blank'>{1}</a>".replace("{0}",item.html_url).replace("{1}",item.name);
    des.innerText = item.description;
    cre.innerHTML = item.created_at.split('T')[0];
    siz.innerHTML = item.size + " Kb";

    linha.appendChild(id);
    linha.appendChild(url);
    linha.appendChild(des);
    linha.appendChild(cre);
    linha.appendChild(siz);

    return linha;
}
