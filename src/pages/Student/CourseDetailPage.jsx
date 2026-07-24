import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Check, Clock, Download, GraduationCap, Laptop, Sparkles } from 'lucide-react';
import Button from '../../components/design/ui/Button';
import { GlassCard } from '../../components/design/ui/Card';
import { ACTIVE_COURSE_DETAILS, LEARNING_MATERIALS } from '../../data/learningMaterials';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const reduceMotion = useReducedMotion();
  const course = LEARNING_MATERIALS.find((material) => material.id === courseId);
  const details = ACTIVE_COURSE_DETAILS[courseId];
  const [guideUrl, setGuideUrl] = useState(course?.file);
  useEffect(() => {
    if (!course) return undefined;
    let active = true;
    getDoc(doc(db, 'learning_materials', course.id)).then((snapshot) => {
      if (active && snapshot.exists() && snapshot.data().published && snapshot.data().pdfUrl) setGuideUrl(snapshot.data().pdfUrl);
    }).catch(() => undefined);
    return () => { active = false; };
  }, [course]);
  if (!course || !course.available || !details) return <Navigate to="/resources" replace />;
  const related = details.related
    .map((id) => LEARNING_MATERIALS.find((material) => material.id === id))
    .filter(Boolean);
  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-[#FFE7A3] hover:text-[#FFD54A]"><ArrowLeft className="h-4 w-4" /> Learning Library</Link>
      <motion.section initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[32px] border border-[#FFD54A]/25 bg-[radial-gradient(circle_at_top_right,rgba(255,213,74,0.22),transparent_35%),linear-gradient(135deg,#2B0A5A,#140726)] p-7 shadow-2xl sm:p-10">
        <Sparkles aria-hidden="true" className="pointer-events-none absolute right-8 top-8 h-20 w-20 text-[#FFD54A]/10" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FFD54A]">{course.category} · {course.difficulty}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl">{course.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-white/70">{course.description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button as="a" href={guideUrl} download variant="primary" className="gap-2"><Download className="h-4 w-4" /> Download Learning Guide</Button>
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/75"><Clock className="h-4 w-4 text-[#FFD54A]" /> {details.learningTime}</span>
        </div>
      </motion.section>
      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-8">
          <GlassCard><h2 className="text-2xl font-black text-white">Learning objectives</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{details.skills.map((skill) => <div key={skill} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/75"><Check className="h-4 w-4 shrink-0 text-emerald-300" />{skill}</div>)}</div></GlassCard>
          <GlassCard><h2 className="text-2xl font-black text-white">Course modules</h2><ol className="mt-5 space-y-3">{details.modules.map((module, index) => <li key={module} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFD54A]/15 font-black text-[#FFD54A]">{index + 1}</span><span className="font-semibold text-white">{module}</span></li>)}</ol></GlassCard>
          <GlassCard><h2 className="text-2xl font-black text-white">Frequently asked questions</h2><div className="mt-4 space-y-4 text-sm leading-7 text-white/70"><div><h3 className="font-bold text-white">Is this course suitable for beginners?</h3><p>Yes. It starts with foundations and progresses toward a complete portfolio project.</p></div><div><h3 className="font-bold text-white">Do I need paid software?</h3><p>No. The guide includes free or accessible alternatives wherever possible.</p></div><div><h3 className="font-bold text-white">How should I study?</h3><p>Complete each demonstration, save your exercises, and request feedback before moving to the final project.</p></div></div></GlassCard>
        </div>
        <aside className="space-y-6">
          <GlassCard><Laptop className="h-6 w-6 text-[#FFD54A]" /><h2 className="mt-3 text-xl font-black text-white">Required software</h2><ul className="mt-4 space-y-2 text-sm text-white/70">{details.software.map((tool) => <li key={tool}>• {tool}</li>)}</ul></GlassCard>
          <GlassCard><GraduationCap className="h-6 w-6 text-[#FFD54A]" /><h2 className="mt-3 text-xl font-black text-white">Career opportunities</h2><ul className="mt-4 space-y-2 text-sm text-white/70">{details.careers.map((career) => <li key={career}>• {career}</li>)}</ul></GlassCard>
          <GlassCard><BookOpen className="h-6 w-6 text-[#FFD54A]" /><h2 className="mt-3 text-xl font-black text-white">Instructor note</h2><p className="mt-3 text-sm leading-7 text-white/70">The NIVOX Learning Team designed this course around practical evidence. Study actively, build every exercise, and show your process—not only your final output.</p></GlassCard>
          <GlassCard><h2 className="text-xl font-black text-white">Related courses</h2><div className="mt-4 space-y-2">{related.map((item) => item.available ? <Link key={item.id} to={`/resources/${item.id}`} className="block rounded-xl border border-white/10 p-3 text-sm font-semibold text-[#FFE7A3] hover:border-[#FFD54A]/40">{item.title}</Link> : <div key={item.id} className="rounded-xl border border-white/10 p-3 text-sm text-white/45">{item.title} · Coming later</div>)}</div></GlassCard>
        </aside>
      </div>
    </main>
  );
};
export default CourseDetailPage;
