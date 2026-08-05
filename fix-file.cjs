const fs = require('fs');
const path = 'C:\\Users\\Asus Tuf\\Desktop\\arena-wedd\\src\\components\\AdminEditModal.tsx';
let content = fs.readFileSync(path, 'utf8');
// Remove any backtick-n sequences
content = content.replace(/`n/g, '\n');
// Ensure the structure is correct: find the last </motion.div> and ensure proper closing after
const pattern = /<\/motion\.div>\s*`n\s*<\/div>`n\s*<\/AnimatePresence>/;
if (pattern.test(content)) {
  content = content.replace(pattern, '</motion.div>\n      </div>\n      </AnimatePresence>');
}
fs.writeFileSync(path, content);
console.log('File fixed');
