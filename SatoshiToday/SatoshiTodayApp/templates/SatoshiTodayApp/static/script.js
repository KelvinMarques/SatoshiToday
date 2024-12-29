
const savedThemeSats = localStorage.getItem('theme');

  // Define o tema com base na preferência salva
  if (savedThemeSats === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement
  }

  const toggleButton = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

toggleButton.addEventListener('click', () => {
  // Alterna o modo escuro
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light'); // Salva a preferência
  } else {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark'); // Salva a preferência
  }
});

setInterval(async function() {
    try {
        const response = await fetch('/api/get_local_price/');
        const data = await response.json();
        console.log("Cotação atualizada:", data);
    } catch (error) {
        console.error("Erro ao atualizar cotação:", error);
    }
}, 450000); // 300000 ms = 5 minutos


async function getUserLocation() {
    try {
        // Chama a API de geolocalização para obter informações de localização
        const response = await fetch('https://ipinfo.io/json?token=9153890e56a6ca');
        const data = await response.json();
        
        // Extrai o país da resposta da API
        const userCountry = data.country;
        console.log("País do usuário:", userCountry);

        // Envia o país do usuário para o servidor para buscar a cotação
        fetch(`/api/get_local_price/?country=${userCountry}`)
            .then(response => response.json())
            .then(data => {
                console.log("Cotação local:", data.local_price);
                // Exibe ou utiliza a cotação como necessário
            });
    } catch (error) {
        console.error("Erro ao obter localização:", error);
    }
}

// Executa a função ao carregar a página
getUserLocation();

