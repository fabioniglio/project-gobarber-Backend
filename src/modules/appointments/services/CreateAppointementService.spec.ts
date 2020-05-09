import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointments = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointments.execute({
      date: new Date(),
      provider_id: '1212123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1212123123');
  });

  it('should not be able to create two appointment onthe same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointments = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);
    await createAppointments.execute({
      date: appointmentDate,
      provider_id: '1212123123',
    });

    expect(
      createAppointments.execute({
        date: appointmentDate,
        provider_id: '1212123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
