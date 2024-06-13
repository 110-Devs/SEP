/**
 * Represents the environment configuration for the application.
 */
const environment = {

  /**
   * Authorization for requests to the AI server
   */
  TOKEN: 'w3WcLmczSkWMsvA5gAVi0AmKyumzqAKqlRDb5ndR6gLUrB+lJcqJQ2+I27i4PZ21',

  /**
   * The port on which the application will run.
   */
  PORT: 3000,

  /**
   * The host URL of the application.
   */
  HOST: 'http://localhost',

  /**
   * The routes used in the application.
   */
  ROUTES: {
    /**
     * The route for sending prompts.
     */
    SEND_PROMPT: '/api/send-prompt',
  },

  /**
   * The system prompt used in the application.
   */
  SYSTEM_PROMPT:
    "Your task is to create JavaScript functions to modify the webpage based on user prompts. " +
    "Above is a JSON representation of the webpage's structure, including class and ID attributes for each element. " + 
    "Write functions that directly manipulate these elements to fulfill specific user prompts. Ensure that your functions output only the necessary code without any additional explanations, comments, or usage instructions. Your functions should not accept any parameters; instead, utilize the provided class and ID attributes to target the elements directly.",

  /**
   * The name of the model used in the application.
   */
  MODEL_NAME: 'codegemma:7b-instruct-v1.1-q2_K',    
};

export default environment;
