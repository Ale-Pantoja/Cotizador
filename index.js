const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coinInfo = document.querySelector('#coin-info');

form.addEventListener('submit', async e => {
    e.preventDefault();

    const coinSelected = [...coin.children].find(option => option.selected).value;
    const cryptoSelected = [...crypto.children].find(option => option.selected).value;
    const amountValue = amount.value;
    console.log(coinSelected, cryptoSelected, amountValue);

    try {
        coinInfo.innerHTML = `
        <span class="loader"></span>
        `;

        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const priceHigh = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const priceLow = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const variation = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
        

        if (amountValue !== '') {
            const result = Number(amountValue) / response.RAW[cryptoSelected][coinSelected].PRICE;

            coinInfo.innerHTML = `
            <p class="info">Precio: <span class="price">${price}</span></p>
            <p class="info">Precio más alto: <span class="price">${priceHigh}</span></p>
            <p class="info">Precio más bajo: <span class="price">${priceLow}</span></p>
            <p class="info">Variacion 24h: <span class="price">${variation}%</span></p>
            <p class="info">Puede comprar: <span class="price">${result.toFixed(4)} ${cryptoSelected}</span></p>
            `;
        } else {
            coinInfo.innerHTML = `
            <p class="info">Precio: <span class="price">${price}</span></p>
            <p class="info">Precio más alto: <span class="price">${priceHigh}</span></p>
            <p class="info">Precio más bajo: <span class="price">${priceLow}</span></p>
            <p class="info">Variacion 24h: <span class="price">${variation}%</span></p>
            `;
        }
    } catch (error) {
        console.log(error);
    }

        
})