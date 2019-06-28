module.exports = {
  name: 'reactive-bindings-and-hooks-feature-shell',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/reactive-bindings-and-hooks/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
