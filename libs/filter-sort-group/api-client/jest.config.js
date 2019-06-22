module.exports = {
  name: 'filter-sort-group-api-client',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/filter-sort-group/api-client',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
