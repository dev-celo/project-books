$(document).ready(function () {
    let data;

    // Carrega os dados do arquivo JSON
    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            renderCards();
        })
        .catch(error => console.error('Erro ao carregar dados:', error));

    const cardsContainer = $('#cardsContainer');
    let totalWindowsModules = 0;
    let totalWindowsModulesKids = 0;

    function createCard(aluno) {
        let modulesHtml = '';
        let totalModules = 0;

        for (const key in aluno.módulos) {
            if (aluno.módulos.hasOwnProperty(key)) {
                modulesHtml += `<li>${aluno.módulos[key]}</li>`;
                totalModules++;

                // Verifica se o módulo é de Excel e incrementa o total
                if (aluno.módulos[key].toLowerCase().includes('windows 10')) {
                    totalWindowsModules++;
                }

                if (aluno.módulos[key].toLowerCase().includes('windows 10 kids')) {
                    totalWindowsModulesKids++;
                }
            }
        }

        const cardColorClass = aluno.isUrgent ? 'urgent' : '';

        const cardHtml = `
        <div class="col-md-4 mb-4">
          <div class="card ${cardColorClass}">
            <div class="card-header">${aluno.nome}</div>
            <div class="card-body">
              <ul>${modulesHtml}</ul>
            </div>
            <div class="card-footer">Total de Módulos: ${totalModules}</div>
          </div>
        </div>
      `;

        cardsContainer.append(cardHtml);
    }

    function calculateTotalModules() {
        const totalExcelModulesContainer = $('#totalExcelModulesContainer');
        totalExcelModulesContainer.html('');
        totalExcelModulesContainer.append(`
            <p>Total de livros de windows 10 a serem comprados: ${totalWindowsModules}</p>
            <p>Total de livros de windows 10 kids a serem comprados: ${totalWindowsModulesKids}</p>
            <p>Total de livros de windows 11 a serem comprados: 1</p>
            <p>Outros urgentes: </p>
            <p>Gestão de Pessoas 3.0  a serem comprados: 3</p>
            <p>Matemática Financeira com HP12C a serem comprados: 3</p>
            <p>Administração Financeira 2.0 a serem comprados: 3</p>
            
        `);
    }

    function renderCards() {
        cardsContainer.html('');
        totalWindowsModules = 0; // Resetar o contador
        data.forEach(aluno => {
            createCard(aluno);
        });
        calculateTotalModules(); // Chamar após renderizar os cards
    }

    $('#addCardBtn').click(function () {
        // Adicione aqui a lógica para adicionar um novo card
        // Você pode usar prompt ou um modal para obter os dados do novo aluno
    });

    // Adicione aqui a lógica para remover um card
});
