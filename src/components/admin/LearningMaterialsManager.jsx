import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';
import { FileUp, Trash2, Eye, EyeOff } from 'lucide-react';
import { auth, db, storage } from '../../firebase/firebase';
import Button from '../design/ui/Button';
import { LEARNING_MATERIALS } from '../../data/learningMaterials';

const LearningMaterialsManager = () => {
  const [materials, setMaterials] = useState([]);
  const [busy, setBusy] = useState(false);
  const [generating, setGenerating] = useState('');
  const load = async () => {
    const snapshot = await getDocs(collection(db, 'learning_materials'));
    const uploaded = snapshot.docs.map((item) => ({ id: item.id, source: 'uploaded', ...item.data() }));
    const uploadedIds = new Set(uploaded.map((item) => item.id));
    const catalog = LEARNING_MATERIALS.map((item) => ({
      id: item.id,
      source: 'catalog',
      title: item.title,
      url: item.file,
      category: item.category,
      difficulty: item.difficulty,
      published: item.available,
      downloads: 0,
      fileName: `${item.id}.pdf`,
    })).filter((item) => !uploadedIds.has(item.id));
    setMaterials([...uploaded, ...catalog]);
  };
  useEffect(() => { void load(); }, []);
  const generateWithAI = async (course) => {
    setGenerating(course.id);
    try {
      const token = await auth.currentUser?.getIdToken();
      const base = import.meta.env.DEV
        ? 'http://127.0.0.1:5001/nivoxhub/europe-west1'
        : 'https://europe-west1-nivoxhub.cloudfunctions.net';
      const response = await fetch(`${base}/generateLearningMaterial`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ course }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || 'AI generation failed.');
      await load();
      toast.success(`${course.title} generated and published.`);
    } catch (error) { toast.error(error.message || 'AI generation failed.'); } finally { setGenerating(''); }
  };
  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') { toast.error('Choose a PDF file.'); return; }
    setBusy(true);
    try {
      const id = `${Date.now()}-${file.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      const fileRef = ref(storage, `learning-materials/${id}`);
      await uploadBytes(fileRef, file, { contentType: 'application/pdf' });
      const url = await getDownloadURL(fileRef);
      await setDoc(doc(db, 'learning_materials', id), {
        title: file.name.replace(/\.pdf$/i, ''),
        fileName: file.name,
        url,
        storagePath: fileRef.fullPath,
        category: 'Uncategorized',
        difficulty: 'Beginner',
        published: true,
        downloads: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      await load();
      toast.success('Learning material uploaded.');
    } catch (error) { toast.error(error.message || 'Upload failed.'); } finally { setBusy(false); event.target.value = ''; }
  };
  const remove = async (material) => {
    if (!window.confirm(`Delete ${material.title}?`)) return;
    if (material.source === 'catalog') {
      toast('Built-in NIVOX guides are managed with the application catalog.');
      return;
    }
    await deleteDoc(doc(db, 'learning_materials', material.id));
    if (material.storagePath) await deleteObject(ref(storage, material.storagePath)).catch(() => undefined);
    await load();
    toast.success('Learning material deleted.');
  };
  const toggle = async (material) => {
    if (material.source === 'catalog') {
      toast('Built-in guide publishing is managed with the application catalog.');
      return;
    }
    await setDoc(doc(db, 'learning_materials', material.id), { published: !material.published, updatedAt: serverTimestamp() }, { merge: true });
    await load();
  };
  return (
    <section className="rounded-[28px] border border-white/15 bg-white/5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h2 className="text-xl font-black text-white">Learning Materials</h2><p className="mt-1 text-sm text-white/60">Upload and publish student PDF guides.</p></div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#FFD54A] px-4 py-2 text-sm font-bold text-[#140726]">
          <FileUp className="h-4 w-4" /> {busy ? 'Uploading…' : 'Upload PDF'}
          <input type="file" accept="application/pdf" onChange={upload} className="sr-only" disabled={busy} />
        </label>
      </div>
      <div className="mt-5 divide-y divide-white/10">{LEARNING_MATERIALS.map((course) => {
        const material = materials.find((item) => item.id === course.id);
        return (
        <div key={course.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 py-3">
          <div><p className="font-semibold text-white">{course.title}</p><p className="text-xs text-white/50">{course.category} · {course.difficulty}</p></div>
          <Button variant="secondary" size="sm" disabled={generating === course.id} onClick={() => generateWithAI(course)}>{generating === course.id ? 'Generating…' : material?.content ? 'Regenerate with AI' : 'Generate with AI'}</Button>
        </div>
        );
      })}{materials.filter((material) => !LEARNING_MATERIALS.some((course) => course.id === material.id)).map((material) => (
        <div key={material.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div><p className="font-semibold text-white">{material.title}</p><p className="text-xs text-white/50">{material.category} · {material.difficulty} · {material.downloads || 0} downloads</p></div>
          <div className="flex items-center gap-2"><a href={material.pdfUrl || material.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#FFE7A3] hover:text-[#FFD54A]">Open PDF</a><Button variant="ghost" size="sm" onClick={() => toggle(material)} disabled={material.source === 'catalog'}>{material.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</Button><Button variant="ghost" size="sm" onClick={() => remove(material)} disabled={material.source === 'catalog'}><Trash2 className="h-4 w-4 text-red-300" /></Button></div>
        </div>
      ))}</div>
    </section>
  );
};
export default LearningMaterialsManager;
