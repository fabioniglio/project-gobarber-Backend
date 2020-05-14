import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const parsedData = parseISO(date);
    const appointment = await createAppointment.execute({
      date: parsedData,
      user_id,
      provider_id,
    });

    return response.json(appointment);
  }
}
