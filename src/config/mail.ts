interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'fabioniglio@gmail.com', // colocar email que foi cadastrado de dominio na aws SES
      name: 'Fabio Niglio',
    },
  },
} as IMailConfig;
