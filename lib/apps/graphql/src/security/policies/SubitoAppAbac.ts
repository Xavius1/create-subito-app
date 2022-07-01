import { Entity, Policy } from 'subito-graphql';
import type { AnyObject } from 'subito-graphql';

// Uncomment the next line if you need to re-map some field before returning
// const map = { _id: 'id' }; // eslint-disable-line no-underscore-dangle

/**
 * SubitoAppAbac policy
 * 
 * @public
 */
class SubitoAppAbac extends Policy {
  // Uncomment this function if you need to re-map fields or to do other stuff
  // public read({ doc }: AnyObject) {
  //   if (this.isAdmin()) {
  //     const entity = new Entity(doc, map);
  //     return entity.get();
  //   }

  //   return null;
  // }
}

export default SubitoAppAbac;
