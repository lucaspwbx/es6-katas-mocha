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
});

describe('class accessors', () => {
  it('only a getter is defined like a method prefixed with get', () => {
    class MyAccount {
      get balance() { return Infinity; }
    }

    assert.equal(new MyAccount().balance, Infinity);
  });

  it('a setter has the prefix set', () => {
    class MyAccount {
      get balance() { return this.amount; }
      set balance(amount) { this.amount = amount; }
    }
    const account = new MyAccount();
    account.balance = 42;

    assert.equal(account.balance, 42);
  });
});

describe('dynamic accessors', () => {
  it('a dynamic getter name is enclosed in [ and ]', () => {
    const balance = 'yourMoney';
    class YourAccount {
      get [balance]() { return -Infinity; }
    }

    assert.equal(new YourAccount().yourMoney, -Infinity);
  });

  it('a dynamic setter is enclosed in [ and ]', () => {
    const propertyName = 'balance';
    class MyAccount {
      get [propertyName]() { return this.amount; }
      set [propertyName](amount) { this.amount = 23; }
    }

    const account = new MyAccount();
    account.balance = 42;
    assert.equal(account.balance, 23);
  });
});

describe('static keyword', () => {
  class IntegrationTest {}
  class UnitTest {}

  describe('for methods', () => {
    it('a static method just has the prefix static', () => {
      class TestFactory {
        static makeTest() { return new UnitTest(); }
      }

      assert.ok(TestFactory.makeTest() instanceof UnitTest);
    });

    it('the method name can be dynamic computed at runtime', () => {
      const methodName = 'createTest';
      class TestFactory {
        static [methodName]() { return new UnitTest(); }
      }

      assert.ok(TestFactory.createTest() instanceof UnitTest);
    });
  });

  describe('for accessors', () => {
    it('a getter name can be static, just prefix it with static', () => {
      class UnitTest {
        static get testType() { return 'unit'; }
      }

      assert.equal(UnitTest.testType, 'unit');
    });

    it('even a static getter name can be dynamic', () => {
      const type = 'test' + 'Type';
      class IntegrationTest {
        static get [type]() { return 'integration'; }
      }

      assert.ok('testType' in IntegrationTest);
      assert.equal(IntegrationTest.testType, 'integration');
    });
  });

  describe('class - extends', () => {
    describe('the default super class is Object', () => {
      it('class A is an instance of Object', () => {
        class A {}

        assert.equal(new A() instanceof Object, true);
      });

      it('B extends A, B is also instance of Object', () => {
        class A {}
        class B extends A {}

        assert.equal(new B() instanceof A, true);
        assert.equal(new B() instanceof Object, true);
      });
    });

    describe('instance of', () => {
      it('when B inherits from A, new B() is also an instance of A', () => {
        class A {}
        class B extends A {}

        assert.equal(new B() instanceof A, true);
      });

      it('extend over multiple levels', () => {
        class A {}
        class B extends A {}
        class C extends B {}

        let instance = new C();
        assert.equal(instance instanceof C, true);
      });
    });
  });
});
