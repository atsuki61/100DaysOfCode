'use client'

import React from 'react'
import { Counter } from './components/Counter'
import { UserForm } from './components/UserForm'
import { TodoList } from './components/TodoList'

export default function TestingPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-8">

        {/* 説明セクション */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            学習内容
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>Jest の導入と設定</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>React Testing Library の基本</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>ユニットテストの作成</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>統合テストの作成</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>ユーザーイベントのテスト</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span>テストカバレッジの確認</span>
            </li>
          </ul>
        </div>
        {/* Counter コンポーネント */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            1. Counter コンポーネント
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            シンプルな状態管理とボタンクリックのテスト
          </p>
          <Counter />
        </div>

        {/* UserForm コンポーネント */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            2. UserForm コンポーネント
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            フォーム入力とバリデーションのテスト
          </p>
          <UserForm />
        </div>

        {/* TodoList コンポーネント */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            3. TodoList コンポーネント
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            リスト操作の統合テスト
          </p>
          <TodoList />
        </div>

        {/* テスト実行方法 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-md p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">テストの実行方法</h3>
          <div className="bg-black bg-opacity-20 rounded p-4 space-y-2 font-mono text-sm">
            <p># すべてのテストを実行</p>
            <p className="text-yellow-300">npm test</p>
            <p className="mt-2"># ウォッチモードで実行</p>
            <p className="text-yellow-300">npm run test:watch</p>
            <p className="mt-2"># カバレッジを確認</p>
            <p className="text-yellow-300">npm run test:coverage</p>
          </div>
        </div>
      </div>
    </div>
  )
}
