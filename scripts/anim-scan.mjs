import fs from 'fs';

const html = fs.readFileSync(process.env.TEMP + '/kk-home-anim.html', 'utf8');
const links = [...html.matchAll(/href="(https:[^"]+\.css)"/g)].map((m) => m[1]);
console.log('STYLES');
console.log([...new Set(links)].join('\n'));

const classes = [...html.matchAll(/class="([^"]*animatable[^"]*)"/g)].map((m) => m[1]);
const uniq = [...new Set(classes)];
console.log('\nANIM CLASSES', uniq.length);
uniq.slice(0, 30).forEach((c) => console.log(c));

const types = [...html.matchAll(/data-animation-[a-z-]+="[^"]*"/g)].map((m) => m[0]);
console.log('\nDATA', [...new Set(types)].join('\n'));
