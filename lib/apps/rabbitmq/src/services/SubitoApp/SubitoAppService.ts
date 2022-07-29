import { Service } from 'subito-lib'; 

/**
 * SubitoAppService handle new messages
 *
 * @remarks
 * Services handle the business layer
 * They can called all repositories & even other services
 *
 * @public
 */
class SubitoAppService extends Service {
  /**
   * Consume new messages
   *
   * @param msg - The new message receive from rabbitmq
   * @returns
   *
   * @public
   */
  run(/* msg: unknown */): boolean {
    // Consume the message here
    return true;
  }
}

export default SubitoAppService;
