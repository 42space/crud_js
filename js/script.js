class Produto {

    constructor() {

        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;

    }   

    salvar() {
        let produto = this.lerDados();

        if(this.validaCampos(produto)) {
            
            if(this.editId == null) {
                this.adicionar(produto);
            }
             else {
                 this.atualizar(this.editId, produto)
             }
        }

        this.listaTabela();
        this.cancelar()
      
    }

    listaTabela() {
        let tbody = document.querySelector('#tbody');
        tbody.innerText = '';

        for(let i=0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow(); //cria uma linha na tabela tr

            let td_id      = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor   = tr.insertCell();
            let td_acoes   = tr.insertCell();

            td_id.innerText =  this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;

          
            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.setAttribute("onclick", "produto.preparaEditacao("+JSON.stringify(this.arrayProdutos[i])+")");

            let imgDele = document.createElement('img');
            imgDele.setAttribute("onclick", "produto.deletar("+this.arrayProdutos[i].id+")");

            imgEdit.src = 'img/edit.svg';
            imgDele.src = 'img/delete.svg';

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDele);
        }
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
        this.id++;
    }

    cancelar() {

        document.querySelector('#nompro').value = '';
        document.querySelector('#valpro').value = '';

        document.querySelector('#btnAtualizar').innerText = 'salvar';
        this.editId = null;
    }

    //encarregado de pegar os valores dos inputs
    lerDados()
    {
        let produto = {}
        produto.id = this.id;
        produto.nomeProduto = document.querySelector('#nompro').value;
        produto.preco = document.querySelector('#valpro').value;

        return produto;
    }

    //encarregado de fazer validações simples dos inputs
    validaCampos(produto) {

        let msg = '';

        if(produto.nomeProduto == '') {
            msg += '-informa o nome do Produto \n';
        }

        if(produto.preco == '') {
            msg += '-Informe o preço do produto \n'
        } 

        if(msg != '') {
           alert(msg);
           return false;
        }

        return true;
    }

    deletar(id) {

        if(confirm('Deseja realmente Deletar?')) {
            
            let tbody = document.querySelector('#tbody');
            
            for(let i=0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    atualizar(id, produto) {
       
        for(let i=0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }

    preparaEditacao(dados) {
        this.editId = dados.id;

        let nompro = document.querySelector('#nompro').value = dados.nomeProduto;
        let valpro = document.querySelector('#valpro').value = dados.preco;

        document.querySelector('#btnAtualizar').innerText = 'Atualizar';
    }
}

var produto = new Produto();