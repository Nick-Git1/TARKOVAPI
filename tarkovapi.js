document.addEventListener('DOMContentLoaded', function() {
    const conceptArtImages = [
        '/images/KnightBanner.jpeg',
        '/images/BigPipeBanner.jpeg',
        '/images/BirdeyeBanner.jpeg',
        '/images/Shturman.jpeg',
        '/images/TagillaConceptArt.jpeg',
        '/images/Killa.jpeg',
        '/images/LightkeeperArt.jpeg'
    ];

    const randomImage = conceptArtImages[Math.floor(Math.random() * conceptArtImages.length)];

    document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(65, 66, 64, 0.7), rgba(119, 106, 83, 0.7)), url(${randomImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center top';
});

async function fetchTraderData() {
  try {
    const response = await fetch('https://your-graphql-endpoint.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            traders(lang: en) {
              id
              name
              resetTime
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

async function displayTraderResetTimes() {
  try {
    const traders = await fetchTraderData();
    console.log('Fetched traders:', traders); // Log to verify data

    const traderIdMap = {
      'Prapor': 'reset-time-prapor',
      'Therapist': 'reset-time-therapist',
      'Skier': 'reset-time-skier',
      'Peacekeeper': 'reset-time-peacekeeper',
      'Mechanic': 'reset-time-mechanic',
      'Ragman': 'reset-time-ragman',
      'Jaeger': 'reset-time-jaeger',
      'Ref': 'reset-time-ref',
    };

    traders.forEach(trader => {
      const elementId = traderIdMap[trader.name];
      if (elementId) {
        const resetTimeElement = document.getElementById(elementId);
        if (resetTimeElement) {
          resetTimeElement.textContent = trader.resetTime;
        }
      }
    });
  } catch (error) {
    console.error('Error displaying trader reset times:', error);
  }
}

// Call the display function when the page loads or at the appropriate time
displayTraderResetTimes();
