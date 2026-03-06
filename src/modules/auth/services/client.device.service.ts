import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UAParser } from 'ua-parser-js';
import { ClientdeviceInfo } from '../types/interface';
import { ClientDeviceRepository } from 'src/modules/client/repository/client.device.repository';

@Injectable()
export class ClientDeviceService {
  constructor(
    private readonly clientDeviceRepository: ClientDeviceRepository,
  ) {}

  clientInfo(request: Request) {
    const userAgent = request.headers['user-agent'] ?? '';

    const parser = new UAParser(userAgent);
    const device = parser.getDevice();
    const os = parser.getOS();
    const browser = parser.getBrowser();

    return {
      ipAddress: request.ip ?? null,
      deviceType: device.type ?? 'desktop',
      deviceModel: device.model ?? null,
      os: os.name ?? null,
      osVersion: os.version ?? null,
      browser: browser.name ?? null,
      browserVersion: browser.version ?? null,
      userAgent,
    };
  }

  async clientDeviceInfoCreate(payload: ClientdeviceInfo) {
    // return await this.clientDeviceRepository.clientDeviceInfo(payload);
  }
}
