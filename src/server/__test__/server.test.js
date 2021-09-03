import { listening } from "../index.js"


test('Testing the server', ()=> {
  expect(listening).toBeDefined();
})