import DS from 'ember-data';

export default DS.Model.extend({
    file: DS.belongsTo('file'),
});
