
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../AppContext';
import { Logo } from '../constants';

const Navbar: React.FC = () => {
  const { theme } = useApp();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Service', path: '/service' },
    { label: 'Contact', path: '/contact' },
  ];

  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F2EFE9]/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Logo color={theme.primaryColor} />
          <span className="font-serif font-bold text-2xl tracking-tighter hidden sm:block" style={{ color: theme.primaryColor }}>
            {theme.brandName}
          </span>
          <span className="sr-only">{theme.brandName}</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`text-sm font-medium transition-colors hover:opacity-100 ${location.pathname === item.path ? 'opacity-100' : 'opacity-50'}`}>
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className="ml-4 px-8 py-3 rounded-full text-white text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-md" style={{ backgroundColor: theme.primaryColor }}>
            견적 문의
          </Link>
        </div>
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[#F2EFE9] border-b border-black/5 animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${location.pathname === item.path ? 'opacity-100' : 'opacity-50'}`}>{item.label}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const { theme } = useApp();
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  // process.env가 없을 경우를 대비한 안전한 참조
  const contactEmail = "zztop1996@gmail.com";

  return (
    <footer className="bg-white pt-20 pb-10 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Logo color={theme.primaryColor} />
            <span className="font-serif font-bold text-xl tracking-tighter" style={{ color: theme.primaryColor }}>
              {theme.brandName}
            </span>
          </div>
          <p className="text-gray-500 max-w-sm leading-relaxed mb-6">레이어드필름은 당신의 공간에 새로운 레이어를 더해 완벽함을 완성합니다. 프리미엄 인테리어 필름 시공 전문 기업입니다.</p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Menu</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/service">Services</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li>대표번호: 010-9189-1389</li>
            <li>이메일: {contactEmail}</li>
            <li><Link to="/admin" className="text-blue-500 underline">Admin Login</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-black/5 text-xs text-gray-400 flex flex-col md:flex-row justify-between gap-4">
        <p>© 2024 Layered Film. All rights reserved.</p>
        <div className="flex gap-6"><span>개인정보처리방침</span><span>이용약관</span></div>
      </div>
      <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 w-14 h-14 bg-[#FEE500] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-40">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#3A1D1D"><path d="M12 3C6.477 3 2 6.477 2 10.75c0 2.768 1.832 5.2 4.6 6.64-.17.6-.61 2.18-.7 2.5-.1.35.12.35.25.26.11-.08 1.74-1.18 2.43-1.65.46.12.94.19 1.42.19 5.523 0 10-3.477 10-7.75S17.523 3 12 3z" /></svg>
      </a>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </div>
  );
};
