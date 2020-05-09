import AppError from '@shared/errors/AppError';

import FakesMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';
import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakesUsersRepository;
let fakeMailProvider: FakesMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;

let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakesUsersRepository();

    fakeMailProvider = new FakesMailProvider();

    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recovery the password using the email', async () => {
    const sendMmail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    });

    expect(sendMmail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
