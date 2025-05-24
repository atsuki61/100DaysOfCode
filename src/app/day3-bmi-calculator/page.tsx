'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function BMICalculatorPage() {// BMI計算機のページ
  const [height, setHeight] = useState<string>('')// 身長の入力値
  const [weight, setWeight] = useState<string>('')// 体重の入力値
  const [bmi, setBMI] = useState<number | null>(null)// BMIの計算結果
  const [bmiCategory, setBMICategory] = useState<string>('')// BMIのカテゴリ

  const calculateBMI = () => {// BMIの計算
    const heightInMeters = parseFloat(height) / 100//parseFloatは文字列を数値に変換する関数
    const weightInKg = parseFloat(weight)//体重を数値に変換

    if (heightInMeters > 0 && weightInKg > 0) {//身長と体重が0より大きい場合
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)//BMIの計算,体重を身長の二乗で割る
      setBMI(calculatedBMI)//BMIの計算結果をセット
      setBMICategory(getBMICategory(calculatedBMI))//BMIのカテゴリをセット,getBMICategoryはBMIのカテゴリを取得する関数
    }
  }

  const getBMICategory = (bmi: number): string => {//BMIのカテゴリを取得する関数
    if (bmi < 18.5) return '低体重'//BMIが18.5未満の場合
    if (bmi < 25) return '標準体重'//BMIが25未満の場合
    if (bmi < 30) return '過体重'//BMIが30未満の場合
    return '肥満'//BMIが30以上の場合
  }

  const getBMIColor = (category: string): string => {//BMIのカテゴリの色を取得する関数
    switch (category) {
      case '低体重': return 'text-blue-600'//低体重の場合
      case '標準体重': return 'text-green-600'//標準体重の場合
      case '過体重': return 'text-yellow-600'//過体重の場合
      case '肥満': return 'text-red-600'//肥満の場合
      default: return 'text-gray-600'//その他の場合
    }
  }

  const resetCalculator = () => {//計算機をリセットする関数
    setHeight('')//身長を空にする
    setWeight('')//体重を空にする
    setBMI(null)//BMIを空にする
    setBMICategory('')//BMIのカテゴリを空にする
  }

  const isValidInput = height !== '' && weight !== '' && parseFloat(height) > 0 && parseFloat(weight) > 0//身長と体重が空でないかつ数値であるかつ0より大きい場合

  return (
    <>
      {/* 画面全体: 最小高さ100vh, 青系グラデーション背景, パディング4 */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        {/* メインコンテナ: 最大幅大サイズ, 中央配置, 上パディング12 */}
        <div className="max-w-4xl mx-auto pt-12">
          {/* 2カラムレイアウト: デスクトップは横並び, モバイルは縦積み, 間隔8 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 左側: BMI計算機 */}
            <div>
              <Card className="shadow-lg"> {/* メインカード: 影大 */}
                <CardHeader className="text-center"> {/* カードヘッダー: 中央揃え */}
                  <CardTitle className="text-2xl font-bold text-gray-800"> {/* タイトル: 文字大, 太字, グレー文字 */}
                    BMI計算機
                  </CardTitle>
                  <CardDescription className="text-gray-600"> {/* 説明文: グレー文字 */}
                    身長と体重を入力してBMIを計算しましょう
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6"> {/* カードコンテンツ: 縦間隔6 */}
                  <div className="space-y-2"> {/* 身長入力エリア: 縦間隔2 */}
                    <Label htmlFor="height" className="text-sm font-medium"> {/* ラベル: 小文字, 中太字 */}
                      身長 (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="text-lg" // 文字大
                    />
                  </div>

                  <div className="space-y-2"> {/* 体重入力エリア: 縦間隔2 */}
                    <Label htmlFor="weight" className="text-sm font-medium"> {/* ラベル: 小文字, 中太字 */}
                      体重 (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="65"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="text-lg" // 文字大
                    />
                  </div>

                  <div className="flex gap-3"> {/* ボタンエリア: 横並び, 間隔3 */}
                    <Button
                      onClick={calculateBMI}
                      disabled={!isValidInput}
                      className="flex-1 text-lg py-6" // フレックス伸縮, 文字大, 縦パディング6
                    >
                      計算する
                    </Button>
                    <Button
                      onClick={resetCalculator}
                      variant="outline"
                      className="px-6 py-6" // 横パディング6, 縦パディング6
                    >
                      リセット
                    </Button>
                  </div>

                  {bmi && (
                    <Card className="bg-gray-50 border-2"> {/* 結果カード: グレー背景, 境界線太さ2 */}
                      <CardContent className="pt-6 text-center"> {/* カードコンテンツ: 上パディング6, 中央揃え */}
                        <div className="text-3xl font-bold text-gray-800 mb-2"> {/* BMI値: 文字特大, 太字, グレー文字, 下マージン2 */}
                          {bmi.toFixed(1)}
                        </div>
                        <div className={`text-lg font-semibold ${getBMIColor(bmiCategory)}`}> {/* カテゴリ表示: 文字大, 太字, 動的色 */}
                          {bmiCategory}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 右側: BMI目安表 */}
            <div>
              <Card className="shadow-lg"> {/* 目安表カード: 影大 */}
                <CardHeader className="text-center"> {/* カードヘッダー: 中央揃え */}
                  <CardTitle className="text-xl font-bold text-gray-800"> {/* タイトル: 文字大, 太字, グレー文字 */}
                    BMI判定基準
                  </CardTitle>
                  <CardDescription className="text-gray-600"> {/* 説明文: グレー文字 */}
                    世界保健機関（WHO）基準
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4"> {/* カードコンテンツ: 縦間隔4 */}
                  {/* 低体重 */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200"> {/* フレックス, アイテム中央, 両端揃え, パディング3, 角丸大, 青背景, 青境界線 */}
                    <span className="font-medium text-blue-700">低体重</span> {/* 中太字, 青文字 */}
                    <span className="text-sm text-blue-600">&lt; 18.5</span> {/* 小文字, 青文字 */}
                  </div>
                  
                  {/* 標準体重 */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200"> {/* フレックス, アイテム中央, 両端揃え, パディング3, 角丸大, 緑背景, 緑境界線 */}
                    <span className="font-medium text-green-700">標準体重</span> {/* 中太字, 緑文字 */}
                    <span className="text-sm text-green-600">18.5 - 24.9</span> {/* 小文字, 緑文字 */}
                  </div>
                  
                  {/* 過体重 */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200"> {/* フレックス, アイテム中央, 両端揃え, パディング3, 角丸大, 黄背景, 黄境界線 */}
                    <span className="font-medium text-yellow-700">過体重</span> {/* 中太字, 黄文字 */}
                    <span className="text-sm text-yellow-600">25.0 - 29.9</span> {/* 小文字, 黄文字 */}
                  </div>
                  
                  {/* 肥満 */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200"> {/* フレックス, アイテム中央, 両端揃え, パディング3, 角丸大, 赤背景, 赤境界線 */}
                    <span className="font-medium text-red-700">肥満</span> {/* 中太字, 赤文字 */}
                    <span className="text-sm text-red-600">&geq; 30.0</span> {/* 小文字, 赤文字 */}
                  </div>

                  {/* 注意事項 */}
                  <div className="mt-6 p-3 bg-gray-50 rounded-lg border"> {/* 上マージン6, パディング3, グレー背景, 角丸大, 境界線 */}
                    <h4 className="text-sm font-medium text-gray-700 mb-2">注意事項</h4> {/* 小文字, 中太字, グレー文字, 下マージン2 */}
                    <ul className="text-xs text-gray-600 space-y-1"> {/* 極小文字, グレー文字, 縦間隔1 */}
                      <li>• 筋肉量や骨密度は考慮されません</li>
                      <li>• 妊娠中の方は使用しないでください</li>
                      <li>• 医療上のアドバイスではありません</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* フッター情報: 中央揃え, 上マージン8, 小文字, グレー文字 */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>BMI = 体重(kg) ÷ 身長(m)²</p>
          </div>
        </div>
      </div>
    </>
  )
}
