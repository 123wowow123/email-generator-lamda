// Just a test lambda, run with:
// docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs4.3
// OR
// docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs6.10

const { MailClient } = require('email-generator');
//const emailGenerator = require('nodemailer');

exports.handler = function (event, context, cb) {
    context.callbackWaitsForEmptyEventLoop = false

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

    const data = event.queryStringParameters;
    if (!data) {
        cb({
            "statusCode": 422,
            "body": "Email body query parameters missing"
        });
    }
    const to = data.to;
    if (!to) {
        cb({
            "statusCode": 422,
            "body": "Email 'to' query parameter missing"
        });
    }


    // const data = {
    //     "to": "flynni2008@gmail.com",
    //     "facebookId": 10100470408434696,
    //     "firstName": "Ian",
    //     "lastName": "Flynn",
    //     "gender": "Male",
    //     "locale": "en_US",
    //     "pictureUrl": "https://graph.facebook.com/10100470408434696/picture?type=large",
    //     "fbUpdatedTime": "2018-03-08T05:55:49.620Z",
    //     "fbverified": true,
    //     "email": "new_user@gmail.com",
    //     "role": "user",
    //     "provider": "facebook",
    //     "about": "check out www.DiceManiac.com"
    // };


    console.log('CRHONOPIN_SMTP_PASSWORD', process.env.CRHONOPIN_SMTP_PASSWORD)
    console.log('AZURE_STORAGE_CONNECTION_STRING', process.env.AZURE_STORAGE_CONNECTION_STRING)

    let config = {
        auth: {
            pass: process.env.CRHONOPIN_SMTP_PASSWORD,
        },
        connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING
    };

    const mailClient = new MailClient(config);
    const sendSignupData = mailClient
        .sendSignup(to, data)
        .then((e) => {
            cb(null, {
                "statusCode": 200,
                "body": JSON.stringify(e)
            });
        })
        .catch(cb);

}
