const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: 'dugdbmksq',
  api_key: '852977721653853',
  api_secret: 'qliUQj0-ocdNrVx4qD_C1OiqWN8',
});

// POST route for generating signature (main use case)
app.post('/generate-signature', (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const public_id = req.body.public_id || `contract_${timestamp}`;

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      public_id,
    },
    cloudinary.config().api_secret
  );

  res.json({
    timestamp,
    public_id,
    signature,
    api_key: cloudinary.config().api_key,
    cloud_name: cloudinary.config().cloud_name,
  });
});

// GET route for quick signature testing (optional)
app.get('/signature', (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const public_id = `contract_${timestamp}`;

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      public_id,
    },
    cloudinary.config().api_secret
  );

  res.json({
    timestamp,
    public_id,
    signature,
    api_key: cloudinary.config().api_key,
    cloud_name: cloudinary.config().cloud_name,
  });
});

app.listen(port, () => {
  console.log(`Cloudinary signature server running at http://localhost:${port}`);
});


app.listen(port, () => {
  console.log(`Cloudinary signature server running at http://localhost:${port}`);
});
