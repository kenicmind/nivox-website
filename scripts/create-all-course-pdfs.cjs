const fs = require('fs');
const path = require('path');

const ids = [
  ['graphic-design', 'Graphic Design Foundations'], ['canva-design', 'Canva Design for Beginners'],
  ['adobe-photoshop', 'Adobe Photoshop Essentials'], ['adobe-illustrator', 'Adobe Illustrator Essentials'],
  ['coreldraw', 'CorelDRAW Production Guide'], ['branding-identity', 'Branding and Identity Design'],
  ['ui-ux-design', 'UI/UX Design Systems'], ['html', 'HTML Web Foundations'],
  ['css', 'CSS Layout and Responsive Design'], ['javascript', 'JavaScript Programming'],
  ['react', 'React Application Development'], ['firebase', 'Firebase Application Backend'],
  ['mobile-app-development', 'Mobile App Development Path'], ['ai-tools', 'AI Tools for Productive Work'],
  ['chatgpt', 'ChatGPT for Students and Creators'], ['gemini-ai', 'Gemini AI Workflow Guide'],
  ['git-github', 'Git and GitHub Collaboration'], ['digital-marketing', 'Digital Marketing Essentials'],
  ['social-media-marketing', 'Social Media Marketing'], ['content-creation', 'Content Creation Playbook'],
  ['photography', 'Photography Fundamentals'], ['videography', 'Videography Fundamentals'],
  ['video-editing', 'Video Editing Workflow'], ['motion-graphics', 'Motion Graphics Foundations'],
  ['entrepreneurship', 'Entrepreneurship Starter Manual'], ['freelancing', 'Freelancing and Client Work'],
  ['personal-branding', 'Personal Branding for Students'],
];

const escape = (value) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
const makePdf = (title) => {
  const lines = [
    'NIVOX | SHAPING TOMORROW, TODAY.',
    title,
    'Professional Learning Manual | NIVOX Learning Library',
    '',
    'COURSE DESCRIPTION',
    `This practical ${title} guide takes a student from first principles to a portfolio-ready mini project.`,
    '',
    'LEARNING OBJECTIVES',
    '• Explain the core vocabulary and workflow.',
    '• Follow a step-by-step process with confidence.',
    '• Apply the skill to a useful real-world outcome.',
    '• Review work using quality, accessibility, and ethics checklists.',
    '',
    'TABLE OF CONTENTS',
    '1. Foundations   2. Tools and workflow   3. Guided practice',
    '4. Exercises and assignment   5. Mini project   6. Career path',
    '',
    'LESSON 1 — FOUNDATIONS',
    `Start with the problem this discipline solves. In ${title}, define the audience, desired outcome, constraints, and a small first experiment.`,
    'Write down what success looks like before opening a tool. Use a folder with source files, exports, notes, and a README.',
    '',
    'LESSON 2 — VOCABULARY AND TOOLS',
    `Learn the terms used by practitioners of ${title}. Create a glossary in your notes and install or open one recommended tool. Do not collect tools without practising with them.`,
    'Save an original source file and an exported copy. Record the file type, size, dimensions, and the reason you chose each setting.',
    '',
    'LESSON 3 — A REPEATABLE PROCESS',
    'Brief → research → sketch → first version → feedback → revision → quality check → delivery. This sequence protects you from polishing the wrong idea.',
    'Set a 25-minute timer and produce three rough options before selecting one. Compare them against the brief, not personal preference.',
    '',
    'LESSON 4 — STEP-BY-STEP PRACTICE',
    '1. Write the user or client goal. 2. Collect two useful references. 3. Break the outcome into small parts.',
    '4. Build the simplest working version. 5. Test it with a real person. 6. Revise one issue at a time.',
    '7. Export using the required format. 8. Document the result and what you would improve next.',
    '',
    'LESSON 5 — REAL-WORLD EXAMPLE',
    'Imagine a student club needs a launch asset with a deadline, a small budget, and mobile-first audiences. Ask clarifying questions, propose a version-one scope, share a checkpoint early, and request specific feedback.',
    'A professional result is not just attractive; it is usable, on time, accessible, easy to update, and connected to an outcome.',
    '',
    'LESSON 6 — QUALITY AND RESPONSIBILITY',
    'Check accuracy, readability, permissions, privacy, accessibility, and whether the output works in its actual context. Credit sources and never present generated or copied work as your own.',
    'Ask: can a beginner understand this? Can a person with a different device use it? Can the next teammate continue the work?',
    '',
    'LESSON 2 — STEP-BY-STEP WORKFLOW',
    '1. Gather a brief and examples.  2. Sketch or outline three options.',
    '3. Build one focused version.  4. Test it with another student.',
    '5. Revise, export, and document what changed.',
    '',
    'PRACTICAL EXERCISE',
    'Create a one-page outcome for a NIVOX student club. Include a clear audience, one message, and a measurable success signal.',
    '',
    'FREQUENTLY ASKED QUESTIONS',
    'Q: What if my first version is poor? A: Treat it as a diagnostic draft; use feedback to choose the next experiment.',
    'Q: Which tool should I learn first? A: Pick the tool that matches a real project and learn only the features that project needs.',
    'Q: How do I know I am improving? A: Keep dated versions and compare decisions, not only the final appearance.',
    '',
    'ASSIGNMENT AND MINI PROJECT',
    'Produce a small portfolio case study: brief, process snapshots, final result, reflection, and next iteration. Ask for feedback from two people.',
    '',
    'CHALLENGE TASK',
    'Repeat the project under a new constraint: less time, a smaller screen, a different audience, or a stricter file size.',
    '',
    'BEST PRACTICES',
    '• Keep source files organised. • Name versions clearly. • Back up work.',
    '• Credit references. • Protect personal data. • Explain decisions, not just outputs.',
    '',
    'COMMON MISTAKES',
    'Starting without a brief; copying examples without understanding; skipping testing; exporting the wrong format; and presenting work without context.',
    '',
    'PROFESSIONAL CHECKLIST',
    '□ I can explain the audience and outcome.  □ My files are named and backed up.',
    '□ I tested the result with another person.  □ I checked accessibility and permissions.',
    '□ I can show the process, the feedback, and the final result.',
    '',
    'CAREER OPPORTUNITIES',
    'Build three strong case studies, share process, volunteer for a real student project, and look for internships, junior roles, freelance briefs, or peer tutoring.',
    '',
    'USEFUL FREE RESOURCES',
    'developer.mozilla.org  |  web.dev  |  freecodecamp.org  |  uxdesign.cc',
    'YouTube Learning, Figma Community, Google Digital Garage, and NIVOX mentors.',
    '',
    'SUMMARY AND NEXT PATH',
    'You now have a repeatable learning loop: understand, practise, test, revise, and publish. Next, combine this skill with Git and one complementary NIVOX course.',
  ];
  const drawing = ['BT', '54 748 Td'];
  lines.forEach((line, i) => {
    if (i > 0 && i % 34 === 0) drawing.push('ET', 'showpage', 'BT', '54 748 Td');
    drawing.push(`/F1 ${i === 0 ? 10 : i === 1 ? 19 : 10} Tf`, `(${escape(line)}) Tj`, '0 -18 Td');
  });
  drawing.push('ET');
  const stream = drawing.join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${Buffer.byteLength(stream) + 1} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = '%PDF-1.4\n'; const offsets = [0];
  objects.forEach((object, i) => { offsets[i + 1] = Buffer.byteLength(pdf); pdf += `${i + 1} 0 obj\n${object}\nendobj\n`; });
  const start = Buffer.byteLength(pdf);
  pdf += `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map((o) => `${String(o).padStart(10, '0')} 00000 n `).join('\n')}\ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${start}\n%%EOF\n`;
  return Buffer.from(pdf, 'binary');
};

const dir = path.resolve(__dirname, '../public/resources');
ids.forEach(([id, title]) => fs.writeFileSync(path.join(dir, `${id}.pdf`), makePdf(title)));
