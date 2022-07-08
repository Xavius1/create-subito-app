/**
 * SubitoAppService handle new messages
 * 
 * @remarks
 * Services handle the business layer
 * They can called all repositories & even other services
 * 
 * @public
 */
class SubitoAppService {
  /**
   * Consume new messages
   * 
   * @param msg - The new message receive from rabbitmq
   * @param args - Args defined into the command line
   * @param context - The context
   * @returns 
   * 
   * @public
   */
  run(msg, args, context) {
    // Consume the message here
    return true;
  }
}

export default SubitoAppService;
