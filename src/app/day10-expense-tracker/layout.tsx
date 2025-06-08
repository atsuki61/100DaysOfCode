import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import PageHeader from "@/components/common/PageHeader";
import React from "react";

export default function Day10Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="Day10: 支出管理アプリ" />
      <PageHeader
        title="Day 10: 支出管理アプリ"
        description="収入と支出を記録・管理するシンプルなアプリです。"
      />
      <main className="flex-grow bg-gray-50 min-h-screen">{children}</main>
      <Footer currentDay={10} />
    </>
  );
}
