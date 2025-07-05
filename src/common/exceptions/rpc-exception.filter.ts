import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

interface RpcErrorResponse {
  status: number;
  message: string;
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError();

    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const errorResponse = rpcError as RpcErrorResponse;

      const statusCode =
        typeof errorResponse.status === 'number' ? errorResponse.status : 400;

      throw new RpcException({
        status: statusCode,
        message: errorResponse.message,
      });

      // return response.status(statusCode).json({
      //   status: statusCode,
      //   message: errorResponse.message,
      // });
    }

    const statusCode = 400;
    const message =
      typeof rpcError === 'string' ? rpcError : 'Internal server error';

    throw new RpcException({
      status: statusCode,
      message,
    });
    // response.status(statusCode).json({
    //   status: statusCode,
    //   message: message,
    // });
  }
}
