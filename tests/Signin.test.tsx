import { expect } from 'chai';
import React from 'react';
import { stub } from 'sinon';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FormData } from '../src/components/Form';
import * as api from '../src/util/api';
import SignIn from '../src/pages/SignIn';

describe('SignIn page', () => {
  it('should sign in successfully', async () => {
    const authenticateUserStub = stub(api, 'authenticateUser').resolves('mocked-token');
    const dispatchStub = stub();
    const navigateStub = stub();

    const { getByLabelText, getByText } = render(<SignIn />);
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(authenticateUserStub.calledOnceWith('testuser', 'testpassword')).to.be.true;
      expect(dispatchStub.calledOnceWith({ type: 'auth/setToken', payload: 'mocked-token' })).to.be.true;
      expect(navigateStub.calledOnceWith('/dashboard')).to.be.true;

      authenticateUserStub.restore();
    });
  });
});
