export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>

        <div className="prose max-w-none space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. 수집하는 개인정보</h2>
            <p>서비스는 회원가입 시 다음과 같은 개인정보를 수집합니다:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>이메일 주소</li>
              <li>이름 (선택)</li>
              <li>비밀번호 (암호화 저장)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. 개인정보의 이용 목적</h2>
            <p>수집한 개인정보는 다음의 목적을 위해 이용됩니다:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>회원 식별 및 인증</li>
              <li>서비스 제공 및 개선</li>
              <li>리뷰 및 커뮤니티 게시글 작성자 표시</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. 개인정보의 보관 기간</h2>
            <p>
              회원 탈퇴 시 즉시 파기하며, 관련 법령에 따라 보존이 필요한 경우
              해당 기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. 개인정보의 제3자 제공</h2>
            <p>
              서비스는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. 이용자의 권리</h2>
            <p>
              이용자는 언제든지 본인의 개인정보를 조회, 수정, 삭제할 수 있으며,
              회원 탈퇴를 요청할 수 있습니다.
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            본 개인정보처리방침은 데모 목적으로 작성되었으며, 실제 법적 효력이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
