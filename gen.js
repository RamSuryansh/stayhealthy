const fs = require('fs');

const generateChakras = () => {
    let output = '';

    // Helper functions
    const degToRad = (deg) => (deg * Math.PI) / 180;

    const translate = (x, y, content, glow, groupClass) => `
            <!-- ======= NEW CHAKRA ======= -->
            <g class="chakra-group" transform="translate(${x - 50}, ${y - 50})">
              <g class="${groupClass}" style="transform-origin: 50px 50px;">
${content}
              </g>
            </g>`;

    // 1. Crown Chakra
    let crownCircles = '';
    for (let i = 0; i < 12; i++) {
        const cx = 50 + 25 * Math.cos(degToRad(i * 30));
        const cy = 50 + 25 * Math.sin(degToRad(i * 30));
        crownCircles += `                <circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="3" fill="white"/>\n`;
    }
    const crownContent = `
                <circle cx="50" cy="50" r="48" fill="none" stroke="#8B7BA8" stroke-width="2"/>
                <circle cx="50" cy="50" r="40" fill="#8B7BA8"/>
                <circle cx="50" cy="50" r="35" fill="white" opacity="0.3"/>
${crownCircles}
                <circle cx="50" cy="50" r="15" fill="white"/>
                <circle cx="50" cy="50" r="8" fill="#8B7BA8"/>`;
    
    // 2. Third Eye
    let thirdEyeGroups = '';
    for (let i = 0; i < 6; i++) {
        thirdEyeGroups += `                <g transform="rotate(${i * 60} 50 50)">
                  <path d="M 50 25 L 55 35 L 45 35 Z" fill="white"/>
                </g>\n`;
    }
    const thirdEyeContent = `
                <circle cx="50" cy="50" r="48" fill="none" stroke="#4A5F8C" stroke-width="2"/>
                <circle cx="50" cy="50" r="40" fill="#4A5F8C"/>
                <circle cx="50" cy="50" r="35" fill="white" opacity="0.3"/>
${thirdEyeGroups}
                <circle cx="50" cy="50" r="15" fill="white"/>
                <text x="50" y="57" text-anchor="middle" fill="#4A5F8C" font-size="16" font-family="serif">ॐ</text>`;
    
    // 3. Throat
    let throatCircles = '';
    for (let i = 0; i < 16; i++) {
        const cx = 50 + 28 * Math.cos(degToRad(i * 22.5));
        const cy = 50 + 28 * Math.sin(degToRad(i * 22.5));
        throatCircles += `                <circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="2.5" fill="white"/>\n`;
    }
    const throatContent = `
                <circle cx="50" cy="50" r="48" fill="none" stroke="#3FBFBF" stroke-width="2"/>
                <circle cx="50" cy="50" r="40" fill="#3FBFBF"/>
                <circle cx="50" cy="50" r="35" fill="white" opacity="0.3"/>
${throatCircles}
                <circle cx="50" cy="50" r="18" fill="white"/>
                <circle cx="50" cy="50" r="12" fill="#3FBFBF"/>`;

    // 4. Heart
    const heartContent = `
                <circle cx="50" cy="50" r="48" fill="none" stroke="#6BB86B" stroke-width="2"/>
                <circle cx="50" cy="50" r="40" fill="#6BB86B"/>
                <circle cx="50" cy="50" r="35" fill="white" opacity="0.3"/>
                <polygon points="50,30 60,45 75,45 63,55 68,70 50,60 32,70 37,55 25,45 40,45" fill="white"/>
                <polygon points="50,40 57,50 65,50 58,56 61,65 50,58 39,65 42,56 35,50 43,50" fill="#6BB86B"/>`;

    // 5. Solar
    let solarGroups = '';
    for (let i = 0; i < 10; i++) {
        solarGroups += `                <g transform="rotate(${i * 36} 50 50)">
                  <path d="M 50 22 L 53 32 L 47 32 Z" fill="white"/>
                </g>\n`;
    }
    const solarContent = `
                <circle cx="50" cy="50" r="48" fill="none" stroke="#F4D442" stroke-width="2"/>
                <circle cx="50" cy="50" r="40" fill="#F4D442"/>
                <circle cx="50" cy="50" r="35" fill="white" opacity="0.3"/>
${solarGroups}
                <circle cx="50" cy="50" r="18" fill="white"/>
                <polygon points="50,38 53,47 62,47 55,52 58,61 50,55 42,61 45,52 38,47 47,47" fill="#F4D442"/>`;

    // 6. Sacral
    let sacralGroups = '';
    for (let i = 0; i < 6; i++) {
        sacralGroups += `                <g transform="rotate(${i * 60} 50 50)">
                  <ellipse cx="50" cy="26" rx="6" ry="8" fill="white"/>
                </g>\n`;
    }
    const sacralContent = `
                <circle cx="50" cy="50" r="48" fill="none" stroke="#F4A742" stroke-width="2"/>
                <circle cx="50" cy="50" r="40" fill="#F4A742"/>
                <circle cx="50" cy="50" r="35" fill="white" opacity="0.3"/>
${sacralGroups}
                <circle cx="50" cy="50" r="15" fill="white"/>
                <circle cx="50" cy="50" r="10" fill="#F4A742"/>`;

    // 7. Root
    const rootContent = `
                <circle cx="50" cy="50" r="48" fill="none" stroke="#E85D5D" stroke-width="2"/>
                <circle cx="50" cy="50" r="40" fill="#E85D5D"/>
                <circle cx="50" cy="50" r="35" fill="white" opacity="0.3"/>
                <g transform="rotate(0 50 50)">
                  <polygon points="50,28 60,40 70,35 60,50 70,65 60,60 50,72 40,60 30,65 40,50 30,35 40,40" fill="white"/>
                </g>
                <rect x="42" y="42" width="16" height="16" fill="white"/>
                <rect x="45" y="45" width="10" height="10" fill="#E85D5D"/>`;

    // Coordinates:
    // Root: 700
    // Sacral: 610
    // Solar: 510
    // Heart: 405
    // Throat: 325
    // Third-eye: 268
    // Crown: 210

    output += `
            <!-- ======= NEW CHAKRA DESIGNS ======= -->
`;

    output += translate(450, 210, crownContent, '#8B7BA8', 'chakra-spin-fast');
    output += translate(450, 268, thirdEyeContent, '#4A5F8C', 'chakra-spin-medium-rev');
    output += translate(450, 325, throatContent, '#3FBFBF', 'chakra-spin-slow');
    output += translate(450, 405, heartContent, '#6BB86B', 'chakra-spin-medium-rev');
    output += translate(450, 510, solarContent, '#F4D442', 'chakra-spin-fast');
    output += translate(450, 610, sacralContent, '#F4A742', 'chakra-spin-medium-rev');
    output += translate(450, 700, rootContent, '#E85D5D', 'chakra-spin-slow');

    fs.writeFileSync('new_chakras.html', output);
};

generateChakras();
