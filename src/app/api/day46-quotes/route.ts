import { NextResponse } from 'next/server'

// 動的レンダリングを強制（キャッシュを無効化）
export const dynamic = 'force-dynamic'

// アニメ名言の固定データ（day9と同じ60個）
const animeQuotes = [
  // 鬼滅の刃
  { quote: "生殺与奪の権を他人に握らせるな!!", character: "冨岡義勇", anime: "鬼滅の刃" },
  { quote: "失っても失っても 生きていくしかないんです どんなに打ちのめされようとも", character: "竈門炭治郎", anime: "鬼滅の刃" },
  { quote: "頑張れ!! 人は心が原動力だから 心はどこまでも強くなれる!!", character: "竈門炭治郎", anime: "鬼滅の刃" },
  { quote: "俺が挫けることは絶対に無い!!", character: "竈門炭治郎", anime: "鬼滅の刃" },
  { quote: "老いることも死ぬことも 人間という儚い生き物の美しさだ", character: "煉獄杏寿郎", anime: "鬼滅の刃" },
  { quote: "心を燃やせ", character: "煉獄杏寿郎", anime: "鬼滅の刃" },
  { quote: "俺は俺の責務を全うする!! ここにいる者は誰も死なせない!!", character: "煉獄杏寿郎", anime: "鬼滅の刃" },
  { quote: "なれるかなれねぇかなんてくだらねぇこと言うんじゃねぇ!! 信じると言われたならそれに応えること以外考えんじゃねぇ!!", character: "嘴平伊之助", anime: "鬼滅の刃" },
  { quote: "悔しくても泣くんじゃねえ どんなに惨めでも恥ずかしくても、生きてかなきゃならねえんだぞ", character: "嘴平伊之助", anime: "鬼滅の刃" },
  { quote: "炭治郎…俺…守ったよ……お前が…これ…命より大事なものだって…言ってたから……", character: "我妻善逸", anime: "鬼滅の刃" },
  { quote: "禰豆子ちゃんは俺が守る", character: "我妻善逸", anime: "鬼滅の刃" },
  { quote: "幸せかどうかは自分で決める 大切なのは\"今\"なんだよ", character: "竈門禰豆子", anime: "鬼滅の刃" },
  { quote: "人の想いこそが永遠であり不滅なんだよ", character: "産屋敷耀哉", anime: "鬼滅の刃" },
  { quote: "一つのことしかできないならそれを極め抜け、極限の極限まで磨け", character: "桑島慈悟郎", anime: "鬼滅の刃" },
  { quote: "俺と禰豆子の絆は誰にも引き裂けない!!", character: "竈門炭治郎", anime: "鬼滅の刃" },
  { quote: "恥じるな 生きてる奴が勝ち", character: "宇髄天元", anime: "鬼滅の刃" },
  { quote: "全ての決定権は私に有り 私の言うことは絶対である", character: "鬼舞辻無惨", anime: "鬼滅の刃" },
  { quote: "お前も繋ぐんだ義勇", character: "錆兎", anime: "鬼滅の刃" },
  { quote: "近道なんてなかった 足掻くしかない", character: "竈門炭治郎", anime: "鬼滅の刃" },
  { quote: "神様どうか、この人が生まれてくる時は鬼になんてなりませんように。", character: "竈門炭治郎", anime: "鬼滅の刃" },
  // 僕のヒーローアカデミア
  { quote: "君はヒーローになれる", character: "オールマイト", anime: "僕のヒーローアカデミア" },
  { quote: "君が救けを求める顔してた", character: "緑谷出久", anime: "僕のヒーローアカデミア" },
  { quote: "余計なお世話はヒーローの本質なんだって", character: "緑谷出久", anime: "僕のヒーローアカデミア" },
  { quote: "君が凄い人だから勝ちたいんじゃないか!! 勝って!! 超えたいんじゃないかバカヤロー!!!", character: "緑谷出久", anime: "僕のヒーローアカデミア" },
  { quote: "でも『デク』って…『頑張れ!!』って感じでなんか好きだ私", character: "麗日お茶子", anime: "僕のヒーローアカデミア" },
  { quote: "なりてえもんちゃんとみろ", character: "轟焦凍", anime: "僕のヒーローアカデミア" },
  { quote: "俺はオールマイトが勝つ姿に憧れた", character: "爆豪勝己", anime: "僕のヒーローアカデミア" },
  { quote: "倒れねーってのは クソ強ェだろ", character: "爆豪勝己", anime: "僕のヒーローアカデミア" },
  { quote: "もう大丈夫！何故って!? 私が来た!!", character: "オールマイト", anime: "僕のヒーローアカデミア" },
  { quote: "ヒーローがマントを羽織るのは！痛くて辛くて苦しんでる女の子を包んであげる為だ！", character: "通形ミリオ", anime: "僕のヒーローアカデミア" },
  { quote: "元気とユーモアのない社会に明るい未来はやって来ない", character: "サー・ナイトアイ", anime: "僕のヒーローアカデミア" },
  { quote: "だから 笑っていろ", character: "サー・ナイトアイ", anime: "僕のヒーローアカデミア" },
  { quote: "日本は理不尽にまみれてる そういう理不尽(ピンチ)を覆していくのがヒーロー", character: "相澤消太", anime: "僕のヒーローアカデミア" },
  { quote: "ヒーローは!! 命を賭してキレイ事実践するお仕事だ！", character: "緑谷出久", anime: "僕のヒーローアカデミア" },
  { quote: "ここを彼のヒーローアカデミアでいさせてください！", character: "麗日お茶子", anime: "僕のヒーローアカデミア" },
  { quote: "君の！力じゃないか!!", character: "緑谷出久", anime: "僕のヒーローアカデミア" },
  { quote: "俺だって、ヒーローに", character: "轟焦凍", anime: "僕のヒーローアカデミア" },
  { quote: "さらに向こうへ、プルスウルトラ！", character: "オールマイト", anime: "僕のヒーローアカデミア" },
  { quote: "勝ったにせよ負けたにせよ 振り返ってこそ経験ってのは活きるんだ", character: "オールマイト", anime: "僕のヒーローアカデミア" },
  { quote: "世の中、笑ってるやつが1番強いからな", character: "志村菜奈", anime: "僕のヒーローアカデミア" },
  // HUNTER×HUNTER
  { quote: "友達になるのにだって資格なんていらない!!", character: "ゴン＝フリークス", anime: "HUNTER×HUNTER" },
  { quote: "ゴン オレ お前にあえて 本当によかった", character: "キルア＝ゾルディック", anime: "HUNTER×HUNTER" },
  { quote: "キルアじゃなきゃダメなんだ", character: "ゴン＝フリークス", anime: "HUNTER×HUNTER" },
  { quote: "逆だよ ゴン オレなんだ ゴン オレ お前にあえて 本当によかった", character: "キルア＝ゾルディック", anime: "HUNTER×HUNTER" },
  { quote: "私はもう何1つ後悔しない 私はいい仲間を持った", character: "クラピカ", anime: "HUNTER×HUNTER" },
  { quote: "もうこれで終わってもいい だから ありったけを", character: "ゴン＝フリークス", anime: "HUNTER×HUNTER" },
  { quote: "死は全く怖くない 一番恐れるのはこの怒りがやがて風化してしまわないかということだ", character: "クラピカ", anime: "HUNTER×HUNTER" },
  { quote: "だます方が悪いに決まっている", character: "クラピカ", anime: "HUNTER×HUNTER" },
  { quote: "その人を知りたければその人が何に対して怒りを感じるかを知れ", character: "ゴン＝フリークス", anime: "HUNTER×HUNTER" },
  { quote: "道草を楽しめ 大いにな ほしいものより大切なものが きっとそっちに転がってる", character: "ジン＝フリークス", anime: "HUNTER×HUNTER" },
  { quote: "感謝するぜ お前と出会えた これまでの全てに!!!", character: "アイザック＝ネテロ", anime: "HUNTER×HUNTER" },
  { quote: "いいハンターってやつは動物に好かれちまうんだ", character: "カイト", anime: "HUNTER×HUNTER" },
  { quote: "おそろしく速い手刀 俺でなきゃ見逃しちゃうね", character: "殺し屋", anime: "HUNTER×HUNTER" },
  { quote: "クセになってんだ 音殺して動くの", character: "キルア＝ゾルディック", anime: "HUNTER×HUNTER" },
  { quote: "キミの敗因は容量（メモリ）のムダ使い♥", character: "ヒソカ＝モロウ", anime: "HUNTER×HUNTER" },
  { quote: "品性は金で買えないよレオリオ", character: "クラピカ", anime: "HUNTER×HUNTER" },
  { quote: "相手が『もう帰ってくれ』って言ってからが本当の商談だぜ", character: "レオリオ＝パラディナイト", anime: "HUNTER×HUNTER" },
  { quote: "挑戦を止めた時が人生の終わる時。", character: "アイザック＝ネテロ", anime: "HUNTER×HUNTER" },
  { quote: "ああ、今すぐキミを壊したい… ♥", character: "ヒソカ＝モロウ", anime: "HUNTER×HUNTER" },
  { quote: "仲間に謝る時はルールがある 「次はどうする」かそいつと約束する そしてそれを絶対守る事だ!!", character: "ジン＝フリークス", anime: "HUNTER×HUNTER" }
];

export async function GET() {
  const total = animeQuotes.length
  const idx = Math.floor(Math.random() * total)
  const picked = animeQuotes[idx]
  const payload = { anime: picked.anime, character: picked.character, quote: picked.quote }
  return NextResponse.json(payload, { status: 200 })
}


