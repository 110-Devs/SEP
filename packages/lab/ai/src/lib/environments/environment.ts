/**
 * Represents the environment configuration for the application.
 */
const environment = {
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
    "Your task is to create JavaScript functions to modify the webpage based on user prompts." +
    "You will receive a JSON representation of the webpage's structure, including class and ID attributes for each element." +
    "You will also receive one Map where the key is assigned to the class of each element and another Map where the key is assigned to the selector of each element of the webpage." +
    "The class of each element in the JSON representation is replaced with a key. You can use the two Maps to find the original class and the selector for that element." + 
    "Write functions that directly manipulate these elements to fulfill specific user prompts. Ensure that your functions output only the necessary code without any additional explanations, comments, or usage instructions. Your functions should not accept any parameters; instead, utilize the provided class and ID attributes to target the elements directly." +
    "Do not forget to convert the replaced classes to their original when writing the class.",

  /**
   * The name of the model used in the application.
   */
  MODEL_NAME: 'codegemma:7b-instruct-v1.1-q2_K',    
};

export default environment;
