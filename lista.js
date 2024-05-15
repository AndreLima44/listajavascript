class No {
    constructor(valor) {
      this.valor = valor;
      this.proximo = null;
      this.anterior = null;
    }
  }
  
  function inserirInicio(lista, num) {
    const novo = new No(num);
  
    if (novo) {
      novo.proximo = lista;
      if (lista) {
        lista.anterior = novo;
      }
      lista = novo;
    } else {
      console.log("Erro ao alocar memória.");
    }
  }
  
  function inserirFim(lista, num) {
    const novo = new No(num);
    let aux;
  
    if (novo) {
      if (!lista) {
        lista = novo;
      } else {
        aux = lista;
        while (aux.proximo) {
          aux = aux.proximo;
        }
        aux.proximo = novo;
        novo.anterior = aux;
      }
    } else {
      console.log("Erro ao alocar memória.");
    }
  }
  
  function inserirMeio(lista, num, ant) {
    const novo = new No(num);
    let aux;
  
    if (novo) {
      if (!lista) {
        lista = novo;
      } else {
        aux = lista;
        while (aux.valor !== ant && aux.proximo) {
          aux = aux.proximo;
        }
        novo.proximo = aux.proximo;
        novo.anterior = aux;
        aux.proximo = novo;
      }
    } else {
      console.log("Erro ao alocar memória.");
    }
  }
  
  function inserirOrdenado(lista, num) {
    const novo = new No(num);
    let aux;
  
    if (novo) {
      if (!lista || num < lista.valor) {
        novo.proximo = lista;
        lista = novo;
      } else {
        aux = lista;
        while (aux.proximo && num > aux.proximo.valor) {
          aux = aux.proximo;
        }
        novo.proximo = aux.proximo;
        novo.anterior = aux;
        aux.proximo = novo;
      }
    }
  }
  
  function remover(lista, num) {
    let aux, no = null;
  
    if (lista) {
      if (lista.valor === num) {
        no = lista;
        lista = lista.proximo;
        if (lista) {
          lista.anterior = null;
        }
      } else {
        aux = lista;
        while (aux.proximo && aux.proximo.valor !== num) {
          aux = aux.proximo;
        }
        if (aux.proximo) {
          no = aux.proximo;
          aux.proximo = no.proximo;
          if (aux.proximo) {
            aux.proximo.anterior = aux;
          }
        }
      }
    }
    return no;
  }
  
  function buscar(lista, num) {
    let aux = lista;
    while (aux && aux.valor !== num) {
      aux = aux.proximo;
    }
    return aux;
  }
  
  function ultimo(lista) {
    let aux = lista;
    while (aux.proximo) {
      aux = aux.proximo;
    }
    return aux;
  }
  
  function imprimir(lista) {
    let output = "\nLista: ";
    while (lista) {
      output += lista.valor + " ";
      lista = lista.proximo;
    }
    console.log(output + "\n");
  }
  
  function imprimirInverso(lista) {
    let output = "\nLista: ";
    while (lista) {
      output += lista.valor + " ";
      lista = lista.anterior;
    }
    console.log(output + "\n");
  }
  
  let lista = null;
  let opcao, valor, anterior;
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.setPrompt("\n0 - Sair\n1 - Inserir no início\n2 - Inserir no fim\n3 - Inserir no meio\n4 - Inserir ordenado\n5 - Remover\n6 - Imprimir\n7 - Imprimir 2\n8 - Buscar\n\nOpção: ");
  rl.prompt();
  
  rl.on("line", (line) => {
    opcao = parseInt(line.trim());
  
    switch (opcao) {
      case 1:
        rl.question("Valor: ", (input) => {
          valor = parseInt(input.trim());
          inserirInicio(lista, valor);
          rl.prompt();
        });
        break;
  
      case 2:
        rl.question("Valor: ", (input) => {
          valor = parseInt(input.trim());
          inserirFim(lista, valor);
          rl.prompt();
        });
        break;
  
      case 3:
        rl.question("Valor a ser inserido e valor de referência: ", (input) => {
          const valores = input.trim().split(" ");
          valor = parseInt(valores[0]);
          anterior = parseInt(valores[1]);
          inserirMeio(lista, valor, anterior);
          rl.prompt();
        });
        break;
  
      case 4:
        rl.question("Valor: ", (input) => {
          valor = parseInt(input.trim());
          inserirOrdenado(lista, valor);
          rl.prompt();
        });
        break;
  
      case 5:
        rl.question("Remover o valor: ", (input) => {
          valor = parseInt(input.trim());
          const no = remover(lista, valor);
          if (no) {
            console.log(`Elemento: ${no.valor}`);
            // Não há necessidade de liberar a memória em JavaScript
          } else {
            console.log("Elemento não encontrado.");
          }
          rl.prompt();
        });
        break;
  
      case 6:
        imprimir(lista);
        rl.prompt();
        break;
  
      case 7:
        imprimirInverso(ultimo(lista));
        rl.prompt();
        break;
  
      case 8:
        rl.question("Buscar: ", (input) => {
          valor = parseInt(input.trim());
          const no = buscar(lista, valor);
          if (no) {
            console.log(`Elemento: ${no.valor}`);
          } else {
            console.log("Elemento não encontrado.");
          }
          rl.prompt();
        });
        break;
  
      case 0:
        rl.close();
        break;
  
      default:
        console.log("Opção inválida.");
        rl.prompt();
    }
  }).on("close", () => {
    console.log("Encerrando programa.");
    process.exit(0);
  });
  