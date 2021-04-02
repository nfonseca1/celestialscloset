import { Credentials, S3, DynamoDB } from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();

let credentials = new Credentials({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

let s3 = new S3({
    region: 'us-east-1',
    credentials: credentials
})

// S3
export function verifyAdminToken(token: string): Promise<string | null> {
    let getParams = {
        Bucket: process.env.BUCKET,
        Key: process.env.KEY
    }
    return s3.getObject(getParams).promise()
        .then(data => {
            // Parse token file and check for token
            let tokenJSON = JSON.parse(data.Body.toString());
            if (tokenJSON[token]) {
                // Check token expiration
                let tokenTimestamp = parseInt(tokenJSON[token]);
                let expiration = parseInt(process.env.ADMIN_TOKEN_EXPIRATION) || Infinity
                if (Date.now() - tokenTimestamp < expiration) {
                    return token; // Return token if it isn't expired
                }
                else {
                    console.log(`Admin token: ${token} has expired and will be deleted`);
                    delete tokenJSON[token];

                    let putParams = {
                        Bucket: process.env.BUCKET,
                        Key: process.env.BUCKET,
                        Body: JSON.stringify(tokenJSON, null, '\t')
                    }
                    s3.putObject(putParams).promise()
                        .then(() => console.log(`Admin token: ${token} was deleted`))
                        .catch((e) => console.error(`Could not update admin tokens file \n`, e))
                }
            }
            return null;
        })
        .catch(e => {
            console.error(`Failed to get admin tokens in s3 \n`, e);
            return null;
        })
}