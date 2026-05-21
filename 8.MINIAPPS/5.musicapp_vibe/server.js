const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME 타입 매핑 테이블
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg'
};

const server = http.createServer((req, res) => {
    // URL 디코딩 처리 (한글이나 특수기호 파라미터 방지)
    const decodedUrl = decodeURIComponent(req.url);
    
    // 쿼리 스트링 제거
    const cleanUrl = decodedUrl.split('?')[0];
    
    // 루트 경로일 경우 index.html 지정
    let filePath = path.join(__dirname, cleanUrl === '/' ? 'index.html' : cleanUrl);
    
    // 보안 검사: 현재 폴더 바깥의 파일 접근 금지
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden: 접근 권한이 없습니다.');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 404 에러 시 예쁜 에러 안내
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Not Found</h1><p>요청하신 파일을 찾을 수 없습니다.</p>');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`500 Internal Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('\n==================================================');
    console.log(` ⚡ VibeSearch Local Server is running!`);
    console.log(` 🌐 URL: http://localhost:${PORT}/`);
    console.log('==================================================\n');
});
