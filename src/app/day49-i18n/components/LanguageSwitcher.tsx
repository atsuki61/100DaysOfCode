"use client";

import { useI18n, type Locale } from "../lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  const handleSwitch = () => {
    const newLocale: Locale = locale === "ja" ? "en" : "ja";
    setLocale(newLocale);
  };

  return (
    <div className="flex items-center gap-4"> {/* Flex横並び, 中央揃え, ギャップ4 */}
      {/* 小文字, 灰色テキスト */}
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {locale === "ja" ? "🇯🇵 日本語" : "🇺🇸 English"}
      </span>
      {/* 横パディング4, 縦2, 青背景, 白文字, 角丸, ホバー時濃青, トランジション */}
      <button
        onClick={handleSwitch}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {t.common.switchLanguage}
      </button>
    </div>
  );
}

