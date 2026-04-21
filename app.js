document.addEventListener('DOMContentLoaded', function() {
    const tagInputWrapper = document.getElementById('tagInputWrapper');
    const tagInput = document.getElementById('tagInput');
    const tags = [];

    tagInputWrapper.addEventListener('click', function(e) {
        if (e.target !== tagInput) {
            tagInput.focus();
        }
    });

    tagInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tagText = tagInput.value.trim();
            
            if (tagText && !tags.includes(tagText)) {
                addTag(tagText);
                tagInput.value = '';
            } else if (tagText && tags.includes(tagText)) {
                tagInput.value = '';
            }
        }
    });

    function addTag(text) {
        tags.push(text);
        
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.innerHTML = `
            <span class="tag-text">${escapeHtml(text)}</span>
            <span class="tag-remove" data-tag="${escapeHtml(text)}">×</span>
        `;
        
        tagInputWrapper.insertBefore(tagElement, tagInput);
        
        const removeButton = tagElement.querySelector('.tag-remove');
        removeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            removeTag(text, tagElement);
        });
    }

    function removeTag(text, tagElement) {
        const index = tags.indexOf(text);
        if (index > -1) {
            tags.splice(index, 1);
        }
        
        tagElement.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            tagElement.remove();
        }, 300);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});

const style = document.createElement('style');
style.textContent = `
@keyframes fadeOut {
    from {
        opacity: 1;
        transform: scale(1);
    }
    to {
        opacity: 0;
        transform: scale(0.8);
    }
}
`;
document.head.appendChild(style);
