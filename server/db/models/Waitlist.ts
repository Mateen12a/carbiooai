import mongoose, { Document, Schema } from 'mongoose';

export interface IWaitlist extends Document {
  email: string;
  firstName: string;
  lastName: string;
  isConstructionProfessional: boolean;
  profession?: string;
  professionOther?: string;
  nonProfessionalRole?: string;
  interestReason?: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  createdAt: Date;
  verifiedAt?: Date;
}

const WaitlistSchema = new Schema<IWaitlist>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  isConstructionProfessional: {
    type: Boolean,
    required: true
  },
  profession: {
    type: String,
    enum: ['architect', 'engineer', 'contractor', 'developer', 'surveyor', 'project_manager', 'sustainability_consultant', 'other'],
    required: function(this: IWaitlist) { return this.isConstructionProfessional; }
  },
  professionOther: {
    type: String,
    trim: true
  },
  nonProfessionalRole: {
    type: String,
    trim: true
  },
  interestReason: {
    type: String,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  verificationTokenExpiry: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  verifiedAt: {
    type: Date
  }
});

WaitlistSchema.index({ verificationToken: 1 });
WaitlistSchema.index({ email: 1, isVerified: 1 });

export default mongoose.model<IWaitlist>('Waitlist', WaitlistSchema);
