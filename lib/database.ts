import { Credentials, S3, DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { IProduct, IUser, IComment, IProductInfoList } from './schemas';

dotenv.config();
const saltRounds = 10;

let credentials = new Credentials({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

let s3 = new S3({
    region: 'us-east-1',
    credentials: credentials
})

let dynamodb = new DynamoDB({
    region: 'us-east-1',
    credentials: credentials
})

let dbClient = new DynamoDB.DocumentClient({ service: dynamodb });

// S3
export function verifyAdminToken(token: string): Promise<string | null> {
    let getParams = {
        Bucket: process.env.BUCKET,
        Key: process.env.TOKENS_KEY
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
                        Key: process.env.TOKENS_KEY,
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

export function removeAdminToken(token: string) {
    let getParams = {
        Bucket: process.env.BUCKET,
        Key: process.env.TOKENS_KEY
    }
    s3.getObject(getParams).promise()
        .then(data => {
            // Parse token file and check for token
            let tokenJSON = JSON.parse(data.Body.toString());
            if (tokenJSON[token]) {
                // Delete key value pair if found and update file
                delete tokenJSON[token];

                let putParams = {
                    Bucket: process.env.BUCKET,
                    Key: process.env.TOKENS_KEY,
                    Body: JSON.stringify(tokenJSON, null, '\t')
                }
                s3.putObject(putParams).promise()
                    .catch((e) => console.error(`Could not update admin tokens file \n`, e))
            }
            else {
                console.error(`Token ${token} does not exist in tokens file`);
            }
        })
        .catch(e => console.error(`Failed to get admin tokens in s3 \n`, e));
}

export function uploadPhoto(photo: Buffer, name: string) {
    let putParams = {
        Bucket: process.env.BUCKET,
        Key: `photos/${name}`,
        Body: photo,
        ACL: 'public-read'
    }
    s3.putObject(putParams).promise()
        .then(data => {
            console.log(`Successfully uploaded photo ${name}`);
        })
        .catch(e => console.error(`Could not upload photo ${name} \n`, e));
}


// DynamoDB
export function createProduct(productInfo: IProductInfoList, id: string, files: string[]) {
    let photos = files.map(file => {
        return { link: `https://${process.env.BUCKET}.s3.amazonaws.com/${file}` };
    })
    let stones = productInfo.stones.map((stone: string) => {
        return { stone: stone }
    })

    let options: any = {}
    if (productInfo.hideStones) options.hideStones = productInfo.hideStones;
    if (productInfo.hideChakras) options.hideChakras = productInfo.hideChakras;
    if (productInfo.hideBenefits) options.hideBenefits = productInfo.hideBenefits;

    let putParams = {
        TableName: 'Products',
        Item: {
            id: id,
            isActive: productInfo.inactive ? 'false' : 'true',
            date: Date.now().toString(),
            title: productInfo.title,
            price: productInfo.price,
            description: productInfo.description,
            photos: photos,
            details: {
                stones: stones,
                chakras: productInfo.chakras,
                benefits: productInfo.benefits
            },
            options: options
        }
    }

    dbClient.put(putParams).promise()
        .then(data => {
            console.log(`Successfully created product with id: ${id}`);
        })
        .catch(e => console.error(`Could not create new product with id: ${id} \n`, e));
}

export function getUser(username: string): Promise<any> {
    let getParams = {
        TableName: 'Users',
        Key: {
            username: username
        }
    }
    return dbClient.get(getParams).promise().then(data => {
        return data.Item;
    })
        .catch(e => {
            console.error(`Could not get user with username ${username} \n`, e)
            return null;
        });
}

interface INewUser {
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    isAdmin: boolean
}
export function createUser(user: INewUser): Promise<IUser> {
    return bcrypt.hash(user.password, saltRounds).then(hash => {
        let putParams = {
            TableName: 'Users',
            Item: {
                id: uuidv4(),
                username: user.username,
                passwordHash: hash,
                firstname: user.firstname,
                lastname: user.lastname,
                isAdmin: user.isAdmin
            }
        }
        return dbClient.put(putParams).promise().then(data => {
            return putParams.Item;
        })
            .catch(e => {
                console.error(`User creation for ${user.username} failed. \n`, e);
                return null;
            })
    })
        .catch(e => {
            console.error(`Password hashing for ${user.username} failed. \n`, e);
            return null;
        })
}