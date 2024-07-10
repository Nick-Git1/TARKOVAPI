document.addEventListener('DOMContentLoaded', function() {
    const conceptArtImages = [
        'images/KnightBanner.jpeg',
        'images/BigPipeBanner.jpeg',
        'images/BirdeyeBanner.jpeg',
        'images/Shturman.jpeg',
        'images/TagillaConceptArt.jpeg',
        'images/Killa.jpeg',
        'images/LightkeeperArt.jpeg',
    ];

    const randomImage = conceptArtImages[Math.floor(Math.random() * conceptArtImages.length)];

    document.body.style.backgroundImage = `linear-gradient(to bottom, rgba(65, 66, 64, 0.7), rgba(119, 106, 83, 0.7)), url(${randomImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center top';
});
