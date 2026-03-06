
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../AppContext';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

export const Home: React.FC = () => {
  const { theme, projects } = useApp();

  // Only consider visible projects for the home highlights
  const visibleProjects = projects.filter(p => p.visible === true);
  const comparisonProject = visibleProjects[0] || projects[0];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-60"
            alt="Interior Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <h2 className="font-serif text-sm md:text-xl uppercase tracking-[0.4em] mb-6 opacity-80 animate-in slide-in-from-bottom-4 duration-1000">
            Layers of Perfection
          </h2>
          <h1 className="font-serif text-4xl md:text-6xl font-extralight italic tracking-tight leading-snug mb-8 animate-in slide-in-from-bottom-8 duration-1000 delay-200">
            공간의 가치를 더하는 층
          </h1>
          <p className="text-lg md:text-xl font-light mb-12 opacity-70 max-w-2xl mx-auto animate-in fade-in duration-1000 delay-500">
            레이어드필름은 당신의 일상이 머무는 공간에<br />섬세한 기술력과 감각적인 마감을 더합니다.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-in fade-in duration-1000 delay-700">
            <Link
              to="/portfolio"
              className="px-10 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-opacity-90 transition-all hover:scale-105"
            >
              포트폴리오 보기
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border border-white text-white text-sm font-bold rounded-full hover:bg-white/10 transition-all"
            >
              견적 문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Highlight */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase mb-4 block" style={{ color: theme.primaryColor }}>Selected Works</span>
              <h3 className="font-serif text-4xl md:text-5xl">최근 시공 사례</h3>
            </div>
            <Link to="/portfolio" className="text-sm font-bold border-b-2 border-black pb-1 hover:opacity-60 transition-opacity">
              전체 포트폴리오 보기
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {visibleProjects.slice(0, 3).map((project, idx) => (
              <div key={project.id} className={`group cursor-pointer ${idx === 1 ? 'md:-translate-y-12' : ''}`}>
                <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={project.afterImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="inline-block bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                      {project.category}
                    </span>
                    <h4 className="text-white text-xl font-bold leading-tight group-hover:translate-x-2 transition-transform">
                      {project.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleProjects.length === 0 && (
            <p className="text-center text-gray-400 italic py-20">등록된 시공 사례가 없습니다.</p>
          )}
        </div>
      </section>

      {/* Comparison Preview */}
      {comparisonProject && (
        <section className="py-32 bg-[#2B4360] text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase mb-4 block text-blue-300">Transformation</span>
                <h3 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">압도적인<br />비포 & 애프터</h3>
                <p className="text-blue-100 text-lg mb-12 leading-relaxed opacity-80">
                  기존의 낡은 가구나 인테리어를 교체 없이 필름 시공만으로<br />
                  완전히 새로운 프리미엄 공간으로 재탄생시킵니다.<br />
                  레이어드필름만의 정밀한 마감을 확인해보세요.
                </p>
                <div className="flex gap-12">
                  <div>
                    <div className="text-4xl font-serif mb-2">1,500+</div>
                    <div className="text-sm opacity-60">누적 시공 횟수</div>
                  </div>
                  <div>
                    <div className="text-4xl font-serif mb-2">99%</div>
                    <div className="text-sm opacity-60">고객 만족도</div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                 <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-2xl group-hover:bg-white/20 transition-all"></div>
                 <BeforeAfterSlider
                  before={comparisonProject.beforeImage}
                  after={comparisonProject.afterImage}
                  className="relative rounded-2xl shadow-2xl aspect-video"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
