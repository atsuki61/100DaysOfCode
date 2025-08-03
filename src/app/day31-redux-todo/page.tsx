'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { TodoForm, TodoList, TodoFilter } from './components'

export default function Day31Page() {
  return (
    <Provider store={store}>
      <div className="max-w-4xl mx-auto p-6">


        {/* メインコンテンツ */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* 新規タスク追加フォーム */}
          <TodoForm />

          {/* フィルタリング */}
          <div className="mb-6">
            <TodoFilter />
          </div>

          {/* ToDoリスト */}
          <TodoList />
        </div>

        {/* 学習ポイント */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            🎓 学習ポイント
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h3 className="font-medium mb-2">Redux Toolkit</h3>
              <ul className="space-y-1">
                <li>• createSliceによる状態管理</li>
                <li>• configureStoreによるストア設定</li>
                <li>• Immer統合によるイミュータブル更新</li>
                <li>• 型安全なアクションとリデューサー</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">React-Redux</h3>
              <ul className="space-y-1">
                <li>• useSelectorによる状態取得</li>
                <li>• useDispatchによるアクション送信</li>
                <li>• Providerによるストア提供</li>
                <li>• コンポーネント間の状態共有</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  )
} 