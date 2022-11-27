export interface IPatient {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  is_special_attention: boolean;
  added_by: number;
  created_at: Date;
  updated: Date;
  status: boolean;
  deleted_at: Date;
  avatar_filename: string;
  allergies: string[];
}
