import { Controller, Get, Query } from '@nestjs/common';
import { AccessToken } from 'livekit-server-sdk';

@Controller()
export class AppController {
  @Get('/getToken')
  getHello(@Query('name') name: string) {
    const LK_API_KEY = 'APIXeBrQ6aXLUxm';
    const LK_API_SECRET = 'zexHOyW9K2tEroBCl71Feh8Medo5aK6vvQWKJIw4DWjA';
    const roomName = 'hack';

    const at = new AccessToken(LK_API_KEY, LK_API_SECRET, {
      identity: name as string,
    });
    at.addGrant({ roomJoin: true, room: roomName });

    const reuslt = at.toJwt();

    return reuslt;
  }
}
