export default {
  schema: {
    type: 'object',
    required: ['email'],
    properties: {
      username: {
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
