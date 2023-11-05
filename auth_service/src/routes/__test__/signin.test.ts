import request from 'supertest';
import { app } from '../../app'

it('succesfuly logging in', async ()=> {
    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
})

it('return 400 logging in with non-existing user', async () => {
    await request(app)
        .post('/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
})

it('return 400 logging in with valid user but wrong password', async () => {
    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/signin')
        .send({
            email: 'test@test.com',
            password: 'wrongpassword'
        })
        .expect(400);
})

it('sets a cookie after succesful signin', async () => {
    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
})
