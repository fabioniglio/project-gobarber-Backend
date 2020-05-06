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

  // it('should not be able to create two appointment onthe same time', () => {
  //   expect().toBe();
  // });
});
