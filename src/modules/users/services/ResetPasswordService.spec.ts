// import AppError from '@shared/errors/AppError';

import FakeUserTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';
import FakesUsersRepository from '../repositories/fakes/FakesUsersRepository';

import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakesUsersRepository;

let fakeUserTokensRepository: FakeUserTokensRepository;

let resetPassword: ResetPasswordService;

describe('SendForgotPasswordPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakesUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
