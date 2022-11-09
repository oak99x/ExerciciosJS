export const OPERACAO_INVALIDA = 'OPERACAO_INVALIDA'

function soma(valores){
  let resultado = 0

  for(let i=0; i < valores.length; i++){
    resultado = resultado+valores[i]
  }

  return resultado
}

function subtracao(valores){
  let resultado = valores[0]

  for(let i=1; i < valores.length; i++){
    resultado = resultado-valores[i]
  }

  return resultado
}

function multiplicacao(valores){
  let resultado = 1

  for(let i=0; i < valores.length; i++){
    resultado = resultado*valores[i]
  }

  return resultado
}

function divisao(valores){
  let resultado = valores[0]

  for(let i=1; i < valores.length; i++){
    resultado = resultado/valores[i]
  }

  return resultado
}

export const calculadora = (operacao, valores) => {
  switch(operacao){
    case 'soma':
      return soma(valores)
    case 'subtracao':
      return subtracao(valores)
    case 'multiplicacao':
      return multiplicacao(valores)
    case 'divisao':
      return divisao(valores)
    default:
      return OPERACAO_INVALIDA
  }
}
