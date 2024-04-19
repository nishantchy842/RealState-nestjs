import { Injectable, Logger } from '@nestjs/common';
// import { Interval } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  // @Interval(10000)
  // handleCron() {
  //   this.logger.debug('Called when the current second is 45');
  // }

  getHello(): string {
    return 'Hello World!';
  }
}
