import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticSearchConstants } from './constants';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async getIndexByName(name: string) {
    try {
      const result = await this.elasticsearchService.cat.indices({
        format: 'json',
      });

      const response = result.find((e) => e.index === name);

      return await this.getAll(response.index);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  async getAllIndices() {
    const result = await this.elasticsearchService.cat.indices({
      format: 'json',
    });

    return result.map((e) => e.index);
  }
  async getAll(index: string) {
    try {
      const result = await this.elasticsearchService.search({
        index,
        body: {
          query: {
            match_all: {},
          },
        },
      });

      return result.hits.hits[0]._source;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllData(index: string) {
    try {
      const result = await this.elasticsearchService.search({
        index,
        body: {
          query: {
            match_all: {},
          },
        },
      });

      return result.hits.hits.map((e) => e._source);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async matchQuery(searchQuery: string, field: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            match: {
              [field]: searchQuery,
            },
          },
        },
      });

      return result.hits.hits[0]._source;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async termQuery(query: string, field: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            term: {
              [`${field}.keyword`]: query,
            },
          },
        },
      });

      return result.hits.hits[0]._source;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async boolQuery(query: string, field: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            bool: {
              must: {
                match: { [field]: query },
              },
            },
          },
        },
      });

      return result.hits.hits;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async rangeQuery(field: string, lower: string, upper: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            range: {
              [field]: {
                gte: lower,
                lte: upper,
              },
            },
          },
        },
      });

      return result.hits.hits[0]._source;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async fuzzyQuery(field: string, value: string, fuzziness: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            fuzzy: {
              [field]: {
                value,
                fuzziness,
              },
            },
          },
        },
      });

      return result.hits.hits[0]._source;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async prefixQuery(field: string, value: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            prefix: {
              [`${field}.keyword`]: {
                value,
              },
            },
          },
        },
      });

      return result.hits.hits[0]._source;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
