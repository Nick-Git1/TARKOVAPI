async function fetchTraderData() {
    try {
      const response = await fetch('https://api.tarkov.dev/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            {
              traders {
                id
                name
                cashOffers {
                  item {
                    id
                    name
                    basePrice
                    imageLink
                    width
                    height
                  }
                }
              }
            }
          `,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.errors) {
        console.error('GraphQL errors:', data.errors);
        throw new Error('Error in GraphQL query');
      }
  
      return data.data.traders;
    } catch (error) {
      console.error('Error fetching trader data:', error);
      throw error;
    }
  }
  
  function displayTraderItems(traderId) {
    fetchTraderData().then(traders => {
      const trader = traders.find(t => t.id === traderId);
  
      if (!trader) {
        console.error(`Trader with ID ${traderId} not found`);
        return;
      }
  
      const shopGrid = document.querySelector('.shop-grid');
      shopGrid.innerHTML = ''; // Clear previous items
  
      trader.cashOffers.forEach(offer => {
        const item = offer.item;
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
  
        itemElement.innerHTML = `
          <img src="${item.imageLink}" alt="${item.name}" style="width: 100%; height: 100%;">
        `;
  
        shopGrid.appendChild(itemElement);
      });
    }).catch(error => {
      console.error('Error displaying trader items:', error);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const traderId = '54cb50c76803fa8b248b4571'; // Replace with actual trader ID
    displayTraderItems(traderId);
  });
  