// snake-to-camel.pipe.ts
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';


@Injectable()
export class SnakeToCamelPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' || metadata.type === 'query' || metadata.type === 'param') {
      return camelcaseKeys(value, { deep: true });
    }
    return value;
  }
}