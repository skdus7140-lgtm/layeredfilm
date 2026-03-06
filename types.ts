
export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  productUsed: string;
  description: string;
  beforeImage: string;
  afterImage: string; // 대표 사진 (Thumbnail)
  detailImages: string[]; // 추가 상세 사진들
  date: string;
  visible: boolean; // 공개/비공개 여부
}

export interface ThemeConfig {
  bgColor: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  brandName: string;
  logoUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  date: string;
}

export enum ProjectCategory {
  APARTMENT = '아파트',
  COMMERCIAL = '상가',
  FURNITURE = '가구',
  OFFICE = '오피스'
}
