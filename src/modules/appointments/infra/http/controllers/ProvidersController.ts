import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderServices from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProviderServices);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.json(providers);
  }
}
