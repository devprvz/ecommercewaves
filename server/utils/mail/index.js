
const mailer=require('nodemailer'); 
const {welcome}=require('./welcome_template.js')
const {purchase}=require('./purchase_template.js')
const { resetPass } = require("./resetpass_template.js");

const getEmailData=(to,name,token,template,actionData)=>{
    let data=null;//inititalize

    switch(template){
        case "welcome":
            data={
                from:"Waves <demositeinfowaves@gmail.com>",
                to,
                subject:`Welcome to waves ${name}`,
                html: welcome()
            }
        break;
        case "purchase":
        data={
            from:"Waves <demositeinfowaves@gmail.com>",
                to,
                subject:`Thanks for shopping with us ${name}`,
                html: purchase(actionData)
        }
        break;
        case "reset_password":
            data = {
                from: "Waves <waves.guitars.rev@gmail.com>",
                to,
                subject: `Hey ${name}, reset your pass`,
                html: resetPass(actionData)
            }
        break;
        default:
        data;
    }
    return data;
}

const sendEmail=(to,name,token,type,actionData=null)=>{
    const smtpTransport=mailer.createTransport({
        service:"Gmail",
        auth:{
            user:"demositeinfowaves@gmail.com",
            pass:process.env.EMAIL_PASS
        }
    });

    const mail=getEmailData(to,name,token,type,actionData);

    smtpTransport.sendMail(mail,function(error,response){
        if(error){
            console.log("error")
        }
        else {
            console.log('email sent')
        }
        smtpTransport.close();
    })
}

module.exports={sendEmail}