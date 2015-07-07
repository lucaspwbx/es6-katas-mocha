import assert from 'assert';

describe('destructuring', () => {
  describe('function parameters', () => {
    describe('destructuring parameters', () => {
      it('multiple params from object', () => {
        const fn = ({id, name}) => {
          assert.equal(id, 42);
          assert.equal(name, 'Wolfram');
        };
        const user = {id: 42, name: 'Wolfram'};
        fn(user);
      });

      it('multiple params from array/object', () => {
        const fn = ([{name}]) => {
          assert.equal(name, 'Alice');
        };
        const users = [{name: 'Alice', id: 42}];
        fn(users);
      });
    });

    describe('default values', () => {
      it('for simple values', () => {
        const fn = (id, name='Bob') => {
          assert.strictEqual(id, 23);
          assert.strictEqual(name, 'Bob');
        };
        fn(23);
      });

      it('for a missing array value', () => {
        pending
      });

      it('mix of parameter types', () => {
        const fn = (id, [arr], {obj}) => {
          assert.equal(id, 1);
          assert.equal(arr, 2);
          assert.equal(obj, 3);
        };
        fn(1,[2], {obj: 3});
      });
    });
  });

  describe('objects', () => {
    it('is simple', () => {
      const {x} = {x: 1};

      assert.equal(x, 1);
    });

    describe('nested', () => {
      it('multiple objects', () => {
        const magic = {first: 23, second: 42};
        const {magic: {second}} = {magic};

        assert.equal(second, 42);
      });

      it('object and array', () => {
        const {z:[,x]} = {z: [23,42]};

        assert.equal(x, 42);
      });

      it('array and object', () => {
        const [,[{lang}]] = [null, [{env: 'browser', lang: 'ES6'}]];

        assert.equal(lang, 'ES6');
      });
    });

    describe('interesting', () => {
      it('missing refs became undefined', () => {
        const {z} = {x: 1};

        assert.equal(z, void 0);
      });

      it('destructure from builtins (string)', () => {
        const {substr} = '1';

        assert.equal(substr, String.prototype.substr);
      });
    });
  });
});
