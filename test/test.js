import assert from 'assert';

describe('class creation', () => {
  it('is as simple as class creation', () => {
    class TestClass {};
    const instance = new TestClass();

    assert.equal(typeof instance, 'object');
  });

  it('special method is constructor', () => {
    class User {
      constructor(id) { this.id = 42; }
    }
    const user = new User(42);

    assert.equal(user.id, 42);
  });

  it('defining method is simple', () => {
    class User {
      writesTests() {
        return false;
      }
    }
    const notATester = new User();

    assert.equal(notATester.writesTests(), false);
  });

  it('multiple methods need no comas', () => {
    class User {
      wroteATest() { this.everWroteATest = true; }
      isLazy() {  }
    }

    const tester = new User();
    assert.equal(tester.isLazy(), true)
    tester.wroteATest();
    assert.equal(tester.isLazy(), false)
  });
});
