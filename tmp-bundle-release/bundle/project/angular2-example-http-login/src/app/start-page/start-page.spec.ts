import { SpecsLogin } from './login/login.spec';

export function SpecsStartPage() {

    describe('Start Page', () => {
        SpecsLogin();
    });

}
