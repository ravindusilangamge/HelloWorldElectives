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
    pmhx: z.string(),
    allergy: z.string(),
  });

  const FormSchema2 = z.object({
    id: z.string(),
    date: z.string(),
    p_id: z.string(),
    pCompl: z.string(),
    hpc: z.string(),
    //pmhx: z.string(),
    //allergy: z.string(),
    examination: z.string(),
    investigations_sofar: z.string(),
    prescribed_med: z.string(),
    investigations_ordered: z.string(),
    prescription: z.string(),
    dispensed: z.boolean(),
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
    manufacturer_id: z.string(),
    drug_dose: z.coerce.number(),
    unit: z.string(),
    container_quantity: z.coerce.number(),
    units_per_container: z.coerce.number(),
    total_quantity: z.coerce.number(),
    supplier_id: z.string(),
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

  const FormSchema8 = z.object({
    id: z.string(),
    visit_id: z.string(),
    stock_id: z.string(),
    quantity: z.coerce.number(),
    amount: z.coerce.number(),
  });

  const CreateInvoice = FormSchema.omit({ id: true, date: true });
  const UpdateInvoice = FormSchema.omit({ id: true, date: true });
  const AddPatient = FormSchema1.omit({});
  const UpdatePatient = FormSchema1.omit({});
  const AddVisit = FormSchema2.omit({id: true, dispensed: true});
  const AddDrug = FormSchema3.omit({drug_id: true});
  const UpdateDrug = FormSchema3.omit({drug_id: true});
  const AddStock = FormSchema4.omit({stock_id: true});
  const UpdateStock = FormSchema4.omit({stock_id: true});
  const AddSupplier =  FormSchema5.omit({id: true});
  const AddManufacturer = FormSchema6.omit({id: true});
  const AddDrugSale = FormSchema8.omit({id: true});
  const UpdateVisitsDispense = FormSchema2.omit({id: true});
 
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
  const { p_id, name, gender, address, phonenumber, birthdate, pmhx, allergy } = AddPatient.parse({
    p_id: formData.get('p_id'),
    name: formData.get('name'),
    gender: formData.get('gender'),
    phonenumber: formData.get('phonenumber'),
    address: formData.get('address'),
    birthdate: formData.get('birthdate'),
    pmhx: formData.get('pmhx'),
    allergy: formData.get('allergy'),
  });
  const dm = formData.get('dm') === 'true';
  const htn = formData.get('htn') === 'true';
  const dl = formData.get('dl') === 'true';
  const ba = formData.get('ba') === 'true';
  const food = formData.get('food') === 'true';
  const drugs = formData.get('drugs') === 'true';
  const plaster = formData.get('plaster') === 'true';
  // Test it out:
  //console.log(rawFormData);

  await sql`
    INSERT INTO patientdetails (p_id, name, gender, address, phonenumber, birthdate, pmhx, dm, htn, dl, ba, allergy_det, food, drugs, plaster)
    VALUES (${p_id}, ${name}, ${gender}, ${address}, ${phonenumber}, ${birthdate}, ${pmhx}, ${dm}, ${htn}, ${dl}, ${ba}, ${allergy}, ${food}, ${drugs}, ${plaster})
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
    const { p_id, name, gender, address, phonenumber, birthdate, pmhx, allergy } = UpdatePatient.parse({
      p_id: formData.get('p_id'),
      name: formData.get('name'),
      age: formData.get('age'),
      gender: formData.get('gender'),
      address: formData.get('address'),
      phonenumber: formData.get('phonenumber'),
      birthdate: formData.get('birthdate'),
      pmhx: formData.get('pmhx'),
      allergy: formData.get('allergy'),
    });

    const dm = formData.get('dm') === 'true';
    const htn = formData.get('htn') === 'true';
    const dl = formData.get('dl') === 'true';
    const ba = formData.get('ba') === 'true';
    const food = formData.get('food') === 'true';
    const drugs = formData.get('drugs') === 'true';
    const plaster = formData.get('plaster') === 'true';

    try {
    await sql`
      UPDATE patientdetails
      SET p_id = ${p_id}, name = ${name}, gender = ${gender}, address = ${address}, phonenumber = ${phonenumber}, birthdate = ${birthdate}, pmhx = ${pmhx},
      dm = ${dm}, htn = ${htn}, dl = ${dl}, ba = ${ba}, food = ${food}, drugs = ${drugs}, plaster = ${plaster}, allergy_det = ${allergy}
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

  export async function deleteVisit(id: string) {
    //throw new Error('Failed to Delete Invoice');
    try {
    await sql`DELETE FROM visits WHERE id = ${id}`;
    revalidatePath('/dashboard/patients');
    return { message: 'Deleted visit.' };
    } catch (error) {
    return { message: 'Database Error: Failed to Delete visit.' };
  }
  }

  export async function addVisit(formData: FormData) {
    const {p_id, date, pCompl, hpc, examination, investigations_sofar, prescribed_med, investigations_ordered,prescription} = AddVisit.parse({
      // id: formData.get('id'),
      date: formData.get('date'), 
      p_id: formData.get('p_id'),
      pCompl: formData.get('pCompl'),
      hpc: formData.get('hpc'),
      // pmhx: formData.get('pmhx'),
      // allergy: formData.get('allergy'),
      examination: formData.get('examination'),
      investigations_sofar: formData.get('investigations_sofar'),
      prescribed_med: formData.get('prescribed_med'),
      investigations_ordered: formData.get('investigations_ordered'),
      prescription: formData.get('prescription'),
    });

    const dateReal = new Date().toLocaleString();
    
    //const test = JSON.parse(prescription);
    let parsedPrescription = null;

    if (prescription) {
      try {
        parsedPrescription = JSON.parse(prescription as string);
      } catch (error) {
        console.error('Error parsing prescription JSON:', error);
      }
    }

    console.log(FormData);
    console.log('this is the value of test - ', parsedPrescription);
    console.log('this is prescription', prescription);
  
    await sql`
      INSERT INTO visits (patient_id, date, pCompl, hpc, examination, investigations_sofar, prescribed_med, investigations_ordered, prescription, datereal)
      VALUES (${p_id}, ${date}, ${pCompl}, ${hpc}, ${examination},${investigations_sofar},${prescribed_med},${investigations_ordered}, ${parsedPrescription}, ${dateReal})
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
    const {drug_id,drug_brand,manufacturer_id,drug_dose,unit, container_quantity,units_per_container,total_quantity,supplier_id,mfdate,expdate,buy_price,sell_price} = AddStock.parse({
      
      drug_id: formData.get('drug_id'), 
      drug_brand: formData.get('drug_brand'),
      manufacturer_id: formData.get('manufacturer'),
      drug_dose: formData.get('drug_dose'),
      unit: formData.get('unit'),
      container_quantity: formData.get('container_quantity'),
      units_per_container: formData.get('units_per_container'),
      total_quantity: formData.get('total_quantity'),
      supplier_id: formData.get('supplier'),
      mfdate: formData.get('mfdate'),
      expdate: formData.get('expdate'),
      buy_price: formData.get('buy_price'),
      sell_price: formData.get('sell_price'),
    });
    const buypriceInCents = buy_price * 100;
    const sellpriceInCents = sell_price * 100;
    console.log(FormData);
  
    await sql`
      INSERT INTO drugstocks (drug_id, drug_brand, manufacturer_id, drug_dose, unit, container_quantity, units_per_container, total_quantity, supplier_id, mfdate, expdate, buy_price, sell_price)
      VALUES (${drug_id}, ${drug_brand}, ${manufacturer_id}, ${drug_dose}, ${unit}, ${container_quantity}, ${units_per_container}, ${total_quantity},${supplier_id},${mfdate},${expdate},${buypriceInCents},${sellpriceInCents})
    `;
  
    revalidatePath('/dashboard/drugs');
    redirect('/dashboard/drugs');
  }

  export async function updateStock(id: string, formData: FormData) {
    const { drug_id,drug_brand,manufacturer_id,drug_dose,unit,container_quantity,units_per_container,total_quantity,supplier_id,mfdate,expdate,buy_price,sell_price } = UpdateStock.parse({
      drug_id: formData.get('drug_id'), 
      drug_brand: formData.get('drug_brand'),
      manufacturer_id: formData.get('manufacturer'),
      drug_dose: formData.get('drug_dose'),
      unit: formData.get('unit'),
      container_quantity: formData.get('container_quantity'),
      units_per_container: formData.get('units_per_container'),
      total_quantity: formData.get('total_quantity'),
      supplier_id: formData.get('supplier'),
      mfdate: formData.get('mfdate'),
      expdate: formData.get('expdate'),
      buy_price: formData.get('buy_price'),
      sell_price: formData.get('sell_price'),
    });

    const buypriceInCents = buy_price * 100;
    const sellpriceInCents = sell_price * 100;

    try {
    await sql`
      UPDATE drugstocks
      SET drug_brand = ${drug_brand}, manufacturer_id = ${manufacturer_id}, drug_dose = ${drug_dose}, unit = ${unit}, container_quantity = ${container_quantity}, units_per_container = ${units_per_container}, total_quantity = ${total_quantity}, supplier_id = ${supplier_id}, mfdate = ${mfdate}, expdate = ${expdate}, buy_price = ${buypriceInCents}, sell_price = ${sellpriceInCents}
      WHERE stock_id = ${id}
    `;
    } catch (error) {
    return { message: 'Database Error: Failed to Update stock.' };
  }
   
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

  type saleRecord = {
    visit_id: string;
    stock_id: string;
    quantity: number;
    amount: number;
  };

  export async function addDrugSale(saleRecord: saleRecord) {
    const { visit_id, stock_id, quantity, amount } = saleRecord;
    const amountInCents = amount;
    const date = new Date().toISOString().split('T')[0];
    
    try {
      await sql`
        INSERT INTO prescriptions (visit_id, stock_id, servedquantity, billvalue, date)
        VALUES (${visit_id}, ${stock_id}, ${quantity}, ${amountInCents}, ${date})
      `;
      console.log('Drug sale record added successfully');
    } catch (error) {
      console.error('Error adding drug sale record:', error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }

  export async function addDrugsSale2(formData: FormData, totalDrugs: number) {
    const date = new Date().toISOString();
  
    for (let i = 0; i < totalDrugs; i++) {
      const visit_id = formData.get(`visit_id_${i}`);
      const stock_id = formData.get(`stock_id_${i}`);
      const quantity = formData.get(`quantity_${i}`);
      const amount = formData.get(`amount_${i}`);

      // Check if any of the required values are null
      if (visit_id === null || stock_id === null || quantity === null || amount === null) {
        // Skip this iteration if any of the values are null
        continue;
      }
  
      // Validate the form data for the current drug
      const parsedData = AddDrugSale.parse({
        visit_id,
        stock_id,
        quantity: Number(quantity),
        amount: Number(amount),
      });
  
      const amountInCents = parsedData.amount;
  
      try {
        // Insert the prescription record into the database
        await sql`
          INSERT INTO prescriptions (visit_id, stock_id, servedquantity, billvalue, date)
          VALUES (${parsedData.visit_id}, ${parsedData.stock_id}, ${parsedData.quantity}, ${amountInCents}, ${date})
        `;
  
        // Update the drug stock quantity in the database
        await sql`
          UPDATE drugstocks
          SET total_quantity = total_quantity - ${parsedData.quantity}
          WHERE stock_id = ${parsedData.stock_id}
        `;
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to add drug sale');
      }
    }
  
    // Optional: Revalidate path and redirect (uncomment if necessary)
    // revalidatePath('/dashboard/drugs');
    // redirect('/dashboard/drugs');
  }

  export async function updateVisitPrescription(id: string, formData: FormData) {
    
    const dispensedString = formData.get('dispensed');
    const dispensed = dispensedString === 'true';

    try {
    await sql`
      UPDATE visits
      SET dispensed = ${dispensed}
      WHERE id = ${id}
    `;
    } catch (error) {
    return { message: 'Database Error: Failed to Update Visit dispense.' };
  }
   
    revalidatePath('/dashboard/dispencer');
    redirect('/dashboard/dispencer');
  }

function noStore() {
  throw new Error('Function not implemented.');
}
