export const COMMITS_TYPES = {
  feat: {
    emoji: '✨',
    description: 'A new feature',
    release: true
  },
  fix: {
    emoji: '🐛',
    description: 'A bug fix',
    release: true
  },
  docs: {
    emoji: '📝',
    description: 'Documentation only changes',
    release: false
  },
  style: {
    emoji: '💄',
    description: 'Changes that do not affect the meaning of the code',
    release: false
  },
  refactor: {
    emoji: '♻️',
    description: 'A code change that neither fixes a bug nor adds a feature',
    release: true
  },
  perf: {
    emoji: '⚡️',
    description: 'A code change that improves performance',
    release: true
  },
  test: {
    emoji: '🔬',
    description: 'Adding missing tests or correcting existing tests',
    release: false
  }
}
