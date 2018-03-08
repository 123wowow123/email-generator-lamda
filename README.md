# email-generator-lamda
Send Template Email From Lamda

#Resources
1. [docker-lambda](https://github.com/lambci/docker-lambda)


> Local Logging
sam local start-api --log-file ./output.log

sam local start-api --env-vars env.json

> Using an Environment Variables File
sam local start-api --env-vars env.json

> Debugging With SAM Local
sam local start-api -d 5858
sam local start-api --env-vars env.json -d 5858

> Packaging
aws s3 mb s3://email-generator-lamda --region us-west-2

aws cloudformation package \
   --template-file template.yaml \
   --output-template-file serverless-output.yaml \
   --s3-bucket email-generator-lamda

> Deployment
aws cloudformation deploy \
   --template-file serverless-output.yaml \
   --stack-name email-generator-lamda-stack \
   --capabilities CAPABILITY_IAM



{
    "to": "flynni2008@gmail.com",
    "facebookId": 10100470408434696,
    "firstName": "Ian",
    "lastName": "Flynn",
    "gender": "Male",
    "locale": "en_US",
    "pictureUrl": "https://graph.facebook.com/10100470408434696/picture?type=large",
    "fbUpdatedTime": "2018-03-08T05:55:49.620Z",
    "fbverified": true,
    "email": "new_user@gmail.com",
    "role": "user",
    "provider": "facebook",
    "about": "check out www.DiceManiac.com"
}



http://127.0.0.1:3000/email?to=flynni2008@gmail.com&facebookId=10100470408434696&firstName=Ian&lastName=Flynn&gender=Male&locale=en_US&pictureUrl=https://graph.facebook.com/10100470408434696/picture?type=large&fbUpdatedTime=2018-03-08T05:55:49.620Z&fbverified=true&email=new_user@gmail.com&role=user&provider=facebook&about=check%20out%20www.DiceManiac.com
