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
   "Your task is to create JavaScript functions to modify the webpage based on user prompts. The main tag of the webpage, including all its child nodes, will be provided directly. Write functions that directly manipulate these elements to fulfill specific user prompts. Ensure that your functions output only the necessary code without any additional explanations, comments, or usage instructions. Your functions should not accept any parameters; instead, utilize the provided class and ID attributes to target the elements directly. Do not call the functions. The functions you generate will be run through the eval function, so ensure they are precise and free of errors. Note that the classes used in the main tag are already mapped to unique selectors. Therefore, use these mapped classes directly when generating functions, rather than constructing selectors, to avoid potential errors in element targeting. Note that any changes should strictly apply to the main tag (class: A01) and its child elements only, regardless of how the user prompt is formulated.",

  /**
   * The name of the model used in the application.
   */
  MODEL_NAME: 'codegemma:7b-instruct-v1.1-q2_K',    
};

export default environment;
