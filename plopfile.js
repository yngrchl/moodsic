module.exports = plop => {
  plop.setGenerator('component', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What would you like to call this component?',
      },
      {
        type: 'input',
        name: 'path',
        message:
          'Enter a path for this component, or press enter to use the default',
        default: 'components',
      },
    ],
    actions() {
      const actions = [
        {
          type: 'add',
          path: '{{path}}/{{properCase name}}/index.js',
          templateFile: 'plop-templates/index.js',
        },
        {
          type: 'add',
          path: '{{path}}/{{properCase name}}/{{properCase name}}.js',
          templateFile: 'plop-templates/component.js',
        },
        {
          type: 'add',
          path: '{{path}}/{{properCase name}}/{{properCase name}}.test.js',
          templateFile: 'plop-templates/component-test.js',
        },
        {
          type: 'add',
          path: '{{path}}/{{properCase name}}/{{properCase name}}.module.scss',
          templateFile: 'plop-templates/module.scss',
        },
      ];

      return actions;
    },
  });
};
