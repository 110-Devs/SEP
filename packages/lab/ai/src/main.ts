import cors from 'cors';
import express from 'express';
import environment from './lib/environments/environment';
import { modelfile } from './lib/environments/modelConfig';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import ollama from 'ollama';

const app = express();
const port = environment.PORT;
const model = environment.MODEL_NAME;
//const modelName = "MillionDollarBaby";

app.use(cors());
app.use(express.json());

/**
 * Function to create the model.
 */
(async function () {
  console.log(environment);
  console.log(modelfile);
  try {
    await ollama.create({
      model: model,
      modelfile: modelfile,
    });
    console.log('Model created successfully.');
  } catch (error) {
    console.error('Error creating the model:', error);
  }
})();

/**
 * Endpoint to process a prompt and get a response.
 * @param req - The request object.
 * @param res - The response object.
 */
app.post('/api/send-prompt', async (req, res) => {
  try {
    const prompt: string = req.body.prompt;
    console.log(`Processing prompt in main: ` + prompt);

    const response = await ollama.chat({
      model: model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    //eval(response.message.content);
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
