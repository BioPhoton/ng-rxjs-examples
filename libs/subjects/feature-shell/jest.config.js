module.exports = {
  name: 'subjects-feature-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/subjects/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
