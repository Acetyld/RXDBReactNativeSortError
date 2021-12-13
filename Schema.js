const heroSchema = {
  version: 0,
  title: 'hero schema',
  description: 'describes a simple hero',
  primaryKey: 'name',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    color: {
      type: 'string',
    },
    status: {
      type: 'number',
    },
    priority: {
      type: 'number',
    },
  },
  required: ['name'],
  indexes: ['status', 'priority'],
};

export default heroSchema;
