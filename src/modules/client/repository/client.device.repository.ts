import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/drizzle/drizzle.service';

@Injectable()
export class ClientDeviceRepository {
  constructor(private readonly drizzleService: DrizzleService) {}

  // async clientDeviceInfo(payload: ClientdeviceInfo) {
  //   const [record] = await this.drizzleService.client
  //     .insert(clientDeviceTable)
  //     .values({
  //       ...payload,
  //     })
  //     .returning();
  //   return record || null;
  // }
}
