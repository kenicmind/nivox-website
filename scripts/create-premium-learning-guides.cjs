const fs = require('fs');
const path = require('path');

const courses = {
  'graphic-design': {
    title: 'Graphic Design: Visual Communication Foundations',
    overview: 'A studio-based introduction to turning ideas into clear visual messages for print and digital audiences.',
    objectives: 'Apply hierarchy, typography, colour, composition, identity, production, critique, and portfolio presentation.',
    lessons: [
      ['Visual Communication', 'Separate decoration from communication. Translate audience, message, tone, and action into a written creative brief.', 'Rewrite a confusing event flyer brief into one audience, one promise, and one call to action.'],
      ['Design Principles', 'Use contrast, repetition, alignment, proximity, balance, scale, and whitespace to control attention.', 'Create three black-and-white poster thumbnails using only rectangles and type.'],
      ['Typography', 'Choose type by purpose. Build hierarchy with size, weight, spacing, line length, and alignment before adding effects.', 'Typeset one announcement for a notice board and a phone screen.'],
      ['Colour Theory', 'Work with hue, value, saturation, harmony, contrast, and cultural context. Test legibility, not personal preference.', 'Build an accessible five-colour palette and document every role.'],
      ['Layout and Composition', 'Use grids, focal points, rhythm, margins, and visual flow. Begin with content priority, then place elements.', 'Redesign a crowded flyer on a modular grid.'],
      ['Brand Identity', 'Connect positioning and personality to marks, typography, colour, imagery, voice, and usage rules.', 'Create a one-page identity direction for a student venture.'],
      ['Logo Design', 'Research the category, sketch widely, reduce ideas, test at tiny sizes, refine vectors, and prepare lockups.', 'Sketch twenty symbols before opening design software.'],
      ['Print and Digital Production', 'Understand RGB, CMYK, bleed, safe area, resolution, export formats, and handoff checks.', 'Prepare one A4 print PDF and one optimised social image.'],
      ['Critique and Revision', 'Ask whether the design meets the brief. Request specific feedback and change one variable at a time.', 'Run a peer critique using clarity, hierarchy, consistency, and accessibility.'],
      ['Portfolio Building', 'Present the problem, constraints, process, alternatives, feedback, result, and reflection.', 'Write a six-frame case study for the strongest project.'],
    ],
    project: 'Create a complete identity and launch campaign for a student-led service: brief, moodboard, logo system, palette, typography, flyer, social post, and portfolio case study.',
    tools: 'Canva, Figma, Adobe Illustrator, Adobe Photoshop, CorelDRAW, Google Fonts, Coolors, and Contrast Checker.',
    careers: 'Graphic designer, brand designer, production artist, social designer, art director, packaging designer, and freelance creative.',
  },
  html: {
    title: 'HTML: Building Accessible Web Pages',
    overview: 'A practical course in structuring meaningful, standards-based web content that works across devices and assistive technology.',
    objectives: 'Write valid document structure, semantic content, links, media, tables, forms, metadata, and accessible page patterns.',
    lessons: [
      ['The HTML Document', 'Use doctype, html language, head metadata, title, and body. HTML describes meaning; CSS controls presentation.', 'Create a valid page and inspect its document tree.'],
      ['Text and Content Elements', 'Choose headings by outline, paragraphs for prose, and lists for real sequences or groups.', 'Convert an unstructured article into a logical heading hierarchy.'],
      ['Links and Navigation', 'Write descriptive link text, use correct relative paths, and mark the current page in navigation.', 'Build navigation connecting three local pages.'],
      ['Images and Media', 'Use meaningful alternative text, dimensions, captions, responsive sources, and appropriate formats.', 'Add an informative image and a decorative image correctly.'],
      ['Semantic Page Structure', 'Use header, nav, main, article, section, aside, and footer according to content purpose.', 'Replace generic div containers in a news page.'],
      ['Tables', 'Reserve tables for relational data. Provide captions, headers, and correct scope.', 'Mark up a class timetable that screen readers can understand.'],
      ['Forms', 'Pair every control with a label; select useful input types; group related choices; explain errors.', 'Build a student event registration form.'],
      ['Accessibility', 'Support keyboard navigation, meaningful names, logical order, language, and clear error recovery.', 'Audit a page using keyboard-only navigation.'],
      ['Metadata and Sharing', 'Use useful titles, descriptions, canonical information, favicons, and social preview metadata.', 'Prepare metadata for a portfolio homepage.'],
      ['Complete Website', 'Plan shared navigation, consistent structure, accessible content, validation, and deployment.', 'Build and validate a three-page student portfolio.'],
    ],
    project: 'Build an accessible three-page NIVOX student portfolio with homepage, projects table, contact form, semantic landmarks, meaningful media, and validated HTML.',
    tools: 'Visual Studio Code, browser developer tools, W3C Validator, MDN, Lighthouse, and GitHub Pages.',
    careers: 'Front-end developer, web content specialist, accessibility tester, email developer, CMS editor, and technical writer.',
  },
  photography: {
    title: 'Photography: Exposure, Light, and Story',
    overview: 'A field guide to controlling the camera, shaping light, composing intentionally, and editing a coherent visual story.',
    objectives: 'Control exposure and focus, read light, compose images, direct simple shoots, edit consistently, and deliver responsibly.',
    lessons: [
      ['Camera Types and Lenses', 'Compare phone, compact, mirrorless, and DSLR systems. Focal length changes framing, perspective choices, and working distance.', 'Photograph one subject with wide, normal, and telephoto perspectives.'],
      ['ISO', 'ISO amplifies the captured signal. Raise it only when aperture, shutter speed, and available light cannot meet the shot.', 'Photograph the same scene across the ISO range and compare noise.'],
      ['Aperture', 'Aperture affects light and depth of field. Distance, focal length, and sensor size also change background separation.', 'Create shallow and deep-focus versions of one portrait.'],
      ['Shutter Speed', 'Fast speeds freeze motion; slow speeds reveal movement. Stabilisation reduces camera shake, not subject movement.', 'Freeze a jump, then create intentional motion blur.'],
      ['Metering and Exposure', 'Read highlights, shadows, histogram, and exposure compensation. Protect important detail rather than trusting screen brightness.', 'Bracket a high-contrast scene and select the strongest exposure.'],
      ['Focus', 'Choose autofocus area, continuous or single focus, and a deliberate focus point. Confirm sharpness at useful magnification.', 'Track a walking subject through five frames.'],
      ['Lighting', 'Evaluate direction, size, distance, colour, and contrast. Shape window light with position, diffusion, and reflectors.', 'Create soft and dramatic portraits using one window.'],
      ['Composition', 'Use viewpoint, edges, layers, balance, repetition, negative space, and timing to simplify the frame.', 'Make five different compositions without moving the subject.'],
      ['Editing Workflow', 'Back up, cull, correct exposure and colour, crop intentionally, retouch lightly, and export for destination.', 'Edit a ten-image series with consistent colour.'],
      ['Visual Story and Portfolio', 'Sequence establishing, medium, detail, action, and closing images. Edit ruthlessly around one idea.', 'Create a six-image story about student life.'],
    ],
    project: 'Plan, photograph, edit, caption, and present a ten-image documentary story about a NIVOX maker, including consent and an archive of originals.',
    tools: 'Phone camera or mirrorless camera, Lightroom, Snapseed, Darktable, reflectors, tripod, grey card, and redundant storage.',
    careers: 'Portrait, event, product, documentary, editorial, sports, commercial, and social-content photography.',
  },
  react: {
    title: 'React: Building Maintainable Interfaces',
    overview: 'A project course in component thinking, predictable state, accessible interactions, routing, data, and production readiness.',
    objectives: 'Build components with JSX and props, manage state and effects, route pages, integrate Firebase, test behavior, and ship responsibly.',
    lessons: [
      ['Component Thinking', 'Break interfaces by responsibility and data flow, not visual boxes alone. Keep components focused and composable.', 'Sketch the component tree for a booking dashboard.'],
      ['JSX', 'JSX combines JavaScript expressions with declarative UI. Use semantic elements, stable keys, and clear conditional rendering.', 'Render a filtered course list from data.'],
      ['Props', 'Props are read-only inputs. Pass the smallest useful data and callbacks; avoid duplicating derived values.', 'Create a reusable CourseCard with an accessible action.'],
      ['State', 'State represents information that changes and affects rendering. Keep one source of truth and update immutably.', 'Build bookmark toggling without mutating arrays.'],
      ['Events and Forms', 'Use controlled fields when validation and submission depend on state. Label inputs and handle loading and errors.', 'Build a course-search form with clear/reset behavior.'],
      ['Effects', 'Use effects to synchronise with external systems, not to compute render data. Clean up subscriptions and cancel stale work.', 'Subscribe to authentication state and cleanly unsubscribe.'],
      ['Hooks and Reuse', 'Extract a custom hook when behavior is reused and has a clear contract. Hooks must run unconditionally.', 'Create useLocalStorage for learning progress.'],
      ['Routing', 'Model routes around user tasks, protect private pages, provide loading and not-found states, and restore scroll position.', 'Add protected course and profile routes.'],
      ['Firebase Integration', 'Authenticate users, query bounded data, represent loading/error/empty states, and rely on rules for authorization.', 'Load only the signed-in student’s bookmarks.'],
      ['Testing and Performance', 'Test behavior users observe. Profile before optimising; memoise only when measurement supports it.', 'Test course search and keyboard activation.'],
    ],
    project: 'Build a learning tracker with authentication, searchable courses, bookmarks, progress state, protected routes, Firestore rules, loading/error states, and a production build.',
    tools: 'React, Vite, React Router, Firebase, Vitest, Testing Library, ESLint, browser devtools, and GitHub.',
    careers: 'Front-end developer, React developer, UI engineer, full-stack JavaScript developer, product engineer, and freelance web developer.',
  },
  chatgpt: {
    title: 'ChatGPT and Responsible AI Workflows',
    overview: 'A practical manual for prompting, research, writing, coding, business work, verification, privacy, and responsible human oversight.',
    objectives: 'Design useful prompts, decompose tasks, verify outputs, protect sensitive data, build repeatable workflows, and disclose AI assistance appropriately.',
    lessons: [
      ['How Language Models Work', 'Models predict useful text from patterns; they do not guarantee truth, current knowledge, intent, or private expertise.', 'List tasks suited to drafting versus tasks requiring authoritative verification.'],
      ['Prompt Engineering', 'Provide goal, context, audience, constraints, source material, output format, and success criteria.', 'Turn “write about marketing” into a testable structured prompt.'],
      ['Iterative Workflows', 'Separate planning, drafting, critique, revision, and final human review instead of demanding perfection in one prompt.', 'Use a four-step loop to improve a scholarship essay outline.'],
      ['Research', 'Ask for search strategies and comparison frameworks, then verify with primary sources. Never cite invented references.', 'Build an evidence table with claim, source, date, and confidence.'],
      ['Writing and Learning', 'Use AI for questions, feedback, examples, and practice—not for replacing understanding or misrepresenting authorship.', 'Create a study quiz, answer it unaided, then review errors.'],
      ['Coding', 'Provide environment, expected behavior, minimal reproduction, and errors. Run tests and inspect security implications.', 'Ask for three debugging hypotheses before accepting a code change.'],
      ['Productivity', 'Convert recurring work into checklists and templates while keeping decisions and accountability human-owned.', 'Design a weekly planning workflow with review checkpoints.'],
      ['Business Applications', 'Use AI for customer-question synthesis, draft content, scenario analysis, and prototypes while protecting confidential data.', 'Create a human-reviewed FAQ workflow for a student venture.'],
      ['Responsible AI', 'Check bias, privacy, consent, copyright, safety, academic rules, and potential harm. Disclose material AI assistance.', 'Write a responsible-use policy for a student team.'],
      ['Evaluation', 'Define correctness, completeness, tone, safety, and evidence before judging an output. Compare against a baseline.', 'Score two outputs with a five-criterion rubric.'],
    ],
    project: 'Build and document a responsible AI assistant workflow for a student venture: prompt template, approved inputs, verification checklist, privacy rules, evaluation rubric, and three tested examples.',
    tools: 'ChatGPT, primary-source search, spreadsheets, citation managers, version history, evaluation rubrics, and organisation-approved AI tools.',
    careers: 'AI workflow specialist, product operations, prompt designer, research assistant, content strategist, automation consultant, and responsible-AI analyst.',
  },
};

const esc = (text) => String(text).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/[^\x20-\x7E]/g, '-');
const buildLines = (course) => {
  const lines = [
    'NIVOX LEARNING LIBRARY | SHAPING TOMORROW, TODAY.',
    course.title, 'Premium Student Training Manual | 2026 Edition', '',
    'COURSE OVERVIEW', course.overview, '', 'LEARNING OBJECTIVES', course.objectives, '',
    'COURSE ROADMAP', 'Foundation → guided practice → independent assignment → portfolio project → career pathway', '',
    'TABLE OF CONTENTS', ...course.lessons.map(([title], i) => `${i + 1}. ${title}`), '',
  ];
  course.lessons.forEach(([title, explanation, demonstration], i) => {
    lines.push(
      `LESSON ${i + 1} — ${title.toUpperCase()}`, explanation,
      `Practical demonstration: ${demonstration}`,
      'Best practice: make one intentional change at a time and keep evidence of the result.',
      'Common mistake: copying a finished example without understanding the decision behind it.',
      'Professional tip: explain the reason for each choice in plain language.', '',
    );
  });
  lines.push(
    'EXERCISES AND ASSIGNMENTS', 'Complete every practical demonstration. Save source files, exports, notes, and a short reflection for each lesson.',
    '', 'MINI PROJECT', course.project, '',
    'CHALLENGE PROJECT', `Repeat the project for a different audience and tighter constraint. Present both versions and defend the changes using principles from ${course.title}.`,
    '', 'FREQUENTLY ASKED QUESTIONS',
    'How fast should I progress? Practise until you can explain and repeat the process without copying.',
    'What belongs in a portfolio? Show the brief, alternatives, feedback, final result, and honest reflection.',
    'How do I get useful feedback? Ask one specific question connected to the project goal.', '',
    'INDUSTRY TOOLS', course.tools, '', 'CAREER OPPORTUNITIES', course.careers, '',
    'RECOMMENDED LEARNING', 'Websites: MDN, freeCodeCamp, Coursera audit courses, Google learning resources, and official tool documentation.',
    'Books: choose a current foundational book recommended by practitioners and practise every chapter.',
    'YouTube: prefer official channels and instructors who explain decisions, not only shortcuts.',
    'Communities: NIVOX peer groups, local meetups, GitHub, professional associations, and moderated learning communities.',
    'Certifications: use certifications to structure learning, but prioritise verified projects and practical evidence.', '',
    'SUMMARY AND NEXT STEPS', `Complete the real-world project, request mentor critique, revise it, and publish a case study. Then pair ${course.title} with Git, communication, and entrepreneurship.`,
    '', 'NIVOX MISSION NOTE', 'Use this skill to create practical value for students, communities, and young ventures. Build responsibly, share knowledge, and keep learning.',
  );
  return lines;
};

function createPdf(course) {
  const lines = buildLines(course);
  const pageChunks = []; for (let i = 0; i < lines.length; i += 34) pageChunks.push(lines.slice(i, i + 34));
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>'];
  const pageIds = pageChunks.map((_, index) => 3 + index * 2);
  objects.push(`<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`);
  pageChunks.forEach((page, pageIndex) => {
    const pageId = 3 + pageIndex * 2; const contentId = pageId + 1;
    const commands = ['BT', '54 744 Td'];
    page.forEach((line, index) => commands.push(`/F1 ${pageIndex === 0 && index === 1 ? 18 : 10} Tf`, `(${esc(line)}) Tj`, '0 -20 Td'));
    commands.push('ET'); const stream = commands.join('\n');
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${3 + pageChunks.length * 2} 0 R >> >> /Contents ${contentId} 0 R >>`);
    objects.push(`<< /Length ${Buffer.byteLength(stream) + 1} >>\nstream\n${stream}\nendstream`);
  });
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  let pdf = '%PDF-1.4\n'; const offsets = [0];
  objects.forEach((object, index) => { offsets[index + 1] = Buffer.byteLength(pdf); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const start = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n `).join('\n')}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF\n`;
  return Buffer.from(pdf, 'binary');
}

const output = path.resolve(__dirname, '../public/resources');
Object.entries(courses).forEach(([id, course]) => fs.writeFileSync(path.join(output, `${id}.pdf`), createPdf(course)));
