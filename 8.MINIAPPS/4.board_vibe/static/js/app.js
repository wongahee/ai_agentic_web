document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const postForm = document.getElementById('post-form');
    const titleInput = document.getElementById('title-input');
    const messageInput = document.getElementById('message-input');
    const titleCounter = document.getElementById('title-counter');
    const messageCounter = document.getElementById('message-counter');
    const submitBtn = document.getElementById('submit-btn');
    const submitBtnText = document.getElementById('submit-btn-text');
    const cardsGrid = document.getElementById('cards-grid');
    const postCountBadge = document.getElementById('post-count-badge');
    const toastContainer = document.getElementById('toast-container');

    // Constants
    const MAX_TITLE_LEN = 50;
    const MAX_MSG_LEN = 500;

    // Load posts on startup
    fetchPosts();

    // Setup input character counters
    setupCharacterCounter(titleInput, titleCounter, MAX_TITLE_LEN);
    setupCharacterCounter(messageInput, messageCounter, MAX_MSG_LEN);

    // Form Submission
    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const title = titleInput.value.trim();
        const message = messageInput.value.trim();

        // Frontend validation
        if (!title) {
            showToast('Please enter a title.');
            titleInput.focus();
            return;
        }
        if (!message) {
            showToast('Please enter a message.');
            messageInput.focus();
            return;
        }

        // Set Loading State on Button
        setLoading(true);

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, message })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to submit post');
            }

            // Clear Form
            postForm.reset();
            resetCounters();

            // Insert new card at the top
            insertCard(result, true);
            updateBadgeCount(1);
            
            // Remove Empty State if it exists
            const emptyState = document.querySelector('.empty-state');
            if (emptyState) {
                emptyState.remove();
            }

        } catch (error) {
            console.error('Error creating post:', error);
            showToast(error.message);
        } finally {
            setLoading(false);
        }
    });

    // Event Delegation for Likes & Deletions
    cardsGrid.addEventListener('click', async (e) => {
        // Handle Like Button
        const likeBtn = e.target.closest('.like-btn');
        if (likeBtn) {
            const card = likeBtn.closest('.post-card');
            const postId = card.dataset.id;
            
            try {
                likeBtn.disabled = true;
                const response = await fetch(`/api/posts/${postId}/like`, {
                    method: 'POST'
                });
                
                const result = await response.json();
                if (!response.ok) throw new Error(result.error);

                // Update UI
                const countSpan = likeBtn.querySelector('.like-count');
                countSpan.textContent = result.likes;
                likeBtn.classList.add('liked');
                
                // Temporary bounce effect
                likeBtn.classList.add('animating');
                setTimeout(() => likeBtn.classList.remove('animating'), 400);

            } catch (error) {
                console.error('Error liking post:', error);
                showToast('Could not register like.');
            } finally {
                likeBtn.disabled = false;
            }
            return;
        }

        // Handle Delete Button
        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            const card = deleteBtn.closest('.post-card');
            const postId = card.dataset.id;

            if (!confirm('Are you sure you want to delete this post?')) {
                return;
            }

            try {
                deleteBtn.disabled = true;
                const response = await fetch(`/api/posts/${postId}`, {
                    method: 'DELETE'
                });

                const result = await response.json();
                if (!response.ok) throw new Error(result.error);

                // Trigger deletion animation
                card.style.animation = 'cardDisappear 0.4s cubic-bezier(0.19, 1, 0.22, 1) forwards';
                
                setTimeout(() => {
                    card.remove();
                    updateBadgeCount(-1);
                    checkEmptyState();
                }, 400);

            } catch (error) {
                console.error('Error deleting post:', error);
                showToast('Could not delete post.');
                deleteBtn.disabled = false;
            }
        }
    });

    // Helper functions

    async function fetchPosts() {
        try {
            cardsGrid.innerHTML = `
                <div class="empty-state" id="loading-state" style="border:none;">
                    <div class="spinner-vibe"></div>
                    <p style="margin-top: 1rem; color: var(--text-secondary);">Loading vibe board...</p>
                </div>
            `;

            const response = await fetch('/api/posts');
            const posts = await response.json();

            // Clear loading spinner
            cardsGrid.innerHTML = '';

            if (posts.length === 0) {
                renderEmptyState();
                postCountBadge.textContent = '0';
                return;
            }

            postCountBadge.textContent = posts.length;
            posts.forEach(post => insertCard(post, false));

        } catch (error) {
            console.error('Error fetching posts:', error);
            cardsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle empty-icon" style="color: #ef4444;"></i>
                    <h3>Failed to load posts</h3>
                    <p>Could not connect to the database. Try refreshing the page.</p>
                </div>
            `;
        }
    }

    function insertCard(post, animateAtTop = false) {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.dataset.id = post.id;
        card.style.setProperty('--card-hue', post.hue);

        // Generate dynamic avatar initials (up to 2 letters)
        const initials = post.title
            .split(' ')
            .slice(0, 2)
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase() || '?';

        const relativeTime = formatRelativeTime(post.created_at);

        card.innerHTML = `
            <div class="card-header-vibe">
                <div class="avatar-vibe" title="${post.title}">${initials}</div>
                <div class="meta-vibe">
                    <span class="card-title">${escapeHTML(post.title)}</span>
                    <span class="card-time" title="${post.created_at}">${relativeTime}</span>
                </div>
            </div>
            <div class="card-body-vibe">${escapeHTML(post.message)}</div>
            <div class="card-actions-vibe">
                <button class="action-btn like-btn ${post.likes > 0 ? 'liked' : ''}" aria-label="Like post">
                    <i class="${post.likes > 0 ? 'fas' : 'far'} fa-heart"></i>
                    <span class="like-count">${post.likes}</span>
                </button>
                <button class="action-btn delete-btn" aria-label="Delete post">
                    <i class="far fa-trash-alt"></i>
                    <span>Delete</span>
                </button>
            </div>
        `;

        if (animateAtTop) {
            cardsGrid.insertBefore(card, cardsGrid.firstChild);
            // Smoothly scroll new post into view
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            cardsGrid.appendChild(card);
        }
    }

    function renderEmptyState() {
        cardsGrid.innerHTML = `
            <div class="empty-state">
                <i class="far fa-comments empty-icon"></i>
                <h3>No vibes shared yet</h3>
                <p>Be the first to leave a mark! Write something in the form above.</p>
            </div>
        `;
    }

    function checkEmptyState() {
        if (cardsGrid.children.length === 0) {
            renderEmptyState();
        }
    }

    function updateBadgeCount(delta) {
        let currentCount = parseInt(postCountBadge.textContent, 10) || 0;
        currentCount += delta;
        postCountBadge.textContent = Math.max(0, currentCount);
    }

    function setupCharacterCounter(inputEl, counterEl, maxLen) {
        const updateCounter = () => {
            const len = inputEl.value.length;
            counterEl.textContent = `${len}/${maxLen}`;
            
            // Visual indicators for approaching limits
            if (len >= maxLen) {
                counterEl.className = 'char-counter error';
            } else if (len >= maxLen * 0.8) {
                counterEl.className = 'char-counter warning';
            } else {
                counterEl.className = 'char-counter';
            }
        };

        inputEl.addEventListener('input', updateCounter);
        // Initial setup
        updateCounter();
    }

    function resetCounters() {
        titleCounter.textContent = `0/${MAX_TITLE_LEN}`;
        titleCounter.className = 'char-counter';
        messageCounter.textContent = `0/${MAX_MSG_LEN}`;
        messageCounter.className = 'char-counter';
    }

    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtnText.style.opacity = '0';
            const spinner = document.createElement('div');
            spinner.className = 'spinner-vibe';
            spinner.id = 'submit-spinner';
            submitBtn.appendChild(spinner);
        } else {
            submitBtn.disabled = false;
            const spinner = document.getElementById('submit-spinner');
            if (spinner) spinner.remove();
            submitBtnText.style.opacity = '1';
        }
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span>${message}</span>`;
        
        toastContainer.appendChild(toast);

        // Auto remove toast after 4 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Relative Time Formatter
    function formatRelativeTime(dateString) {
        // SQLite timestamps are UTC (created_at DEFAULT CURRENT_TIMESTAMP)
        // Parse date correctly
        const utcDateStr = dateString.replace(' ', 'T') + 'Z';
        const date = new Date(utcDateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHr / 24);

        if (diffSec < 10) return 'Just now';
        if (diffSec < 60) return `${diffSec}s ago`;
        if (diffMin < 60) return `${diffMin}m ago`;
        if (diffHr < 24) return `${diffHr}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;

        // Default calendar format
        return date.toLocaleDateString(undefined, { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    // Escape HTML to prevent XSS injection
    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
