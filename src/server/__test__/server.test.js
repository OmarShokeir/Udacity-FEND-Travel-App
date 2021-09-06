// import { listening } from "../index.js"
const server = require('../index.js')

test('Testing the server', ()=> {
  expect(server.listening).toBeDefined();
})