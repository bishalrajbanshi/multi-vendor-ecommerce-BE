import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/core/drizzle/drizzle.service';
import { clientDeviceTable } from 'src/core/drizzle/schema';
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
