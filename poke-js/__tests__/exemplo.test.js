import pokemons from './pokemons.json'
import { Treinador } from '../src/index'

const POKEMONS = [...pokemons]
let TREINADOR

beforeEach( () => {
  const pokeInicial = [{...POKEMONS[0]}]
  TREINADOR = Treinador('Zeze', 15, pokeInicial)
}) 

describe('Exemplo de testes', () => {
  
  it('Deve subir o nível do pokemon corretamente', () => {
    const treinador1 = TREINADOR.capturaPokemon({...POKEMONS[1]}, POKEMONS)
    const treinador2 = treinador1.capturaPokemon({...POKEMONS[2]}, POKEMONS)
    const treinador3 = treinador2.capturaPokemon({...POKEMONS[3]}, POKEMONS)
    
    const nivelEsperado = 4

    expect(nivelEsperado).toBe(treinador3.listaPokemons[0].levelInicial)
  })

  it('Deve evoluir pokemon ao atingir o nível necessário', () => {
    const treinador1 = TREINADOR.capturaPokemon({...POKEMONS[1]}, POKEMONS)
    const treinador2 = treinador1.capturaPokemon({...POKEMONS[2]}, POKEMONS)
    const treinador3 = treinador2.capturaPokemon({...POKEMONS[3]}, POKEMONS)
    const treinador4 = treinador3.capturaPokemon({...POKEMONS[4]}, POKEMONS)

    const nivelEsperado = 5
    const nomeEsperado = "Wartortle"

    expect(nivelEsperado).toBe(treinador4.listaPokemons[0].levelInicial)
    expect(nomeEsperado).toEqual(treinador4.listaPokemons[0].nome)
  })

  it('Não deve evoluir pokemon caso não possua o level necessário', () => {
    const treinador1 = TREINADOR.capturaPokemon({...POKEMONS[1]}, POKEMONS)
    const treinador2 = treinador1.capturaPokemon({...POKEMONS[2]}, POKEMONS)
    const treinador3 = treinador2.capturaPokemon({...POKEMONS[3]}, POKEMONS)

    const nivelEsperado = 4
    const nomeEsperado = "Squirtle"

    expect(nivelEsperado).toBe(treinador3.listaPokemons[0].levelInicial)
    expect(nomeEsperado).toEqual(treinador3.listaPokemons[0].nome)
  })

  it('Treinador será criado com nome correto', () => {
    const treinador1 = TREINADOR.capturaPokemon({...POKEMONS[1]}, POKEMONS)
    const treinador2 = treinador1.capturaPokemon({...POKEMONS[2]}, POKEMONS)
    const treinador3 = treinador2.capturaPokemon({...POKEMONS[3]}, POKEMONS)

    const nomeEsperado = "Zeze"
    expect(nomeEsperado).toEqual(treinador3.nome)
  })

  it('Treinador será criado com a idade correta', () => {
    const treinador1 = TREINADOR.capturaPokemon({...POKEMONS[1]}, POKEMONS)
    const treinador2 = treinador1.capturaPokemon({...POKEMONS[2]}, POKEMONS)
    const treinador3 = treinador2.capturaPokemon({...POKEMONS[3]}, POKEMONS)

    const idadeEsperada = 15

    expect(idadeEsperada).toBe(treinador3.idade)
  })

  it('Treinador será criado com o pokemon inicial correto', () => {
    const treinador1 = TREINADOR.capturaPokemon({...POKEMONS[1]}, POKEMONS)
    const treinador2 = treinador1.capturaPokemon({...POKEMONS[2]}, POKEMONS)

    const pokemonEsperadoid = 1

    expect(pokemonEsperadoid).toEqual(treinador2.listaPokemons[0].id)
  })

  it('Treinador terá seus pokemons atualizados após nova captura', () => {
    const treinador1 = TREINADOR.capturaPokemon({...POKEMONS[1]}, POKEMONS)
    const treinador2 = treinador1.capturaPokemon({...POKEMONS[2]}, POKEMONS)

    const pokemonEsperado1 = {"id": 1,"nome": "Squirtle","poderAtaque": 1,"levelInicial": 3,"evolucao": {"level": 5,"id": 2}}
    const pokemonEsperado2 = {"id": 2,"nome": "Wartortle","poderAtaque": 10,"levelInicial": 6,"evolucao": {"level": 10,"id": 3}}
    const pokemonEsperado3 = {"id": 3,"nome": "Blastoise","poderAtaque": 100,"levelInicial": 10,"evolucao": null}

    expect(pokemonEsperado1).toEqual(treinador2.listaPokemons[0])
    expect(pokemonEsperado2).toEqual(treinador2.listaPokemons[1])
    expect(pokemonEsperado3).toEqual(treinador2.listaPokemons[2])
  })
})