export class CorridaMaluca {
    constructor(pista, listaCorretores){
        this.pista = pista
        this.listaCorredores = listaCorretores
    }

    start(){
        let rodada = 0
        let vencedor = false

        let corredores = this.preparaCorredor()
        
        while(vencedor==false){
            rodada++
            corredores = this.avancacorredores(corredores, rodada)
            vencedor = this.verificavencedor(corredores)
        }

        return vencedor
    }

    calculaVantagem() {
        this.listaCorredores.forEach(corredor => {
            if(this.pista.tipo == corredor.vantagem){
                corredor.velocidade +=2
                corredor.drift +=2
                corredor.aceleracao +=2
            }
        });
    }

    criaCorredor(corredor, aliado, inimigo) {
        const newCorredor = {
            posicao: 0,
            personagem: corredor,
            aliado: aliado,
            inimigo: inimigo,
            //acumulador para aplicar na proxima rodada
            debuff_Posicao_Pista: { valorDebuff: 0 , jaPassou:[]}
        }

        return newCorredor
    }

    preparaCorredor(){

        const corredores = []
        this.calculaVantagem()

        const gera_Aliado_Inimigo = [...this.listaCorredores, null]
       
        this.listaCorredores.forEach(personagem => {

            let corredor = null

            let aliado = gera_Aliado_Inimigo[Math.floor(Math.random() * gera_Aliado_Inimigo.length)]
            let inimigo = gera_Aliado_Inimigo[Math.floor(Math.random() * gera_Aliado_Inimigo.length)]

           //verifica se o alidado e o inimigo nao sao iguais, se forem so tera ele como aliado
            if(aliado == inimigo){
                inimigo = null
            }
             //verifica se nao eh o proprio corredor
            if(aliado != null && aliado.nome == personagem.nome){
                aliado = null
            }
            if(inimigo != null && inimigo.nome == personagem.nome){
                inimigo = null
            }

            //lanca certo
            if(aliado != null && inimigo != null){
                corredor = this.criaCorredor(personagem, aliado.nome, inimigo.nome)
            }
            else if(aliado == null && inimigo != null){
                corredor = this.criaCorredor(personagem, aliado, inimigo.nome)
            }
            else if(aliado != null && inimigo == null ){
                corredor = this.criaCorredor(personagem, aliado.nome, inimigo)
            }
            else{
                corredor = this.criaCorredor(personagem, aliado, inimigo)
            }


            corredores.push(corredor)
        });

        return corredores
    }

    calculaDebuff_Pista(avancoDoCorredor) {
        return avancoDoCorredor + this.pista.debuff
    }

    //=============================================================================
    calculaDebuff_Posicao_Pista(corredor, corredores) {

        const posicoesBuffsTam = this.pista.posicoesBuffs.length
        let debuff_Posicao_Pista = 0

        
        //comecar do ultimo debuff(Pos) da pista para o primeiro
        for (let i = posicoesBuffsTam-1; i >= 0; i--) {

            if(corredor.posicao >= this.pista.posicoesBuffs[i]){
                //se a posicao for maior verifica se já passoi por ali ou nao
                if(corredor.debuff_Posicao_Pista.jaPassou.includes(this.pista.posicoesBuffs[i]) == false){
                    //verificar quantos ja passaram
                    corredores.forEach( c => {
                        if(c.personagem != corredor.personagem && c.posicao >= this.pista.posicoesBuffs[i]){
                            debuff_Posicao_Pista++;
                        }
                    });

                    corredor.debuff_Posicao_Pista.jaPassou.push(this.pista.posicoesBuffs[i])
                    break;
                }
                else{
                    break;
                }
            }   
        }

        return debuff_Posicao_Pista
    }
    //=============================================================================

    calculaDebuff_Aliado(avancoDoCorredor, corredor, corredores) {
        if(corredor.aliado == null){
            return avancoDoCorredor
        }

        const posAliado = this.buscaPoscicao(corredor.aliado, corredores)
        const distancia = Math.abs(corredor.posicao - posAliado)
        if(distancia >= 0 && distancia <= 2){
            avancoDoCorredor+=1
        }

        return avancoDoCorredor
    }

    calculaDebuff_Inimigo(avancoDoCorredor, corredor, corredores) {
        if(corredor.inimigo == null){
            return avancoDoCorredor
        }

        const posInimigo = this.buscaPoscicao(corredor.inimigo, corredores)
        const distancia = Math.abs(corredor.posicao - posInimigo)
        if(distancia >= 0 && distancia <= 2){
            avancoDoCorredor-=1
        }

        return avancoDoCorredor
    }

    buscaPoscicao(nome, corredores){
        let posicao = 0

        corredores.forEach(corredor => {
            if(corredor.personagem.nome == nome){
                posicao = corredor.posicao
            }
        })

        return posicao
    }

    aplicaDebuffer(corredor, corredores, rodada) {

        //Tipo Avanço
        let avanca = corredor.personagem.velocidade
        if(rodada <= 3){
            avanca = corredor.personagem.aceleracao
        }
        if(rodada % 4 == 0){
            avanca = corredor.personagem.drift
        }
        
        //Debuffers
        avanca = this.calculaDebuff_Pista(avanca)
        avanca = this.calculaDebuff_Aliado(avanca, corredor, corredores)
        avanca = this.calculaDebuff_Inimigo(avanca, corredor, corredores)
        // aplica debuff_Posicao_Pista
        avanca -= corredor.debuff_Posicao_Pista.valorDebuff

        if(avanca <= 0){
            avanca = 0
        }

        return avanca
    }

    avancacorredores(corredores, rodada) {

        corredores.forEach(corredor => {
            const avanca = this.aplicaDebuffer(corredor, corredores, rodada)

            //impedi Dick Vigarista de ganhar
            if(corredor.personagem.nome == 'Dick Vigarista' && (corredor.posicao + avanca) >= this.pista.tamanho){
                corredor.posicao += 0
            }
            else{
                corredor.posicao += avanca
            }
            
            // verifica se ja passou pelo Debuffer da Pista para a proxima rodada
            const debuff = this.calculaDebuff_Posicao_Pista(corredor, corredores)
            corredor.debuff_Posicao_Pista.valorDebuff = debuff
        })

        //ordenar pelas posições
        corredores.sort((c1,c2) => {
            if(c1.posicao > c2.posicao){ return -1 }
            else{ return 1 }
        })


        return corredores
    }

    
    verificavencedor(corredores) {
        const tamPista = this.pista.tamanho
        //verifica se alguem já está ou passou do tamanho da pista
        const vencedor = []

        corredores.forEach(corredor => {
            if(corredor.posicao >= tamPista){
                vencedor.push(corredor.personagem.nome)
            }
        })
        
        if(vencedor.length === 0){
            return false
        }else{
            return vencedor
        }
    }

}