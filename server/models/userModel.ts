import { model, Schema, Document, Model, HookNextFunction, Date } from 'mongoose';
import bcrypt from 'bcrypt';

type checkPasswordtype = (a: string, b: string) => boolean;

export interface IUser extends Document {
  correctPassword: checkPasswordtype;
  _id: string;
  name: string;
  email: string;
  password: string;
  linksCreated: string;
  visited: [string];
  confirmPassword: string | undefined;
  status: string;
  passwordChangedAt: string | number | Date;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User should have name'],
    },
    email: {
      type: String,
      required: [true, 'User should have email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'User should have password'],
    },
    confirmPassword: {
      type: String,
      required: [true, 'User should have password'],
    },
    linksCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Url',
      },
    ],
    visited: [String],
    status: {
      type: String,
      default: 'User',
    },

    passwordChangedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>('save', function passwordChangedCheck(next: HookNextFunction) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  return next();
});

userSchema.pre<IUser>('save', async function ifPasswordModified(next: HookNextFunction) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.confirmPassword = undefined;
  return next();
});

userSchema.methods.correctPassword = async function checkPassword(
  candidatePassword,
  userPassword
): Promise<boolean | void> {
  const status = await bcrypt.compare(candidatePassword, userPassword);

  return status;
};

const User: Model<IUser> = model('User', userSchema);

export default User;
