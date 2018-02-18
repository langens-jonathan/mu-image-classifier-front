import DS from 'ember-data';

export default DS.Model.extend({
  fileName: DS.attr('string'),
  originalFilename: DS.attr('string'),
  uploadedAt: DS.attr('string'),
  status: DS.attr('string'),
});
