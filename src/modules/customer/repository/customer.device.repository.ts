import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/database/drizzle.service';
import { ClientdeviceInfo } from 'src/modules/auth/types/interface';

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
