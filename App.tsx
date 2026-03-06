
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

const Service: React.FC = () => (
  <div className="py-20 px-6 max-w-7xl mx-auto min-h-screen animate-in fade-in duration-700">
    <h2 className="font-serif text-5xl mb-12">Service</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-white p-12 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6">시공 프로세스</h3>
        <ol className="space-y-6">
          <li className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 font-bold">1</span>
            <div>
              <h4 className="font-bold">상담 및 실측</h4>
              <p className="text-sm text-gray-500">시공 부위 확인 및 정확한 면적 측정을 진행합니다.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 font-bold">2</span>
            <div>
              <h4 className="font-bold">필름 선정</h4>
              <p className="text-sm text-gray-500">공간의 무드에 맞는 텍스처와 컬러의 필름을 선택합니다.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 font-bold">3</span>
            <div>
              <h4 className="font-bold">밑작업</h4>
              <p className="text-sm text-gray-500">퍼티 작업 및 프라이머 도포로 완벽한 접착을 준비합니다.</p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0 font-bold">4</span>
            <div>
              <h4 className="font-bold">본 시공</h4>
              <p className="text-sm text-gray-500">레이어드필름만의 정밀 기술로 빈틈 없는 마감을 진행합니다.</p>
            </div>
          </li>
        </ol>
      </div>
      <div className="space-y-8">
        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" className="w-full h-full object-cover" alt="Service" />
        </div>
        <p className="text-gray-500 leading-relaxed">
          레이어드필름은 단순한 덮기 작업이 아닙니다. 공간의 구조를 이해하고, 각 소재의 특성에 맞는 최적의 공법을 적용합니다. 
          시간이 지나도 들뜨지 않는 완벽한 내구성을 약속드립니다.
        </p>
      </div>
    </div>
  </div>
);

const About: React.FC = () => (
  <div className="py-20 px-6 max-w-4xl mx-auto min-h-screen animate-in fade-in duration-700">
     <h2 className="font-serif text-5xl md:text-7xl mb-12 text-center">Architectural<br />Thinking</h2>
     <div className="prose prose-lg max-w-none text-gray-500 space-y-8 text-center leading-relaxed">
        <p className="text-xl text-black font-medium">
          우리는 보이지 않는 디테일이<br />공간의 전체적인 품격을 결정한다고 믿습니다.
        </p>
        <p>
          레이어드필름은 '공간 위의 또 다른 층'이라는 철학을 바탕으로 설립되었습니다.<br />
          기존의 것을 허물지 않고도 새로운 가치를 창출하는 인테리어 필름은<br />
          가장 경제적이면서도 혁신적인 공간 솔루션입니다.
        </p>
        <p>
          수천 건의 시공 경험을 가진 숙련된 기술자가<br />
          당신의 소중한 공간을 작품으로 만들어 드립니다.
        </p>
     </div>
     <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        <img src="https://picsum.photos/seed/about1/400/600" className="rounded-2xl grayscale hover:grayscale-0 transition-all aspect-[2/3] object-cover shadow-lg" alt="" />
        <img src="https://picsum.photos/seed/about2/400/600" className="rounded-2xl grayscale hover:grayscale-0 transition-all aspect-[2/3] object-cover mt-12 shadow-lg" alt="" />
        <img src="https://picsum.photos/seed/about3/400/600" className="rounded-2xl grayscale hover:grayscale-0 transition-all aspect-[2/3] object-cover shadow-lg" alt="" />
        <img src="https://picsum.photos/seed/about4/400/600" className="rounded-2xl grayscale hover:grayscale-0 transition-all aspect-[2/3] object-cover mt-12 shadow-lg" alt="" />
     </div>
  </div>
);

const AppContent: React.FC = () => {
  const { theme } = useApp();
  
  return (
    <div style={{ backgroundColor: theme.bgColor, color: theme.textColor }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
