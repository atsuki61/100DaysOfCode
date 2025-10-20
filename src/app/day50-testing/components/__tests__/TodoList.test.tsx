import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoList } from '../TodoList'

describe('TodoList コンポーネント', () => {
  // レンダリングテスト
  test('初期状態では空のメッセージが表示される', () => {
    render(<TodoList />)
    expect(screen.getByTestId('empty-message')).toHaveTextContent('タスクがありません')
  })

  test('入力フィールドと追加ボタンが表示される', () => {
    render(<TodoList />)
    expect(screen.getByLabelText('New todo input')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '追加' })).toBeInTheDocument()
  })

  // Todo追加テスト
  test('新しいTodoを追加できる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')
    const addButton = screen.getByRole('button', { name: '追加' })

    await user.type(input, 'テストタスク')
    await user.click(addButton)

    expect(screen.getByText('テストタスク')).toBeInTheDocument()
    expect(input).toHaveValue('') // 入力欄がクリアされる
  })

  test('Enterキーで新しいTodoを追加できる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')

    await user.type(input, 'Enterキーでのタスク{Enter}')

    expect(screen.getByText('Enterキーでのタスク')).toBeInTheDocument()
  })

  test('空白のみのTodoは追加されない', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')
    const addButton = screen.getByRole('button', { name: '追加' })

    await user.type(input, '   ')
    await user.click(addButton)

    expect(screen.getByTestId('empty-message')).toBeInTheDocument()
  })

  // Todo完了テスト
  test('Todoを完了状態にできる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')
    await user.type(input, 'テストタスク{Enter}')

    const checkbox = screen.getByLabelText('Toggle テストタスク')
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
    
    // 完了済みのタスクは取り消し線が入る
    const todoText = screen.getByText('テストタスク')
    expect(todoText).toHaveClass('line-through')
  })

  test('完了状態のTodoを未完了に戻せる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')
    await user.type(input, 'テストタスク{Enter}')

    const checkbox = screen.getByLabelText('Toggle テストタスク')
    
    // 完了にする
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    
    // 未完了に戻す
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  // Todo削除テスト
  test('Todoを削除できる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')
    await user.type(input, 'テストタスク{Enter}')

    expect(screen.getByText('テストタスク')).toBeInTheDocument()

    const deleteButton = screen.getByLabelText('Delete テストタスク')
    await user.click(deleteButton)

    expect(screen.queryByText('テストタスク')).not.toBeInTheDocument()
    expect(screen.getByTestId('empty-message')).toBeInTheDocument()
  })

  // 統計表示テスト
  test('Todo統計が正しく表示される', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')

    // 3つのタスクを追加
    await user.type(input, 'タスク1{Enter}')
    await user.type(input, 'タスク2{Enter}')
    await user.type(input, 'タスク3{Enter}')

    // 1つを完了にする
    const checkbox = screen.getByLabelText('Toggle タスク1')
    await user.click(checkbox)

    const stats = screen.getByTestId('todo-stats')
    expect(stats).toHaveTextContent('合計: 3 個')
    expect(stats).toHaveTextContent('完了: 1 個')
  })

  test('空の状態では統計が表示されない', () => {
    render(<TodoList />)
    expect(screen.queryByTestId('todo-stats')).not.toBeInTheDocument()
  })

  // 複数のTodoを扱うテスト
  test('複数のTodoを追加・管理できる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')

    // 複数のタスクを追加
    await user.type(input, 'タスク1{Enter}')
    await user.type(input, 'タスク2{Enter}')
    await user.type(input, 'タスク3{Enter}')

    const todoItems = screen.getAllByTestId('todo-item')
    expect(todoItems).toHaveLength(3)
  })

  // リスト内の特定の要素に対するテスト
  test('特定のTodoのみを削除できる', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')

    await user.type(input, 'タスク1{Enter}')
    await user.type(input, 'タスク2{Enter}')
    await user.type(input, 'タスク3{Enter}')

    // タスク2だけを削除
    const deleteButton = screen.getByLabelText('Delete タスク2')
    await user.click(deleteButton)

    expect(screen.getByText('タスク1')).toBeInTheDocument()
    expect(screen.queryByText('タスク2')).not.toBeInTheDocument()
    expect(screen.getByText('タスク3')).toBeInTheDocument()
  })

  // アクセシビリティテスト
  test('TodoリストがroleListを持つ', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByLabelText('New todo input')
    await user.type(input, 'テストタスク{Enter}')

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
  })
})

