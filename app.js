import express from 'express';
import cors from 'cors';
import { UltimateTextToImage } from 'ultimate-text-to-image';
import { setWallpaper } from 'wallpaper';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Hello World!' });
});

app.post('/', (req, res) => {
  const textToImage = new UltimateTextToImage(req.body.desktop, {
    width: 1920,
    height: 1080,
    fontFamily: 'Arial',
    fontSize: 72,
    fontColor: '#FFFFFF',
    backgroundColor: '#000000',
    lineHeight: 50,
    align: 'center',
    valign: 'middle',
  });
  textToImage.render().toFile(path.join(__dirname, 'desktop.png'));

  setWallpaper('desktop.png');

  res.status(201).json({ msg: 'Successfully set desktop wallpaper' });
});

const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
