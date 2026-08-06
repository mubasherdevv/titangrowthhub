const fs = require('fs');
let content = fs.readFileSync('app/(public)/page.tsx', 'utf8');

const startIdx = content.indexOf('<div class="as-team-1-wrap">');
if (startIdx === -1) {
    console.log('Could not find start index.');
    process.exit(1);
}

// Find matching closing div for `<div class="as-team-1-wrap">`
let divCount = 0;
let endIndex = -1;
let tagRegex = /<\/?div[^>]*>/g;
tagRegex.lastIndex = startIdx;

let match;
while ((match = tagRegex.exec(content)) !== null) {
    if (match[0].startsWith('</div')) {
        divCount--;
    } else if (match[0].startsWith('<div')) {
        divCount++;
    }
    
    if (divCount === 0) {
        endIndex = match.index + match[0].length;
        break;
    }
}

if (endIndex === -1) {
    console.log('Could not find matching closing div.');
    process.exit(1);
}

const newHTML = `<div class="as-team-1-wrap custom-team-cards-container">
<style>
.custom-team-cards-container {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 40px;
}
.custom-team-card {
    width: calc(25% - 23px);
    background: transparent;
    display: flex;
    flex-direction: column;
}
.custom-team-img-wrap {
    border-radius: 16px;
    overflow: hidden;
    height: 320px;
    position: relative;
    z-index: 1;
}
.custom-team-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.custom-team-content-box {
    background: #fff;
    border-radius: 16px;
    padding: 40px 20px 20px;
    text-align: center;
    position: relative;
    z-index: 2;
    margin-top: -30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.custom-team-icon-circle {
    width: 44px;
    height: 44px;
    background: #ff5e14;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -22px;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid #fff;
    font-size: 16px;
}
.custom-team-name {
    font-size: 18px;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 5px;
    font-family: 'Inter', sans-serif;
}
.custom-team-role {
    font-size: 13px;
    font-weight: 600;
    color: #ff5e14;
    margin-bottom: 12px;
}
.custom-team-desc {
    font-size: 13px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 0;
}
@media (max-width: 1199px) {
    .custom-team-card { width: calc(50% - 15px); }
}
@media (max-width: 767px) {
    .custom-team-card { width: 100%; margin-bottom: 20px; }
    .custom-team-content-box { margin-top: -20px; }
}
</style>

<!-- Team Member 1 -->
<div class="custom-team-card">
    <div class="custom-team-img-wrap">
        <img loading="lazy" src="/wp-content/uploads/2025/10/t1-img-1.webp" alt="Ayesha Khan">
    </div>
    <div class="custom-team-content-box">
        <div class="custom-team-icon-circle">
            <i class="fa-solid fa-chart-line"></i>
        </div>
        <h5 class="custom-team-name">Ayesha Khan</h5>
        <p class="custom-team-role">SEO Specialist</p>
        <p class="custom-team-desc">SEO expert focused on ranking websites and driving organic traffic.</p>
    </div>
</div>

<!-- Team Member 2 -->
<div class="custom-team-card">
    <div class="custom-team-img-wrap">
        <img loading="lazy" src="/wp-content/uploads/2025/10/t1-img-2.webp" alt="Usman Ali">
    </div>
    <div class="custom-team-content-box">
        <div class="custom-team-icon-circle">
            <i class="fa-solid fa-bullhorn"></i>
        </div>
        <h5 class="custom-team-name">Usman Ali</h5>
        <p class="custom-team-role">Performance Marketer</p>
        <p class="custom-team-desc">Paid ads strategist who turns clicks into customers and growth.</p>
    </div>
</div>

<!-- Team Member 3 -->
<div class="custom-team-card">
    <div class="custom-team-img-wrap">
        <img loading="lazy" src="/wp-content/uploads/2025/10/t1-img-3.webp" alt="Mariam Fatima">
    </div>
    <div class="custom-team-content-box">
        <div class="custom-team-icon-circle">
            <i class="fa-solid fa-pen-nib"></i>
        </div>
        <h5 class="custom-team-name">Mariam Fatima</h5>
        <p class="custom-team-role">Content Strategist</p>
        <p class="custom-team-desc">Creates engaging content that builds brand authority and trust.</p>
    </div>
</div>

<!-- Team Member 4 -->
<div class="custom-team-card">
    <div class="custom-team-img-wrap">
        <img loading="lazy" src="/wp-content/uploads/2025/10/t1-img-4.webp" alt="Bilal Ahmed">
    </div>
    <div class="custom-team-content-box">
        <div class="custom-team-icon-circle">
            <i class="fa-solid fa-desktop"></i>
        </div>
        <h5 class="custom-team-name">Bilal Ahmed</h5>
        <p class="custom-team-role">Web Designer</p>
        <p class="custom-team-desc">Designs modern, user-friendly websites that convert visitors.</p>
    </div>
</div>
</div>
`;

const newContent = content.substring(0, startIdx) + newHTML + content.substring(endIndex);
fs.writeFileSync('app/(public)/page.tsx', newContent);
console.log('Successfully replaced Team section!');
