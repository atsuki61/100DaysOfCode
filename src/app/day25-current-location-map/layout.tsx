import type { Metadata } from "next";
import Header from "@/components/common/Header";
import PageHeader from "@/components/common/PageHeader";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Day 25 - 現在地マップ",
  description: "Geolocation APIと地図ライブラリを使って現在地を地図上に表示するアプリ",
};

export default function Day25Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header title="100DaysOfCodeチャレンジ" /> {/* titleプロパティを追加 */}
      <PageHeader title="Day 25 - 現在地マップ" description="Geolocation APIと地図ライブラリを使って現在地を地図上に表示するアプリ" /> {/* titleとdescriptionプロパティを追加 */}
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50"> {/* 背景色と最小高さを設定 */}
        {children}
      </main>
      <Footer
        currentDay={25} // currentDayプロパティを追加
      />
    </>
  );
}
