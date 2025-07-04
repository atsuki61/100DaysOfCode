
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

export default function Day16Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen"> {/* 縦方向のフレックスボックス、画面全体の高さ */}
      <Header title="Day 16: Music Search App" />
      <main className="flex-grow container mx-auto px-4 py-8"> {/* 中央揃え、横パディング、縦パディング */}
        {children}
      </main>
      <Footer />
    </div>
  );
}
