
import React, { useState } from 'react';
import { useApp } from '../AppContext';

export const Contact: React.FC = () => {
  const { theme, addMessage } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '아파트',
    message: '',
    botcheck: '', // Honeypot field for anti-spam
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // 안전한 상수 선언
  const contactEmail = "zztop1996@gmail.com";
  const PUBLIC_ACCESS_KEY = "63cb2bc7-dfb5-474f-8cb2-1f2e7f0aaf67";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Anti-spam: Honeypot check
    if (formData.botcheck) {
      console.warn("Spam detected via honeypot");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          access_key: PUBLIC_ACCESS_KEY,
          subject: `[레이어드필름 견적문의] ${formData.name} - ${formData.type}`,
          from_name: "레이어드필름 홈페이지",
          name: formData.name,
          email: formData.email,
          construction_type: formData.type,
          message: formData.message,
          _to: contactEmail
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        addMessage({
          name: formData.name,
          email: formData.email,
          type: formData.type,
          message: formData.message,
          id: Date.now().toString(),
          date: new Date().toLocaleDateString()
        });
        setFormData({ name: '', email: '', type: '아파트', message: '', botcheck: '' });
      } else {
        setErrorMessage("전송 실패. 잠시 후 다시 시도해주세요.");
        setSubmitStatus('error');
      }
    } catch (error) {
      setErrorMessage("전송 실패. 잠시 후 다시 시도해주세요.");
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="font-serif text-5xl md:text-7xl mb-8">Get an Estimate</h2>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed">
              공간의 변화를 위한 첫 걸음, <br />
              레이어드필름에게 물어보세요. 24시간 이내에 전문가가 직접 연락드립니다.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm" style={{ color: theme.primaryColor }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold">Call Us</h4>
                  <p className="text-gray-500">010-9189-1389</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm" style={{ color: theme.primaryColor }}>
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                  <p className="text-gray-500">{contactEmail}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl relative">
            {submitStatus === 'success' ? (
              <div className="absolute inset-0 bg-white rounded-3xl flex flex-col items-center justify-center text-center p-10 animate-in zoom-in z-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">접수 완료!</h3>
                <p className="text-gray-500 font-medium">24시간 내 연락드릴게요.</p>
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-8 text-sm text-gray-400 hover:text-black underline transition-colors"
                >
                  새 문의 작성하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="hidden">
                  <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" value={formData.botcheck} onChange={(e) => setFormData({...formData, botcheck: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-400">성함/업체명</label>
                    <input required type="text" className="w-full bg-[#F9F7F2] border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-400">이메일 주소</label>
                    <input required type="email" className="w-full bg-[#F9F7F2] border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="example@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-400">시공 유형</label>
                  <select className="w-full bg-[#F9F7F2] border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option>아파트</option>
                    <option>상가</option>
                    <option>가구</option>
                    <option>오피스</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-gray-400">상세 문의 내용</label>
                  <textarea required rows={5} className="w-full bg-[#F9F7F2] border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="시공을 원하는 부위나 예산 등을 자유롭게 남겨주세요." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                </div>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 animate-in slide-in-from-top-2">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-xl text-white font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {isSubmitting ? '전송 중...' : '견적 요청하기'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
