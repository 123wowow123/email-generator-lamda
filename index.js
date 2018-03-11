// Just a test lambda, run with:
// docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs4.3
// OR
// docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs6.10

const { MailClient } = require('email-generator');
//const emailGenerator = require('nodemailer');

exports.handler = function (event, context, cb) {
    context.callbackWaitsForEmptyEventLoop = false

    // console.log('CRHONOPIN_SMTP_PASSWORD', process.env.CRHONOPIN_SMTP_PASSWORD)
    // console.log('AZURE_STORAGE_CONNECTION_STRING', process.env.AZURE_STORAGE_CONNECTION_STRING)
    // console.log(process.execPath)
    // console.log(process.execArgv)
    // console.log(process.argv)
    // console.log(process.cwd())
    // console.log(process.mainModule.filename)
    // console.log(__filename)
    // console.log(process.env)
    // console.log(process.getuid())
    // console.log(process.getgid())
    // console.log(process.geteuid())
    // console.log(process.getegid())
    // console.log(process.getgroups())
    // console.log(process.umask())
    // console.log("event", event)
    // console.log(context)
    // console.log(context.getRemainingTimeInMillis())

    console.log('Processing Event:', JSON.stringify(event));

    invoke(event, context, cb)
        .then((success) => {
            cb(null, {
                "statusCode": 200,
                "body": JSON.stringify(success)
            });
        })
        .catch((error) => {
            if (typeof error === "object") {
                cb(JSON.stringify(error));
            }
            else {
                cb(error);
            }
        });
}

function invoke(event, context) {
    return new Promise(function (resolve, reject) {

        let data;
        switch (event.httpMethod) {
            case 'GET':
                data = event.queryStringParameters;
                break;
            case 'POST':
                let parsedData = JSON.parse(event.body);
                if (event.headers && event.headers["User-Agent"] === "Amazon Simple Notification Service Agent") {
                    data = JSON.parse(parsedData.Message);
                } else {
                    data = parsedData;
                }
                break;
            default:
                data = event;
        }

        if (!data) {
            throw `Email body query parameters missing`;
        }

        const to = data.to;
        if (!to) {
            throw `Email 'to' query parameter missing`;
        }

        let config = {
            auth: {
                pass: process.env.CRHONOPIN_SMTP_PASSWORD,
            },
            connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING
        };

        const mailClient = new MailClient(config);
        return sendSignupData = mailClient
            .sendSignup(to, data);

    });

}
