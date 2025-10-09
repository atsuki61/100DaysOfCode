"use client";

import { useI18n, type Locale } from "../lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  const handleSwitch = () => {
    const newLocale: Locale = locale === "ja" ? "en" : "ja";
    setLocale(newLocale);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600 dark:text-gray-300"> {/* 小文字, 灰色テキスト */}
        {locale === "ja" ? "🇯🇵 日本語" : "🇺🇸 English"}
      </span>
      <button
        onClick={handleSwitch}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" {/* 横パディング4, 縦2, 青背景, 白文字, 角丸, ホバー時濃青, トランジション */}
      >
        {t.common.switchLanguage}
      </button>
    </div>
  );
}

