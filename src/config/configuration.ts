export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  elasticSearch: {
    host: process.env.ELASTICSEARCH_NODE,
  },
});
