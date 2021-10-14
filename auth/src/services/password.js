const crypto=require('crypto')
const util=require('util')
scryptAsync = util.promisify(crypto.scrypt)
class PasswordHash{
    async encrypt(password){
        const salt=crypto.randomBytes(8).toString('hex')
        const buf=await scryptAsync(password,salt,64)
        return `${buf.toString('hex')}.${salt}`
    }

    async compare(password,savedPassword){
        const [hashedPassword,salt]=savedPassword.split('.')
        const buf=await scryptAsync(password,salt,64)
        return buf===hashedPassword
        
    }
}

module.exports=new PasswordHash()