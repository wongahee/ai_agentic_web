/* ==========================================================================
   VibeSearch - Main Application Logic & Single Page Router (app.js)
   ========================================================================== */

// 1. 초기 시드 데이터 정의 (LocalStorage가 비어있을 때 사용됨)
const SEED_USERS = [
    { id: "user1", username: "Loverboy", email: "loverboy@vibe.com", password: "password123", avatar: "❤️" },
    { id: "user2", username: "Dreamer", email: "dreamer@vibe.com", password: "password123", avatar: "🌌" },
    { id: "user3", username: "JazzCat", email: "jazzcat@vibe.com", password: "password123", avatar: "🎷" },
    { id: "user4", username: "Hana", email: "hana@vibe.com", password: "password123", avatar: "🌸" },
    { id: "user5", username: "K-VibeFan", email: "kvibefan@vibe.com", password: "password123", avatar: "⚡" }
];

const SEED_SONGS = [
    {
        id: "song1",
        title: "Dynamite Disco",
        artist: "Neon Dreams",
        coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        hashtags: ["Chill", "Synthwave", "Focus"],
        likes: ["user1", "user2"]
    },
    {
        id: "song2",
        title: "Lofi Sleepwalker",
        artist: "Cozy Cat",
        coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        hashtags: ["Chill", "Lofi", "RainyDay"],
        likes: ["user3"]
    },
    {
        id: "song3",
        title: "Summer Breeze",
        artist: "Blue Waves",
        coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        hashtags: ["Chill", "Summer", "Vibe"],
        likes: ["user1", "user3", "user4"]
    },
    {
        id: "song4",
        title: "Midnight Street",
        artist: "Retro City",
        coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        hashtags: ["Synthwave", "NightDrive", "Workout"],
        likes: ["user2", "user4"]
    },
    {
        id: "song5",
        title: "Raindrop Symphony",
        artist: "Acoustic Soul",
        coverUrl: "https://images.unsplash.com/photo-1428592953211-077101b2021b?w=400&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        hashtags: ["RainyDay", "Acoustic", "Focus"],
        likes: ["user1"]
    },
    {
        id: "song6",
        title: "Supernova",
        artist: "K-Vibe",
        coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        hashtags: ["KPop", "Party", "Workout", "Summer"],
        likes: ["user2", "user3", "user4", "user5"]
    },
    {
        id: "song7",
        title: "Velvet Saxophone",
        artist: "Jazz Quintet",
        coverUrl: "https://images.unsplash.com/photo-1486591978090-58e619d37fe7?w=400&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        hashtags: ["JazzVibe", "Chill", "Focus"],
        likes: ["user1", "user5"]
    },
    {
        id: "song8",
        title: "Hustle & Flow",
        artist: "Da Beatmaker",
        coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        hashtags: ["HipHop", "Workout", "Vibe"],
        likes: ["user3", "user5"]
    }
];

const SEED_COMMENTS = [
    { id: "c1", songId: "song6", userId: "user2", username: "Dreamer", text: "이 노래 진짜 신나요!! 매일 아침 들으면서 출근함 ⚡", createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
    { id: "c2", songId: "song6", userId: "user3", username: "JazzCat", text: "K-Pop 비트가 아주 세련됐네요. 후렴구가 귓가에 맴돌아요.", createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
    { id: "c3", songId: "song2", userId: "user1", username: "Loverboy", text: "비오는 날 이거 틀어놓고 커피 마시면 천국이 따로 없습니다...☕", createdAt: new Date(Date.now() - 3600000 * 12).toISOString() },
    { id: "c4", songId: "song7", userId: "user5", username: "K-VibeFan", text: "색소폰 선율 대박.. 퇴근길에 감성 충전 제대로 하고 갑니다.", createdAt: new Date(Date.now() - 3600000 * 18).toISOString() }
];

const MOCK_BOTS = [
    { username: "지우", avatar: "🦊" },
    { username: "민지", avatar: "✨" },
    { username: "준우", avatar: "🎧" },
    { username: "수현", avatar: "🌙" },
    { username: "도윤", avatar: "🛹" }
];

const BOT_COMMENTS = [
    "우와.. 이 노래 대박이네요! 요즘 하루종일 무한 반복 중입니다 ㅠㅠ",
    "플레이리스트 최애곡 등극!! 아티스트 감성 최고네요.",
    "멜로디가 너무 트렌디해요. 친구들한테 공유해야지 ㅎㅎ",
    "듣자마자 심장 뜀.. 운동할 때 들으면 텐션 제대로 올라갑니다!",
    "해시태그 보고 왔는데 진짜 제 감성에 딱 맞아요. 최고!",
    "눈 감고 들으면 몽환적인 분위기에 젖어듭니다. 밤에 듣기 강력 추천!"
];

// ==========================================================================
// 2. 가상 LocalStorage 데이터베이스 모듈 (LocalDB)
// ==========================================================================
const LocalDB = {
    init() {
        if (!localStorage.getItem("vibe_users")) {
            localStorage.setItem("vibe_users", JSON.stringify(SEED_USERS));
        }
        if (!localStorage.getItem("vibe_songs")) {
            localStorage.setItem("vibe_songs", JSON.stringify(SEED_SONGS));
        }
        if (!localStorage.getItem("vibe_comments")) {
            localStorage.setItem("vibe_comments", JSON.stringify(SEED_COMMENTS));
        }
        if (!localStorage.getItem("vibe_notifications")) {
            localStorage.setItem("vibe_notifications", JSON.stringify([]));
        }
    },
    
    getData(table) {
        return JSON.parse(localStorage.getItem(`vibe_${table}`)) || [];
    },
    
    saveData(table, data) {
        localStorage.setItem(`vibe_${table}`, JSON.stringify(data));
    },

    getById(table, id) {
        return this.getData(table).find(item => item.id === id);
    }
};

LocalDB.init();

// ==========================================================================
// 3. 글로벌 애플리케이션 상태 (AppState)
// ==========================================================================
const AppState = {
    currentUser: JSON.parse(localStorage.getItem("vibe_current_user")) || null,
    currentSearchType: "all", // "all", "title", "artist", "hashtag", "youtube"
    currentSearchTagFilter: null,
    playingPlaylist: [],
    currentPlayingIndex: -1,
    isPlaying: false,
    activeView: "home",
    
    // 유튜브 관련 상태
    ytPlayerInstance: null,
    ytPlayInterval: null,
    youtubeSearchResults: []
};

// ==========================================================================
// 4. YouTube Iframe API 로드 및 리스너 등록
// ==========================================================================
(function loadYoutubeIframeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

window.onYouTubeIframeAPIReady = function() {
    console.log("⚡ YouTube Iframe Player API Ready");
};

// ==========================================================================
// 5. 단일 페이지 라우터 (SPA Router)
// ==========================================================================
const Router = {
    routes: ["home", "toplikes", "hashtags", "auth", "notifications", "profile"],

    init() {
        window.addEventListener("hashchange", () => this.handleHashChange());
        this.handleHashChange();
    },

    handleHashChange() {
        let hash = window.location.hash.slice(2) || "home";
        
        if (!this.routes.includes(hash)) {
            hash = "home";
        }
        
        if ((hash === "notifications" || hash === "profile") && !AppState.currentUser) {
            hash = "auth";
            window.location.hash = "#/auth";
            showToast("로그인 필요", "로그인이 필요한 서비스입니다. 먼저 로그인해 주세요.", "error");
        }

        if (hash === "auth" && AppState.currentUser) {
            hash = "home";
            window.location.hash = "#/home";
        }

        AppState.activeView = hash;
        this.updateNavbar();
        this.renderView(hash);
        
        document.getElementById("nav-menu").classList.remove("open");
    },

    updateNavbar() {
        const navMenu = document.getElementById("nav-menu");
        const isLoggedIn = !!AppState.currentUser;
        
        let unreadCount = 0;
        if (isLoggedIn) {
            const notis = LocalDB.getData("notifications");
            unreadCount = notis.filter(n => n.userId === AppState.currentUser.id && !n.read).length;
        }

        let menuHTML = `
            <li><a href="#/home" class="nav-link ${AppState.activeView === 'home' ? 'active' : ''}" data-view="home">Home</a></li>
            <li><a href="#/toplikes" class="nav-link ${AppState.activeView === 'toplikes' ? 'active' : ''}" data-view="toplikes">Top Likes</a></li>
            <li><a href="#/hashtags" class="nav-link ${AppState.activeView === 'hashtags' ? 'active' : ''}" data-view="hashtags">Hashtags</a></li>
        `;

        if (isLoggedIn) {
            menuHTML += `
                <li>
                    <a href="#/notifications" class="nav-link ${AppState.activeView === 'notifications' ? 'active' : ''}" data-view="notifications">
                        Notifications
                        ${unreadCount > 0 ? `<span class="badge">${unreadCount}</span>` : ''}
                    </a>
                </li>
                <li><a href="#/profile" class="nav-link ${AppState.activeView === 'profile' ? 'active' : ''}" data-view="profile">Profile</a></li>
                <li><button onclick="handleLogout()" class="nav-logout-btn">Logout</button></li>
            `;
        } else {
            menuHTML += `
                <li><a href="#/auth" class="nav-link ${AppState.activeView === 'auth' ? 'active' : ''}" id="nav-login-btn" data-view="auth">Login</a></li>
            `;
        }

        navMenu.innerHTML = menuHTML;
    },

    renderView(viewName) {
        document.querySelectorAll(".app-view").forEach(view => {
            view.classList.remove("active");
        });

        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add("active");
        }

        if (viewName === "home") {
            renderHome();
        } else if (viewName === "toplikes") {
            renderTopLikes();
        } else if (viewName === "hashtags") {
            renderHashtags();
        } else if (viewName === "notifications") {
            renderNotifications();
        } else if (viewName === "profile") {
            renderProfile();
        }
        
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

// ==========================================================================
// 6. 하이브리드 음악 플레이어 컨트롤 (HTML5 Audio + YouTube Iframe API)
// ==========================================================================
const audioEl = document.getElementById("hidden-audio-element");
const playerPlayBtn = document.getElementById("player-play");
const playerCover = document.getElementById("player-cover");
const playerTitle = document.getElementById("player-title");
const playerArtist = document.getElementById("player-artist");
const playerProgressFill = document.getElementById("player-progress");
const playerProgressWrapper = document.getElementById("progress-wrapper");
const playerTimeCurrent = document.getElementById("player-time-current");
const playerTimeDuration = document.getElementById("player-time-duration");
const playerVolumeFill = document.getElementById("player-volume");
const playerVolumeWrapper = document.getElementById("volume-wrapper");

const ytMiniPlayer = document.getElementById("youtube-mini-player");
const ytCollapseBtn = document.getElementById("yt-collapse-btn");
const ytCloseBtn = document.getElementById("yt-close-btn");

const MusicPlayer = {
    init() {
        playerPlayBtn.addEventListener("click", () => this.togglePlay());
        document.getElementById("player-prev").addEventListener("click", () => this.prevTrack());
        document.getElementById("player-next").addEventListener("click", () => this.nextTrack());

        // 로컬 오디오 시간 업데이트
        audioEl.addEventListener("timeupdate", () => {
            const currentSong = AppState.playingPlaylist[AppState.currentPlayingIndex];
            if (currentSong && !currentSong.isYoutube) {
                this.updateProgressBar(audioEl.currentTime, audioEl.duration);
            }
        });
        audioEl.addEventListener("loadedmetadata", () => {
            playerTimeDuration.textContent = formatTime(audioEl.duration);
        });
        audioEl.addEventListener("ended", () => this.nextTrack());

        // 타임 슬라이더 클릭 조정
        playerProgressWrapper.addEventListener("click", (e) => {
            const rect = playerProgressWrapper.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = clickX / width;
            
            const currentSong = AppState.playingPlaylist[AppState.currentPlayingIndex];
            if (!currentSong) return;

            if (currentSong.isYoutube) {
                if (AppState.ytPlayerInstance && typeof AppState.ytPlayerInstance.getDuration === "function") {
                    const dur = AppState.ytPlayerInstance.getDuration();
                    AppState.ytPlayerInstance.seekTo(percentage * dur, true);
                }
            } else {
                if (audioEl.duration) {
                    audioEl.currentTime = percentage * audioEl.duration;
                }
            }
        });

        // 음량 조작 연동
        playerVolumeWrapper.addEventListener("click", (e) => {
            const rect = playerVolumeWrapper.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            let percentage = clickX / width;
            if (percentage < 0) percentage = 0;
            if (percentage > 1) percentage = 1;
            
            audioEl.volume = percentage;
            playerVolumeFill.style.width = `${percentage * 100}%`;

            if (AppState.ytPlayerInstance && typeof AppState.ytPlayerInstance.setVolume === "function") {
                AppState.ytPlayerInstance.setVolume(percentage * 100);
            }
        });

        // 유튜브 미니 비디오 접기/펼치기 및 닫기 바인딩
        ytCollapseBtn.addEventListener("click", () => {
            ytMiniPlayer.classList.toggle("collapsed");
            ytCollapseBtn.textContent = ytMiniPlayer.classList.contains("collapsed") ? "➕" : "➖";
        });
        ytCloseBtn.addEventListener("click", () => {
            this.stopYoutubeVideo();
        });

        audioEl.volume = 0.7;
    },

    play(songId) {
        const songs = LocalDB.getData("songs");
        const songIndex = songs.findIndex(s => s.id === songId);
        if (songIndex === -1) return;

        AppState.playingPlaylist = songs;
        AppState.currentPlayingIndex = songIndex;
        
        const currentSong = songs[songIndex];

        // 1. 기존 재생 오디오 중단
        audioEl.pause();
        clearInterval(AppState.ytPlayInterval);

        // 2. 유튜브 음원인지 검증
        if (currentSong.isYoutube) {
            this.playYoutubeVideo(currentSong);
        } else {
            // 로컬 음원일 시 유튜브 영상 일시정지 및 숨김
            if (AppState.ytPlayerInstance && typeof AppState.ytPlayerInstance.pauseVideo === "function") {
                AppState.ytPlayerInstance.pauseVideo();
            }
            ytMiniPlayer.classList.remove("active");

            audioEl.src = currentSong.audioUrl;
            audioEl.play().then(() => {
                AppState.isPlaying = true;
                this.updatePlayerUI(currentSong);
            }).catch(err => {
                console.error("Audio playback error:", err);
                AppState.isPlaying = false;
                this.updatePlayerUI(currentSong);
            });
        }
    },

    playYoutubeVideo(song) {
        ytMiniPlayer.classList.add("active");
        document.getElementById("yt-player-track-name").textContent = song.title;

        const videoId = song.youtubeId;

        // YouTube Iframe Player 초기화 혹은 로드
        if (window.YT && window.YT.Player) {
            if (!AppState.ytPlayerInstance) {
                AppState.ytPlayerInstance = new YT.Player('youtube-player-iframe', {
                    height: '100%',
                    width: '100%',
                    videoId: videoId,
                    playerVars: {
                        'autoplay': 1,
                        'controls': 0, // 미니 창이므로 자체 컨트롤 숨김
                        'modestbranding': 1,
                        'rel': 0
                    },
                    events: {
                        'onReady': (event) => {
                            event.target.playVideo();
                            event.target.setVolume(audioEl.volume * 100);
                            this.startYtSyncTimer();
                        },
                        'onStateChange': (event) => {
                            this.onYtPlayerStateChange(event, song);
                        }
                    }
                });
            } else {
                AppState.ytPlayerInstance.loadVideoById(videoId);
                AppState.ytPlayerInstance.playVideo();
                AppState.ytPlayerInstance.setVolume(audioEl.volume * 100);
                this.startYtSyncTimer();
            }
            AppState.isPlaying = true;
            this.updatePlayerUI(song);
        } else {
            showToast("📺 유튜브 모듈 로드 중", "유튜브 플레이어를 로드하는 중입니다. 다시 시도해 주세요.", "error");
        }
    },

    onYtPlayerStateChange(event, song) {
        if (event.data === YT.PlayerState.PLAYING) {
            AppState.isPlaying = true;
            playerPlayBtn.textContent = "⏸";
            playerCover.classList.add("playing");
            this.startYtSyncTimer();
        } else if (event.data === YT.PlayerState.PAUSED) {
            AppState.isPlaying = false;
            playerPlayBtn.textContent = "▶";
            playerCover.classList.remove("playing");
            clearInterval(AppState.ytPlayInterval);
        } else if (event.data === YT.PlayerState.ENDED) {
            this.nextTrack();
        }
    },

    startYtSyncTimer() {
        clearInterval(AppState.ytPlayInterval);
        AppState.ytPlayInterval = setInterval(() => {
            if (AppState.ytPlayerInstance && typeof AppState.ytPlayerInstance.getCurrentTime === "function") {
                const cur = AppState.ytPlayerInstance.getCurrentTime();
                const dur = AppState.ytPlayerInstance.getDuration();
                this.updateProgressBar(cur, dur);
            }
        }, 300);
    },

    stopYoutubeVideo() {
        if (AppState.ytPlayerInstance && typeof AppState.ytPlayerInstance.stopVideo === "function") {
            AppState.ytPlayerInstance.stopVideo();
        }
        clearInterval(AppState.ytPlayInterval);
        ytMiniPlayer.classList.remove("active");
        AppState.isPlaying = false;
        playerPlayBtn.textContent = "▶";
        playerCover.classList.remove("playing");
    },

    togglePlay() {
        if (AppState.currentPlayingIndex === -1) {
            const songs = LocalDB.getData("songs");
            if (songs.length > 0) this.play(songs[0].id);
            return;
        }

        const currentSong = AppState.playingPlaylist[AppState.currentPlayingIndex];

        if (currentSong.isYoutube) {
            if (AppState.ytPlayerInstance && typeof AppState.ytPlayerInstance.getPlayerState === "function") {
                const state = AppState.ytPlayerInstance.getPlayerState();
                if (state === YT.PlayerState.PLAYING) {
                    AppState.ytPlayerInstance.pauseVideo();
                } else {
                    AppState.ytPlayerInstance.playVideo();
                }
            }
        } else {
            if (AppState.isPlaying) {
                audioEl.pause();
                AppState.isPlaying = false;
                playerPlayBtn.textContent = "▶";
                playerCover.classList.remove("playing");
            } else {
                audioEl.play().then(() => {
                    AppState.isPlaying = true;
                    playerPlayBtn.textContent = "⏸";
                    playerCover.classList.add("playing");
                }).catch(err => console.log(err));
            }
        }
    },

    prevTrack() {
        if (AppState.currentPlayingIndex === -1) return;
        let newIndex = AppState.currentPlayingIndex - 1;
        if (newIndex < 0) {
            newIndex = AppState.playingPlaylist.length - 1;
        }
        const song = AppState.playingPlaylist[newIndex];
        this.play(song.id);
    },

    nextTrack() {
        if (AppState.currentPlayingIndex === -1) return;
        let newIndex = AppState.currentPlayingIndex + 1;
        if (newIndex >= AppState.playingPlaylist.length) {
            newIndex = 0;
        }
        const song = AppState.playingPlaylist[newIndex];
        this.play(song.id);
    },

    updatePlayerUI(song) {
        playerCover.src = song.coverUrl;
        playerTitle.textContent = song.title;
        playerArtist.textContent = song.artist;
        
        if (AppState.isPlaying) {
            playerPlayBtn.textContent = "⏸";
            playerCover.classList.add("playing");
        } else {
            playerPlayBtn.textContent = "▶";
            playerCover.classList.remove("playing");
        }
    },

    updateProgressBar(currentTime, duration) {
        if (!duration) return;
        const percentage = (currentTime / duration) * 100;
        playerProgressFill.style.width = `${percentage}%`;
        playerTimeCurrent.textContent = formatTime(currentTime);
        playerTimeDuration.textContent = formatTime(duration);
    }
};

// ==========================================================================
// 7. 실시간 알림 시뮬레이터 (Notification Simulator Engine)
// ==========================================================================
const NotificationSimulator = {
    scheduleBotComment(songId, userId) {
        const delay = 5000 + Math.random() * 3000;
        
        setTimeout(() => {
            const songs = LocalDB.getData("songs");
            const song = songs.find(s => s.id === songId);
            if (!song || !song.likes.includes(userId)) return;

            if (!AppState.currentUser || AppState.currentUser.id !== userId) return;

            const bot = MOCK_BOTS[Math.floor(Math.random() * MOCK_BOTS.length)];
            const text = BOT_COMMENTS[Math.floor(Math.random() * BOT_COMMENTS.length)];

            const comments = LocalDB.getData("comments");
            const newComment = {
                id: `bot_c_${Date.now()}`,
                songId: songId,
                userId: `bot_${bot.username}`,
                username: `${bot.avatar} ${bot.username}`,
                text: text,
                createdAt: new Date().toISOString()
            };
            comments.push(newComment);
            LocalDB.saveData("comments", comments);

            const notis = LocalDB.getData("notifications");
            const newNoti = {
                id: `noti_${Date.now()}`,
                userId: userId,
                songId: songId,
                songTitle: song.title,
                senderName: `${bot.avatar} ${bot.username}`,
                text: text,
                createdAt: new Date().toISOString(),
                read: false
            };
            notis.push(newNoti);
            LocalDB.saveData("notifications", notis);

            showToast(
                `💬 새로운 댓글 피드백!`,
                `${bot.avatar} ${bot.username}님이 당신이 좋아한 [${song.title}]에 댓글을 남겼습니다: "${text.substring(0, 20)}..."`
            );

            Router.updateNavbar();

            if (AppState.activeView === "notifications") {
                renderNotifications();
            }
            const modal = document.getElementById("music-modal");
            if (modal.style.display === "flex") {
                const currentModalSongId = modal.dataset.songId;
                if (currentModalSongId === songId) {
                    renderModalComments(songId);
                }
            }
        }, delay);
    }
};

// ==========================================================================
// 8. 오픈 API 기반 실시간 유튜브 음악 검색 엔진
// ==========================================================================
async function searchYoutube(query) {
    if (!query) return [];

    // 예비용 지능형 백업 매핑 오프라인 데이터 (검색 지연 / 차단 대비)
    const OFFLINE_YOUTUBE_SEED = [
        { title: "IU (아이유) - Love wins all MV", artist: "이지금 [IU Official]", videoId: "y12T4T5XJc0", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80" },
        { title: "NewJeans (뉴진스) - Bubble Gum MV", artist: "HYBE LABELS", videoId: "ft70sAYrT5Y", cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80" },
        { title: "BTS (방탄소년단) - Dynamite Official MV", artist: "HYBE LABELS", videoId: "gdZLi9oWNZg", cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80" },
        { title: "[Playlist] 1시간 편안한 지브리 로파이 🎹", artist: "Lofi Dreamer", videoId: "g08h-lZg18k", cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80" },
        { title: "aespa 에스파 - Supernova MV", artist: "SMTOWN", videoId: "nFYwcndLkAY", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80" },
        { title: "DAY6 (데이식스) - 한 페이지가 될 수 있게 MV", artist: "JYP Entertainment", videoId: "kGsT1j6h5nU", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80" }
    ];

    // 공용 인스턴스 3개 풀 운용 (Failover 아키텍처)
    const PUBLIC_INSTANCES = [
        "https://inv.tux.pizza/api/v1/search",
        "https://vid.puffyan.us/api/v1/search",
        "https://invidious.flokinet.to/api/v1/search"
    ];

    let ytResults = [];
    let success = false;

    // 1. 공용 인스턴스 검색 시도
    for (let instance of PUBLIC_INSTANCES) {
        if (success) break;
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000); // 2초 제한

            const res = await fetch(`${instance}?q=${encodeURIComponent(query)}&type=video`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    ytResults = data.slice(0, 6).map(item => ({
                        title: item.title,
                        artist: item.author,
                        videoId: item.videoId,
                        cover: item.videoThumbnails?.find(t => t.quality === "high" || t.quality === "medium")?.url 
                            || `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`
                    }));
                    success = true;
                    console.log(`⚡ YouTube search fetched successfully from: ${instance}`);
                }
            }
        } catch (e) {
            console.warn(`Instance failed: ${instance}`, e);
        }
    }

    // 2. 검색에 실패했거나 오프라인일 시 키워드 매칭 가상 생성기 가동
    if (!success || ytResults.length === 0) {
        console.log("⚠️ YouTube live API offline. Triggering Offline Hybrid Search Mapper.");
        
        // 검색 쿼리에 매핑되는 시드 찾기
        const filteredSeeds = OFFLINE_YOUTUBE_SEED.filter(s => 
            s.title.toLowerCase().includes(query.toLowerCase()) || 
            s.artist.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredSeeds.length > 0) {
            ytResults = filteredSeeds;
        } else {
            // 임의의 검색어일 경우 즉석에서 4곡의 사실적인 유튜브 검색 카드 합성 생성
            ytResults = [
                {
                    title: `"${query}" 감성 가득 플레이리스트 (Vibe Selection)`,
                    artist: "Vibe Records",
                    videoId: "dQw4w9WgXcQ",
                    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80"
                },
                {
                    title: `[Live] ${query} - 어쿠스틱 라이브 버전 🎤`,
                    artist: "Studio Sound",
                    videoId: "9bZkp7q19f0",
                    cover: "https://images.unsplash.com/photo-1486591978090-58e619d37fe7?w=300&auto=format&fit=crop&q=80"
                },
                {
                    title: `${query} (Lofi Remix / 공부할 때 들을 만한 음악)`,
                    artist: "Lofi Roomer",
                    videoId: "Lg7g0WlZg18",
                    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80"
                },
                {
                    title: `Official Cover: ${query} (by Stage Session)`,
                    artist: "Cover Artist Hub",
                    videoId: "kJQP7kiw5Fk",
                    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80"
                }
            ];
        }
    }

    return ytResults;
}

// 유튜브 임시 음원을 가상 DB에 네이티브 음원으로 승격 등록시키는 영리한 어댑터
function registerYoutubeSong(ytSong) {
    const songs = LocalDB.getData("songs");
    const songId = `yt_${ytSong.videoId}`;
    
    // 이미 등록되어있는지 검증
    const existing = songs.find(s => s.id === songId);
    if (existing) return songId;

    const newSong = {
        id: songId,
        title: ytSong.title,
        artist: ytSong.artist,
        coverUrl: ytSong.cover,
        audioUrl: "#", // 유튜브 오디오 플래그용
        isYoutube: true,
        youtubeId: ytSong.videoId,
        hashtags: ["YouTube", "Social"],
        likes: []
    };

    songs.push(newSong);
    LocalDB.saveData("songs", songs);
    return songId;
}

// ==========================================================================
// 9. HOME VIEW - 렌더링 및 비즈니스 로직
// ==========================================================================
async function renderHome() {
    const musicGrid = document.getElementById("music-grid");
    const searchInput = document.getElementById("search-input");
    const searchClearBtn = document.getElementById("search-clear-btn");
    const filterStatus = document.getElementById("filter-status");
    const filterText = document.getElementById("filter-text");

    const songs = LocalDB.getData("songs");
    const query = searchInput.value.trim().toLowerCase();

    // 1. 클리어 검색 X버튼 제어
    if (query || AppState.currentSearchTagFilter) {
        searchClearBtn.style.display = "flex";
    } else {
        searchClearBtn.style.display = "none";
    }

    // 2. 필터 배너 표시 제어
    if (AppState.currentSearchTagFilter) {
        filterStatus.style.display = "flex";
        filterText.textContent = `해시태그 "#${AppState.currentSearchTagFilter}" 검색 결과`;
    } else if (query) {
        filterStatus.style.display = "flex";
        const typeKo = { all: "전체", title: "제목", artist: "아티스트", hashtag: "해시태그", youtube: "유튜브 실시간" };
        filterText.textContent = `"${query}" [${typeKo[AppState.currentSearchType]}] 검색 결과`;
    } else {
        filterStatus.style.display = "none";
    }

    // 3. 유튜브 단독 검색 모드일 시 처리
    if (AppState.currentSearchType === "youtube" && query) {
        musicGrid.innerHTML = `<div class="loader">📺 유튜브 실시간 비디오를 탐색하는 중...</div>`;
        const ytResults = await searchYoutube(query);
        AppState.youtubeSearchResults = ytResults;
        
        if (ytResults.length === 0) {
            musicGrid.innerHTML = `<div class="loader">유튜브 검색 결과를 찾을 수 없습니다. 🔍</div>`;
            return;
        }

        musicGrid.innerHTML = ytResults.map(song => {
            const songId = `yt_${song.videoId}`;
            // DB에 등록되어있는지 좋아요 유무를 위해 조회
            const songsInDb = LocalDB.getData("songs");
            const dbSong = songsInDb.find(s => s.id === songId);
            const isLiked = AppState.currentUser && dbSong && dbSong.likes.includes(AppState.currentUser.id);
            const likeCount = dbSong ? dbSong.likes.length : 0;
            
            return `
                <div class="music-card youtube-card" onclick="openDetailsModalFromYoutube('${song.videoId}')">
                    <div class="music-card-cover-wrapper">
                        <img class="music-card-cover" src="${song.cover}" alt="${song.title}" loading="lazy">
                        <button class="music-card-play-btn" onclick="event.stopPropagation(); playYoutubeFromCard('${song.videoId}')" title="재생">
                            ▶
                        </button>
                    </div>
                    <div class="music-card-info">
                        <h3 class="music-card-title"><span class="yt-badge">YouTube</span>${song.title}</h3>
                        <p class="music-card-artist">${song.artist}</p>
                    </div>
                    <div class="music-card-meta">
                        <div class="music-card-tags">
                            <span class="tag-badge" style="border-color: rgba(239, 68, 68, 0.2); color: #fca5a5;">#유튜브</span>
                        </div>
                        <div class="music-card-like ${isLiked ? 'liked' : ''}">
                            <span>❤️</span> ${likeCount}
                        </div>
                    </div>
                </div>
            `;
        }).join("");
        return;
    }

    // 4. 일반 통합 검색 모드 필터링
    let filteredSongs = songs;

    if (AppState.currentSearchTagFilter) {
        filteredSongs = songs.filter(s => 
            s.hashtags.some(tag => tag.toLowerCase() === AppState.currentSearchTagFilter.toLowerCase())
        );
    } else if (query) {
        filteredSongs = songs.filter(s => {
            const matchTitle = s.title.toLowerCase().includes(query);
            const matchArtist = s.artist.toLowerCase().includes(query);
            const matchHashtags = s.hashtags.some(tag => tag.toLowerCase().includes(query));

            if (AppState.currentSearchType === "title") return matchTitle;
            if (AppState.currentSearchType === "artist") return matchArtist;
            if (AppState.currentSearchType === "hashtag") return matchHashtags;
            
            return matchTitle || matchArtist || matchHashtags;
        });
    }

    // 5. 로컬 검색결과 렌더링
    let htmlOutput = "";
    if (filteredSongs.length > 0) {
        htmlOutput = filteredSongs.map(song => {
            const isLiked = AppState.currentUser && song.likes.includes(AppState.currentUser.id);
            const tagsHTML = song.hashtags.map(t => `<span class="tag-badge">#${t}</span>`).join("");
            
            return `
                <div class="music-card ${song.isYoutube ? 'youtube-card' : ''}" onclick="openDetailsModal('${song.id}')">
                    <div class="music-card-cover-wrapper">
                        <img class="music-card-cover" src="${song.coverUrl}" alt="${song.title}" loading="lazy">
                        <button class="music-card-play-btn" onclick="event.stopPropagation(); MusicPlayer.play('${song.id}')" title="재생">
                            ▶
                        </button>
                    </div>
                    <div class="music-card-info">
                        <h3 class="music-card-title">
                            ${song.isYoutube ? '<span class="yt-badge">YouTube</span>' : ''}
                            ${song.title}
                        </h3>
                        <p class="music-card-artist">${song.artist}</p>
                    </div>
                    <div class="music-card-meta">
                        <div class="music-card-tags">
                            ${tagsHTML}
                        </div>
                        <div class="music-card-like ${isLiked ? 'liked' : ''}">
                            <span>❤️</span> ${song.likes.length}
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    } else {
        htmlOutput = `<div class="loader" style="padding: 20px 0;">로컬 라이브러리 목록에 일치하는 곡이 없습니다. 🔍</div>`;
    }

    musicGrid.innerHTML = htmlOutput;

    // 6. 만약 "전체" 모드인데 검색어가 기입되어 있으면 하단에 실시간 [YouTube 검색 결과]도 덧붙여 보여주는 초프리미엄 로직!
    if (AppState.currentSearchType === "all" && query) {
        const divider = document.createElement("div");
        divider.className = "loader";
        divider.style.gridColumn = "1 / -1";
        divider.style.padding = "20px 0";
        divider.style.animation = "none";
        divider.innerHTML = `
            <div style="border-bottom: 1px solid var(--border-glass); margin-bottom: 20px; width:100%;"></div>
            <h2 class="section-title" style="margin: 0; color: #fca5a5;">📺 YouTube 실시간 검색 결과</h2>
        `;
        musicGrid.appendChild(divider);

        const ytGridLoader = document.createElement("div");
        ytGridLoader.className = "loader";
        ytGridLoader.style.gridColumn = "1 / -1";
        ytGridLoader.textContent = "유튜브 실시간 검색결과를 가져오는 중...";
        musicGrid.appendChild(ytGridLoader);

        searchYoutube(query).then(ytResults => {
            ytGridLoader.remove();
            AppState.youtubeSearchResults = ytResults;
            
            if (ytResults.length === 0) return;

            ytResults.forEach(song => {
                const songId = `yt_${song.videoId}`;
                const songsInDb = LocalDB.getData("songs");
                const dbSong = songsInDb.find(s => s.id === songId);
                const isLiked = AppState.currentUser && dbSong && dbSong.likes.includes(AppState.currentUser.id);
                const likeCount = dbSong ? dbSong.likes.length : 0;

                const card = document.createElement("div");
                card.className = "music-card youtube-card";
                card.onclick = () => openDetailsModalFromYoutube(song.videoId);
                card.innerHTML = `
                    <div class="music-card-cover-wrapper">
                        <img class="music-card-cover" src="${song.cover}" alt="${song.title}" loading="lazy">
                        <button class="music-card-play-btn" onclick="event.stopPropagation(); playYoutubeFromCard('${song.videoId}')" title="재생">
                            ▶
                        </button>
                    </div>
                    <div class="music-card-info">
                        <h3 class="music-card-title"><span class="yt-badge">YouTube</span>${song.title}</h3>
                        <p class="music-card-artist">${song.artist}</p>
                    </div>
                    <div class="music-card-meta">
                        <div class="music-card-tags">
                            <span class="tag-badge" style="border-color: rgba(239, 68, 68, 0.2); color: #fca5a5;">#유튜브</span>
                        </div>
                        <div class="music-card-like ${isLiked ? 'liked' : ''}">
                            <span>❤️</span> ${likeCount}
                        </div>
                    </div>
                `;
                musicGrid.appendChild(card);
            });
        });
    }
}

// 유튜브 전용 재생 연동 헬퍼
function playYoutubeFromCard(videoId) {
    const song = AppState.youtubeSearchResults.find(s => s.videoId === videoId);
    if (!song) return;
    const songId = registerYoutubeSong(song);
    MusicPlayer.play(songId);
}

// 유튜브 전용 상세모달 연동 헬퍼
function openDetailsModalFromYoutube(videoId) {
    const song = AppState.youtubeSearchResults.find(s => s.videoId === videoId);
    if (!song) return;
    const songId = registerYoutubeSong(song);
    openDetailsModal(songId);
}

// 홈 검색 조작 초기화
function initHomeEvents() {
    const searchInput = document.getElementById("search-input");
    const searchClearBtn = document.getElementById("search-clear-btn");
    const filterResetBtn = document.getElementById("filter-reset-btn");
    
    // 실시간 검색 트리거에 400ms 디바운스 적용해 잦은 API 쿼리 방지
    let searchDebounce;
    searchInput.addEventListener("input", () => {
        AppState.currentSearchTagFilter = null;
        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(() => {
            renderHome();
        }, 400);
    });

    searchClearBtn.addEventListener("click", () => {
        searchInput.value = "";
        AppState.currentSearchTagFilter = null;
        renderHome();
    });

    filterResetBtn.addEventListener("click", () => {
        searchInput.value = "";
        AppState.currentSearchTagFilter = null;
        renderHome();
    });

    document.querySelectorAll(".search-tab").forEach(tab => {
        tab.addEventListener("click", (e) => {
            document.querySelectorAll(".search-tab").forEach(t => t.classList.remove("active"));
            e.currentTarget.classList.add("active");
            AppState.currentSearchType = e.currentTarget.dataset.searchType;
            renderHome();
        });
    });
}

// ==========================================================================
// 10. TOP LIKES VIEW - 랭킹 보드 렌더링
// ==========================================================================
function renderTopLikes() {
    const container = document.getElementById("toplikes-container");
    const songs = LocalDB.getData("songs");
    const users = LocalDB.getData("users");

    const sortedSongs = [...songs].sort((a, b) => b.likes.length - a.likes.length);

    container.innerHTML = sortedSongs.map((song, index) => {
        const likers = song.likes.map(userId => {
            const user = users.find(u => u.id === userId);
            return user ? `${user.avatar} ${user.username}` : "탈퇴 회원";
        });

        const likersHTML = likers.length > 0 
            ? likers.map(name => `<span class="liker-pill">${name}</span>`).join("")
            : `<span style="color: var(--text-dark); font-style: italic;">아직 좋아요를 누른 유저가 없습니다.</span>`;

        return `
            <div class="ranking-card">
                <div class="ranking-number">${index + 1}</div>
                <img class="ranking-cover" src="${song.coverUrl}" alt="${song.title}">
                <div class="ranking-info">
                    <h3 class="ranking-title" onclick="openDetailsModal('${song.id}')">
                        ${song.isYoutube ? '<span class="yt-badge">YouTube</span>' : ''}
                        ${song.title}
                    </h3>
                    <p class="ranking-artist">${song.artist}</p>
                </div>
                <div class="ranking-likers-zone">
                    <div class="ranking-likes-count">❤️ ${song.likes.length}</div>
                    <div class="ranking-likers-avatars">
                        ${likersHTML}
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// ==========================================================================
// 11. HASHTAGS VIEW - 별점 시각화 보드
// ==========================================================================
function renderHashtags() {
    const grid = document.getElementById("hashtags-grid");
    const songs = LocalDB.getData("songs");

    const tagCounts = {};
    songs.forEach(song => {
        song.hashtags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    const sortedTags = Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

    if (sortedTags.length === 0) {
        grid.innerHTML = `<div class="loader">등록된 해시태그가 없습니다.</div>`;
        return;
    }

    const maxCount = Math.max(...sortedTags.map(t => t.count));

    grid.innerHTML = sortedTags.map(tag => {
        const starRating = maxCount > 0 ? Math.ceil((tag.count / maxCount) * 5) : 1;
        
        let starsHTML = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= starRating) {
                starsHTML += `<span class="star-icon filled">⭐</span>`;
            } else {
                starsHTML += `<span class="star-icon">☆</span>`;
            }
        }

        return `
            <div class="hashtag-card" onclick="searchByHashtag('${tag.name}')">
                <div class="hashtag-card-name">#${tag.name}</div>
                <div class="hashtag-stars">
                    ${starsHTML}
                </div>
                <div class="hashtag-card-count">음악 ${tag.count}곡에 태그됨</div>
            </div>
        `;
    }).join("");
}

function searchByHashtag(tagName) {
    AppState.currentSearchTagFilter = tagName;
    AppState.currentSearchType = "hashtag";
    
    document.querySelectorAll(".search-tab").forEach(t => {
        t.classList.remove("active");
        if (t.dataset.searchType === "hashtag") t.classList.add("active");
    });
    
    document.getElementById("search-input").value = "";
    window.location.hash = "#/home";
}

// ==========================================================================
// 12. AUTH VIEW - 로그인 및 회원가입 제어
// ==========================================================================
function initAuthEvents() {
    const tabLogin = document.getElementById("tab-login");
    const tabSignup = document.getElementById("tab-signup");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    tabLogin.addEventListener("click", () => {
        tabLogin.classList.add("active");
        tabSignup.classList.remove("active");
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
    });

    tabSignup.addEventListener("click", () => {
        tabSignup.classList.add("active");
        tabLogin.classList.remove("active");
        signupForm.classList.add("active");
        loginForm.classList.remove("active");
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("login-id").value.trim();
        const pw = document.getElementById("login-pw").value;

        const users = LocalDB.getData("users");
        const matchedUser = users.find(u => u.id === id && u.password === pw);

        if (matchedUser) {
            AppState.currentUser = {
                id: matchedUser.id,
                username: matchedUser.username,
                email: matchedUser.email,
                avatar: matchedUser.avatar
            };
            localStorage.setItem("vibe_current_user", JSON.stringify(AppState.currentUser));
            
            showToast("✨ 로그인 성공!", `${matchedUser.avatar} ${matchedUser.username}님, 반갑습니다!`);
            loginForm.reset();
            
            Router.updateNavbar();
            window.location.hash = "#/home";
        } else {
            showToast("⚠️ 로그인 실패", "아이디 또는 비밀번호가 일치하지 않습니다.", "error");
        }
    });

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("signup-id").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const pw = document.getElementById("signup-pw").value;
        const pwConfirm = document.getElementById("signup-pw-confirm").value;

        let hasError = false;

        const idErr = document.getElementById("signup-id-error");
        const emailErr = document.getElementById("signup-email-error");
        const pwErr = document.getElementById("signup-pw-error");
        const pwConfErr = document.getElementById("signup-pw-confirm-error");

        idErr.textContent = "";
        emailErr.textContent = "";
        pwErr.textContent = "";
        pwConfErr.textContent = "";

        const users = LocalDB.getData("users");

        if (id.length < 4) {
            idErr.textContent = "아이디는 4자 이상이어야 합니다.";
            hasError = true;
        } else if (users.some(u => u.id.toLowerCase() === id.toLowerCase())) {
            idErr.textContent = "이미 사용 중인 아이디입니다.";
            hasError = true;
        }

        if (pw.length < 6) {
            pwErr.textContent = "비밀번호는 6자 이상이어야 합니다.";
            hasError = true;
        }

        if (pw !== pwConfirm) {
            pwConfErr.textContent = "비밀번호가 일치하지 않습니다.";
            hasError = true;
        }

        if (hasError) return;

        const avatars = ["❤️", "🎧", "🦄", "🌈", "🔥", "🔮", "🍕", "🎸", "🐱", "🦊"];
        const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

        const newUser = {
            id: id,
            username: id,
            email: email,
            password: pw,
            avatar: randomAvatar
        };

        users.push(newUser);
        LocalDB.saveData("users", users);

        showToast("🎉 가입 완료!", `${randomAvatar} 회원 가입이 완료되었습니다. 자동으로 로그인합니다.`);
        
        AppState.currentUser = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar
        };
        localStorage.setItem("vibe_current_user", JSON.stringify(AppState.currentUser));
        
        signupForm.reset();
        Router.updateNavbar();
        window.location.hash = "#/home";
    });
}

function handleLogout() {
    // 플레이어 중지
    MusicPlayer.stopYoutubeVideo();
    audioEl.pause();

    AppState.currentUser = null;
    localStorage.removeItem("vibe_current_user");
    showToast("👋 로그아웃 완료", "안전하게 로그아웃되었습니다. 또 방문해 주세요!");
    Router.updateNavbar();
    window.location.hash = "#/home";
}

// ==========================================================================
// 13. NOTIFICATIONS VIEW - 알림 리스트 렌더링
// ==========================================================================
function renderNotifications() {
    const listEl = document.getElementById("notifications-list");
    const notis = LocalDB.getData("notifications");

    if (!AppState.currentUser) return;

    const myNotis = notis
        .filter(n => n.userId === AppState.currentUser.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (myNotis.length === 0) {
        listEl.innerHTML = `
            <div class="noti-empty">
                <span style="font-size: 32px; display: block; margin-bottom: 12px;">📭</span>
                아직 도착한 소셜 소식이 없습니다.<br>
                <span style="font-size: 13px; color: var(--text-dark);">노래를 좋아하고 기다려보시면 실시간 피드백이 찾아옵니다!</span>
            </div>
        `;
        return;
    }

    listEl.innerHTML = myNotis.map(noti => {
        return `
            <div class="noti-card ${noti.read ? '' : 'unread'}" onclick="handleNotiClick('${noti.id}', '${noti.songId}')">
                <div class="noti-icon">💬</div>
                <div class="noti-body">
                    <div class="noti-message">
                        <span class="noti-text-highlight">${noti.senderName}</span>님이 당신이 좋아한 음악 
                        <span class="noti-text-highlight" style="color: var(--primary);">[${noti.songTitle}]</span>에 댓글을 남겼습니다.
                    </div>
                    <div class="noti-text-quote">"${noti.text}"</div>
                    <div class="noti-time">${timeAgo(new Date(noti.createdAt))}</div>
                </div>
                ${noti.read ? '' : '<div class="noti-unread-dot"></div>'}
            </div>
        `;
    }).join("");
}

function handleNotiClick(notiId, songId) {
    const notis = LocalDB.getData("notifications");
    const noti = notis.find(n => n.id === notiId);
    if (noti) {
        noti.read = true;
        LocalDB.saveData("notifications", notis);
    }

    renderNotifications();
    Router.updateNavbar();
    openDetailsModal(songId);
}

function initNotificationEvents() {
    document.getElementById("clear-notifications-btn").addEventListener("click", () => {
        if (!AppState.currentUser) return;
        
        const notis = LocalDB.getData("notifications");
        notis.forEach(n => {
            if (n.userId === AppState.currentUser.id) n.read = true;
        });
        
        LocalDB.saveData("notifications", notis);
        showToast("🔔 알림 상태 갱신", "모든 알림을 읽음으로 변경하였습니다.");
        renderNotifications();
        Router.updateNavbar();
    });
}

// ==========================================================================
// 14. PROFILE VIEW - 개인 이력 탭 렌더링
// ==========================================================================
function renderProfile() {
    if (!AppState.currentUser) return;

    document.getElementById("profile-avatar").textContent = AppState.currentUser.avatar;
    document.getElementById("profile-username").textContent = `${AppState.currentUser.username} 님`;
    document.getElementById("profile-email").textContent = AppState.currentUser.email;

    const songs = LocalDB.getData("songs");
    const comments = LocalDB.getData("comments");

    const likedSongs = songs.filter(s => s.likes.includes(AppState.currentUser.id));
    const myComments = comments.filter(c => c.userId === AppState.currentUser.id);

    document.getElementById("profile-likes-count").textContent = likedSongs.length;
    document.getElementById("profile-comments-count").textContent = myComments.length;

    // 1. 좋아요 음악 리스트 그리기
    const likesGrid = document.getElementById("profile-likes-grid");
    if (likedSongs.length === 0) {
        likesGrid.innerHTML = `<div class="loader">좋아요 표시를 남긴 곡이 아직 없습니다. ❤️</div>`;
    } else {
        likesGrid.innerHTML = likedSongs.map(song => {
            const tagsHTML = song.hashtags.map(t => `<span class="tag-badge">#${t}</span>`).join("");
            return `
                <div class="music-card ${song.isYoutube ? 'youtube-card' : ''}" onclick="openDetailsModal('${song.id}')">
                    <div class="music-card-cover-wrapper">
                        <img class="music-card-cover" src="${song.coverUrl}" alt="${song.title}">
                        <button class="music-card-play-btn" onclick="event.stopPropagation(); MusicPlayer.play('${song.id}')">▶</button>
                    </div>
                    <div class="music-card-info">
                        <h3 class="music-card-title">
                            ${song.isYoutube ? '<span class="yt-badge">YouTube</span>' : ''}
                            ${song.title}
                        </h3>
                        <p class="music-card-artist">${song.artist}</p>
                    </div>
                    <div class="music-card-meta">
                        <div class="music-card-tags">${tagsHTML}</div>
                        <div class="music-card-like liked"><span>❤️</span> ${song.likes.length}</div>
                    </div>
                </div>
            `;
        }).join("");
    }

    // 2. 내가 작성한 댓글 목록 그리기
    const commentsListEl = document.getElementById("profile-comments-list");
    if (myComments.length === 0) {
        commentsListEl.innerHTML = `
            <div class="noti-empty" style="padding: 40px 0;">
                내가 작성한 댓글 목록이 비어있습니다. 💬
            </div>
        `;
    } else {
        const sortedMyComments = [...myComments].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        commentsListEl.innerHTML = sortedMyComments.map(comm => {
            const targetSong = songs.find(s => s.id === comm.songId) || { title: "삭제된 음악" };
            return `
                <div class="my-comment-card">
                    <div class="my-comment-details">
                        <div class="my-comment-song" onclick="openDetailsModal('${comm.songId}')">🎵 ${targetSong.title}</div>
                        <div class="my-comment-text">"${comm.text}"</div>
                        <div class="my-comment-time">${timeAgo(new Date(comm.createdAt))}</div>
                    </div>
                    <button class="my-comment-delete" onclick="deleteMyComment('${comm.id}')" title="댓글 삭제">✕</button>
                </div>
            `;
        }).join("");
    }
}

function deleteMyComment(commentId) {
    if (!confirm("댓글을 정말로 삭제하시겠습니까?")) return;
    
    let comments = LocalDB.getData("comments");
    comments = comments.filter(c => c.id !== commentId);
    LocalDB.saveData("comments", comments);
    
    showToast("🗑️ 댓글 삭제 완료", "성공적으로 내 댓글을 삭제하였습니다.");
    renderProfile();
}

function initProfileEvents() {
    document.querySelectorAll(".profile-tab").forEach(tab => {
        tab.addEventListener("click", (e) => {
            document.querySelectorAll(".profile-tab").forEach(t => t.classList.remove("active"));
            e.currentTarget.classList.add("active");

            const activeTabName = e.currentTarget.dataset.profileTab;
            
            document.querySelectorAll(".profile-pane").forEach(pane => pane.classList.remove("active"));
            document.getElementById(`profile-pane-${activeTabName}`).classList.add("active");
        });
    });
}

// ==========================================================================
// 15. MUSIC DETAIL MODAL - 대화형 음악 상세창 구현
// ==========================================================================
const musicModal = document.getElementById("music-modal");
const modalCloseBtn = document.getElementById("modal-close-btn");
const newTagInput = document.getElementById("new-tag-input");
const addTagBtn = document.getElementById("add-tag-btn");
const tagErrorMsg = document.getElementById("tag-error");
const newCommentTextarea = document.getElementById("new-comment-textarea");
const charCounter = document.getElementById("char-count");
const submitCommentBtn = document.getElementById("submit-comment-btn");
const commentErrorMsg = document.getElementById("comment-error");

function openDetailsModal(songId) {
    const song = LocalDB.getById("songs", songId);
    if (!song) return;

    musicModal.dataset.songId = songId;
    document.getElementById("modal-cover").src = song.coverUrl;
    document.getElementById("modal-title").innerHTML = `${song.isYoutube ? '<span class="yt-badge">YouTube</span>' : ''}${song.title}`;
    document.getElementById("modal-artist").textContent = song.artist;
    
    document.getElementById("modal-play-trigger").onclick = () => {
        MusicPlayer.play(songId);
    };

    const isLoggedIn = !!AppState.currentUser;
    const isLiked = isLoggedIn && song.likes.includes(AppState.currentUser.id);

    const likeBtn = document.getElementById("modal-like-btn");
    const likeTooltip = document.getElementById("modal-like-tooltip");
    document.getElementById("modal-like-count").textContent = song.likes.length;

    if (isLiked) {
        likeBtn.classList.add("liked");
        likeBtn.querySelector(".heart-icon").textContent = "❤️";
    } else {
        likeBtn.classList.remove("liked");
        likeBtn.querySelector(".heart-icon").textContent = "🤍";
    }

    if (isLoggedIn) {
        likeTooltip.style.display = "none";
        newTagInput.disabled = false;
        addTagBtn.disabled = false;
        tagErrorMsg.style.display = "none";
        
        newCommentTextarea.disabled = false;
        submitCommentBtn.disabled = false;
        commentErrorMsg.style.display = "none";
    } else {
        likeTooltip.style.display = "none";
        newTagInput.disabled = true;
        addTagBtn.disabled = true;
        tagErrorMsg.style.display = "block";
        tagErrorMsg.textContent = "💡 해시태그 추가는 로그인 후 가능합니다.";
        
        newCommentTextarea.disabled = true;
        submitCommentBtn.disabled = true;
        commentErrorMsg.style.display = "block";
        commentErrorMsg.textContent = "💡 댓글 작성은 로그인 후 가능합니다.";
    }

    renderModalTags(songId, song.hashtags);
    renderModalComments(songId);

    musicModal.style.display = "flex";
    
    newCommentTextarea.value = "";
    charCounter.textContent = "0";
}

// 모달 내 해시태그 칩 목록 리렌더링 (삭제 단추 이식)
function renderModalTags(songId, hashtags) {
    const tagsList = document.getElementById("modal-tags-list");
    const isLoggedIn = !!AppState.currentUser;

    tagsList.innerHTML = hashtags.map(tag => {
        // 로그인 유저에게만 태그 옆에 x 삭제 버튼 노출
        const deleteBtnHTML = isLoggedIn
            ? `<span class="tag-delete-x" onclick="event.stopPropagation(); deleteModalTag('${songId}', '${tag}')" title="태그 삭제">✕</span>`
            : "";

        return `
            <span class="modal-tag-chip" onclick="closeDetailsModal(); searchByHashtag('${tag}')">
                #${tag}
                ${deleteBtnHTML}
            </span>
        `;
    }).join("");
}

// 해시태그 삭제 비즈니스 로직
function deleteModalTag(songId, tag) {
    const songs = LocalDB.getData("songs");
    const song = songs.find(s => s.id === songId);
    
    if (!song) return;

    // 해당 해시태그 제거
    song.hashtags = song.hashtags.filter(t => t !== tag);
    LocalDB.saveData("songs", songs);

    showToast("🏷️ 해시태그 삭제 완료", `#${tag} 태그를 성공적으로 지웠습니다.`);

    // 뷰 갱신
    renderModalTags(songId, song.hashtags);
    if (AppState.activeView === "home") renderHome();
    if (AppState.activeView === "hashtags") renderHashtags();
}

// 모달 내 댓글 리스트 리렌더링 (내 댓글 옆에 즉시 삭제할 수 있는 x 버튼 이식)
function renderModalComments(songId) {
    const commentsList = document.getElementById("modal-comments-list");
    const comments = LocalDB.getData("comments");
    
    const songComments = comments
        .filter(c => c.songId === songId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (songComments.length === 0) {
        commentsList.innerHTML = `<div class="comments-empty">이 Vibe 곡의 첫 번째 소감의 주인공이 되어 보세요! 🤍</div>`;
        return;
    }

    commentsList.innerHTML = songComments.map(comm => {
        const isLoggedIn = !!AppState.currentUser;
        // 내가 작성한 댓글인 경우에만 ✕ 삭제버튼 렌더링
        const isMyComment = isLoggedIn && comm.userId === AppState.currentUser.id;
        const deleteBtnHTML = isMyComment
            ? `<button class="comment-node-delete-btn" onclick="event.stopPropagation(); deleteModalComment('${comm.id}', '${songId}')" title="내 댓글 지우기">✕</button>`
            : "";

        return `
            <div class="comment-node">
                <div class="comment-node-meta">
                    <span class="comment-node-author">${comm.username}</span>
                    <span class="comment-node-time">${timeAgo(new Date(comm.createdAt))}</span>
                </div>
                <div class="comment-node-text">${comm.text}</div>
                ${deleteBtnHTML}
            </div>
        `;
    }).join("");
}

// 모달 댓글 존 내 즉시 삭제 비즈니스 로직
function deleteModalComment(commentId, songId) {
    if (!confirm("작성하신 댓글을 정말로 삭제하시겠습니까?")) return;

    let comments = LocalDB.getData("comments");
    comments = comments.filter(c => c.id !== commentId);
    LocalDB.saveData("comments", comments);

    showToast("🗑️ 댓글 삭제 완료", "내가 작성한 소중한 감상글을 안전하게 지웠습니다.");

    // 화면 갱신
    renderModalComments(songId);
    if (AppState.activeView === "profile") renderProfile();
}

function closeDetailsModal() {
    musicModal.style.display = "none";
}

// 상세 모달 이벤트 바인딩
function initModalEvents() {
    modalCloseBtn.addEventListener("click", closeDetailsModal);
    musicModal.addEventListener("click", (e) => {
        if (e.target === musicModal) closeDetailsModal();
    });

    document.getElementById("modal-like-btn").addEventListener("click", () => {
        if (!AppState.currentUser) {
            showToast("⚠️ 로그인 가이드", "로그인이 필요합니다. 로그인 화면으로 이동합니다.");
            closeDetailsModal();
            window.location.hash = "#/auth";
            return;
        }

        const songId = musicModal.dataset.songId;
        const songs = LocalDB.getData("songs");
        const song = songs.find(s => s.id === songId);
        
        if (!song) return;

        const userId = AppState.currentUser.id;
        const likeIdx = song.likes.indexOf(userId);

        if (likeIdx > -1) {
            song.likes.splice(likeIdx, 1);
            showToast("💔 좋아요 취소", `[${song.title}] 좋아요를 취소했습니다.`);
        } else {
            song.likes.push(userId);
            showToast("💖 좋아요 성공!", `[${song.title}] 명곡 리스트에 추가되었습니다.`);
            NotificationSimulator.scheduleBotComment(songId, userId);
        }

        LocalDB.saveData("songs", songs);

        openDetailsModal(songId);
        
        if (AppState.activeView === "home") renderHome();
        if (AppState.activeView === "toplikes") renderTopLikes();
        if (AppState.activeView === "profile") renderProfile();
    });

    addTagBtn.addEventListener("click", () => {
        if (!AppState.currentUser) return;

        let newTag = newTagInput.value.trim().replace(/#/g, "");
        if (!newTag) return;

        newTag = newTag.replace(/[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g, "");
        if (newTag.length === 0) {
            showToast("⚠️ 입력 오류", "유효한 해시태그 단어를 입력해 주세요.", "error");
            return;
        }

        const songId = musicModal.dataset.songId;
        const songs = LocalDB.getData("songs");
        const song = songs.find(s => s.id === songId);

        if (!song) return;

        if (song.hashtags.some(tag => tag.toLowerCase() === newTag.toLowerCase())) {
            showToast("⚠️ 중복 오류", "이미 존재하는 해시태그입니다.", "error");
            return;
        }

        song.hashtags.push(newTag);
        LocalDB.saveData("songs", songs);

        newTagInput.value = "";
        showToast("🏷️ 해시태그 추가완료", `[${song.title}]에 #${newTag} 태그가 매핑되었습니다.`);
        
        renderModalTags(songId, song.hashtags);
        if (AppState.activeView === "home") renderHome();
        if (AppState.activeView === "hashtags") renderHashtags();
    });

    newTagInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTagBtn.click();
    });

    newCommentTextarea.addEventListener("input", () => {
        const count = newCommentTextarea.value.length;
        charCounter.textContent = count;
    });

    submitCommentBtn.addEventListener("click", () => {
        if (!AppState.currentUser) return;

        const text = newCommentTextarea.value.trim();
        if (!text) return;

        const songId = musicModal.dataset.songId;
        const comments = LocalDB.getData("comments");

        const newCommNode = {
            id: `c_${Date.now()}`,
            songId: songId,
            userId: AppState.currentUser.id,
            username: `${AppState.currentUser.avatar} ${AppState.currentUser.username}`,
            text: text,
            createdAt: new Date().toISOString()
        };

        comments.push(newCommNode);
        LocalDB.saveData("comments", comments);

        newCommentTextarea.value = "";
        charCounter.textContent = "0";
        showToast("💬 댓글 등록 완료", "곡 상세 게시판에 댓글이 기록되었습니다.");

        renderModalComments(songId);
        if (AppState.activeView === "profile") renderProfile();
    });
}

// ==========================================================================
// 16. 유틸리티 헬퍼 함수군
// ==========================================================================

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function timeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) return `${interval}년 전`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval}달 전`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval}일 전`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval}시간 전`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval}분 전`;
    return seconds < 10 ? '방금 전' : `${Math.floor(seconds)}초 전`;
}

function showToast(title, msg, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    // 타임아웃 지시 컬러 맵
    let titleColor = "var(--primary)";
    if (type === "error" || title.includes("취소") || title.includes("삭제")) {
        titleColor = "#ef4444";
    } else if (title.includes("알림") || title.includes("로그인 성공")) {
        titleColor = "var(--tertiary)";
    }

    toast.innerHTML = `
        <div class="toast-body">
            <div class="toast-title" style="color: ${titleColor};">${title}</div>
            <div class="toast-msg">${msg}</div>
        </div>
        <button class="toast-close">✕</button>
    `;

    container.appendChild(toast);

    toast.querySelector(".toast-close").addEventListener("click", () => {
        toast.classList.add("fade-out");
        toast.addEventListener("animationend", () => toast.remove());
    });

    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add("fade-out");
            toast.addEventListener("animationend", () => toast.remove());
        }
    }, 4500);
}

function initMobileToggle() {
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");
    
    mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });
}

// ==========================================================================
// 17. DOM 컨텐트 로드 완성 시 실행 개시
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initHomeEvents();
    initAuthEvents();
    initModalEvents();
    initNotificationEvents();
    initProfileEvents();
    initMobileToggle();
    
    MusicPlayer.init();
    Router.init();
});
