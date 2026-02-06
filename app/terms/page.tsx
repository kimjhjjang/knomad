export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">이용약관</h1>

        <div className="prose max-w-none space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제1조 (목적)</h2>
            <p>
              이 약관은 NOMAD KOREA(이하 &quot;서비스&quot;)가 제공하는 디지털 노마드 도시 정보 서비스의
              이용에 관한 기본적인 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제2조 (서비스의 내용)</h2>
            <p>서비스는 다음과 같은 내용을 제공합니다:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>대한민국 도시별 디지털 노마드 정보 제공</li>
              <li>코워킹 스페이스, 숙소, 생활비 정보</li>
              <li>사용자 리뷰 및 커뮤니티 기능</li>
              <li>도시 비교 기능</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제3조 (이용자의 의무)</h2>
            <p>
              이용자는 서비스 이용 시 타인의 권리를 침해하거나 관계 법령을 위반하는
              행위를 하여서는 안 됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제4조 (서비스의 변경 및 중단)</h2>
            <p>
              서비스는 운영상, 기술상의 필요에 의해 제공되는 서비스의 전부 또는 일부를
              변경하거나 중단할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">제5조 (면책조항)</h2>
            <p>
              서비스에서 제공하는 도시 정보, 생활비, 코워킹 스페이스 정보 등은 참고용이며,
              실제와 다를 수 있습니다. 서비스는 이로 인한 손해에 대해 책임을 지지 않습니다.
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            본 약관은 데모 목적으로 작성되었으며, 실제 법적 효력이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
