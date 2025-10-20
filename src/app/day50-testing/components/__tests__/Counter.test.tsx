import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from '../Counter'

describe('Counter コンポーネント', () => {
  // 基本的なレンダリングテスト
  test('初期値として0が表示される', () => {
    render(<Counter />)
    const countValue = screen.getByTestId('count-value')
    expect(countValue).toHaveTextContent('0')
  })

  test('増減ボタンとリセットボタンが表示される', () => {
    render(<Counter />)
    expect(screen.getByLabelText('Increment')).toBeInTheDocument()
    expect(screen.getByLabelText('Decrement')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'リセット' })).toBeInTheDocument()
  })

  // インクリメント機能のテスト
  test('+ ボタンをクリックすると値が1増える', () => {
    render(<Counter />)
    const incrementButton = screen.getByLabelText('Increment')
    const countValue = screen.getByTestId('count-value')

    fireEvent.click(incrementButton)
    expect(countValue).toHaveTextContent('1')

    fireEvent.click(incrementButton)
    expect(countValue).toHaveTextContent('2')
  })

  // デクリメント機能のテスト
  test('- ボタンをクリックすると値が1減る', () => {
    render(<Counter />)
    const decrementButton = screen.getByLabelText('Decrement')
    const countValue = screen.getByTestId('count-value')

    fireEvent.click(decrementButton)
    expect(countValue).toHaveTextContent('-1')

    fireEvent.click(decrementButton)
    expect(countValue).toHaveTextContent('-2')
  })

  // リセット機能のテスト
  test('リセットボタンをクリックすると値が0に戻る', () => {
    render(<Counter />)
    const incrementButton = screen.getByLabelText('Increment')
    const resetButton = screen.getByRole('button', { name: 'リセット' })
    const countValue = screen.getByTestId('count-value')

    // まず値を増やす
    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)
    expect(countValue).toHaveTextContent('3')

    // リセット
    fireEvent.click(resetButton)
    expect(countValue).toHaveTextContent('0')
  })

  // 複数の操作を組み合わせたテスト
  test('増減を繰り返しても正しく動作する', () => {
    render(<Counter />)
    const incrementButton = screen.getByLabelText('Increment')
    const decrementButton = screen.getByLabelText('Decrement')
    const countValue = screen.getByTestId('count-value')

    fireEvent.click(incrementButton) // 1
    fireEvent.click(incrementButton) // 2
    fireEvent.click(decrementButton) // 1
    fireEvent.click(incrementButton) // 2
    fireEvent.click(incrementButton) // 3

    expect(countValue).toHaveTextContent('3')
  })

  // userEvent を使った代替テスト（より実際のユーザー操作に近い）
  test('userEvent を使った操作テスト', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    
    const incrementButton = screen.getByLabelText('Increment')
    const countValue = screen.getByTestId('count-value')

    await user.click(incrementButton)
    await user.click(incrementButton)
    
    expect(countValue).toHaveTextContent('2')
  })
})

