export default {
  schema: {
    title: 'Please Login to continue',
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: {
        type: 'string',
        title: 'Email Address',
      },
      password: {
        type: 'string',
        title: 'Password',
        minLength: 8,
      },
    },
  },

  uiSchema: {
    password: {
      'ui:widget': 'password',
    },
  },
}
