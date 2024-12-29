document.addEventListener("DOMContentLoaded", () => {
    const fiatInput = document.getElementById("fiat-value");
    const satoshiInput = document.getElementById("sats-value");
    const bitcoinPriceInput = document.getElementById("btc-value");
  
    // Atualiza os valores dinamicamente
    function updateValues(event) {
      const fiatValue = parseFloat(fiatInput.value) || 0;
      const satoshiValue = parseFloat(satoshiInput.value) || 0;
      const bitcoinPrice = parseFloat(bitcoinPriceInput.value) || 0;
  
      if (bitcoinPrice > 0) {
        console.log(`Campo alterado: ${event.target.id}`);

        if (event.target === fiatInput) {
          // Atualiza Satoshis com base no FIAT
          satoshiInput.value = ((fiatValue / bitcoinPrice) * 100000000).toFixed(0);
          console.log(`Valor atual do FIAT: ${satoshiInput.value}`);
        } else if (event.target === satoshiInput) {
          // Atualiza FIAT com base nos Satoshis
          fiatInput.value = ((satoshiValue / 100000000) * bitcoinPrice).toFixed(2);
          console.log(`Valor atual dos Satoshis: ${fiatInput.value}`);

        } else if (event.target === bitcoinPriceInput) {
          // Atualiza ambos os campos com base no Preço do Bitcoin
          if (fiatValue > 0) {
            satoshiInput.value = ((fiatValue / bitcoinPrice) * 100000000).toFixed(0);
            console.log(`Valor atual do Preço do Bitcoin: ${bitcoinPriceInput.value}`);

          }
          if (satoshiValue > 0) {
            fiatInput.value = ((satoshiValue / 100_000_000) * bitcoinPrice).toFixed(2);
            console.log(`Valor atual do Preço do Bitcoin: ${bitcoinPriceInput.value}`);

          }
        }
      }
    }
  
    // Adiciona os listeners de eventos
    fiatInput.addEventListener("input", updateValues);
    satoshiInput.addEventListener("input", updateValues);
    bitcoinPriceInput.addEventListener("input", updateValues);
    console.log(fiatInput.addEventListener("input", updateValues));
  });
  



  