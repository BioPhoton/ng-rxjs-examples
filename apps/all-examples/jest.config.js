module.exports = {
  name: 'all-examples',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/all-examples',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
