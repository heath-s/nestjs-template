const production = process.env.NODE_ENV === 'production';

export default {
  production,
  port: production ? process.env.PORT || 3000 : 3000,
};
