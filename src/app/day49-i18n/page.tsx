"use client";

import { useState, useMemo } from "react";
import { I18nContext, type Locale } from "./lib/i18n";
import { ja } from "./locales/ja";
import { en } from "./locales/en";
import LanguageSwitcher from "./components/LanguageSwitcher";

export default function Day49I18nPage() {
  const [locale, setLocale] = useState<Locale>("ja");

  const translations = useMemo(() => (locale === "ja" ? ja : en), [locale]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: translations }}>
      <div className="w-full max-w-3xl mx-auto space-y-6"> {/* 横幅最大3xl, 中央寄せ, 縦スペース6 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6"> {/* 白背景, 角丸xl, 影xl, ボーダー, パディング6 */}
          <div className="flex justify-between items-center mb-6"> {/* Flex横並び, 両端揃え, 中央揃え, 下マージン6 */}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100"> {/* 文字2xl, 太字, 灰色テキスト */}
              {translations.common.welcome}
            </h1>
            <LanguageSwitcher />
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6"> {/* 灰色テキスト, 下マージン6 */}
            {translations.common.description}
          </p>

          <div className="grid gap-4 mb-6"> {/* グリッド, ギャップ4, 下マージン6 */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"> {/* パディング4, 薄青背景, 角丸lg */}
              <h2 className="font-semibold text-lg text-blue-900 dark:text-blue-100 mb-2"> {/* 太字, 文字lg, 青テキスト, 下マージン2 */}
                {translations.greeting.hello}
              </h2>
              <p className="text-sm text-blue-700 dark:text-blue-300"> {/* 小文字, 青テキスト */}
                {translations.greeting.goodMorning} / {translations.greeting.goodEvening}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4"> {/* 文字xl, 太字, 灰色テキスト, 下マージン4 */}
              {translations.features.title}
            </h2>
            <ul className="space-y-2"> {/* リスト, 縦スペース2 */}
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300"> {/* Flex横並び, 中央揃え, ギャップ2, 灰色テキスト */}
                <span className="text-green-600">✓</span>
                {translations.features.item1}
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">✓</span>
                {translations.features.item2}
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600">✓</span>
                {translations.features.item3}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </I18nContext.Provider>
  );
}

