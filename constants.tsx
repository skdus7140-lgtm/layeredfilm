
import React from 'react';
import { Project, ThemeConfig } from './types';

export const DEFAULT_THEME: ThemeConfig = {
  bgColor: '#F2EFE9',
  primaryColor: '#2B4360',
  secondaryColor: '#5A5E61',
  textColor: '#1A1A1A',
  brandName: 'Layered Film'
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: '한남동 프리미엄 더 힐 아파트 시공',
    location: '서울 용산구 한남동',
    category: '아파트',
    productUsed: 'LG Hausys Premium Wood (PW102)',
    description: '전체적인 무드를 차분한 우드 톤으로 리포밍하여 고급스러운 분위기를 연출했습니다. 주방 하부장과 거실 아트월 공간을 연계하여 통일감을 부여했습니다.',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1556912177-c54030639a6d?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop'
    ],
    date: '2024-03-15',
    visible: true
  },
  {
    id: '2',
    title: '성수동 카페 티크 우드 필름 리폼',
    location: '서울 성동구 성수동',
    category: '상가',
    productUsed: '3M DI-NOC Teak Series',
    description: '거친 콘크리트 질감에 따뜻한 티크 우드 필름을 더해 인더스트리얼한 감성을 극대화했습니다. 카운터와 메인 테이블에 적용되었습니다.',
    beforeImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1501339819302-ee4b259556ee?q=80&w=2078&auto=format&fit=crop'
    ],
    date: '2024-02-28',
    visible: true
  },
  {
    id: '3',
    title: '주방 싱크대 및 냉장고장 우드 리폼',
    location: '경기도 판교 현대아파트',
    category: '가구',
    productUsed: '현대 L&C Boda Natural Wood',
    description: '기존의 화이트 하이그로시 주방을 내추럴한 월넛 우드 톤으로 리포밍했습니다. 교체 대비 1/3 비용으로 프리미엄 주방을 완성했습니다.',
    beforeImage: 'https://images.unsplash.com/photo-1556911223-0534507d488e?q=80&w=2070&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=2070&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556186675-926938933618?q=80&w=2070&auto=format&fit=crop'
    ],
    date: '2024-04-02',
    visible: true
  },
  {
    id: '4',
    title: '공유 오피스 라운지 블랙 메탈 시공',
    location: '서울 강남구 테헤란로',
    category: '오피스',
    productUsed: 'LG Hausys Solid Dark Grey',
    description: '회의실 유리 프레임과 메인 도어에 블랙 메탈 느낌의 솔리드 필름을 시공하여 모던하고 신뢰감 있는 오피스 분위기를 연출했습니다.',
    beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop',
    detailImages: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop'
    ],
    date: '2024-01-20',
    visible: true
  }
];

export const Logo: React.FC<{ color?: string }> = ({ color }) => {
  // 사용자가 제공한 새로운 로고 심볼 이미지 (6pCt9GC)
  const isWhite = color === '#fff' || color === '#ffffff';
  
  return (
    <img 
      src="https://i.imgur.com/6pCt9GC.png" 
      alt="Layered Film Symbol" 
      className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
      style={isWhite ? { filter: 'brightness(0) invert(1)' } : {}}
    />
  );
};
