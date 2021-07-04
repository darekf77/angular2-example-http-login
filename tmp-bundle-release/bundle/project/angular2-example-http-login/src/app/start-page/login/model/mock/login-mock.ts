import { User } from '../user';

import { MockRequest, MockResponse } from 'ng2-rest';

export function loginInController(req: MockRequest<User>): MockResponse { // user: User, params

    let tuser = <User>req.body;
    let user = <User>req.data;
    if ((user.username === tuser.username)
        && (user.password === tuser.password)
        && (user.companyName === tuser.companyName)
        ) {
        let u = user;
        u.password = undefined;
        return { data:u } ;
    }
    return { code: 404, error: 'bad password', data: undefined };
}