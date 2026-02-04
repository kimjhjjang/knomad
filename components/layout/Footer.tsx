import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const linkGroups = [
    {
      title: '서비스',
      links: ['도시 탐색', '도시 비교', '커뮤니티', '리뷰 작성'],
    },
    {
      title: '정보',
      links: ['공지사항', '이용가이드', '자주 묻는 질문', 'API'],
    },
    {
      title: '회사',
      links: ['회사 소개', '채용', '파트너십', '광고 문의'],
    },
    {
      title: '법률',
      links: ['이용약관', '개인정보처리방침', '쿠키 정책', '저작권 정책'],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 링크 그룹 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-white font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 소셜 미디어 & 저작권 */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="text-sm text-center md:text-right">
              <p>&copy; 2024 NOMAD KOREA. All rights reserved.</p>
              <p className="mt-1">Made with ❤️ for Digital Nomads</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
