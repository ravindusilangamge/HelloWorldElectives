'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
  });
const FormSchema1 = z.object({
    p_id: z.string(),
    name: z.string(),
    age: z.string(),
    //gender: z.enum(['male', 'female']),
    gender: z.string(),
    address: z.string(),
  });
  const FormSchema2 = z.object({
    id: z.string(),
    date: z.string(),
    p_id: z.string(),
    pCompl: z.string(),
    hpc: z.string(),
    pmhx: z.string(),
    allergy: z.string(),
    examination: z.string(),
    investigations_sofar: z.string(),
    prescribed_med: z.string(),
    investigations_ordered: z.string(),
  });

  const CreateInvoice = FormSchema.omit({ id: true, date: true });
  const UpdateInvoice = FormSchema.omit({ id: true, date: true });
  const AddPatient = FormSchema1.omit({});
  const UpdatePatient = FormSchema1.omit({});
  const AddVisit = FormSchema2.omit({id: true, date: true});
 
export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
      const amountInCents = amount * 100;
      const date = new Date().toISOString().split('T')[0];
    try{
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;}
    catch (error) {
        return {
          message: 'Database Error: Failed to Create Invoice.',
        };
      }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
      // Test it out:
      //console.log(rawFormData);
}

export async function addPatient(formData: FormData) {
  const { p_id, name, age, gender, address } = AddPatient.parse({
    p_id: formData.get('p_id'),
    name: formData.get('name'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    address: formData.get('address'),
  });
  // Test it out:
  //console.log(rawFormData);

  await sql`
    INSERT INTO patientdetails (p_id, name, age, gender, address)
    VALUES (${p_id}, ${name}, ${age}, ${gender}, ${address})
  `;

  revalidatePath('/dashboard/patients');
  redirect('/dashboard/patients');
}

export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
   
    const amountInCents = amount * 100;
    try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
    } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    //throw new Error('Failed to Delete Invoice');
    try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
    } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
  }

  export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  export async function updatePatient(id: string, formData: FormData) {
    const { p_id, name, age, gender, address } = UpdatePatient.parse({
      p_id: formData.get('p_id'),
      name: formData.get('name'),
      age: formData.get('age'),
      gender: formData.get('gender'),
      address: formData.get('address'),
    });

    try {
    await sql`
      UPDATE patientdetails
      SET p_id = ${p_id}, name = ${name}, age = ${age}, gender = ${gender}, address = ${address}
      WHERE p_id = ${id}
    `;
    } catch (error) {
    return { message: 'Database Error: Failed to Update Patient.' };
  }
   
    revalidatePath('/dashboard/patients');
    redirect('/dashboard/patients');
  }

  export async function deletePatient(id: string) {
    //throw new Error('Failed to Delete Invoice');
    try {
    await sql`DELETE FROM patientdetails WHERE p_id = ${id}`;
    revalidatePath('/dashboard/patients');
    return { message: 'Deleted patient.' };
    } catch (error) {
    return { message: 'Database Error: Failed to Delete Patient.' };
  }
  }

  export async function addVisit(formData: FormData) {
    const {p_id, pCompl, hpc, pmhx, allergy, examination, investigations_sofar, prescribed_med, investigations_ordered} = AddVisit.parse({
      // id: formData.get('id'),
      //date: formData.get('date'), 
      p_id: formData.get('p_id'),
      pCompl: formData.get('pCompl'),
      hpc: formData.get('hpc'),
      pmhx: formData.get('pmhx'),
      allergy: formData.get('allergy'),
      examination: formData.get('examination'),
      investigations_sofar: formData.get('investigations_sofar'),
      prescribed_med: formData.get('prescribed_med'),
      investigations_ordered: formData.get('investigations_ordered'),

    });
    // Test it out:
    const date = new Date().toISOString().split('T')[0];
    console.log(FormData);
  
    await sql`
      INSERT INTO visits (patient_id, date, pCompl, hpc, pmhx, allergy, examination, investigations_sofar, prescribed_med, investigations_ordered)
      VALUES (${p_id}, ${date}, ${pCompl}, ${hpc}, ${pmhx}, ${allergy}, ${examination},${investigations_sofar},${prescribed_med},${investigations_ordered})
    `;
  
    revalidatePath('/dashboard/patients');
    redirect('/dashboard/patients');
  }
