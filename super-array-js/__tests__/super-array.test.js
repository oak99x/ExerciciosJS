import instrutores from './instrutores.json'
import { SuperArray } from '../src/super-array'

let INSTRUTORES 

beforeEach( () => {
  INSTRUTORES = SuperArray(instrutores)
}) 

describe('Exemplo de testes', () => {
  it('Valor importado deve ser true', () => {
    expect(true).toBeTruthy()
  })

  it('push deve adicionar um novo instrutor ao meu super array', () => {
    const novoInstrutor = { "nome": "Fabio Junqueira", "dandoAula": false }
    INSTRUTORES.push(novoInstrutor)

    expect(novoInstrutor).toEqual(INSTRUTORES.itens[8])
  })

  it('forEach deve passar por todos os instrutores e chamando o callback esperado', () => { 
    const arrayAux = []
    INSTRUTORES.forEach(item => {
      arrayAux.push(item)
    })

    const resultadoEsperado = [...instrutores]

    expect(resultadoEsperado).toEqual(arrayAux)
  })

  it('map deve retornar um novo array com o numero de nomes que o instrutor tem', () => {
    
    const arrayAux = INSTRUTORES.map(item => {
      let qtdNomes = item.nome.split(" ").length
      return qtdNomes
    })

    
    const resultadoEsperado = [2,2,2,3,2,2,2,3]

    expect(resultadoEsperado).toEqual(arrayAux.itens)
  })


  it('filter deve retornar um novo array apenas com os instrutores que estão dando aula', () => {
    
    const arrayAux = INSTRUTORES.filter(item => {
      return item.dandoAula == true
    })

    const resultadoEsperado = [ { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true },
                                { "nome": "William Cardozo", "dandoAula": true },]
    
    expect(resultadoEsperado).toEqual(arrayAux.itens)
  })

  it('find deve retornar o primeiro instrutor que está dando aula', () => {
    
    let itemBuscado = INSTRUTORES.find(item => {
      return item.dandoAula == true
    })

    const resultadoEsperado = { "nome": "Gustavo Büttenbender Rodrigues", "dandoAula": true }
    
    expect(resultadoEsperado).toEqual(itemBuscado)
  })

  it('Deve retornar undefined quando nao encontrado nenhum item', () => {
    
    let itemBuscado = INSTRUTORES.find(item => {
      return item.nome == "Zeze Neto"
    })

    const resultadoEsperado = undefined
    
    expect(resultadoEsperado).toEqual(itemBuscado)
  })

  it('reduce deve retornar o total de letras no nome dos instrutores', () => {
    
    const somaMeuArray = INSTRUTORES.reduce((acumulador, item) => {
      let espacoBranco = item.nome.split(" ").length
      return acumulador += (item.nome.length - espacoBranco)
    }, 0)

    const resultadoEsperado = 118

    expect(resultadoEsperado).toBe(somaMeuArray)
  })

  it('reduce deve retornar um boolean se todos os instrutores estão dando aula', () => {
    
    const somaMeuArray = INSTRUTORES.reduce((acumulador, item) => {
      return acumulador && item.dandoAula
    }, true)

    const resultadoEsperado = false

    expect(resultadoEsperado).toBe(somaMeuArray)
  })




})
