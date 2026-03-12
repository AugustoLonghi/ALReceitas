// Configuração de opções dos menus
const opcoesTipo = {
    pizza: [
        { val: "napolitana", texto: "Napolitana" },
        { val: "paulista", texto: "Paulista" },
        { val: "pan", texto: "Pan" },
        { val: "romana", texto: "Romana" },
        { val: "newyork", texto: "New York" },
        { val: "chicago", texto: "Chicago" }
    ],
    molho: [
        { val: "sugo", texto: "Sugo (Clássico)" },
        { val: "marinada", texto: "Marinada (Alho e Ervas)" },
        { val: "hut", texto: "Hut (Temperado e Espesso)" }
    ],
    cobertura: [
        { val: "mucarela", texto: "Muçarela" },
        { val: "marguerita", texto: "Marguerita" },
        { val: "pepperoni", texto: "Pepperoni" },
        { val: "frango_catupiry", texto: "Frango com Catupiry" }
    ]
};

// Banco de Dados de Receitas
const database = {
    pizza: {
        napolitana: { 
            baseF25: 150, agua: 0.70, ferm: 0.005, sal: 0.02, acucar: 0, gord: 0, 
            nota: `Utilize farinha tipo 00.<br> 
				   Temperatura recomentada do forno: 430-500°C.<br>
				   Fermentação dentro da geladeira 24-48h.<br>
				   Retire da geladeira falando 2h para o preparo em dias quentes e faltando 3h para dias frios.`,
            preparo: `1. Em uma tigela coloque a farinha, agua e fermento e misture.<br>
                      2. Adicione o sal e continue a misturar.<br>
                      3. Sove fazendo dobra até a massa ficar lisa, faça a bola e deixe descansar por 1h dentro de um pote.<br>
                      4. Guarde na geladeira por 48h. Retire da geladeira faltando de 2 a 3h para o preparo.<br>
                      5. Para abrir, deixe a massa cair do pote, e começe a apertar o dentro levando o ar para fora, tome cuidado para não amassar a borda.<br>
                      6. Abra a massa com as mãos até ficar no tamanho correto e começe a montar a pizza.`
        },
        paulista: { baseF25: 150, agua: 0.60, ferm: 0.01, sal: 0.02, acucar: 0.01, gord: 0.02, nota: "Farinha 01, forno 300°C.",
			preparo: `1. Em uma tijela misture água morna (30 seg no microondas) e o fermento e deixe descansando por 10 min.<br>
			      2. Coloque a farinha, sal e açucar e misture até incorporar depois começe a sovar por 5 min.<br>
				  3. Faça a bola e deixe descansando em um pote por 1h30.<br>
				  4. Abra a massa até o tamanho correto deixando a espeçura de um dedo.<br>
				  5. Unte a forma com azeite e coloque a massa nela, deixe descansando por mais 1h30.<br>
				  6. Passe molho na massa, um fio de azeite na borda e coloque para pré-assar em um forno pré aquecido (30 min) em 300º por 20 min.<br>
				  7. Coloque mais molho, monte a pizza e volte ao forno.`
		},
        pan: { baseF25: 190, agua: 0.6447, ferm: 0.0132, sal: 0.0158, acucar: 0.0263, gord: 0, nota: "Forno 220-250°C.",
		    preparo: `1. Em uma tijela misture água morna (30 seg no microondas) e o fermento e deixe descansando por 10 min.<br>
					  2. Coloque a farinha, sal e açucar e misture até incorporar depois começe a sovar por 5 min.<br>
				      3. Faça a bola e deixe descansando em um pote por 1h30.<br>
				      4. Abra a massa até o tamanho correto deixando a espeçura de um dedo.<br>
				      5. Unte a forma com azeite e coloque a massa nela, deixe descansando por mais 1h30.<br>
				      6. Passe molho na massa, um fio de azeite na borda e coloque para pré-assar em um forno pré aquecido (30 min) em 300º por 20 min.<br>
				      7. Coloque mais molho, monte a pizza e volte ao forno.`},
        romana: { baseF25: 125, agua: 0.66, ferm: 0.004, sal: 0.024, acucar: 0.008, gord: 0.02, nota: "Forno 320-350°C.", preparo: "Abrir bem fina com rolo." },
        newyork: { baseF25: 130, agua: 0.6154, ferm: 0.0077, sal: 0.0231, acucar: 0.0231, gord: 0.0308, nota: "Farinha bread flour.", preparo: "Sova longa para elasticidade." },
        chicago: { baseF25: 150, agua: 0.50, ferm: 0.0133, sal: 0.0233, acucar: 0.0267, gord: 0.10, nota: "Forma alta, montagem invertida.", preparo: "Massa curta, sem muita sova." }
    },
    molho: {
        sugo: { baseM25: 80, tomate: 0.97, sal: 0.015, acucar: 0.015, azeite: 0, nota: "Sugo clássico.", preparo: "Reduzir tomate pelado em fogo baixo." },
        marinada: { baseM25: 80, tomate: 0.94, sal: 0.02, alho: 0.03, azeite: 0.01, nota: "Marinada fresca.", preparo: "Misturar alho e orégano ao tomate." },
        hut: { baseM25: 80, extrato: 0.60, agua: 0.30, acucar: 0.03, sal: 0.02, especiarias: 0.05, nota: "Estilo Americano.", preparo: "Diluir extrato e temperar." }
    },
    cobertura: {
        mucarela: {
            queijo: 180, oregano: 1, azeitona: 3,
            nota: "O clássico brasileiro. Use muçarela de boa qualidade para não soltar óleo.",
            preparo: "1. Espalhe o molho. 2. Cubra com a muçarela ralada ou em fatias. 3. Finalize com as azeitonas e o orégano."
        },
        marguerita: {
            queijo: 160, tomate_fresco: 40, manjericao: 5, parmesao: 10,
            nota: "Marguerita Tradicional. O manjericão deve ser colocado preferencialmente após o forno.",
            preparo: "1. Molho e muçarela. 2. Rodelas de tomate e parmesão. 3. Após assar, coloque as folhas de manjericão fresco."
        },
        pepperoni: {
            queijo: 150, pepperoni: 70, cebola: 30,
            nota: "Pepperoni Style. A cebola ajuda a quebrar a gordura do salame.",
            preparo: "1. Molho e muçarela. 2. Distribua as fatias de pepperoni. 3. Adicione cebola em rodelas bem finas."
        },
        frango_catupiry: {
            queijo: 100, frango_desfiado: 120, catupiry: 80, milho: 20,
            nota: "Frango com Catupiry. Certifique-se de que o frango esteja bem temperado e seco.",
            preparo: "1. Molho e uma base leve de muçarela. 2. Frango desfiado temperado. 3. Faça os círculos de Catupiry por cima."
        }
    }
};

function atualizarTipos() {
    const categoria = document.getElementById('receita').value;
    const tipoSelect = document.getElementById('tipo');
    tipoSelect.innerHTML = "";
    
    const opcoes = opcoesTipo[categoria];

    opcoes.forEach(opt => {
        let el = document.createElement('option');
        el.value = opt.val;
        el.textContent = opt.texto;
        tipoSelect.appendChild(el);
    });
}

function calcular() {
    const categoria = document.getElementById('receita').value;
    const tipo = document.getElementById('tipo').value;
    const tamanho = parseInt(document.getElementById('tamanho').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const fator = (tamanho === 35) ? 2 : 1;

    let ingredientes = [];
    let nota = "";
    let preparo = "";

    if (categoria === "pizza") {
        const r = database.pizza[tipo];
        const fTotal = r.baseF25 * fator * quantidade;
        nota = r.nota; preparo = r.preparo;
        ingredientes = [
            { n: "Farinha", v: fTotal, u: "g" },
            { n: "Água", v: fTotal * r.agua, u: "ml" },
            { n: "Fermento", v: fTotal * r.ferm, u: "g" },
            { n: "Sal", v: fTotal * r.sal, u: "g" },
            { n: "Açúcar", v: fTotal * r.acucar, u: "g" },
            { n: "Azeite/Gordura", v: fTotal * r.gord, u: "g/ml" }
        ];
    } else if (categoria === "molho") {
        const r = database.molho[tipo];
        const mTotal = r.baseM25 * fator * quantidade;
        nota = r.nota; preparo = r.preparo;
        ingredientes = [
            { n: "Tomate Pelati", v: mTotal * (r.tomate || 0), u: "g" },
            { n: "Extrato de Tomate", v: mTotal * (r.extrato || 0), u: "g" },
            { n: "Água", v: mTotal * (r.agua || 0), u: "ml" },
            { n: "Alho", v: mTotal * (r.alho || 0), u: "g" },
            { n: "Sal", v: mTotal * (r.sal || 0), u: "g" },
            { n: "Açúcar", v: mTotal * (r.acucar || 0), u: "g" },
            { n: "Azeite", v: mTotal * (r.azeite || 0), u: "ml" },
            { n: "Especiarias", v: mTotal * (r.especiarias || 0), u: "g" }
        ];
    } else {
        // LÓGICA PARA COBERTURA
        const r = database.cobertura[tipo];
        nota = r.nota; preparo = r.preparo;
        // Mapeia os campos dinâmicos do objeto de cobertura
        Object.keys(r).forEach(key => {
            if (key !== 'nota' && key !== 'preparo') {
                ingredientes.push({
                    n: key.replace("_", " ").toUpperCase(), 
                    v: r[key] * fator * quantidade, 
                    u: (key === "manjericao" || key === "azeitona") ? " un/folhas" : "g"
                });
            }
        });
    }

    exibir(ingredientes, nota, preparo);
}

function exibir(itens, nota, preparo) {
    const ul = document.getElementById('lista-ingredientes');
    ul.innerHTML = "";
    document.getElementById('resultado').style.display = "block";
    document.getElementById('texto-nota').innerHTML = nota;
    document.getElementById('texto-preparo').innerHTML = preparo;

    itens.forEach(i => {
        if (i.v >= 0.1) {
            const li = document.createElement('li');
            const valorArredondado = Math.round(i.v);
            li.innerHTML = `${i.n} - <span>${valorArredondado}${i.u}</span>`;
            ul.appendChild(li);
        }
    });
}

// Inicializa o campo Tipo ao carregar a página
atualizarTipos();