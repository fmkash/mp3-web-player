let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;


const music_list = [
    {
        img: 'https://i1.sndcdn.com/artworks-asVhKphbyIbzUcBH-MuSvBg-t500x500.jpg',
        name: "24 Horas",
        artist: 'Eslabon Armdado',
        music: 'https://fmkash.github.io/mp3-web-player/Music/Eslabon%20Armado%20-%2024%20Horas.mp3'
    },
    {
        img: './images/teman.jpg',
        name: "Teman",
        artist: 'Iman Troye',
        music: 'music/Teman.mp3'
    },
    {
        img: './images/nang.jpg',
        name: "Nang",
        artist: 'Iman Troye',
        music: 'music/Nang.mp3'
    },
    {
        img: './images/Ok_Not_to_Be_Ok.png',
        name: "OK Not To Be OK",
        artist: 'Marshmello & Demi Lovato',
        music: 'music/OK_Not_To_Be_OK.mp3'
    },
    {
        img: './images/rocket-science-vaultboy.jpg',
        name: "Rocket Science",
        artist: 'vaultboy',
        music: 'music/rocket-science-vaultboy.mp3'
    },
    {
        img: './images/Overwhelmed-Ryan-Mack-Remix.jfif',
        name: "Overwhelmed (Ryan Mack Remix)",
        artist: 'Ryan Mack',
        music: 'music/Overwhelmed-Ryan-Mack-Remix.mp3'
    },
    {
        img: './images/everything-sucks.jfif',
        name: "everything sucks",
        artist: 'vaultboy',
        music: 'music/vaultboy-everything-sucks.mp3'
    },
    {
        img: './images/a-o-k-tai-verdes.png',
        name: "A-O-K",
        artist: 'Tai Verdes',
        music: 'music/A-O-K.mp3'
    },
    {
        img: './images/do-it-to-it.jfif',
        name: "Do It To It",
        artist: 'ACRAZE,Cherish',
        music: 'music/Do-it-to-it.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = " MarshBot Playlist " + (track_index + 1) + " / " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
}
function pauseRandom() {
    isRandom = false;
}
function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
