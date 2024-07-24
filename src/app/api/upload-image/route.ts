import { NextApiRequest, NextApiResponse } from 'next';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage(); // Access Firebase Storage instance

export default async function uploadImage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const file = req.body.file; // Assuming image data is sent in req.body.file
      if (!file || !file.type.startsWith('image/')) {
        return res.status(400).json({ error: 'Invalid image file' });
      }

      const imageRef = ref(storage, `images/${file.name}`); // Create ref in Cloud Storage
      const uploadResult = await uploadBytes(imageRef, file.data); // Upload image
      const imageUrl = await getDownloadURL(uploadResult.ref); // Get download URL

      // Proceed with saving user data (see next step)
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Upload failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
