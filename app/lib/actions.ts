'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
//import { AddManufacturer } from '../ui/drugs/buttons';

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
    //age: z.string(),
    //gender: z.enum(['male', 'female']),
    gender: z.string(),
    address: z.string(),
    birthdate: z.string(),
    phonenumber: z.string(),
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
  const FormSchema3 = z.object({
    drug_id: z.string(),
    drug_name_generic: z.string(),
    // drug_brand: z.string(),
    // manufacturer: z.string(),
    drug_form: z.string(),
    // drug_dose: z.string(),
  });

  const FormSchema4 = z.object({
    stock_id: z.string(),
    drug_id: z.string(),
    drug_brand: z.string(),
    manufacturer: z.string(),
    drug_dose: z.string(),
    container_quantity: z.coerce.number(),
    units_per_container: z.coerce.number(),
    total_quantity: z.coerce.number(),
    supplier: z.string(),
    mfdate: z.string(),
    expdate: z.string(),
    buy_price: z.coerce.number(),
    sell_price: z.coerce.number(),
  });

  const FormSchema5 = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    phonenumber: z.string(),
  });

  const FormSchema6 = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
  });

  const CreateInvoice = FormSchema.omit({ id: true, date: true });
  const UpdateInvoice = FormSchema.omit({ id: true, date: true });
  const AddPatient = FormSchema1.omit({});
  const UpdatePatient = FormSchema1.omit({});
  const AddVisit = FormSchema2.omit({id: true});
  const AddDrug = FormSchema3.omit({drug_id: true});
  const UpdateDrug = FormSchema3.omit({drug_id: true});
  const AddStock = FormSchema4.omit({stock_id: true});
  const AddSupplier =  FormSchema5.omit({id: true});
  const AddManufacturer = FormSchema6.omit({id: true});
 
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
  const { p_id, name, gender, address, phonenumber, birthdate } = AddPatient.parse({
    p_id: formData.get('p_id'),
    name: formData.get('name'),
    //age: formData.get('age'),
    gender: formData.get('gender'),
    phonenumber: formData.get('phonenumber'),
    address: formData.get('address'),
    birthdate: formData.get('birthdate'),
  });
  // Test it out:
  //console.log(rawFormData);

  await sql`
    INSERT INTO patientdetails (p_id, name, gender, address, phonenumber, birthdate)
    VALUES (${p_id}, ${name}, ${gender}, ${address}, ${phonenumber}, ${birthdate})
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
    const { p_id, name, gender, address, phonenumber, birthdate } = UpdatePatient.parse({
      p_id: formData.get('p_id'),
      name: formData.get('name'),
      age: formData.get('age'),
      gender: formData.get('gender'),
      address: formData.get('address'),
      phonenumber: formData.get('phonenumber'),
      birthdate: formData.get('birthdate'),
    });

    try {
    await sql`
      UPDATE patientdetails
      SET p_id = ${p_id}, name = ${name}, gender = ${gender}, address = ${address}, phonenumber = ${phonenumber}, birthdate = ${birthdate}
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
    const {p_id, date, pCompl, hpc, pmhx, allergy, examination, investigations_sofar, prescribed_med, investigations_ordered} = AddVisit.parse({
      // id: formData.get('id'),
      date: formData.get('date'), 
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
    
    console.log(FormData);
  
    await sql`
      INSERT INTO visits (patient_id, date, pCompl, hpc, pmhx, allergy, examination, investigations_sofar, prescribed_med, investigations_ordered)
      VALUES (${p_id}, ${date}, ${pCompl}, ${hpc}, ${pmhx}, ${allergy}, ${examination},${investigations_sofar},${prescribed_med},${investigations_ordered})
    `;
  
    revalidatePath('/dashboard/patients');
    redirect('/dashboard/patients');
  }

  export async function addDrug(formData: FormData) {
    const { drug_name_generic, drug_form } = AddDrug.parse({
      drug_name_generic: formData.get('drug_name_generic'),
      drug_form: formData.get('drug_form'),
      
      
    });
    // Test it out:
    console.log(formData);
  
    await sql`
      INSERT INTO drugdetails (drug_name_generic, drug_form)
      VALUES (${drug_name_generic}, ${drug_form})
    `;
  
    revalidatePath('/dashboard/drugs');
    redirect('/dashboard/drugs');
  }

  export async function updateDrug(id: string, formData: FormData) {
    const { drug_name_generic, drug_form } = UpdateDrug.parse({
      drug_name_generic: formData.get('drug_name_generic'),
      drug_form: formData.get('drug_form'),
    });

    try {
    await sql`
      UPDATE drugdetails
      SET drug_name_generic = ${drug_name_generic}, drug_form = ${drug_form}
      WHERE drug_id = ${id}
    `;
    } catch (error) {
    return { message: 'Database Error: Failed to Update drug.' };
  }
   
    revalidatePath('/dashboard/drugs');
    redirect('/dashboard/drugs');
  }

  export async function deleteDrug(id: string) {
    //throw new Error('Failed to Delete Invoice');
    try {
    await sql`DELETE FROM drugdetails WHERE drug_id = ${id}`;
    revalidatePath('/dashboard/drugs');
    return { message: 'Deleted Drug.' };
    } catch (error) {
    return { message: 'Database Error: Failed to Delete Drug.' };
  }
  }
 
  export async function addStock(formData: FormData) {
    const {drug_id,drug_brand,manufacturer,drug_dose,container_quantity,units_per_container,total_quantity,supplier,mfdate,expdate,buy_price,sell_price} = AddStock.parse({
      
      drug_id: formData.get('drug_id'), 
      drug_brand: formData.get('drug_brand'),
      manufacturer: formData.get('manufacturer'),
      drug_dose: formData.get('drug_dose'),
      container_quantity: formData.get('container_quantity'),
      units_per_container: formData.get('units_per_container'),
      total_quantity: formData.get('total_quantity'),
      supplier: formData.get('supplier'),
      mfdate: formData.get('mfdate'),
      expdate: formData.get('expdate'),
      buy_price: formData.get('buy_price'),
      sell_price: formData.get('sell_price'),
    });
    const buypriceInCents = buy_price * 100;
    const sellpriceInCents = sell_price * 100;
    console.log(FormData);
  
    await sql`
      INSERT INTO drugstocks (drug_id, drug_brand, manufacturer, drug_dose, container_quantity, units_per_container, total_quantity, supplier, mfdate, expdate, buy_price, sell_price)
      VALUES (${drug_id}, ${drug_brand}, ${manufacturer}, ${drug_dose}, ${container_quantity}, ${units_per_container}, ${total_quantity},${supplier},${mfdate},${expdate},${buypriceInCents},${sellpriceInCents})
    `;
  
    revalidatePath('/dashboard/drugs');
    redirect('/dashboard/drugs');
  }

  export async function deleteStock(id: string) {
    //throw new Error('Failed to Delete Invoice');
    try {
    await sql`DELETE FROM drugstocks WHERE stock_id = ${id}`;
    revalidatePath('/dashboard/drugs');
    return { message: 'Deleted stock.' };
    } catch (error) {
    return { message: 'Database Error: Failed to Delete stock.' };
  }
  }


  export async function addSupplier(formData: FormData) {
    const { name, address, phonenumber } = AddSupplier.parse({
      
      name: formData.get('name'),
      phonenumber: formData.get('phonenumber'),
      address: formData.get('address'),
      
    });
  
    await sql`
      INSERT INTO suppliers (name, address, phonenumber)
      VALUES ( ${name}, ${address}, ${phonenumber})
    `;
  
    revalidatePath('/dashboard/drugs');
    redirect('/dashboard/drugs');
  }

  export async function addManufacturer(formData: FormData) {
    const { name, address } = AddManufacturer.parse({
      
      name: formData.get('name'),
      address: formData.get('address'),
      
    });
  
    await sql`
      INSERT INTO manufacturers (name, address)
      VALUES ( ${name}, ${address})
    `;
  
    revalidatePath('/dashboard/drugs');
    redirect('/dashboard/drugs');
  }