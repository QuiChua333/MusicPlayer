
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = 'F8_PLAYER';

const musicApp = $('.music-app');
const heartIcon = $('.header_heart');
const tooltipFavourite = $('.tooltip-favourite');
const tooltipPlaylist = $('.tooltip-playlist');
const playlist = $('.playlist-container');
const playlistChild = $('.playlist');
const playlistIcon = $('.header_list-music-icon');
const closelistIcon = $('.close-list');
const cd = $('.music-card_cd img');
const nameSong = $('.name_song');
const nameSinger = $('.name_singer');
const audio = $('#audio');
const playBtn = $('.play');
const scrollBar = $('.music-card_scroll');
const scrollValue = $('.scroll-value');
const volumeBar = $('.volume-bar')
const volumeValue = $('.volume-value')
const nextIcon = $('.next');
const prevIcon = $('.previous');
const volumeBtn = $('.volumeBtn');
const timeLeft = $('.time-left')
const timeRight = $('.time-right')
const randomBtn = $('.random');
const repeatBtn = $('.repeat')
const setSongs = new Set();

const app = {

    currentIndex: 0,
    currentVolume: 1,
    isPlaying: false,
    isHoldProgressBar: false,
    isHoldVolumeBar: false,
    isMute:false,
    isRepeat: false,
    isRandom: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songItem:[],
    songs : [
        {
            name: 'Little Do You Know',
            singer: 'Alex & Sierra',
            path: './assets/music/Little_do_you_know_Alex_&_Sierra.mp3',
            image: './assets/img/little.jpg'
        },
        {
            name: 'There\'s No One At All',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/There_Is_No_One_At_All.mp3',
            image: './assets/img/noone.jpg'
        },
        {
            name: 'Waiting For You',
            singer: 'Mono',
            path: './assets/music/y2meta.com - MONO - Waiting For You (Album 22 - Track No.10) (128 kbps).mp3',
            image: './assets/img/waitingforyou.png'
        },
        {
            name: 'Titanium',
            singer: 'David Guetta',
            path: './assets/music/y2meta.com - David Guetta - Titanium ft. Sia (Official Video) (128 kbps).mp3',
            image: './assets/img/Titanium.jpg'
        },
        {
            name: 'Unstoppable',
            singer: 'Sia',
            path: './assets/music/y2meta.com - Sia - Unstoppable (Lyrics) (128 kbps).mp3',
            image: './assets/img/Unstoppable.png'
        },
        {
            name: 'Stay',
            singer: 'Justin Bieber & The Kid LAROI',
            path: './assets/music/y2meta.com - The Kid LAROI, Justin Bieber - Stay (Lyrics) (128 kbps).mp3',
            image: './assets/img/Thekidlaroi.png'
        },
        {
            name: 'Let Me Down Slowly',
            singer: 'Alec Benjamin',
            path: './assets/music/y2meta.com - Alec Benjamin - Let Me Down Slowly [Official Music Video] (128 kbps).mp3',
            image: './assets/img/letmedownslowly.jpg'
        },
        {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: './assets/music/y2meta.com - Avicii - Waiting For Love (128 kbps).mp3',
            image: './assets/img/waitingforlove.png'
        },
        {
            name: 'Counting Stars',
            singer: 'OneRepublic',
            path: './assets/music/y2meta.com - OneRepublic - Counting Stars (Official Music Video) (128 kbps).mp3',
            image: './assets/img/countingstarts.jpg'
        },
        {
            name: 'Comethru',
            singer: 'Jeremy Zucker',
            path: './assets/music/y2meta.com - Jeremy Zucker - comethru (Official Video) (128 kbps).mp3',
            image: './assets/img/comethru.jpg'
        },
        {
            name: 'I\'ll Be There',
            singer: 'Gabriela Bee',
            path: './assets/music/y2meta.com - I\'ll Be There - Gabriela Bee (Lyrics) (128 kbps).mp3',
            image: './assets/img/iwillbethere.png'
        },
        {
            name: 'Set fire to the rain',
            singer: 'Rain Adele ft. Vahn Remix',
            path: './assets/music/Set_Fire_To_The_Rain_Adele_x_Vahn_Remix.mp3',
            image: './assets/img/setFireToTheRain.jpg'
        },
        {
            name: 'Kiss',
            singer: 'Hung Bobi Remix',
            path: './assets/music/Kiss_Hung_Bobi_Remix.mp3',
            image: './assets/img/kiss.jpg'
        },
        {
            name: 'Too Late',
            singer: 'Addie Nicole',
            path: './assets/music/Too_Late_Addie Nicole.mp3',
            image: './assets/img/Toolate.png'
        },
        {
            name: 'Versace',
            singer: 'The Same Persons',
            path: './assets/music/Versace_The_Same_Persons.mp3',
            image: './assets/img/Versace.jpg'
        },
        {
            name: 'Đừng Về Trễ',
            singer: 'Sơn Tùng M-TP',
            path: './assets/music/Dung_Ve_Tre.mp3',
            image: './assets/img/dvt.png'
        },
        {
            name: 'Trưởng Thành',
            singer: 'Dee A',
            path: './assets/music/y2meta.com - Trưởng Thành   Dee A「Lyrics Video」Meens (128 kbps).mp3',
            image: './assets/img/Truongthanh.png'
        },
        {
            name: 'Đoạn Tuyệt Nàng Đi',
            singer: 'Phát Huy T4',
            path: './assets/music/Doan_Tuyet_Nang_Di.mp3',
            image: './assets/img/dtnd.png'
        },
        {
            name: 'Rồi Tới Luôn',
            singer: 'Nal',
            path: './assets/music/Roi_Toi_Luon.mp3',
            image: './assets/img/Rtl.png'
        },
        {
            name: 'Yêu Là Cưới',
            singer: 'Phát Hồ',
            path: './assets/music/Yeu_La_Cuoi.mp3',
            image: './assets/img/ylc.png'
        },
        {
            name: 'Yêu Thương Ngày Đó',
            singer: 'Soobin Hoàng Sơn',
            path: './assets/music/Yeu_Thuong_Ngay_Do.mp3',
            image: './assets/img/ytnd.jpg'
        },
        {
            name: 'Bên Trên Tầng Lầu',
            singer: 'Tăng Duy Tân',
            path: './assets/music/Ben_Tren_Tang_Lau.mp3',
            image: './assets/img/Bttl.png'
        },
       
    ],

    setConfig: function(key,value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config)); 
    },

    // Tạo định dạng hiển thị của thời gian
    timeFormat : function(seconds){
        const date = new Date(null);
        date.setSeconds(seconds);
        return date.toISOString().slice(14, 19);
    },
    

    // Render các bài hát lên playlist
    render: function(){
        var html = '';
        this.songs.forEach(song => {
            html+=`
            <li class="song-item">
                <div class="song-item-img">
                    <img src="${song.image}" alt="">
                </div>
                <div class="song-item-info">
                    <h3 class="song-item-name">${song.name}</h3>
                    <span class="song-item-singer">${song.singer}</span>
                </div>

                <div class="song-item-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="song-item-option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </li>
        `})
        $('.list-song-items').innerHTML = html;
    },

    loadConfig: function() {

        this.isRandom = this.config.isRandom ?? false;
        this.isRepeat = this.config.isRepeat ?? false;

        repeatBtn.classList.toggle('active',this.isRepeat);
        randomBtn.classList.toggle('active',this.isRandom);
      
    },

    // Kích hoạt bài hát (hiện hành phát) trên playlist
    activeSong : function(){
        
        const songWaves = $$('.song-item-wave');
        const songItems = $$('.song-item');
        songItems.forEach((song,index) => {
            if (index===this.currentIndex){
                song.classList.add('active');
                songWaves[index].classList.add('active');
                song.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "center",
                        inline: "center"
                    }
                )
                
            }
            else {
               song.classList.remove('active');
                songWaves[index].classList.remove('active');
            }
        })
    },


    // Định nghĩa thuộc tính cho object => Giúp lời gọi ngắn gọn hơn
    defineProperties:  function(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },

    

    // Tải bài hát mới
    loadCurrentSong : function(){
        const _this=this;
        nameSong.textContent = this.currentSong.name;
        nameSinger.textContent = this.currentSong.singer;
        cd.src = this.currentSong.image;
        audio.src = this.currentSong.path;
        scrollValue.style.width = 0;


        // Xử lý lấy tiến trình và thời lượng bài hát trước khi phát
        audio.onloadedmetadata = function(){
            timeLeft.textContent = _this.timeFormat(this.currentTime.toFixed(2));
            timeRight.textContent = _this.timeFormat(this.duration.toFixed(2));
        }
    },


    // Thao tác chuyển bài kế tiếp
    nextSong : function(){
        this.currentIndex++;
        if(this.currentIndex > this.songs.length-1){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        this.activeSong();
    },


    // Thao tác lùi bài
    prevSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0 ){
            this.currentIndex = this.songs.length-1;
        }
        this.loadCurrentSong();
        this.activeSong();
    },


    // Thao tác phát ngẫu nhiên
    playRandom: function(){
        // let newIndex;
        // do {
        //     newIndex = Math.floor(Math.random()*this.songs.length);
        // } while (setSongs.has(newIndex));
        // this.currentIndex=newIndex;
        // this.loadCurrentSong();
        // this.activeSong();
        // setSongs.add(newIndex);
        // if (setSongs.size === this.songs.length){
        //     setSongs.clear();
        // }
        
        this.currentIndex++;
        this.loadCurrentSong();
        this.activeSong();
    },


    // Thao tác render playlist
    randomPlaylist: function(){
        const _this = this;
        let prevSong = this.currentSong;
        this.songs.sort(function(a,b){
            return 0.5-Math.random();
        })
        this.songs.forEach((song,index) => {
            if (song===prevSong){
                this.songs[index]=this.songs[0];
                this.songs[0]=prevSong;
            }
        })
        this.currentIndex = 0;
        this.render();
        this.activeSong();


        // Xử lý chọn bài hát để phát ở giao diện playlist vì lúc này dữ liệu ở playlist được refresh
        $$('.song-item').forEach((song,index) => {
            song.onclick = function(e){
                if (index!=_this.currentIndex){
                    _this.currentIndex=index;
                    _this.loadCurrentSong();
                    _this.activeSong();
                    audio.play();
                }
            }   
        });
           

        // Xử lý ấn vào nút option
        const options = $$('.song-item-option');
        const listOption = $('.list-option');
        options.forEach((option,index) => {
            option.onclick = function(e){
                e.stopPropagation();
                $('.option-header-img img').src = _this.songs[index].image;
                $('.option-header-song').innerText = _this.songs[index].name;
                $('.option-header-singer .singer').innerText = _this.songs[index].singer;
                $('.list-option-container').classList.remove('hide'); 
                listOption.classList.add('option-open');
            }
            
        })
      
        // Xử lý đóng list option
        $('.close-option-btn').onclick  = function(){
            listOption.classList.remove('option-open');
            setTimeout(function(){
                $('.list-option-container').classList.add('hide'); 
            },300);
        }

        $('.list-option-container').onclick = function(){
            listOption.classList.remove('option-open');
            setTimeout(function(){
                $('.list-option-container').classList.add('hide'); 
            },300);
        }

        listOption.onclick = function(e){
            e.stopPropagation();
        }

    },


    // Thao tác phát lặp
    playRepeat : function(){
        this.loadCurrentSong();
        this.activeSong();
    },

    // Xử lý bên giao diện playlist
    playlistFunct: function(){
         // Xử lý chọn bài hát để phát ở giao diện playlist
           
         
    },
    // Khu xử lý các sự kiện
    handleEvents: function(){
        const _this=this;

        // Xử lý thả tym
        heartIcon.onclick = function(){
            this.classList.toggle('active');
            const heartIconNoActive = $('.header_heart .tooltip-favourite');
            const heartIconActive = $('.header_heart.active .tooltip-favourite');
            if (heartIconActive) heartIconActive.innerText = 'Remove Favourite';
            else  heartIconNoActive.innerText = 'Add Favourite';
        }
        

        // Xử lý mở playlist
        playlistIcon.onclick = function(){
            playlist.classList.add('list-open');
        }
        

        // Xử lý đóng playlist
        closelistIcon.onclick = function(){
            playlist.classList.remove('list-open');
        }

        playlist.onclick = function(){
            playlist.classList.remove('list-open');
        }

        playlistChild.onclick = function(e){
            e.stopPropagation();
        }



        //Xử lý CD quay và dừng
        const cdRotate = cd.animate([
            {
                transform: 'rotate(360deg)'
            }
        ],{
            duration: 7500, //7.5s
            iterations: Infinity
        })
        cdRotate.pause();


        // Xử lý khi click nút play
        playBtn.onclick = function(){
            if (_this.isPlaying){
                 audio.pause();
            } else audio.play();
        }
 
        audio.onplay = function() {
            musicApp.classList.add('playing')
            playBtn.classList.add('playing')
            cdRotate.play()
            _this.isPlaying = true
        }

        audio.onpause = function() {
        musicApp.classList.remove('playing')
        playBtn.classList.remove('playing')
            cdRotate.pause()
            _this.isPlaying = false
        } 
        


        // Xử lý thanh tiến trình, seek, tua nhạc
        scrollBar.onmousedown = function(e){
            audio.currentTime = e.offsetX / this.offsetWidth * audio.duration;
            _this.isHoldProgressBar=true;
        }

        scrollBar.onmousemove = function(e){
            if (_this.isHoldProgressBar){
                audio.currentTime = e.offsetX / this.offsetWidth * audio.duration;
            }
        }

        audio.ontimeupdate = function(){
            timeLeft.textContent = _this.timeFormat(this.currentTime.toFixed(2));
            scrollValue.style.width = audio.currentTime / audio.duration * 100 + '%';
            if (audio.currentTime===audio.duration){
                if (_this.isRepeat){
                    _this.playRepeat();
                }
                else {
                    if (_this.isRandom){
                        _this.playRandom();
                    }
                    else _this.nextSong();
                }
                audio.play();
            }
        }
    

        // Xử lý thanh âm lượng và click vào volumeBtn
        volumeBar.onmousedown = function(e){
            if (e.offsetX>=0 && e.offsetX<=this.offsetWidth){
                _this.currentVolume=e.offsetX/this.offsetWidth;
                audio.volume = _this.currentVolume;
                volumeValue.style.width = audio.volume * 100 + '%';
                if(audio.volume === 0)  _this.isMute = true
                else _this.isMute = false
            }
            _this.isHoldVolumeBar=true;
        }

        volumeBar.onmousemove = function(e){
            if (_this.isHoldVolumeBar){
                if (e.offsetX>=0 && e.offsetX<=this.offsetWidth){
                    _this.currentVolume=e.offsetX/this.offsetWidth;
                    audio.volume = _this.currentVolume;
                    volumeValue.style.width = audio.volume * 100 + '%';
                    if(audio.volume === 0)  _this.isMute = true
                    else _this.isMute = false
                }
            }
        }

        window.onmouseup = function(){
            _this.isHoldProgressBar=false;
            _this.isHoldVolumeBar=false;
        }

        volumeBtn.onclick = function(){
            _this.isMute=!_this.isMute;
            if (_this.isMute){
                audio.volume=0;
            }
            else {
                if (_this.currentVolume==0) _this.currentVolume=1;
                audio.volume=_this.currentVolume;
            }
        }

        audio.onvolumechange = function(){
            if (_this.isMute){
                volumeBtn.classList.add('mute');
                volumeValue.style.width = 0;
            }
            else {
                volumeBtn.classList.remove('mute');
                volumeValue.style.width =  audio.volume * 100 + '%';
            }
        }
        
        var songItem;
        // Xử lí khi ấn nút Random
        randomBtn.onclick = function(){
            if (_this.isRandom){
                this.classList.remove('active')
                _this.isRandom=false;
            }
            else {
                this.classList.add('active');
                _this.isRandom=true;
                _this.randomPlaylist();
                
               
            }
            _this.setConfig('isRandom',_this.isRandom);
        }
      


        // Xử lý khi ấn repeat
        repeatBtn.onclick = function(){
            if (_this.isRepeat){
                this.classList.remove('active')
                _this.isRepeat=false;
            }
            else {
                this.classList.add('active')
                _this.isRepeat=true;
            }
            _this.setConfig('isRepeat',_this.isRepeat);
        }

        
        // Xử lý khi ấn nút next 
        nextIcon.onclick = function(){
            if (_this.isRepeat){
                _this.playRepeat();
            }
            else {
                if (_this.isRandom){
                    _this.playRandom();
                }
                else _this.nextSong();
            }
            cdRotate.cancel();
            // Thường thì next bài sẽ phát ngay nên không cần điều kiện phía dưới
            // if (_this.isPlaying){
            //     audio.play();
            // }
            audio.play();
        }


        // Xử lý khi ấn nút previous
        prevIcon.onclick = function(){
            if (_this.isRepeat){
                _this.playRepeat();
            }
            else {
                if (_this.isRandom){
                    _this.playRandom();
                }
                else _this.prevSong();
            }
            cdRotate.cancel();
            // Thường thì previous bài sẽ phát ngay nên không cần điều kiện phía dưới
            // if (_this.isPlaying){
            //     audio.play();
            // }
            audio.play();
        }


        //Xử lý thao tác bên giao diện bên Playlist
        $$('.song-item').forEach((song,index) => {
            song.onclick = function(e){
                if (index!=_this.currentIndex){
                    _this.currentIndex=index;
                    _this.loadCurrentSong();
                    _this.activeSong();
                    audio.play();
                }
            }   
        });
           

        // Xử lý ấn vào nút option
        const options = $$('.song-item-option');
        const listOption = $('.list-option');
        options.forEach((option,index) => {
            option.onclick = function(e){
                e.stopPropagation();
                $('.option-header-img img').src = _this.songs[index].image;
                $('.option-header-song').innerText = _this.songs[index].name;
                $('.option-header-singer .singer').innerText = _this.songs[index].singer;
                $('.list-option-container').classList.remove('hide'); 
                listOption.classList.add('option-open');
            }
            
        })
      
        // Xử lý đóng list option
        $('.close-option-btn').onclick  = function(){
            listOption.classList.remove('option-open');
            setTimeout(function(){
                $('.list-option-container').classList.add('hide'); 
            },300);
        }

        $('.list-option-container').onclick = function(){
            listOption.classList.remove('option-open');
            setTimeout(function(){
                $('.list-option-container').classList.add('hide'); 
            },300);
        }

        listOption.onclick = function(e){
            e.stopPropagation();
        }
    },
   

    // Hàm để chạy các phương thức
    start: function(){
        this.loadConfig();
        
        this.defineProperties();

        this.render();

        
        this.loadCurrentSong();

        // Hàm activeSong để khởi tạo bài hát [0] là bài hát khởi điểm
        this.activeSong();

        this.handleEvents();
    }
}

// Lệnh thực thi
app.start();



