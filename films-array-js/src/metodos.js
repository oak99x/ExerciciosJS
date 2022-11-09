export function filtarPorAnoERetornarNome(series, ano) {
  const listaNomes = series
                    .filter(serie => serie.anoEstreia >= ano)
                    .map(serie => serie.titulo)

  return listaNomes
}

export function verificarSeAtorEstaEmSeriado(series, nomeAtor) {
  const contem = series.reduce(
                                (acumulador, serie) => {return acumulador || serie.elenco.includes(nomeAtor)}
                                ,false
                              )
  return contem
}

export function calcularMediaTotalDeEpisodios(series) {
  const totalEpisodios = series.reduce(
                                        (acumulador, serie) => {return acumulador += serie.numeroEpisodios}
                                        ,0
                                      )
                                      
  const mediaTotal = totalEpisodios / series.length
  return mediaTotal
}

export function agruparTituloDasSeriesPorPropriedade(series, propriedade) {
 
  const groupByPropriedade = series.reduce((group, serie) => {
                            (group[serie[propriedade]] = group[serie[propriedade]] || []).push(serie);
                            return group;
                            }, {});

  return groupByPropriedade
}
