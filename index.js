// Just a test lambda, run with:
// docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs4.3
// OR
// docker run --rm -v "$PWD":/var/task lambci/lambda:nodejs6.10

const { MailClient } = require('email-generator');
//const emailGenerator = require('nodemailer');

exports.handler = function (event, context, cb) {
    console.log(process.execPath)
    console.log(process.execArgv)
    console.log(process.argv)
    console.log(process.cwd())
    console.log(process.mainModule.filename)
    console.log(__filename)
    console.log(process.env)
    console.log(process.getuid())
    console.log(process.getgid())
    console.log(process.geteuid())
    console.log(process.getegid())
    console.log(process.getgroups())
    console.log(process.umask())

    console.log("event", event)

    console.log(context)

    context.callbackWaitsForEmptyEventLoop = false

    console.log(context.getRemainingTimeInMillis())

    const to = event.to;

    const data = {
        facebookId: 10100470408434696,
        firstName: 'Ian',
        lastName: 'Flynn',
        gender: 'Male',
        locale: 'en_US',
        pictureUrl: 'https://graph.facebook.com/10100470408434696/picture?type=large',
        fbUpdatedTime: new Date(),
        fbverified: true,
        email: to,
        role: 'user',
        provider: 'facebook',
        about: 'check out www.DiceManiac.com'
    };

    let config = {
        auth: {
            pass: process.env.CRHONOPIN_SMTP_PASSWORD,
        },
        connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING
    };

    const mailClient = new MailClient(config);
    const sendSignupData = mailClient
        .sendSignup(to, data)
        .then((e) => { cb(null, e); })
        .catch(cb);

}
