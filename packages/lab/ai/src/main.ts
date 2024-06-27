import cors from 'cors';
import express from 'express';
import environment from './lib/environments/environment';
import axios from 'axios';
import { PersistentManager } from '@cody-engine/lab/version-control';

const app = express();
const port = environment.PORT;
const model = environment.MODEL_NAME;

app.use(cors());
app.use(express.json());

/**
 * Endpoint to process a prompt and get a response.
 * @param req - The request object.
 * @param res - The response object.
 */
app.post('/api/send-prompt', async (req, res) => {
  try {
    const prompt: string = req.body.prompt;
    console.log(`Processing prompt: ${prompt}`);

    const API_URL =
      'https://f4359ba8-80fc-455d-a8e6-fad069f30239.app.gra.ai.cloud.ovh.net/api/generate';
    const data = { model: 'codestral', prompt: req.body.prompt, stream: false };
    const header = {
      headers: {
        Authorization: `Bearer ${environment.TOKEN}`,
      },
    };

    const response = await axios.post(API_URL, data, header);

    console.log('This is the response: ' + response.data.response);
    res.send(response.data.response);
  } catch (error) {
    console.error('Error processing the prompt:', error);
    res.status(500).send('Error processing the prompt.');
  }
});

app.post('/api/save', async (req, res) => {
  try {
    const modifications: object = req.body.modifications;
    const collection: string = req.body.collection;
    const route: string = req.body.route;

    PersistentManager.addModification(collection, route, modifications);

    res.sendStatus(200);
  } catch (error) {}
});

app.get('/api/get-dnd-modifications', async (req, res) => {
  try {
    const collection: string = req.query.collection as string;
    const route: string = req.query.route as string;
    const modifications = await PersistentManager.getDragAndDropModification(
      collection,
      route
    );
    res.send(modifications);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.get('/api/get-sorting-modifications', async (req, res) => {
  try {
    const collection: string = req.query.collection as string;
    const route: string = req.query.route as string;
    const modifications = await PersistentManager.getSortingModification(
      collection,
      route
    );
    res.send(modifications);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.get('/api/get-all-modifications', async (req, res) => {
  try {
    const route: string = req.query.route as string;
    const modifications = await PersistentManager.getAllModifications(route);
    res.send(modifications);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
