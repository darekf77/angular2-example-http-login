import { LoginModalSpecs } from './login-modal/login-modal.component.spec';
import { LoginSpecs } from './model/login.service.spec';
export function SpecsLogin() {

  describe('Login Panel', () => {
      LoginSpecs();
      LoginModalSpecs();
  });
}

