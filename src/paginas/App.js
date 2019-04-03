import './App.css';
import React from "react";

class App extends React.Component {
    
    constructor(){
        super()
        this.state = {
            repositorios:[] ,
            usuario : "",
            quant:"10"
        }
        this.buscarValores = this.buscarValores.bind(this);
        this.informacoesRepositorio = this.informacoesRepositorio.bind(this);
        this.buscarRadio = this.buscarRadio.bind(this);
    }

    informacoesRepositorio(event){
        event.preventDefault();
        fetch(this.state.usuario,{
            method:'GET',
            headers:{
                Authorization: 'Basic Q2hpbmdsaW5nMTUyOjIyMTA4YTcxNDIzMzY='
            }
        })
        .then(res => res.json())
        .then(data => this.setState({repositorios : data}))
        .catch(erro => console.error(erro));
    }

    buscarValores(event){
        this.setState(
            {usuario: "https://api.github.com/users/"+event.target.value+"/repos?sort=created&per_page="+this.state.quant}
        );
    }

    buscarRadio(event){
        this.setState(
            {quant:event.target.value}
        );
    }

    render() {
        return (
            <div id="main">
                <section id="pesquisa">
                    <h1>Buscar informações</h1>
                    <form action="" method="get" onSubmit={this.informacoesRepositorio}>
                        <label htmlFor="proprietario-nome">Informe o nome do proprietario</label>
                        <input type="text"  placeholder="Nome do proprietario" id="proprietario-nome" onChange={this.buscarValores}/>
                        {/* <div id="filtragem">
                            <label htmlFor="">Visualizar</label>
                            <label htmlFor="dez-primeiros">Dez primeiros</label>
                            <input type="radio" name="repositorios" id="dez-primeiros" value="10" onClick={this.buscarRadio}/>
                            <label htmlFor="trinta-primeiros">Trinta primeiros</label>
                            <input type="radio" name="repositorios" id="trinta-primeiros" value="30" onClick={this.buscarRadio}/>
                            <label htmlFor="todos-os-repositorios">Todos</label>
                            <input type="radio" name="repositorios" id="todos-os-repositorios" value="all" onClick={this.buscarRadio}/>
                        </div> */}
                        <input type="submit" value="Procurar" />
                    </form>
                </section>
                <div id="resultados">
                    <table>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>Nome</td>
                                <td>Descrição</td>
                                <td>Data de criação</td>
                                <td>Tamanho</td>
                            </tr>
                        </thead>
                        <tbody id="tabela-repositorios">{
                            this.state.repositorios.map((i)=> {
                                return (
                                    <tr key={i.id}>
                                        <td>{i.id}</td>
                                        <td>{i.name}</td>
                                        <td>{i.description}</td>
                                        <td>{i.created_at}</td>
                                        <td>{i.size} Kb</td>
                                    </tr>
                                );
                            })    
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
