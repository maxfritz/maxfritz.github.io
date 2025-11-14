// Tab navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    console.log('Tab buttons found:', tabButtons.length);
    console.log('Tab contents found:', tabContents.length);

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const targetTab = button.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            } else {
                console.error('Tab content not found:', targetTab);
            }
        });
    });

    // Audio mutual exclusivity - pause all other audio when one starts playing
    const audioPlayers = document.querySelectorAll('.audio-player');
    audioPlayers.forEach(player => {
        player.addEventListener('play', () => {
            // Pause all other audio players
            audioPlayers.forEach(otherPlayer => {
                if (otherPlayer !== player && !otherPlayer.paused) {
                    otherPlayer.pause();
                }
            });
        });
    });
});

// Configuration for your audio files
// Replace these with your actual audio file URLs
const audioFiles = [
    {
        title: "Sample Audio 1",
        description: "Description of your audio file",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        downloadLink: "#"
    },
    {
        title: "Sample Audio 2",
        description: "Description of your audio file",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        downloadLink: "#"
    },
    {
        title: "Sample Audio 3",
        description: "Description of your audio file",
        source: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        downloadLink: "#"
    }
];

// Function to convert Google Drive share link to direct download link
function convertGoogleDriveLink(shareLink) {
    // Google Drive share links format: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // Direct download format: https://drive.google.com/uc?export=download&id=FILE_ID
    const match = shareLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return shareLink;
}

// Function to create an audio card
function createAudioCard(audio) {
    const card = document.createElement('div');
    card.className = 'audio-card';
    
    // Convert Google Drive link if needed
    const audioSource = audio.source.includes('drive.google.com') 
        ? convertGoogleDriveLink(audio.source) 
        : audio.source;
    
    card.innerHTML = `
        <div class="audio-info">
            <h3>${audio.title}</h3>
            <p class="audio-description">${audio.description}</p>
        </div>
        <audio controls class="audio-player">
            <source src="${audioSource}" type="audio/wav">
            <source src="${audioSource}" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <div class="audio-source">
            <a href="${audio.downloadLink}" target="_blank" class="download-link">Download</a>
        </div>
    `;
    
    return card;
}
