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
    ]
};

// Banco de Dados de Receitas
const database = {
    pizza: {
        napolitana: { baseF25: 150, agua: 0.70, ferm: 0.005, sal: 0.02, acucar: 0, gord: 0, nota: "Farinha tipo 00, forno 430-500°C, fermentação 24-48h." },
        paulista: { baseF25: 150, agua: 0.60, ferm: 0.01, sal: 0.02, acucar: 0.01, gord: 0.02, nota: "Farinha tipo 01, forno 300°C, fermentação 6-12h." },
        pan: { baseF25: 190, agua: 0.644, ferm: 0.013, sal: 0.015, acucar: 0.026, gord: 0, nota: "Farinha tipo 01, forno 220-250°C, fermentação 6h." },
        romana: { baseF25: 125, agua: 0.66, ferm: 0.004, sal: 0.024, acucar: 0.008, gord: 0.02, nota: "Farinha W260-300, abrir bem fina, forno 320-350°C." },
        newyork: { baseF25: 130, agua: 0.615, ferm: 0.007, sal: 0.023, acucar: 0.023, gord: 0.03, nota: "Farinha de pão (alta proteína), fermentação 24h fria." },
        chicago: { baseF25: 150, agua: 0.50, ferm: 0.013, sal: 0.023, acucar: 0.026, gord: 0.10, nota: "Farinha comum, sovar pouco, montagem invertida, forno 220°C." }
    },
    molho: {
        sugo: { 
            baseM25: 80, tomate: 0.95, sal: 0.02, azeite: 0.02, acucar: 0.01, ervas: 0,
            nota: "Molho rústico e espesso. Cozinhar os tomates pelados em fogo baixo até reduzir." 
        },
        marinada: { 
            baseM25: 80, tomate: 0.92, sal: 0.015, azeite: 0.02, acucar: 0, alho: 0.03, ervas: 0.015,
            nota: "Foco no alho e orégano. Não precisa de cozimento longo, preserve o frescor do alho." 
        },
        hut: { 
            baseM25: 80, extrato: 0.55, agua: 0.35, sal: 0.02, acucar: 0.03, azeite: 0.01, especiarias: 0.04,
            nota: "Estilo Americano: use extrato de tomate, cebola/alho em pó e manjericão seco. Fica bem aveludado." 
        }
    }
};

function atualizarTipos() {
    const categoria = document.getElementById('receita').value;
    const tipoSelect = document.getElementById('tipo');
    tipoSelect.innerHTML = "";
    
    opcoesTipo[categoria].forEach(opt => {
        let el = document.createElement('option');
        el.value = opt.val;
        el.textContent = opt.texto;
        tipoSelect.appendChild(el);
    });
}

function calcular() {
    const receita = document.getElementById('receita').value;
    const tipo = document.getElementById('tipo').value;
    const tamanho = parseInt(document.getElementById('tamanho').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const fatorTamanho = (tamanho === 35) ? 2 : 1;

    if (receita === "pizza") {
        calcularPizza(tipo, fatorTamanho, quantidade);
    } else {
        calcularMolho(tipo, fatorTamanho, quantidade);
    }
}

function calcularPizza(tipo, fator, qtd) {
    const r = database.pizza[tipo];
    const farinhaTotal = r.baseF25 * fator * qtd;
    const lista = [
        { n: "Farinha", v: farinhaTotal, u: "g" },
        { n: "Água", v: farinhaTotal * r.agua, u: "ml" },
        { n: "Fermento", v: farinhaTotal * r.ferm, u: "g" },
        { n: "Sal", v: farinhaTotal * r.sal, u: "g" },
        { n: "Açúcar", v: r.acucar === 0 ? "0%" : (farinhaTotal * r.acucar).toFixed(1) + "g" },
        { n: "Azeite/Gordura", v: r.gord === 0 ? "0%" : (farinhaTotal * r.gord).toFixed(1) + "g" }
    ];
    exibir(lista, r.nota);
}

function calcularMolho(tipo, fator, qtd) {
    const r = database.molho[tipo];
    const pesoTotal = r.baseM25 * fator * qtd;
    let lista = [];

    if (tipo === "hut") {
        lista = [
            { n: "Extrato de Tomate", v: pesoTotal * r.extrato, u: "g" },
            { n: "Água (para diluir)", v: pesoTotal * r.agua, u: "ml" },
            { n: "Especiarias (Alho/Cebola/Ervas)", v: pesoTotal * r.especiarias, u: "g" }
        ];
    } else {
        lista = [
            { n: "Tomate (Pelati ou fresco)", v: pesoTotal * r.tomate, u: "g" },
            { n: "Alho Picado", v: r.alho ? pesoTotal * r.alho : 0, u: "g" },
            { n: "Ervas (Orégano/Manjericão)", v: r.ervas ? pesoTotal * r.ervas : 0, u: "g" }
        ];
    }
    
    lista.push({ n: "Sal", v: pesoTotal * r.sal, u: "g" });
    lista.push({ n: "Açúcar", v: r.acucar ? pesoTotal * r.acucar : 0, u: "g" });
    lista.push({ n: "Azeite", v: pesoTotal * r.azeite, u: "ml" });

    exibir(lista, r.nota);
}

function exibir(itens, nota) {
    const ul = document.getElementById('lista-ingredientes');
    ul.innerHTML = "";
    document.getElementById('resultado').style.display = "block";
    document.getElementById('texto-nota').innerHTML = nota;

    itens.forEach(i => {
        if (i.v === 0) return; // Não mostra ingredientes zerados no molho para limpar a lista
        const li = document.createElement('li');
        const valFinal = typeof i.v === 'number' ? parseFloat(i.v.toFixed(1)) + i.u : i.v;
        li.innerHTML = `${i.n} - <span>${valFinal}</span>`;
        ul.appendChild(li);
    });
}

// Inicia o menu ao carregar a página
atualizarTipos();