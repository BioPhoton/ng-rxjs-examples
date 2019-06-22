module.exports = {
  name: 'filter-sort-group-feature-shell',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/filter-sort-group/feature-shell',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
