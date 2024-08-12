import { assert } from 'chai';
import { ObservableInstanceMetaDataStore } from './metadata.js';

it('should return default metadata', () => {
  const key = {};
  const data = new ObservableInstanceMetaDataStore().read(key);

  assert.deepEqual(data, { changes: new Set<string | symbol>(), scheduler: null });
});

it('should return the same metadata object after init', () => {
  const key = {};
  const data = new ObservableInstanceMetaDataStore();

  assert.equal(data.read(key), data.read(key));
});
