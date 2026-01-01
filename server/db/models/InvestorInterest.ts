import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestorInterest extends Document {
  fullName: string;
  email: string;
  organization: string;
  investorType: 'Angel' | 'VC' | 'Strategic' | 'Other';
  message?: string;
  tag: string;
  createdAt: Date;
}

const InvestorInterestSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String, required: true },
  investorType: { 
    type: String, 
    required: true,
    enum: ['Angel', 'VC', 'Strategic', 'Other']
  },
  message: { type: String },
  tag: { type: String, default: 'investor' },
  createdAt: { type: Date, default: Date.now }
});

export const InvestorInterest = mongoose.models.InvestorInterest || mongoose.model<IInvestorInterest>('InvestorInterest', InvestorInterestSchema);
