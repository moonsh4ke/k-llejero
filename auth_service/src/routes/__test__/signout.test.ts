import supertest from 'supertest'
import { app } from '../../app'

it('Removes the session cookie', async () => {
    const cookie = await global.signin()

    const response = await supertest(app)
    .post('/signout')
    .set('Cookie', cookie)
    .send()

    expect(response.get('Set-Cookie')[0].split(';')[0] === 'session=').toBeTruthy()
})
