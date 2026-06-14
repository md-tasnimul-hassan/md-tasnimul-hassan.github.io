const fs = require('fs');

const files = fs.readdirSync('src/pages').filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const path = `src/pages/${file}`;
  let content = fs.readFileSync(path, 'utf8');
  
  // Replace m.div with div everywhere first
  content = content.replace(/<m\.div/g, '<div');
  content = content.replace(/<\/m\.div>/g, '</div>');
  
  // Remove variants, initial, whileInView, viewport
  content = content.replace(/variants={item}/g, '');
  content = content.replace(/variants={container}/g, '');
  content = content.replace(/initial="hidden"/g, '');
  content = content.replace(/whileInView="show"/g, '');
  content = content.replace(/viewport={{ once: true }}/g, '');
  
  // Now add back the root transition wrapping around the main outermost div
  // The outer div usually starts right after the return (.
  
  content = content.replace(
    /return \(\s*<div(.*?)>/,
    `return (\n    <m.div\n      initial={{ opacity: 0 }}\n      animate={{ opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}\n      exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}\n      className="w-full"\n    >\n      <div$1>`
  );
  
  // Add closing m.div before the last ); 
  content = content.replace(/<\/div>\s*\);\s*\}/, '</div>\n    </m.div>\n  );\n}');

  // Make sure m is imported
  if (!content.includes('import { m }')) {
    content = 'import { m } from "motion/react";\n' + content;
  }
  
  fs.writeFileSync(path, content, 'utf8');
}
console.log('done');
