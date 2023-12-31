import {
    getModelForClass,
    index,
    modelOptions,
    pre,
    prop,
  } from '@typegoose/typegoose';
  var bcrypt = require('bcryptjs');
  
  @index({ email: 1 })
  @pre<User>('save', async function () {
    // Hash password if the password is new or was updated
    if (!this.isModified('password')) return;
  
    // Hash password with costFactor of 12
    this.password = await bcrypt.hash(this.password, 12);
  })
  @modelOptions({
    schemaOptions: {
      // Add createdAt and updatedAt fields
      timestamps: true,
    },
  })

  
  // Export the User class to be used as TypeScript type
  export class User {  
    @prop({ unique: true, required: true })
    email: string;
  
    @prop({ required: true, minlength: 8, maxLength: 32, select: false })
    password: string;
  
    @prop({ default: 'user' })
    role: string;

    @prop({ required: true })
    name: string;

    @prop({ required: true })
    lastname: string;

    @prop({ required: true })
    citizenId: string;

    @prop({ required: true })
    mobile: string;
  
    // Instance method to check if passwords match
    async comparePasswords(hashedPassword: string, candidatePassword: string) {
      return await bcrypt.compare(candidatePassword, hashedPassword);
    }
  }
  

  const userModel = getModelForClass(User);
  export default userModel;
  
  