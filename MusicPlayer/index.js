/**
 * 1. render song
 * 2. scroll top
 * 3. play/pause/seek
 * 4. rorate CD
 * 5. next, prev
 * 6. random
 * 7. next/repeat when end
 * 8. active song
 * 9. scroll active song into view
 * 10. play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const eMP = $(".music-player");
const eAudio = $("#mucsic-player__audio");
const eListSongs = $(".music-player__list-songs");
const eCdImage = $(".music-player__song .song__thumb");
const eRandomSongBtn = $(".control-btn.random-btn");
const eRepeatSongBtn = $(".control-btn.repeat-btn");
const MUSIC_PLAYER_KEY = "NTC_MP";

const player_app = {
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    configs: JSON.parse(localStorage.getItem(MUSIC_PLAYER_KEY)) || {},
    setConfig: function (key, value) {
        this.configs[key] = value;
        localStorage.setItem(MUSIC_PLAYER_KEY, JSON.stringify(this.configs));
    },
    currentIndex: 0,
    songs: [
        {
            name: "Anh Khong Hieu",
            singer: "Sol7 & Tommy Tèo",
            image: "./images/anh_khong_hieu.jpg",
            audio: "./audios/anh_khong_hieu.mp3"
        },
        {
            name: "Co Tien Xanh",
            singer: "Sol7",
            image: "./images/co_tien_xanh.jpg",
            audio: "./audios/co_tien_xanh.mp3"
        },
        {
            name: "Di Trong Thanh Pho",
            singer: "Sol7",
            image: "./images/di_trong_thanh_pho.jpg",
            audio: "./audios/di_trong_thanh_pho.mp3"
        },
        {
            name: "Dem Hom Qua",
            singer: "Sol7",
            image: "./images/dem_hom_qua.jpg",
            audio: "./audios/dem_hom_qua.webm"
        },
        {
            name: "Dopamine",
            singer: "Sol7",
            image: "./images/dopamine.jpg",
            audio: "./audios/dopamine.mp3"
        },
        {
            name: "Nam Tao 27",
            singer: "Pjpo",
            image: "./images/nam_tao_27.jpg",
            audio: "./audios/nam_tao_27.mp3"
        },
        {
            name: "Ngan Ngui",
            singer: "Sol7",
            image: "./images/ngan_ngui.jpg",
            audio: "./audios/ngan_ngui.mp3"
        },
        {
            name: "RainDrop",
            singer: "Sol7",
            image: "./images/raindrop.jpg",
            audio: "./audios/raindrop.mp3"
        },
        {
            name: "Vao Hu Vo",
            singer: "Sol7",
            image: "./images/vao_hu_vo.jpg",
            audio: "./audios/vao_hu_vo.mp3"
        },
        {
            name: "Xau",
            singer: "2Can x KhanhJay",
            image: "./images/xau.jpg",
            audio: "./audios/xau.mp3"
        },
    ],
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    render: function () {
        const playList = this.songs.map((song, index) => {
            return `
                    <div class="song ${this.currentIndex === index ? "song--play" : ""}" data-index="${index}">
                        <img src="${song.image}" alt="">
                        <div class="song__text">
                            <h4>${song.name}</h4>
                            <p>${song.singer}</p>
                        </div>
                        <div class="option-btn">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
            `;
        });
        eListSongs.innerHTML = playList.join("");
    },
    loadCurrentSong: function () {
        const eMPHeading = $(".music-player__header .text h3");

        // console.log(eMPHeading, eCdImage, eAudio);

        eMPHeading.textContent = this.currentSong.name;
        eCdImage.style.backgroundImage = `url('${this.currentSong.image}')`;
        eAudio.src = this.currentSong.audio;
    },
    loadConfigs: function () {
        console.log(this.configs)
        this.isRandom = this.configs.isRandom;
        this.isRepeat = this.configs.isRepeat;
        eRandomSongBtn.classList.toggle("control-btn--active", this.isRandom);
        eRepeatSongBtn.classList.toggle("control-btn--active", this.isRepeat);
    },
    handleEvents: function () {

        const _this = this;

        //xử lý phóng to/ thu nhỏ cd khi scroll list songs
        const cd = $('.music-player__song');
        const cdWidth = cd.offsetWidth;
        const eDashboard = $(".music-player__dashboard");
        eListSongs.onscroll = function () {
            const scrollTop = eListSongs.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0
                ? newCdWidth + "px"
                : "0";
            cd.style.opacity = newCdWidth / cdWidth;
            // console.log(eMP.offsetHeight - eDashboard.offsetHeight)
            eListSongs.style.height = (eMP.offsetHeight - eDashboard.offsetHeight) + "px";
        }

        //xử lý khi bấm play
        const ePlayBtn = $(".toggle-play-btn");
        ePlayBtn.onclick = function () {
            _this.isPlaying === true ? eAudio.pause() : eAudio.play();
        }

        //Xử lý khi audio play/pasue
        eAudio.onplay = function () {
            eMP.classList.add("music-player--play");
            _this.isPlaying = true;
            eCdImageRotate.play();
        }
        eAudio.onpause = function () {
            eMP.classList.remove("music-player--play");
            _this.isPlaying = false;
            eCdImageRotate.pause();
        }

        //xử lý thanh progress 
        const eProgress = $("#progress");
        eAudio.ontimeupdate = function () {
            if (eAudio.duration) {
                var progressPercent = Math.floor(eAudio.currentTime / eAudio.duration * 100);
                eProgress.value = progressPercent;
            }
        }

        //xử lý khi tua
        eProgress.oninput = function (e) {
            const seekTime = ((eAudio.duration * e.target.value) / 100);
            eAudio.currentTime = seekTime;
        }

        //xử lý cd quay
        const eCdImageRotate = eCdImage.animate([{
            transform: "rotate(360deg)"
        }], {
            duration: 6000,
            iterations: Infinity
        })
        eCdImageRotate.pause();

        //xử lý neext, prev song
        const ePrevSongBtn = $(".control-btn.prev-btn");
        const eNextSongBtn = $(".control-btn.next-btn");

        console.log(_this.isRepeat, _this.isRandom);

        ePrevSongBtn.onclick = function () {
            _this.isRandom
                ? _this.randomSong()
                : _this.prevSong();
            _this.render();
            _this.scrollToActiveSong();
            eAudio.play();
        };
        eNextSongBtn.onclick = function () {
            _this.isRandom
                ? _this.randomSong()
                : _this.nextSong();
            _this.render();
            _this.scrollToActiveSong();
            eAudio.play();
        }

        //xử lý random
        eRandomSongBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            eRandomSongBtn.classList.toggle("control-btn--active");
        }

        //xử lý repeat
        eRepeatSongBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            eRepeatSongBtn.classList.toggle("control-btn--active");
        }

        //xử lý khi end tự động chuyển bài
        eAudio.onended = function () {
            _this.isRepeat
                ? eAudio.play()
                : eNextSongBtn.click();
        }

        //xử lý khi click vào playlist
        eListSongs.onclick = function (e) {
            const eSong = e.target.closest('.song:not(.song--play)');
            const eOption = e.target.closest('.option-btn');
            if (eSong || eOption) {
                if (eSong) {
                    _this.currentIndex = Number(eSong.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    eAudio.play();
                }
                if (eOption) {
                    alert("...");
                }
            }
        }
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.song--play").scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }, 300);
    },
    start: function () {
        this.loadConfigs();
        this.defineProperties();
        this.render();
        this.loadCurrentSong();
        this.handleEvents();
    }
}

player_app.start();


