import cors from 'cors';
import express from 'express';
import environment from './lib/environments/environment';
import { modelfile } from './lib/environments/modelConfig';
const { default: ollama } = require('ollama');

const app = express();
const port = environment.PORT;
const model = environment.MODEL_NAME;

app.use(cors());
app.use(express.json());

/**
 * Function to create the model.
 */
(async function () {
  try {
    await ollama.create({
      name: model,
      model: model,
      modelfile: modelfile,
    });
    console.log('Model created successfully.');
  } catch (error: any) {
    const redColor = '\x1b[31m';
    const resetColor = '\x1b[0m';

    if (error.cause && error.cause.code === 'ECONNREFUSED') {
      console.error(
        `${redColor}Error: Unable to connect to Ollama server.${resetColor}`
      );
      console.error(
        `${redColor}Please make sure the Ollama server is running.${resetColor}`
      );
    } else {
      console.error(
        `${redColor}Error creating the model: ${error}${resetColor}`
      );
    }
  }
})();

/**
 * Endpoint to process a prompt and get a response.
 * @param req - The request object.
 * @param res - The response object.
 */
app.post('/api/send-prompt', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(`Processing prompt: ${prompt}`);

    const response = await ollama.chat({
      model: model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    console.log(response.message.content);
    res.send(response.message.content);
  } catch (error) {
    console.error('Error processing the prompt:', error);
    res.status(500).send('Error processing the prompt.');
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
