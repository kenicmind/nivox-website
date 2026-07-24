const fs = require('fs');
const path = require('path');

const outputDir = path.resolve(__dirname, '../public/resources');
const guides = {
  'full-stack-roadmap.pdf': [
    'NIVOX STUDENT TUTORIAL',
    'Full-Stack Web Development Roadmap',
    '',
    'Start here',
    '1. Learn HTML, CSS, and JavaScript fundamentals.',
    '2. Build small React interfaces and practise reusable components.',
    '3. Add APIs with Node.js and validate every request.',
    '4. Store data safely with Firestore and security rules.',
    '5. Deploy, monitor, and document your project.',
    '',
    'Practice challenge',
    'Build a student resource page with search, filters, and a responsive layout.',
    '',
    'NIVOX tip: use the hub computers to commit your work to Git regularly.',
  ],
  'design-systems-guide.pdf': [
    'NIVOX STUDENT TUTORIAL',
    'UI/UX Design Systems and Micro-Interactions',
    '',
    'A practical workflow',
    '1. Define a small colour, spacing, and typography system.',
    '2. Design mobile-first, then expand for larger screens.',
    '3. Use components so buttons and forms behave consistently.',
    '4. Add motion to explain change, not to distract.',
    '5. Test keyboard focus, contrast, and readable labels.',
    '',
    'Practice challenge',
    'Create three states for one card: loading, empty, and success.',
    '',
    'NIVOX tip: a good design system makes the next screen faster to build.',
  ],
  'creator-studio-manual.pdf': [
    'NIVOX STUDENT TUTORIAL',
    'Creator Studio Equipment Manual',
    '',
    'Before recording',
    '1. Reserve the correct studio pod and arrive early.',
    '2. Check battery, storage, microphone, and lighting.',
    '3. Record a ten-second test and listen for background noise.',
    '4. Keep cables taped down and leave the setup safer than you found it.',
    '5. Export a backup before clearing any device.',
    '',
    'Practice challenge',
    'Record a 30-second introduction with one clear idea and a strong closing.',
    '',
    'NIVOX tip: ask the studio team before changing unfamiliar equipment settings.',
  ],
  'ai-data-science-series.pdf': [
    'NIVOX STUDENT TUTORIAL',
    'AI and Data Science Learning Path',
    '',
    'A safe learning sequence',
    '1. Learn Python, data types, and basic statistics.',
    '2. Clean and visualise a small dataset.',
    '3. Understand training, validation, and test data.',
    '4. Measure accuracy and investigate bias or missing data.',
    '5. Explain the result in plain language before sharing it.',
    '',
    'Practice challenge',
    'Choose a public dataset and write three questions before writing a model.',
    '',
    'NIVOX tip: a simple, explainable baseline is better than an impressive mystery model.',
  ],
  'pitch-deck-toolkit.pdf': [
    'NIVOX STUDENT TUTORIAL',
    'Startup Pitch Deck Toolkit',
    '',
    'The ten-slide story',
    '1. Problem: who is struggling and why?',
    '2. Solution: what changes for that person?',
    '3. Evidence: what have you tested?',
    '4. Market: who needs this and how will you reach them?',
    '5. Business model: how can the project sustain itself?',
    '6. Team and next step: why now, and what support do you need?',
    '',
    'Practice challenge',
    'Explain your idea in one sentence, then test that sentence with a student.',
    '',
    'NIVOX tip: clarity beats crowded slides. One idea per slide.',
  ],
};

const escapePdf = (value) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

function makePdf(lines) {
  const content = ['BT', '/F1 18 Tf', '54 730 Td'];
  lines.forEach((line, index) => {
    if (index) content.push('0 -24 Td');
    content.push(`/F1 ${index === 0 ? 10 : index === 1 ? 16 : 11} Tf`);
    content.push(`(${escapePdf(line)}) Tj`);
  });
  content.push('ET');
  const stream = content.join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(stream) + 1} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets[index + 1] = Buffer.byteLength(pdf);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, '0')} 00000 n \n`; });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, 'binary');
}

fs.mkdirSync(outputDir, { recursive: true });
Object.entries(guides).forEach(([filename, lines]) => fs.writeFileSync(path.join(outputDir, filename), makePdf(lines)));
