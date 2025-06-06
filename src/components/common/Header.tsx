import Link from 'next/link';
import BackToHomeButton from '../BackToHomeButton';
import PortfolioSiteButton from '../PortfolioSiteButton';

type HeaderProps = {
  title: string;
  showHomeLink?: boolean;
  showPortfolioLink?: boolean;
};

export default function Header({ title, showHomeLink = true, showPortfolioLink = false }: HeaderProps) {
  return (
    <nav className="bg-white shadow-sm border-b"> {/* 白背景, 軽い影, 下境界線 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* 最大幅制限, 中央寄せ, レスポンシブ余白 */}
        <div className="flex justify-between h-16 items-center"> {/* フレックス, 両端寄せ, 高さ16, 垂直中央寄せ */}
          <div className="flex items-center"> {/* フレックス, 垂直中央寄せ */}
            {showPortfolioLink ? (
              <PortfolioSiteButton className="self-start" />
            ) : showHomeLink ? (
              <BackToHomeButton className="self-start" />
            ) : null}
          </div>
          <div className="flex items-center"> {/* フレックス, 垂直中央寄せ */}
            <h1 className="text-xl font-bold text-black-800"> {/* 大きい文字, 太字, 紫文字 */}
              {title}
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
} 