const getPoolConfig = (configService) => {
  return {
    user: configService.get('PG_USER'),
    host: configService.get('PG_HOST'),
    database: configService.get('PG_NAME'),
    password: configService.get('PG_PASSWORD'),
    port: Number(configService.get('PG_PORT')),
  };
};

module.exports = { getPoolConfig };
