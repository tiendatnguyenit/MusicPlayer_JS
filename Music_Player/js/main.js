const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cd = $('.cd');

const player = $('.player')

const heading = $('header h2')
const author = $('header p')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')

const playBtn = $('.btn-toggle-play')

const progress = $('#progress')

const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')

const randomBtn = $('.btn-random')

const repeatBtn = $('.btn-repeat')

const playList = $('.playlist')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [{
            name: 'Ai Muốn Nghe Không',
            singer: 'Đen Vâu',
            path: 'https://data.chiasenhac.com/down2/2253/1/2252542-6d92498b/128/Ai%20Muon%20Nghe%20Khong%20-%20Den.mp3',
            image: 'https://data.chiasenhac.com/data/cover/166/165212.jpg'
        },
        {
            name: 'Có Không Giữ Mất Đừng Tìm',
            singer: 'Trúc Nhân',
            path: 'https://data.chiasenhac.com/down2/2245/1/2244802-f08f6eea/128/Co%20Khong%20Giu%20Mat%20Dung%20Tim%20-%20Truc%20Nhan.mp3',
            image: 'https://data.chiasenhac.com/data/cover/163/162668.jpg'
        },
        {
            name: 'Thương Em',
            singer: 'Châu Khải Phong; ACV',
            path: 'https://data.chiasenhac.com/down2/2245/1/2244199-86291010/128/Thuong%20Em%20-%20Chau%20Khai%20Phong_%20ACV.mp3',
            image: 'https://data.chiasenhac.com/data/cover/163/162430.jpg'
        },
        {
            name: 'Ít Nhưng Dài Lâu',
            singer: 'Chu Thúy Quỳnh',
            path: 'https://data.chiasenhac.com/down2/2249/1/2248912-b9c643af/128/It%20Nhung%20Dai%20Lau%20-%20Chu%20Thuy%20Quynh.mp3',
            image: 'https://data.chiasenhac.com/data/cover/164/163966.jpg'
        },
        {
            name: 'Nhìn Mây Vẽ Người',
            singer: 'Hương Ly; Jombie; LY.M',
            path: 'https://data.chiasenhac.com/down2/2250/1/2249918-cfdb3fff/128/Nhin%20May%20Ve%20Nguoi%20-%20Huong%20Ly_%20Jombie_%20LY.mp3',
            image: 'https://data.chiasenhac.com/data/cover/165/164190.jpg'
        },
        {
            name: 'Hai Mươi Hai (22)',
            singer: 'AMee; Hứa Kim Tuyền',
            path: 'https://data.chiasenhac.com/down2/2249/1/2248221-a6b47062/128/Hai%20Muoi%20Hai%2022_%20-%20AMee_%20Hua%20Kim%20Tuyen.mp3',
            image: 'https://data.chiasenhac.com/data/cover/164/163846.jpg'
        },
        {
            name: 'Chưa Quên Người Yêu Cũ (Live Version)',
            singer: 'Hà Nhi; Hứa Kim Tuyền',
            path: 'https://data.chiasenhac.com/down2/2250/1/2249780-2287fdd3/128/Chua%20Quen%20Nguoi%20Yeu%20Cu%20Live%20Version_%20-%20H.mp3',
            image: 'https://data.chiasenhac.com/data/cover/165/164156.jpg'
        },
        {
            name: 'Cho Em Một Lần Yêu',
            singer: 'Văn Mai Hương',
            path: 'https://data.chiasenhac.com/down2/2250/1/2249806-f9505903/128/Cho%20Em%20Mot%20Lan%20Yeu%20-%20Van%20Mai%20Huong.mp3',
            image: 'https://data.chiasenhac.com/data/cover/165/164164.jpg'
        },
        {
            name: 'Đánh Đố',
            singer: 'Hoàng Thuỳ Linh; Thanh Lam;',
            path: 'https://data.chiasenhac.com/down2/2250/1/2249633-861a7ee4/128/Danh%20Do%20-%20Hoang%20Thuy%20Linh_%20Thanh%20Lam_%20Tu.mp3',
            image: 'https://data.chiasenhac.com/data/cover/165/164117.jpg'
        },
        {
            name: 'Có Em',
            singer: 'Madihu; Low G',
            path: 'https://data.chiasenhac.com/down2/2243/1/2242627-d522d2ba/128/Co%20Em%20-%20Madihu_%20Low%20G.mp3',
            image: 'https://data.chiasenhac.com/data/cover/162/161857.jpg'
        },
        {
            name: 'Vì Mẹ Anh Bắt Chia Tay',
            singer: 'Miu Lê; Karik; Châu Đăng Khoa',
            path: 'https://data.chiasenhac.com/down2/2254/1/2253250-965196f4/128/Vi%20Me%20Anh%20Bat%20Chia%20Tay%20-%20Miu%20Le_%20Karik_.mp3',
            image: 'https://data.chiasenhac.com/data/cover/166/165383.jpg'
        },

    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active': ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })

        playList.innerHTML = htmls.join('');
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function() {
        const cdWidth = cd.offsetWidth;

        //xử lý phóng to hoặc thu nhỏ CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdWidth - scrollTop;

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            cd.style.opacity = newWidth / cdWidth;
        }

        //Xử lý quay/dừng CD
        const cdThumbEnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        cdThumbEnimate.pause();

        //Khi bài hát được play/pause
        audio.onplay = function() {
            app.isPlaying = true;
            player.classList.add('playing');
            cdThumbEnimate.play();
        }
        audio.onpause = function() {
            app.isPlaying = false;
            player.classList.remove('playing');
            cdThumbEnimate.pause();
        }


        //Xử lý khi click play/ pause
        playBtn.onclick = function() {
            if (app.isPlaying) {
                audio.pause();

            } else {
                audio.play();
            }
        }

        // Xử lý bỏ ấn space cuộn trang xuống (mặc định của trình duyệt)
        window.onkeydown = function(e) {
            return e.keyCode !== 32;
        }


        // Xử lý ấn phím space để dừng/ phát nhạc
        document.addEventListener("keyup", e => {
                switch (e.which) {
                    case 32:
                        window.onkeydown = function(e) {
                            return e.keyCode !== 32;
                        }

                        if (app.isPlaying) {
                            audio.pause();
                        } else {
                            audio.play();
                        }
                        break;
                }
            }),

            //khi tiến độ bài hát thay đổi
            audio.ontimeupdate = function() {
                // tính % time bài hát chạy đc
                const proPercent = Math.floor(audio.currentTime / audio.duration * 100);
                if (!proPercent) {
                    progress.value = 0;
                } else {
                    progress.value = proPercent;
                }
            }

        //Xử lý next bài khi hết bài
        audio.onended = function() {
            if (!app.isRepeat && !app.isRandom) {
                app.next();
            } else if (app.isRandom && !app.isRepeat) {
                app.random();
            }
            audio.play();
            app.render();
            app.scrollToCurrentSong();
        }


        //Xử lý tua bài hát
        progress.oninput = function(e) {
            const timeRewind = audio.duration / 100 * e.target.value;
            audio.currentTime = timeRewind;
        }

        //Xử lý next bài
        nextBtn.onclick = function() {
            if (app.isRandom) {
                app.random();
            } else {
                app.next();
            }
            audio.play();
            app.render();
            app.scrollToCurrentSong();

        }

        //Xử lý prev bài
        prevBtn.onclick = function() {
            if (app.isRandom) {
                app.random();
            } else {
                app.prev();
            }
            audio.play();
            app.render();
            app.scrollToCurrentSong();

        }

        //Xử lý random bài
        randomBtn.onclick = function(e) {
            if (app.isRandom) {
                randomBtn.classList.remove('active');
                app.isRandom = false;

            } else {
                randomBtn.classList.add('active');
                app.isRandom = true;
            }
        }

        //Xử lý repeat bài
        repeatBtn.onclick = function(e) {
            if (app.isRepeat) {
                repeatBtn.classList.remove('active');
                app.isRepeat = false;

            } else {
                repeatBtn.classList.add('active');
                app.isRepeat = true;
            }
        }

        //Xử lý chọn bài hát trong playlist
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                //Xử lý khi click vào bài hát
                if (songNode) {
                    //app.currentIndex = songNode.dataset.index;   
                    //Cách viết gắn gọn của dòng dưới
                    app.currentIndex = Number(songNode.getAttribute('data-index'))
                    app.loadCurrentSong();
                    audio.play();
                    app.render();
                }

                //Xử lý khi click vào option
                if (e.target.closest('.option')) {

                }
            }

        }

    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        author.textContent = this.currentSong.singer
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    next: function() {
        this.currentIndex++;
        if (this.currentIndex > this.songs.length - 1) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prev: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    random: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }
        while (newIndex == this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    repeat: function() {
        this.currentIndex = this.currentIndex;
        this.loadCurrentSong();

    },

    scrollToCurrentSong: function() {
        $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    },

    start: function() {
        //định nghĩa các thuộc tính cho obj
        this.defineProperties();

        //lắng nghe và xử lý các sự kiện (DOM  event)
        this.handleEvents();

        //tải thông tin bài hát vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        //render playlist
        this.render()
    }
};

app.start();