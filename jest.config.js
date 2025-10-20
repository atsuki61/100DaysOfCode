const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Next.js アプリのパスを提供して、next.config.js と .env ファイルをテスト環境に読み込む
  dir: './',
})

// Jest に渡すカスタム設定
const customJestConfig = {
  // テストごとに自動的にモックをクリア
  clearMocks: true,
  
  // カバレッジ情報を収集
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/_*.{js,jsx,ts,tsx}',
  ],
  
  // テスト環境を jsdom に設定
  testEnvironment: 'jest-environment-jsdom',
  
  // セットアップファイル
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // モジュールパスのエイリアス
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // テストファイルのパターン
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
}

// createJestConfig は、非同期で next/jest が Next.js の設定を読み込めるようにエクスポートされる
module.exports = createJestConfig(customJestConfig)

