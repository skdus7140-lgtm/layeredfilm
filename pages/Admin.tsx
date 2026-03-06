
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../AppContext';
import { ProjectCategory, Project } from '../types';
import { Logo } from '../constants';

export const Admin: React.FC = () => {
  const { theme, setTheme, projects, setProjects, messages, adminPassword, setAdminPassword } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'theme' | 'messages' | 'security'>('dashboard');
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [tempTheme, setTempTheme] = useState(theme);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    category: ProjectCategory.APARTMENT,
    visible: true,
    detailImages: [],
    productUsed: '',
    location: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSaveProject = () => {
    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? { ...p, ...newProject } as Project : p));
      setEditingId(null);
    } else {
      const p = {
        ...newProject,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        visible: newProject.visible ?? true,
        detailImages: newProject.detailImages || [],
        productUsed: newProject.productUsed || '',
        location: newProject.location || ''
      } as Project;
      setProjects([p, ...projects]);
      setIsAdding(false);
    }
    setNewProject({ category: ProjectCategory.APARTMENT, visible: true, detailImages: [], productUsed: '', location: '' });
  };

  const deleteProject = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const toggleVisibility = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
  };

  const menuItems = [
    { id: 'dashboard', label: '현황판' },
    { id: 'projects', label: '포트폴리오 관리' },
    { id: 'theme', label: '디자인 설정' },
    { id: 'messages', label: '문의 내역' },
    { id: 'security', label: '보안 설정' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F2EFE9] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center space-y-8 animate-in zoom-in duration-500">
          <div className="flex flex-col items-center gap-4">
            <Logo color={theme.primaryColor} />
            <h1 className="font-serif text-3xl font-bold tracking-tight" style={{ color: theme.primaryColor }}>
              {theme.brandName} 관리자
            </h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              autoFocus
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={`w-full bg-gray-50 border-none rounded-xl p-5 text-center focus:ring-2 outline-none transition-all ${
                loginError ? 'ring-2 ring-red-400' : 'focus:ring-blue-500'
              }`}
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setLoginError(false);
              }}
            />
            {loginError && <p className="text-red-500 text-xs font-bold">비밀번호가 일치하지 않습니다.</p>}
            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform active:scale-95"
              style={{ backgroundColor: theme.primaryColor }}
            >
              로그인
            </button>
          </form>
          <Link to="/" className="inline-block text-gray-400 text-xs uppercase tracking-widest font-bold hover:text-black transition-colors">
            홈페이지로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-72 bg-[#2B4360] text-white flex flex-col shrink-0">
        <div className="p-8 space-y-12 flex-grow">
          <div className="flex items-center gap-3">
            <Logo color="#fff" />
            <span className="font-serif font-bold text-xl tracking-tight">레이어드필름 Admin</span>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full text-left px-5 py-4 rounded-xl transition-all flex items-center gap-4 font-medium ${
                  activeTab === item.id ? 'bg-white/10 shadow-inner' : 'opacity-50 hover:opacity-100 hover:bg-white/5'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeTab === item.id ? 'bg-blue-400' : 'bg-transparent'}`}></span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Back to Home Button in Sidebar */}
        <div className="p-8 border-t border-white/10">
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 rounded-xl border border-white/20 hover:bg-white hover:text-[#2B4360] transition-all flex items-center justify-center gap-2 font-bold text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            홈페이지 바로가기
          </button>
        </div>
      </aside>

      <main className="flex-grow p-12 overflow-y-auto h-screen">
        {activeTab === 'projects' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">포트폴리오 관리</h2>
                <p className="text-gray-400 text-sm">고객에게 보여줄 시공 사례를 추가하거나 수정할 수 있습니다.</p>
              </div>
              <button
                onClick={() => { setIsAdding(true); setEditingId(null); setNewProject({ category: ProjectCategory.APARTMENT, visible: true, detailImages: [], productUsed: '', location: '' }); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition-all"
              >
                + 새 프로젝트 등록
              </button>
            </div>

            {(isAdding || editingId) && (
              <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 space-y-8 animate-in slide-in-from-top-4">
                <div className="flex justify-between items-center border-b pb-6">
                  <h3 className="text-xl font-bold text-gray-800">{editingId ? '프로젝트 정보 수정' : '새 프로젝트 등록'}</h3>
                  <div className="flex items-center gap-2">
                    <input 
                      id="visible-check" 
                      type="checkbox" 
                      className="w-5 h-5 accent-blue-600 rounded cursor-pointer" 
                      checked={newProject.visible} 
                      onChange={e => setNewProject({...newProject, visible: e.target.checked})} 
                    />
                    <label htmlFor="visible-check" className="text-sm font-bold cursor-pointer text-gray-600">홈페이지에 즉시 공개</label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">제목</label>
                    <input type="text" className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="예: 한남동 프리미엄 아파트 시공" value={newProject.title || ''} onChange={e => setNewProject({...newProject, title: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">카테고리</label>
                    <select className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer" value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value})}>
                      {Object.values(ProjectCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">시공 위치</label>
                    <input type="text" className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={newProject.location || ''} onChange={e => setNewProject({...newProject, location: e.target.value})} placeholder="예: 서울 강남구 삼성동" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">사용 제품</label>
                    <input type="text" className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={newProject.productUsed || ''} onChange={e => setNewProject({...newProject, productUsed: e.target.value})} placeholder="예: LG Hausys PW102 우드 필름" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">시공 전(Before) 사진 URL</label>
                    <input type="text" className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={newProject.beforeImage || ''} onChange={e => setNewProject({...newProject, beforeImage: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">대표(After) 사진 URL</label>
                    <input type="text" className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={newProject.afterImage || ''} onChange={e => setNewProject({...newProject, afterImage: e.target.value})} />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">디테일 갤러리 사진 URL (엔터로 구분하여 여러 장 등록 가능)</label>
                    <textarea 
                      rows={3} 
                      className="w-full bg-gray-50 border-none p-4 rounded-xl font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="https://image1.jpg&#10;https://image2.jpg"
                      value={newProject.detailImages?.join('\n') || ''}
                      onChange={e => setNewProject({...newProject, detailImages: e.target.value.split('\n').filter(url => url.trim() !== '')})}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">시공 상세 설명</label>
                    <textarea rows={4} className="w-full bg-gray-50 border-none p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="시공 과정이나 특징을 자세히 적어주세요." value={newProject.description || ''} onChange={e => setNewProject({...newProject, description: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-4 pt-4 border-t">
                  <button onClick={handleSaveProject} className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-bold shadow-lg transition-all active:scale-95">정보 저장하기</button>
                  <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-10 py-4 rounded-xl font-bold transition-all">취소</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {projects.map(p => (
                <div key={p.id} className="bg-white p-6 rounded-2xl flex items-center justify-between border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img src={p.afterImage} className="w-24 h-24 object-cover rounded-2xl" alt="" />
                      <div className={`absolute -top-3 -left-3 px-2 py-1 rounded-md text-[9px] font-black text-white shadow-sm ${p.visible ? 'bg-green-500' : 'bg-gray-400'}`}>
                        {p.visible ? '공개 중' : '숨김'}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-blue-50 text-blue-600 rounded-full">{p.category}</span>
                        <h4 className="font-bold text-xl text-gray-800">{p.title}</h4>
                      </div>
                      <p className="text-sm text-gray-400 flex items-center gap-3">
                        <span className="flex items-center gap-1">📍 {p.location}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span className="flex items-center gap-1">🛠️ {p.productUsed || '제품 정보 없음'}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span className="flex items-center gap-1">🖼️ {p.detailImages?.length || 0} Photos</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => toggleVisibility(p.id)} className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors ${p.visible ? 'bg-gray-50 text-gray-400 hover:bg-gray-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                      {p.visible ? '숨기기' : '공개'}
                    </button>
                    <button onClick={() => { setEditingId(p.id); setNewProject(p); setIsAdding(false); }} className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-bold text-xs transition-colors">수정</button>
                    <button onClick={() => deleteProject(p.id)} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-bold text-xs transition-colors">삭제</button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-300">
                  <p className="text-lg italic font-light">등록된 포트폴리오 프로젝트가 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">관리 대시보드</h2>
              <p className="text-gray-400">Layered Film의 전반적인 운영 현황입니다.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-56">
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">총 시공 프로젝트</h4>
                <div className="flex items-end justify-between">
                  <p className="text-6xl font-serif text-gray-800">{projects.length}</p>
                  <span className="text-green-500 font-bold text-sm">건</span>
                </div>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-56">
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">받은 견적 문의</h4>
                <div className="flex items-end justify-between">
                  <p className="text-6xl font-serif text-gray-800">{messages.length}</p>
                  <span className="text-blue-500 font-bold text-sm">건</span>
                </div>
              </div>
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between h-56">
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">활성 브랜드</h4>
                <div className="flex flex-col">
                  <p className="text-2xl font-bold text-gray-800" style={{ color: theme.primaryColor }}>{theme.brandName}</p>
                  <p className="text-xs text-gray-400 mt-1">Premium Interior Film</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-xl mb-6">최근 문의 내역</h4>
              <div className="space-y-4">
                {messages.slice(0, 5).map(m => (
                  <div key={m.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">{m.name[0]}</div>
                      <div>
                        <p className="font-bold text-sm">{m.name} <span className="text-xs font-normal text-gray-400 ml-2">{m.date}</span></p>
                        <p className="text-xs text-gray-500">{m.type} 시공 문의</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('messages')} className="text-xs font-bold text-blue-600 hover:underline">상세보기</button>
                  </div>
                ))}
                {messages.length === 0 && <p className="text-center py-10 text-gray-300 italic text-sm">새로운 문의가 없습니다.</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 animate-in fade-in duration-300 max-w-3xl">
            <h3 className="text-3xl font-bold mb-2">브랜드 디자인 설정</h3>
            <p className="text-gray-400 mb-10">홈페이지의 컬러와 이름을 실시간으로 변경합니다.</p>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">브랜드 이름 (홈페이지 제목)</label>
                <input type="text" className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold" value={tempTheme.brandName} onChange={e => setTempTheme({...tempTheme, brandName: e.target.value})} />
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">메인 브랜드 컬러</label>
                <div className="flex gap-6 items-center">
                  <div className="relative">
                    <input type="color" className="w-20 h-20 rounded-2xl cursor-pointer border-none p-0 bg-transparent overflow-hidden" value={tempTheme.primaryColor} onChange={e => setTempTheme({...tempTheme, primaryColor: e.target.value})} />
                    <div className="absolute inset-0 pointer-events-none rounded-2xl ring-4 ring-inset ring-white/20"></div>
                  </div>
                  <div className="flex-grow">
                    <input type="text" className="w-full bg-gray-50 border-none p-5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-mono" value={tempTheme.primaryColor} onChange={e => setTempTheme({...tempTheme, primaryColor: e.target.value})} />
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t">
                <button 
                  onClick={() => {
                    setTheme(tempTheme);
                    alert('디자인 설정이 저장되었습니다.');
                  }} 
                  className="w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  디자인 변경사항 적용하기
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">고객 문의함</h2>
              <p className="text-gray-400">홈페이지를 통해 접수된 실시간 문의 내역입니다.</p>
            </div>
            
            <div className="space-y-4">
              {messages.map(m => (
                <div key={m.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 font-bold text-xl">{m.name[0]}</div>
                      <div>
                        <h4 className="font-bold text-lg">{m.name}</h4>
                        <p className="text-sm text-gray-400">{m.email} | {m.date}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">{m.type}</span>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl text-gray-600 leading-relaxed">
                    {m.message}
                  </div>
                </div>
              ))}
              {messages.length === 0 && <div className="text-center py-40 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-300 italic">도착한 문의가 없습니다.</div>}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 animate-in fade-in duration-300 max-w-xl">
             <h3 className="text-2xl font-bold mb-8">보안 및 비밀번호 설정</h3>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">현재 비밀번호: <span className="text-gray-800 ml-2">{adminPassword}</span></label>
                   <p className="text-xs text-gray-400 italic">비밀번호는 브라우저의 로컬 저장소에 안전하게 보관됩니다.</p>
                </div>
                <button 
                   onClick={() => {
                     const next = prompt('새로운 관리자 비밀번호를 입력하세요:', adminPassword);
                     if (next) {
                       setAdminPassword(next);
                       alert('비밀번호가 변경되었습니다. 다음 로그인부터 적용됩니다.');
                     }
                   }}
                   className="w-full py-4 border-2 border-dashed border-gray-200 text-gray-500 rounded-2xl hover:border-blue-500 hover:text-blue-500 transition-all font-bold"
                >
                   관리자 비밀번호 변경하기
                </button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};
