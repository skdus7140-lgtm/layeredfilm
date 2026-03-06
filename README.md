
# 🏛️ Layered Film (레이어드필름) Portfolio

프리미엄 인테리어 필름 시공 전문 기업 **레이어드필름**의 공식 포트폴리오 사이트입니다. 
건축적 사고를 기반으로 공간에 새로운 가치를 더하는 브랜드 이미지를 감각적인 UI로 구현했습니다.

## ✨ 주요 기능

- **프리미엄 UI/UX**: Playfair Display 서체를 활용한 고급스러운 디자인과 부드러운 애니메이션.
- **Before/After 슬라이더**: 시공 전후 변화를 사용자가 직접 드래그하며 확인할 수 있는 인터랙티브 컴포넌트.
- **관리자 대시보드 (`/admin`)**:
  - 포트폴리오 프로젝트 실시간 추가/수정/삭제.
  - 사이트 테마 컬러 및 브랜드 이름 실시간 변경.
  - 고객 문의 내역 확인.
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경에 최적화.
- **견적 문의 시스템**: Web3Forms API를 활용하여 서버 없이도 관리자 메일로 직접 문의 수신 가능.

## 🛠️ 기술 스택

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: React Router (HashRouter 사용으로 GitHub Pages 최적화)
- **Deployment**: GitHub Pages / Vercel / Netlify 호환
- **Form API**: Web3Forms

## 🚀 시작하기

1. **저장소 클론**
   ```bash
   git clone [your-repository-url]
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **로컬 실행**
   ```bash
   npm run dev
   ```

## 📧 시공 문의(Web3Forms) 설정

현재 문의 폼은 기본 테스트 키로 설정되어 있습니다. 본인의 이메일로 문의를 직접 받고 싶으시다면:
1. [Web3Forms](https://web3forms.com/)에서 Access Key를 발급받으세요.
2. `pages/Contact.tsx` 파일 내 `PUBLIC_ACCESS_KEY` 변수 값을 교체하세요.

## 🔐 관리자 페이지 접근

브라우저 주소창에 `URL/#/admin`을 입력하면 관리자 대시보드에 접속할 수 있습니다. 
(현재는 데모용으로 별도의 로그인이 없으나, 운영 시 Firebase Auth 등을 통해 보안을 강화할 수 있습니다.)

---
© 2024 Layered Film. Designed for Excellence.
