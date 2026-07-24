import { useState } from 'react';
import { Download, Search, Sparkles, FileText, Code, Video, Cpu } from 'lucide-react';
import toast from 'react-hot-toast';
import { GlassCard } from '../../components/design/ui/Card';
import Button from '../../components/design/ui/Button';

const RESOURCES = [
  {
    id: 1,
    title: 'Full-Stack Web Development Roadmap 2026',
    category: 'Technology',
    type: 'Text Guide',
    icon: Code,
    description: 'Comprehensive guide covering React 19, Node.js, and serverless architectures.',
    author: 'NIVOX Learning Team',
    version: '2026.1',
    fileSize: '1 KB',
    file: '/resources/full-stack-roadmap.txt',
  },
  {
    id: 2,
    title: 'UI/UX Design Systems & Micro-Interactions',
    category: 'Design',
    type: 'Text Guide',
    icon: FileText,
    description: 'Master glassmorphic UI design, color harmony, and fluid motion physics.',
    author: 'NIVOX Design Guild',
    version: '2026.1',
    fileSize: '1 KB',
    file: '/resources/design-systems-guide.txt',
  },
  {
    id: 3,
    title: 'NIVOX Creator Studio Equipment Manual',
    category: 'Technology',
    type: 'User Manual',
    icon: Cpu,
    description: 'Operating guidelines for 4K video recording, podcast mics, and lighting rigs.',
    author: 'NIVOX Creator Studio',
    version: '2026.1',
    fileSize: '1 KB',
    file: '/resources/creator-studio-manual.txt',
  },
  {
    id: 4,
    title: 'AI & Data Science Masterclass Video Series',
    category: 'AI',
    type: 'Learning Path',
    icon: Video,
    description: 'Introduction to PyTorch, LLM fine-tuning, and neural network pipelines.',
    author: 'NIVOX AI Lab',
    version: '2026.1',
    fileSize: '1 KB',
    file: '/resources/ai-data-science-series.txt',
  },
  {
    id: 5,
    title: 'Startup Pitch Deck & Prospectus Toolkit',
    category: 'Entrepreneurship',
    type: 'Quick Guide',
    icon: Sparkles,
    description: 'Investor pitch templates, financial modeling spreadsheets, and executive summaries.',
    author: 'NIVOX Venture Studio',
    version: '2026.1',
    fileSize: '1 KB',
    file: '/resources/pitch-deck-toolkit.txt',
  },
];

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Design', 'Technology', 'Career', 'Entrepreneurship', 'AI'];

  const filteredResources = RESOURCES.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (resource) => toast.success(`Downloading ${resource.title} (${resource.fileSize})`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      {/* Hero Header */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-[radial-gradient(circle_at_top_left,rgba(255,213,74,0.18),transparent_35%),linear-gradient(135deg,rgba(43,10,90,0.85)_0%,rgba(20,7,38,0.95)_100%)] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD54A]/25 bg-[#FFD54A]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#FFE7A3]">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD54A]" />
              Knowledge Base
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Student Resource Vault
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Access curated developer roadmaps, design templates, and studio manuals.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar & Search */}
      <GlassCard>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#FFD54A] text-[#140726] shadow-md'
                    : 'text-white/60 hover:text-white border border-white/10 bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-white/5 py-2.5 pl-10 pr-4 text-xs text-white placeholder-white/50 focus:border-[#FFD54A] focus:outline-none backdrop-blur"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((res) => {
            const Icon = res.icon;
            return (
              <div
                key={res.id}
                className="flex flex-col justify-between rounded-[24px] border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-[#FFD54A]/40 hover:bg-white/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FFD54A]/15 text-[#FFD54A]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FFE7A3]">
                      {res.type}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-white leading-snug">{res.title}</h3>
                  <p className="mt-2 text-xs text-white/65 leading-relaxed">{res.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-white/55">
                    <span><strong className="text-white/75">Author:</strong> {res.author}</span>
                    <span><strong className="text-white/75">Version:</strong> {res.version}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="text-white/50 font-mono text-[11px]">{res.fileSize}</span>
                  <Button as="a" href={res.file} download onClick={() => handleDownload(res)} variant="primary" size="sm" className="gap-1.5">
                    <Download className="h-3.5 w-3.5" /> Download
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

export default ResourcesPage;
