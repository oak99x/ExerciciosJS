import axios from 'axios'

import {
  verificarSeAtorEstaEmSeriado,
  filtarPorAnoERetornarNome,
  calcularMediaTotalDeEpisodios,
  agruparTituloDasSeriesPorPropriedade,
} from '../src/metodos'

let respostaApi

beforeAll(async() => {
    respostaApi = await axios.get('https://gustavobuttenbender.github.io/film-array/data/films.json')
})
describe('Exemplo de testes', () => {
  it('Valor importado deve ser true', () => {
    expect(true).toBeTruthy()
  })

  it('Deve filtrar as series com ano de estreia maior ou igual a 2010 e retornar uma listagem com os nomes', () => {
    
    const retorno = filtarPorAnoERetornarNome(respostaApi.data, 2010)
   
    const resultadoEsperado = [
      'Stranger Things',
      'Game Of Thrones',
      'The Walking Dead',
      'Band of Brothers',
      'Gus and Will The Masters of the Wizards',
      '10 Days Why',
      'Mr. Robot',
      'Narcos',
      'Westworld'
    ]
    
    expect(resultadoEsperado).toEqual(retorno)
  })

  it('Deve retornar true ao procurar ator que está em elenco', () => {
    const retorno = verificarSeAtorEstaEmSeriado(respostaApi.data, "Winona Ryder")
    expect(retorno).toBeTruthy()
  })

  it('Deve retornar false ao procurar ator que não participa de elenco', () => {
    const retorno = verificarSeAtorEstaEmSeriado(respostaApi.data,  "Winona Ryderxxxxxx")
    expect(retorno).toBeFalsy();
  })

  it('Deve calcular corretamente a media total de episódios de todas as series', () => {
    const retorno = calcularMediaTotalDeEpisodios(respostaApi.data)
    const valorEsperado = 35.8

    expect(valorEsperado).toBe(retorno)
  })

  it('Deve agrupar corretamente em um objeto os titulos das series baseado na Distribuidora', () => {
    const retorno = agruparTituloDasSeriesPorPropriedade(respostaApi.data,  'distribuidora')
    const resultadoEsperado = {
      Netflix: [
        {
          titulo: 'Stranger Things',
          anoEstreia: 2016,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 3,
          numeroEpisodios: 25,
          distribuidora: 'Netflix'
        },
        {
          titulo: 'Narcos',
          anoEstreia: 2015,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 2,
          numeroEpisodios: 20,
          distribuidora: 'Netflix'
        }
      ],
      HBO: [
        {
          titulo: 'Game Of Thrones',
          anoEstreia: 2011,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 8,
          numeroEpisodios: 60,
          distribuidora: 'HBO'
        },
        {
          titulo: 'Band of Brothers',
          anoEstreia: 20001,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 1,
          numeroEpisodios: 10,
          distribuidora: 'HBO'
        },
        {
          titulo: 'Westworld',
          anoEstreia: 2016,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 1,
          numeroEpisodios: 10,
          distribuidora: 'HBO'
        }
      ],
      AMC: [
        {
          titulo: 'The Walking Dead',
          anoEstreia: 2010,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 7,
          numeroEpisodios: 99,
          distribuidora: 'AMC'
        },
        {
          titulo: 'Breaking Bad',
          anoEstreia: 2008,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 5,
          numeroEpisodios: 62,
          distribuidora: 'AMC'
        }
      ],
      CWI: [
        {
          titulo: 'Gus and Will The Masters of the Wizards',
          anoEstreia: 2021,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 1,
          numeroEpisodios: 40,
          distribuidora: 'CWI'
        }
      ],
      JS: [
        {
          titulo: '10 Days Why',
          anoEstreia: 2010,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 10,
          numeroEpisodios: 10,
          distribuidora: 'JS'
        }
      ],
      'USA Network': [
        {
          titulo: 'Mr. Robot',
          anoEstreia: 2018,
          diretor: [Array],
          genero: [Array],
          elenco: [Array],
          temporadas: 2,
          numeroEpisodios: 22,
          distribuidora: 'USA Network'
        }
      ]
    }
    
    expect(console.log(resultadoEsperado)).toEqual(console.log(retorno));
  })
  
})
