import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthLibService,
  AuthResponseEntity,
  LoginDto,
  RefreshTokenDto,
  RegisterDto,
} from '@app/auth-lib';
import {
  CurrentUser,
  IResponse,
  JwtAuthGuard,
  Status,
  UserPayload,
} from '@app/common';

@ApiTags('auth')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthLibService) {}

  @Post('login')
  @ApiResponse({ status: HttpStatus.CREATED, type: AuthResponseEntity })
  public login(@Body() input: LoginDto): Promise<AuthResponseEntity> {
    return this.authService.login(input);
  }

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
  })
  public async register(@Body() input: RegisterDto): Promise<IResponse> {
    await this.authService.register(input);
    return {
      status: Status.SUCCESS,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully logged out',
  })
  @Post('logout')
  public async logout(
    @CurrentUser() { payload }: UserPayload,
  ): Promise<IResponse> {
    await this.authService.logout(payload.sub, payload.deviceId);
    return {
      status: Status.SUCCESS,
    };
  }

  @Post('refreshToken')
  @ApiResponse({ status: HttpStatus.CREATED, type: AuthResponseEntity })
  public refreshToken(
    @Body() { token }: RefreshTokenDto,
  ): Promise<AuthResponseEntity> {
    return this.authService.refreshToken(token);
  }
}
