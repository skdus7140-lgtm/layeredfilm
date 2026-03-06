
import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ProjectCategory, Project } from '../types';

export const Portfolio: React.FC = () => {
  const { projects, theme } = useApp();
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', ...Object.values(ProjectCategory)];

  const visibleProjects = projects.filter(p => p.visible === true);

  const filteredProjects = filter === 'All'
    ? visibleProjects
    : visibleProjects.filter(p => p.category === filter);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen py-20 px-6 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h2 className="font-serif text-5xl md:text-7xl mb-8">Our Works</h2>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            레이어드필름이 시공한 다양한 공간들의 변화를 만나보세요. <br />
            아파트부터 상업공간까지, 모든 공간에 최적화된 마감을 제안합니다.
          </p>
        </header>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                filter === cat
                  ? 'text-white shadow-xl'
                  : 'bg-white text-gray-400 hover:text-black hover:bg-gray-100'
              }`}
              style={filter === cat ? { backgroundColor: theme.primaryColor } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="space-y-32">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <BeforeAfterSlider
                  before={project.beforeImage}
                  after={project.afterImage}
                  className="rounded-3xl shadow-2xl aspect-[4/3]"
                />
              </div>
              <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                <div className={`flex items-center gap-3 ${idx % 2 === 1 ? 'justify-end' : ''}`}>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-black text-white rounded">
                    {project.category}
                  </span>
                  <span className="text-sm text-gray-400">{project.date}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl">{project.title}</h3>
                <div className={`grid grid-cols-2 gap-6 ${idx % 2 === 1 ? 'text-right' : ''}`}>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase mb-1">Location</h5>
                    <p className="text-sm font-medium">{project.location}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-400 uppercase mb-1">Product</h5>
                    <p className="text-sm font-medium">{project.productUsed}</p>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed py-4 line-clamp-3">
                  {project.description}
                </p>
                <div className={`pt-4 ${idx % 2 === 1 ? 'flex justify-end' : ''}`}>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-2 group text-sm font-bold uppercase tracking-wider transition-all hover:opacity-70"
                    style={{ color: theme.primaryColor }}
                  >
                    View Project Details
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative bg-[#F2EFE9] w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in duration-300 scroll-smooth">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="fixed top-8 right-8 z-[110] p-3 bg-white/10 text-white backdrop-blur rounded-full hover:bg-white hover:text-black transition-all shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header/Hero */}
            <div className="p-8 md:p-16 space-y-12">
              <header className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-black text-white rounded">
                    {selectedProject.category}
                  </span>
                  <span className="text-sm text-gray-400 font-medium">{selectedProject.date}</span>
                </div>
                <h3 className="font-serif text-4xl md:text-6xl leading-tight mb-8">{selectedProject.title}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-black/10 pt-8">
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Location</h5>
                    <p className="text-xl font-medium">{selectedProject.location}</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Product Used</h5>
                    <p className="text-xl font-medium">{selectedProject.productUsed}</p>
                  </div>
                </div>
              </header>

              {/* Main Visual: Before/After */}
              <div className="space-y-6">
                <h4 className="font-serif text-2xl italic opacity-50 text-center">Transformation</h4>
                <BeforeAfterSlider
                  before={selectedProject.beforeImage}
                  after={selectedProject.afterImage}
                  className="rounded-2xl shadow-2xl aspect-video lg:aspect-[16/7]"
                />
              </div>

              {/* Description */}
              <div className="max-w-3xl mx-auto py-12">
                 <p className="text-gray-600 leading-relaxed text-xl md:text-2xl font-light text-center">
                   {selectedProject.description}
                 </p>
              </div>

              {/* Detail Gallery */}
              {selectedProject.detailImages && selectedProject.detailImages.length > 0 && (
                <div className="space-y-12">
                  <h4 className="font-serif text-3xl text-center">Detail Gallery</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedProject.detailImages.map((img, i) => (
                      <div key={i} className="group overflow-hidden rounded-2xl shadow-xl aspect-square md:aspect-auto">
                        <img 
                          src={img} 
                          alt={`Detail ${i+1}`} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Button */}
              <div className="pt-20 text-center">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-12 py-5 rounded-full text-white font-bold transition-transform hover:scale-105 active:scale-95 shadow-2xl"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
