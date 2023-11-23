import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticSearchConstants } from './constants';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async getAllIndices() {
    const result = await this.elasticsearchService.cat.indices({
      format: 'json',
    });

    return result.map((e) => e.index);
  }
  async getAll() {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            match_all: {},
          },
        },
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async matchQuery(searchQuery: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            match: {
              text_entry: searchQuery,
            },
          },
        },
      });

      return result;
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
              [field]: query,
            },
          },
        },
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //TODO: -> It will be change
  async boolQuery(query: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            bool: {},
          },
        },
      });
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

      return result;
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

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //TODO: -> It will be Change
  async wildCardQuery(field: string, wildCard: string) {
    try {
      const result = await this.elasticsearchService.search({
        index: ElasticSearchConstants.INDEX_NAME,
        body: {
          query: {
            wildcard: {
              [field]: {
                wildcard: wildCard,
                value: wildCard + '',
              },
            },
          },
        },
      });

      return result;
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
              [field]: {
                value,
              },
            },
          },
        },
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  //TODO: Advanced Query need practice
  //Autocomplete Suggester
  //Highlighting
  //Ranking Functions
  //Aggregations
  //Match Phrase Query
}
