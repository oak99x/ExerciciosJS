export const Treinador = (nome, idade, pokemons=[]) => {

    const treinador = {
      nome: nome,
      idade: idade,
      listaPokemons: [...pokemons],
    }

    treinador.capturaPokemon = (pokemon, listaPokemons) => {

        for(let i=0; i< treinador.listaPokemons.length; i++){
            treinador.listaPokemons[i] = treinador.sobeNivelPokemon(treinador.listaPokemons[i])
            treinador.listaPokemons[i] = treinador.evoluiPokemon(treinador.listaPokemons[i], listaPokemons)
        }
        
        const newTreinador = Treinador(treinador.nome, treinador.idade, [ ...treinador.listaPokemons, pokemon])
        
        return newTreinador
    }

    treinador.sobeNivelPokemon = (pokemon) => {
        pokemon.levelInicial+=1
        return pokemon
    }

    treinador.evoluiPokemon = (pokemon, listaPokemons) => {
       
        if(pokemon.evolucao != null && pokemon.levelInicial == pokemon.evolucao.level){
            for(let i=0; i< listaPokemons.length; i++){
                if(listaPokemons[i].id == pokemon.evolucao.id){
                    return {...listaPokemons[i]}
                }
            }
        }

        return pokemon
    }

    return treinador
}