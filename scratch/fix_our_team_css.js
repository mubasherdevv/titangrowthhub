const fs = require('fs');
let content = fs.readFileSync('app/(public)/our-team/page.tsx', 'utf8');

// 1. Remove the accidentally inserted CSS near footer
const badInsert = `@media (max-width: 767px) {
    .custom-team-cards-container {
        flex-wrap: nowrap;
        overflow-x: auto;
        justify-content: flex-start;
        padding-bottom: 20px;
        gap: 20px;
        -webkit-overflow-scrolling: touch;
        scroll-snap-type: x mandatory;
        /* Hide scrollbar */
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .custom-team-cards-container::-webkit-scrollbar {
        display: none;
    }
    .custom-team-card { 
        width: 85%; 
        flex: 0 0 auto;
        margin-bottom: 0;
        scroll-snap-align: center;
    }
    .custom-team-content-box { margin-top: -20px; }
}`;

content = content.replace(badInsert, '');

// 2. Fix the correct CSS block inside the custom-team-cards-container style
const oldMedia = `@media (max-width: 767px) {
    .custom-team-card { width: 100%; margin-bottom: 20px; }
    .custom-team-content-box { margin-top: -20px; }
}`;
content = content.replace(oldMedia, badInsert);

fs.writeFileSync('app/(public)/our-team/page.tsx', content);
console.log('Fixed our-team CSS.');
