import axios from 'axios'
import { CorridaMaluca } from '../src/index'

let pistasApi
let corredoresApi

beforeEach(async() => {
  pistasApi = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/pistas.json')
  corredoresApi = await axios.get('https://gustavobuttenbender.github.io/gus.github/corrida-maluca/personagens.json')
})

describe('Exemplo de testes', () => {
 
  it('Deve conseguir obter a pista corretamente', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data]) 
    expect(pistasApi.data[0]).toEqual(corrida.pista);
  })

  it('Deve conseguir obter o corredor corretamente', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])
    const listaCorredores = [...corredoresApi.data]

    expect(listaCorredores).toEqual(corrida.listaCorredores);
  })

  it('Deve conseguir calcular a vantagem de tipo pista corretamente', () => {
    const corrida = new CorridaMaluca(pistasApi.data[1], [...corredoresApi.data])
    corrida.calculaVantagem()

    const resultadoEsperado ={
      id: 1,
      nome: 'Dick Vigarista',
      velocidade: 7,
      drift: 4, 
      aceleracao: 6,
      vantagem: 'CIRCUITO'
    }
    
    expect(resultadoEsperado).toEqual(corrida.listaCorredores[0]);
  })

  it('Deve conseguir calcular o debuff de pista corretamente', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data]) 
    const corredores = corrida.preparaCorredor()
    
    const debuffDaPista = corrida.calculaDebuff_Pista(corredores[0].personagem.aceleracao)
    const resultadoEsperado = 2

    expect(resultadoEsperado).toEqual(debuffDaPista);
  })

  it('Deve conseguir calcular o buff de posição de pista para 3 corredores', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])

    let corredor1 = corrida.criaCorredor(corrida.listaCorredores[0], null, null )
    let corredor2 = corrida.criaCorredor(corrida.listaCorredores[1], null, null )
    let corredor3 = corrida.criaCorredor(corrida.listaCorredores[2], null, null )

    corredor1.posicao = 7
    //já passou pelo debuff - foi o primeiro
    corredor1.debuff_Posicao_Pista.jaPassou.push(6)
    corredor2.posicao = 5
    corredor3.posicao = 4

    let corredores = [corredor1, corredor2, corredor3]

    corredores = corrida.avancacorredores(corredores, 1)
    corredores = corrida.avancacorredores(corredores, 2)
    

     expect(0).toEqual(corredores[0].debuff_Posicao_Pista.valorDebuff);
     expect(0).toEqual(corredores[1].debuff_Posicao_Pista.valorDebuff);
     expect(2).toEqual(corredores[2].debuff_Posicao_Pista.valorDebuff);
  })

  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o buff de um aliado', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])

    let corredor = corrida.criaCorredor(corrida.listaCorredores[0], "Irmãos Rocha", null )
    let aliado = corrida.criaCorredor(corrida.listaCorredores[1], null, null )

    corredor.posicao = 3
    aliado.posicao = 2

    let corredores = [corredor, aliado]
    let posDebuffDoAliado = corrida.calculaDebuff_Aliado(corredores[0].personagem.aceleracao, corredores[0], corredores)
    
    corredores[0].posicao += posDebuffDoAliado
    const resultadoEsperado = 8

    expect(resultadoEsperado).toEqual(corredores[0].posicao);
  })

  it('Deve conseguir calcular a próxima posição corretamente se estiver sob o debuff de um inimigo', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])

    let corredor = corrida.criaCorredor(corrida.listaCorredores[0], null, "Irmãos Rocha")
    let inimigo = corrida.criaCorredor(corrida.listaCorredores[1], null, null )

    corredor.posicao = 3
    inimigo.posicao = 2

    let corredores = [corredor, inimigo]
    let posDebuffDoAliado = corrida.calculaDebuff_Aliado(corredores[0].personagem.aceleracao, corredores[0], corredores)
    
    corredores[0].posicao += posDebuffDoAliado
    const resultadoEsperado = 7

    expect(resultadoEsperado).toEqual(corredores[0].posicao);
  })

  it('Deve conseguir completar uma corrida com um vencedor', () => {
      const corrida = new CorridaMaluca(pistasApi.data[3], [...corredoresApi.data])
      const vencedor = corrida.start()

      const resultadoEsperado = [ 'Penélope Charmosa' ]
      expect(resultadoEsperado).toEqual(vencedor);
  })

  it('Deve conseguir criar corredor corretamente somente com aliado', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])
    let corredor = corrida.criaCorredor(corrida.listaCorredores[0], "Irmãos Rocha", null)

    const resultadoEsperado = {
      posicao: 0,
      personagem: corrida.listaCorredores[0],
      aliado: "Irmãos Rocha",
      inimigo: null,
      debuff_Posicao_Pista: { valorDebuff: 0 , jaPassou:[]}
    }

    expect(resultadoEsperado).toEqual(corredor);
  })

  it('Deve conseguir criar corredor corretamente somente com inimigo', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])
    let corredor = corrida.criaCorredor(corrida.listaCorredores[0], null, "Irmãos Rocha")

    const resultadoEsperado = {
      posicao: 0,
      personagem: corrida.listaCorredores[0],
      aliado: null,
      inimigo: "Irmãos Rocha",
      debuff_Posicao_Pista: { valorDebuff: 0 , jaPassou:[]}
    }

    expect(resultadoEsperado).toEqual(corredor);
  })

  it('Deve conseguir criar corredor corretamente com aliado e inimigo', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])
    let corredor = corrida.criaCorredor(corrida.listaCorredores[0], "Barão Vermelho", "Irmãos Rocha")

    const resultadoEsperado = {
      posicao: 0,
      personagem: corrida.listaCorredores[0],
      aliado: "Barão Vermelho",
      inimigo: "Irmãos Rocha",
      debuff_Posicao_Pista: { valorDebuff: 0 , jaPassou:[]}
    }

    expect(resultadoEsperado).toEqual(corredor);
  })

  it('Deve conseguir calcular as novas posições corretamente de uma rodada para a próxima', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])

    let corredor1 = corrida.criaCorredor(corrida.listaCorredores[0], null, null )
    let corredor2 = corrida.criaCorredor(corrida.listaCorredores[1], null, null )
    let corredor3 = corrida.criaCorredor(corrida.listaCorredores[2], null, null )

    corredor1.posicao = 7
    //já passou pelo debuff - foi o primeiro
    corredor1.debuff_Posicao_Pista.jaPassou.push(6)
    corredor2.posicao = 5
    corredor3.posicao = 4

    let corredores = [corredor1, corredor2, corredor3]

    //rodada n
    corredores = corrida.avancacorredores(corredores, 1)
    //rodada n+1
    corredores = corrida.avancacorredores(corredores, 2)
    

     expect(11).toEqual(corredores[0].posicao);
     expect(6).toEqual(corredores[1].posicao);
     expect(6).toEqual(corredores[2].posicao);
  })


  it('Deve impedir que corredor se mova negativamente mesmo se o calculo de velocidade seja negativo', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])

    let corredor1 = corrida.criaCorredor(corrida.listaCorredores[0], null, null )
    let corredor2 = corrida.criaCorredor(corrida.listaCorredores[1], null, null )
    let corredor3 = corrida.criaCorredor(corrida.listaCorredores[2], null, null )

    //já passou pelo debuff - foi o primeiro
    corredor1.posicao = 8
    corredor1.debuff_Posicao_Pista.jaPassou.push(6)

    //já passou pelo debuff - foi o segundo
    corredor2.posicao = 7
    corredor2.debuff_Posicao_Pista.jaPassou.push(6)

    corredor3.posicao = 5

    let corredores = [corredor1, corredor2, corredor3]

    //rodada n
    //todo mundo anda
    corredores = corrida.avancacorredores(corredores, 1)
    //nesta rodata corredor3 deve ficar parado e nao pode retornar para posição 5
    corredores = corrida.avancacorredores(corredores, 2)
    

     expect(12).toEqual(corredores[0].posicao);
     expect(9).toEqual(corredores[1].posicao);
     expect(6).toEqual(corredores[2].posicao);
  })

  it('Deve impedir que o Dick Vigarista vença a corrida se estiver a uma rodada de ganhar', () => {
    const corrida = new CorridaMaluca(pistasApi.data[0], [...corredoresApi.data])

    let corredor1 = corrida.criaCorredor(corrida.listaCorredores[0], null, null )
    let corredor2 = corrida.criaCorredor(corrida.listaCorredores[1], null, null )

    //já passou pelos debuffers
    corredor1.posicao = 29
    corredor1.debuff_Posicao_Pista.jaPassou.push(6)
    corredor1.debuff_Posicao_Pista.jaPassou.push(17)

    corredor2.posicao = 16
    corredor2.debuff_Posicao_Pista.jaPassou.push(6)

    let corredores = [corredor1, corredor2]

    corredores = corrida.avancacorredores(corredores, 1)
    corredores = corrida.avancacorredores(corredores, 2)
    corredores = corrida.avancacorredores(corredores, 3)
    corredores = corrida.avancacorredores(corredores, 4)
    corredores = corrida.avancacorredores(corredores, 5)
    corredores = corrida.avancacorredores(corredores, 6)
    corredores = corrida.avancacorredores(corredores, 7)
    corredores = corrida.avancacorredores(corredores, 8)
    corredores = corrida.avancacorredores(corredores, 9)
   
    const vencedor = corrida.verificavencedor(corredores)
    const resultadoEsperado = [ 'Irmãos Rocha' ]
    expect(resultadoEsperado).toEqual(vencedor);
  })

  

})

