export const SuperArray = (itens = []) => {

  const array = {
    /**
     * Propriedade para acessar os itens
     */
    itens: [...itens],
  }

  /**
   * Adicionar um novo item ao final dos items
   */

  array.push = item => {
    var len = array.itens.length;
    array.itens[len] = item;
  }

  /**
   * Itera sobre cada um dos elementos do SuperArray enviando o item e o index
   * como segundo parametro
   */

  array.forEach = callback => {
      for(let i=0; i< array.itens.length; i++){
        callback(array.itens[i])
      }
  }

  /**
   * Retorna um novo SuperArray com os itens mapeados
   */

  array.map = callback => {
    let arrayAux = SuperArray()

    for(let i=0; i< array.itens.length; i++){
      arrayAux.push(callback(array.itens[i])) 
    }

    return arrayAux
  }


  /**
   * Retorna um SuperArray novo com os itens filtrados
   */

  array.filter = callback => {
    let arrayAux = SuperArray()

    for(let i=0; i< array.itens.length; i++){
 
      if(callback(array.itens[i])){
        arrayAux.push(array.itens[i])
      }
    }

    return arrayAux
  }


  /**
   * Retorna o primeiro elemento do SuperArray que satisfazer o callback recebido
   * se não encontrar, deve retornar undefined
   */

  array.find = callback => {

    for(let i=0; i< array.itens.length; i++){
      if(callback(array.itens[i])){
        return array.itens[i]
      }
    }

    return undefined
  }

  /**
   * Reduz o SuperArray em um único valor
   */


  array.reduce = (callback, valorInicial) => {
    let reduce = valorInicial

    for(let i=0; i< array.itens.length; i++){
      reduce = callback(reduce, array.itens[i]) 
    }

    return reduce
  }

  return array
}
