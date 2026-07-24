import { Code, FileText, Video, Cpu, Sparkles, Camera, Megaphone, Briefcase } from 'lucide-react';

const premiumLaunchCourses = new Set(['graphic-design', 'html', 'photography', 'react', 'chatgpt']);
const course = (id, title, category, description, icon, difficulty = 'Beginner') => ({
  id,
  title,
  category,
  difficulty,
  type: 'PDF Training Manual',
  description,
  author: 'NIVOX Learning Team',
  version: '2026.1',
  file: `/resources/${id}.pdf`,
  available: premiumLaunchCourses.has(id),
  icon,
});

export const LEARNING_MATERIALS = [
  course('graphic-design', 'Graphic Design Foundations', 'Design', 'Learn visual hierarchy, layout, colour, typography, and a repeatable design process.', FileText),
  course('canva-design', 'Canva Design for Beginners', 'Design', 'Create polished social posts, presentations, flyers, and brand templates in Canva.', Sparkles),
  course('adobe-photoshop', 'Adobe Photoshop Essentials', 'Design', 'Understand layers, selections, retouching, masks, and export workflows.', FileText),
  course('adobe-illustrator', 'Adobe Illustrator Essentials', 'Design', 'Build clean vector artwork with paths, shapes, type, and reusable assets.', FileText),
  course('coreldraw', 'CorelDRAW Production Guide', 'Design', 'Prepare logos, layouts, and print-ready artwork for real production.', FileText),
  course('branding-identity', 'Branding and Identity Design', 'Design', 'Turn strategy into a consistent visual identity system.', Briefcase),
  course('ui-ux-design', 'UI/UX Design Systems', 'Design', 'Research, wireframe, prototype, and test accessible digital products.', FileText),
  course('html', 'HTML Web Foundations', 'Technology', 'Structure semantic, accessible web pages from first principles.', Code),
  course('css', 'CSS Layout and Responsive Design', 'Technology', 'Master the cascade, Flexbox, Grid, responsive layouts, and maintainable styles.', Code),
  course('javascript', 'JavaScript Programming', 'Technology', 'Learn variables, functions, arrays, async code, DOM events, and debugging.', Code),
  course('react', 'React Application Development', 'Technology', 'Build component-driven interfaces with state, effects, routing, and testing habits.', Code),
  course('firebase', 'Firebase Application Backend', 'Technology', 'Use Authentication, Firestore, Storage, rules, and deployment responsibly.', Cpu),
  course('mobile-app-development', 'Mobile App Development Path', 'Technology', 'Plan and build mobile experiences with platform-aware product thinking.', Code),
  course('ai-tools', 'AI Tools for Productive Work', 'AI', 'Choose, prompt, evaluate, and safely integrate modern AI tools.', Sparkles),
  course('chatgpt', 'ChatGPT for Students and Creators', 'AI', 'Use structured prompts for research, writing, coding, and revision.', Sparkles),
  course('gemini-ai', 'Gemini AI Workflow Guide', 'AI', 'Explore multimodal research and responsible AI-assisted workflows.', Sparkles),
  course('git-github', 'Git and GitHub Collaboration', 'Technology', 'Track changes, collaborate safely, review code, and ship confidently.', Code),
  course('digital-marketing', 'Digital Marketing Essentials', 'Marketing', 'Build a measurable online marketing plan around audience and outcomes.', Megaphone),
  course('social-media-marketing', 'Social Media Marketing', 'Marketing', 'Plan content pillars, campaigns, community, and analytics.', Megaphone),
  course('content-creation', 'Content Creation Playbook', 'Media', 'Develop ideas, scripts, production systems, and a consistent publishing habit.', Camera),
  course('photography', 'Photography Fundamentals', 'Media', 'Understand light, composition, exposure, focus, and visual storytelling.', Camera),
  course('videography', 'Videography Fundamentals', 'Media', 'Plan shots, record clean sound, and create intentional visual sequences.', Video),
  course('video-editing', 'Video Editing Workflow', 'Media', 'Organize footage, cut for meaning, mix sound, colour-correct, and export.', Video),
  course('motion-graphics', 'Motion Graphics Foundations', 'Media', 'Animate type and shapes with timing, rhythm, and visual clarity.', Video),
  course('entrepreneurship', 'Entrepreneurship Starter Manual', 'Business', 'Validate problems, shape an offer, test demand, and build responsibly.', Briefcase),
  course('freelancing', 'Freelancing and Client Work', 'Business', 'Package your skills, price work, communicate clearly, and protect your time.', Briefcase),
  course('personal-branding', 'Personal Branding for Students', 'Business', 'Build a credible public profile around proof, clarity, and consistency.', Briefcase),
];

export const MATERIAL_CATEGORIES = ['All', ...new Set(LEARNING_MATERIALS.map((material) => material.category))];
