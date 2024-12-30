module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(feat|fix|docs|style|refactor|test|chore): (\w*)\/(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
};
