'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartDataPoint } from '../types';

interface ScoreBarChartProps {
  data: ChartDataPoint[];
  showListening: boolean;
  showReading: boolean;
  showTotal: boolean;
}

export default function ScoreBarChart({
  data,
  showListening,
  showReading,
  showTotal
}: ScoreBarChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg"> {/* 白背景, パディング6, 角丸大, 影 */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 スコア推移（棒グラフ）</h3> {/* 大文字, セミ太字, グレー文字, 下マージン4 */}
      
      {/* レスポンシブ, 幅100%, 高さ400px */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" /> {/* グリッド線, 破線, 薄い青色 */}
          <XAxis
            dataKey="formattedDate"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 12, fill: '#6b7280' }} // フォントサイズ12, グレー色
          />
          <YAxis
            domain={[0, 990]}
            tick={{ fontSize: 12, fill: '#6b7280' }} // フォントサイズ12, グレー色
            label={{ value: 'スコア', angle: -90, position: 'insideLeft' }} // ラベル
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value: number, name: string) => {
              const nameMap: { [key: string]: string } = {
                listening: 'リスニング',
                reading: 'リーディング',
                total: '総合スコア'
              };
              return [`${value}点`, nameMap[name] || name];
            }}
            labelFormatter={(label) => `受験日: ${label}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value: string) => {
              const nameMap: { [key: string]: string } = {
                listening: 'リスニング',
                reading: 'リーディング',
                total: '総合スコア'
              };
              return nameMap[value] || value;
            }}
          />
          
          {showListening && (
            <Bar
              dataKey="listening"
              fill="#3b82f6" // 青色
              name="listening"
              radius={[4, 4, 0, 0]} // 上角丸
            />
          )}
          
          {showReading && (
            <Bar
              dataKey="reading"
              fill="#10b981" // 緑色
              name="reading"
              radius={[4, 4, 0, 0]} // 上角丸
            />
          )}
          
          {showTotal && (
            <Bar
              dataKey="total"
              fill="#8b5cf6" // 紫色
              name="total"
              radius={[4, 4, 0, 0]} // 上角丸
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 