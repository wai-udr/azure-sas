import express, { Request, Response } from 'express';
import { BlobSASPermissions, generateBlobSASQueryParameters, StorageSharedKeyCredential } from '@azure/storage-blob';
const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: Function) {
  const storageAccountName = "STORAGE_ACCOUNT_NAME";
  const storageAccountKey = "STORAGE_ACCOUNT_KEY"; // Sicher speichern, z. B. in Azure Key Vault
    
  // SAS-Token für den Client generieren
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 1); // 1 Stunde gültig

  const sasOptions = {
    containerName: "mein-container",
    blobName: "mein-blob",
    permissions: BlobSASPermissions.parse("r"), // Nur Lesezugriff
    startsOn: new Date(),
    expiresOn: expiry
  };

  const credential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);
  const sasToken = generateBlobSASQueryParameters(sasOptions, credential).toString();

  res.status(200).json({ sasToken });
});

export default router;
