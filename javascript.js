var categoria;
var descricao;
var valor;
var data ;
var betas_local;
betas_local = JSON.parse(localStorage.getItem("objetos_data")); 

function alter_data_local(){
    localStorage.setItem("objetos_data",JSON.stringify(betas_local));
    betas_local = JSON.parse(localStorage.getItem("objetos_data")); 
}

function push() {

    data = document.getElementById("date_input").value;
    valor = document.getElementById("valor_input").value;
    descricao = document.getElementById("descricao_input").value;

    if (document.getElementById("receita_radio").checked) {
        categoria = document.getElementById("receita_radio").value;


    } else if (document.getElementById("despesa_radio").checked) {
        categoria = document.getElementById("despesa_radio").value;


    } else if (document.getElementById("meta_radio").checked) {
        categoria = document.getElementById("meta_radio").value;

    }
    let add_new_line = {
        "Descrição": descricao,
        "Valor": valor,
        "Data": data,
        "Categoria": categoria,
    }
    
    betas_local.push(add_new_line);
    document.getElementById("form_one").reset();

    return viwer_list(), calc(),alter_data_local();
    
};
var bilqs = ""
function viwer_list() {
    for (a = 0; a < 1; a++) {
        bilqs = `<table id="myTable">
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th>Categoria</th>
                </tr>

            </table>`
        document.getElementById("tabela_div").innerHTML = bilqs;
        for (i = 0; i < betas_local.length; i++) {
            var bt_delet = `<button class="delete-btn" id=${i} onClick="remove_line(this.id)">Delete</button>`;
            var table = document.getElementById("myTable");
            var row = table.insertRow(-1);
            var tab_descri = row.insertCell(0);
            var tab_valor = row.insertCell(1);
            var tab_data = row.insertCell(2);
            var tab_categoria = row.insertCell(3);
            var bt_delet_table = row.insertCell(4);
            tab_descri.innerHTML = betas_local[i].Descrição;
            tab_valor.innerHTML = "R$ " + betas_local[i].Valor;
            tab_data.innerHTML = betas_local[i].Data;
            tab_categoria.innerHTML = betas_local[i].Categoria;
            bt_delet_table.innerHTML = bt_delet;
        }
    }
}

function remove_line(id) {
    betas_local.splice(id, 1);
    return viwer_list(), calc(),alter_data_local();
}

var calc_receita = 0;
var calc_metas = 0;
var calc_despesas = 0;
var receita_liquida = 0;

function calc() {

    if (betas_local.length == 0) {
        calc_receita = 0;
        calc_metas = 0;
        calc_despesas = 0;
        receita_liquida = 0;
    }
    
    for (a = 0; a < 1; a++) {
        calc_receita = 0;
        calc_metas = 0;
        calc_despesas = 0;
        for (i = 0; i < betas_local.length; i++) {

            switch (betas_local[i].Categoria) {
                case "Receita":
                    var receita_calc = parseFloat(betas_local[i].Valor);
                    calc_receita += receita_calc;
                    break;
                case "Despesa":
                    var despesa_calc = parseFloat(betas_local[i].Valor);
                    calc_despesas += despesa_calc;
                    break;

                case "Metas":
                    var metas_calc = parseFloat(betas_local[i].Valor);
                    calc_metas += metas_calc;
                    break;
            }

            receita_liquida = calc_receita-calc_despesas;

        }
    }
    document.getElementById("val_receita").innerHTML = "R$ " + calc_receita;
    document.getElementById("val_despesa").innerHTML = "R$ " + calc_despesas;
    document.getElementById("val_meta").innerHTML = "R$ " + calc_metas;
    document.getElementById("receita_liq_div").innerHTML= "R$ " +receita_liquida;
}