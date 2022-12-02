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
        img: 'https://i.scdn.co/image/ab67616d0000b273fbf23dff6170cd927133da65',
        name: "Lamentando Boliviano",
        artist: 'Eslabon Armado',
        music: 'https://fmkash.github.io/mp3-web-player/Music/Eslabon%20Armado%20-%20Lamento%20Boliviano.mp3'
    },
    {
        img: 'https://i.scdn.co/image/ab67616d0000b2737c642749f6ce0e16db088e55',
        name: "Que Vas Hacer",
        artist: 'Nivel Codiciado',
        music: 'https://fmkash.github.io/mp3-web-player/Music/Nivel%20Codiciado%2C%20José%20Mejía%20-%20Que%20Vas%20a%20Hacer.mp3'
    },
    {
        img: 'data:image/jpeg;base64,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',
        name: "El Black",
        artist: 'Manuel Rodriguez',
        music: 'https://fmkash.github.io/mp3-web-player/Music/Manuel%20Rodriguez%20-%20El%20Black.mp3'
    },
    {
        img: '',
        name: "",
        artist: '',
        music: ''
    },
    {
        img: '',
        name: "",
        artist: '',
        music: ''
    },
    {
        img: '',
        name: "",
        artist: '',
        music: ''
    },
    {
        img: '',
        name: "",
        artist: '',
        music: ''
    },
    {
        img: '',
        name: "",
        artist: '',
        music: ''
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
