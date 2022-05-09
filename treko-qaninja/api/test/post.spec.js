import chai from 'chai';
import chaiHttp from 'chai-http';
import taskModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('post', () => {

    context('quando eu cadastro uma tarefa', () => {
        let task = { title: 'Estudar Mongoose', owner: 'joaovictor.hts@gmail.com', done: false }

        it('entao deve retornar 200', (done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data.title).to.be.an('string')
                    expect(res.body.data.owner).to.be.an('string')
                    expect(res.body.data.done).to.be.an('boolean')
                    done();
                })
        })
    })
    context('quando nao informo o titulo', () => {
        let task = { title: '', owner: 'joaovictor.hts@gmail.com', done: false }

        it('entao deve retornar 400', (done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(400);
                    expect(res.body.errors.title.message).to.eql('Oops! Title is required.');
                    done();
                })
        })

    })

    context('quando nao informo o dono da tarefa', () => {
        let task = { title: 'Estudar Tráfego Pago', owner: '', done: false }

        it('entao deve retornar 400', (done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(400);
                    expect(res.body.errors.owner.message).to.eql('Oops! Owner is required.');
                    done();
                })
        })
    })

    context('quando a tarefa já existe', () => {
        let task = { title: 'Planejar viagem para Floripa', owner: 'joaovictor.hts@gmail.com', done: false }

        before((done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    done()
                })
        })

        it('entao deve retornar 409', (done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(409);
                    console.log(res.body)
                    done()
                })
            })
        })

})    
