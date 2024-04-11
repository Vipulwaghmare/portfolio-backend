import { compare, hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Model, Schema, model } from 'mongoose';
import validator from 'validator';

interface IUser {
  name: string;
  email: string;
  password: string;
  passwordResetData?: {
    expiryTime: Date | null;
    token: string | null;
  };
}

interface IUserMethods {
  isValidatedPassword: (arg0: string) => Promise<boolean>;
  getAccessToken: () => string;
  getRefreshToken: () => string;
}

type UserModel = Model<IUser, unknown, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    validate: [validator.isEmail, 'Please enter email in correct format'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'password should be atleast 6 char'],
    select: false,
  },
  passwordResetData: {
    type: Object,
    default: {
      expiryTime: {
        type: Date,
        default: null,
      },
      token: {
        type: String,
        default: null,
      },
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await hash(this.password, 10);
});

userSchema.pre(
  'updateOne',
  { document: true, query: false },
  async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    this.password = await hash(this.password, 10);
  },
);

userSchema.methods.isValidatedPassword = async function (
  usersendPassword: string,
) {
  return await compare(usersendPassword, this.password);
};

userSchema.methods.getAccessToken = function () {
  return jwt.sign(
    { userId: this._id, userEmail: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1d',
    },
  );
};

userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    { userId: this._id, userEmail: this.email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '3d',
    },
  );
};

const User = model<IUser, UserModel>('User', userSchema);

export default User;
