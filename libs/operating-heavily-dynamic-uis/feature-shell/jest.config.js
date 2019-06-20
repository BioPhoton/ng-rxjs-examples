module.exports = {
  name: 'operating-heavily-dynamic-uis-feature-shell',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/operating-heavily-dynamic-uis/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
