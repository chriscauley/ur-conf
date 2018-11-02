export default {
  schema: {
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        title: 'Email Address',
      },
    },
  },

  uiSchema: {
    email: {
      'ui:widget': 'email',
    },
  },
}
