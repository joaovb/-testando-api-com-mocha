import chai from 'chai';
import chaiHttp from 'chai-http';
import taskModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;


describe('put', () =>{
    context('quando eu altero uma tarefa', () => {

        let task = {
            _id: require('mongoose').Types.ObjectId(),
            title: 'Assistir GPA',
            owner: 'joaovictor.hts@gmail.com',
            done: false
        }

        before((done) => {
            taskModel.insertMany([task])
            done()
        })

        it('entao deve retornar 200', (done) => {
            task.title = 'Assistir Metodo L5D',
            task.done = true
            request
                .put('/task/' + task._id)
                .send(task)
                .end((err, res) => {
                    //console.log(res)
                    expect(res).to.have.status(200)
                    expect(res.body).to.eql({})
                    done()
                })
        })

        it('e deve retornar os dados atualizados', (done) => {
            request
                .get('/task/' + task._id)
                .send(task)
                .end((err, res) => {
                    //console.log(res.body)
                    expect(res).to.have.status(200)
                    expect(res.body.data.title).to.eql(task.title)
                    expect(res.body.data.done).to.be.true
                    done()
                })
        })
    })
})