module.exports = {
  name: 'polling-feature-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/polling/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
