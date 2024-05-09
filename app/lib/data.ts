import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  PatientsTableType,
  VisitsTable,
  DrugsTableType,
  DrugStocksTable,
  SuppliersTable,
  ManufacturersTable,
  prescriptionTable,
  
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  noStore();
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    {/* console.log('Fetching revenue data...');
  await new Promise((resolve) => setTimeout(resolve, 3000)); */}

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    console.log(invoice);

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchPatients(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const patients = await sql<PatientsTableType>`
      SELECT
        patientdetails.p_id,
        patientdetails.name,
        
        patientdetails.gender,
        patientdetails.address,
        patientdetails.phonenumber,
        patientdetails.birthdate
      FROM patientdetails
      WHERE
        patientdetails.name ILIKE ${`%${query}%`} OR
        
        patientdetails.address ILIKE ${`%${query}%`} OR
        patientdetails.gender ILIKE ${`%${query}%`} OR
        patientdetails.p_id ILIKE ${`%${query}%`} OR
        patientdetails.phonenumber ILIKE ${`%${query}%`}
      ORDER BY patientdetails.p_id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return patients.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch patients.');
  }
}

export async function fetchPatientsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM patientdetails
    WHERE
      patientdetails.p_id ILIKE ${`%${query}%`} OR
      patientdetails.name ILIKE ${`%${query}%`} OR
      patientdetails.age ILIKE ${`%${query}%`} OR
      patientdetails.gender ILIKE ${`%${query}%`} OR
      patientdetails.address ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of patients.');
  }
}

export async function fetchPatientById(id: string) {
  noStore();
  try {
    const data = await sql<PatientsTableType>`
      SELECT
        patientdetails.p_id,
        patientdetails.name,
        patientdetails.age,
        patientdetails.gender,
        patientdetails.address,
        patientdetails.birthdate,
        patientdetails.phonenumber,
        patientdetails.pmhx,
        patientdetails.dm,
        patientdetails.htn,
        patientdetails.dl,
        patientdetails.ba,
        patientdetails.food,
        patientdetails.drugs,
        patientdetails.plaster,
        patientdetails.allergy_det
      FROM patientdetails
      WHERE patientdetails.p_id = ${id};
    `;

    const patient = data.rows.map((patient) => ({
      ...patient,
    }));
    console.log(patient);

    return patient[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch patient.');
  }
}

export async function fetchVisitsById(id: string) {
  noStore();
  try {
    const data = await sql<VisitsTable>`
      SELECT
        visits.id,
        visits.patient_id,
        visits.date,
        visits.pcompl,
        visits.hpc,
        visits.examination,
        visits.investigations_sofar,
        visits.prescribed_med,
        visits.investigations_ordered,
        visits.prescription
      FROM visits
      WHERE visits.patient_id = ${id}
      ORDER BY visits.date DESC;
    `;

    // const patient = data.rows.map((patient) => ({
    //   ...patient,
    // }));
    console.log(data);

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch patient visits.');
  }
}

export async function fetchVisitsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM visits
    WHERE
      visits.date ILIKE ${`%${query}%`} OR
      visits.pCompl ILIKE ${`%${query}%`} OR
      visits.hpc ILIKE ${`%${query}%`} OR
      visits.prescribed_med ILIKE ${`%${query}%`} OR
      visits.investigations_ordered ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of patients.');
  }
}


export async function fetchDrugsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM drugdetails
    WHERE
      drugdetails.drug_name_generic ILIKE ${`%${query}%`} OR
      drugdetails.drug_form ILIKE ${`%${query}%`} 
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of patients.');
  }
}

export async function fetchDrugs(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const drugs = await sql<DrugsTableType>`
      SELECT
        drugdetails.drug_id,
        drugdetails.drug_name_generic,
        drugdetails.drug_form
      FROM drugdetails
      WHERE
        drugdetails.drug_name_generic ILIKE ${`%${query}%`} OR
        drugdetails.drug_form ILIKE ${`%${query}%`}
      ORDER BY drugdetails.drug_name_generic ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return drugs.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drugs.');
  }
}

export async function fetchDrugsforForm() {
  noStore();
  try {
    const data = await sql<DrugsTableType>`
      SELECT
        drug_id,
        drug_name_generic,
        drug_form
      FROM drugdetails
      ORDER BY drug_name_generic ASC
    `;

    const drugs = data.rows;
    return drugs;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all drugs.');
  }
}

export async function fetchDrugById(id: string) {
  noStore();
  try {
    const data = await sql<DrugsTableType>`
      SELECT
        drugdetails.drug_id,
        drugdetails.drug_name_generic,
        drugdetails.drug_form
      FROM drugdetails
      WHERE drugdetails.drug_id = ${id};
    `;

    const drug = data.rows.map((drug) => ({
      ...drug,
    }));
    console.log(drug);

    return drug[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch patient.');
  }
}

export async function fetchStocksById(id: string) {
  noStore();
  try {
    const data = await sql<DrugStocksTable>`
      SELECT
        drugstocks.stock_id,
        drugstocks.drug_id,
        drugstocks.drug_brand,
        drugstocks.manufacturer_id,
        drugstocks.drug_dose,
        drugstocks.unit,
        drugstocks.container_quantity,
        drugstocks.units_per_container,
        drugstocks.total_quantity,
        drugstocks.supplier_id,
        drugstocks.mfdate,
        drugstocks.expdate,
        drugstocks.buy_price,
        drugstocks.sell_price
      FROM drugstocks
      WHERE drugstocks.drug_id = ${id};
    `;

    //const drug = data.rows

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drug stocks.');
  }
}

export async function fetchSuppliers() {
  noStore();
  try {
    const data = await sql<SuppliersTable>`
      SELECT
        suppliers.id,
        suppliers.name,
        suppliers.address,
        suppliers.phonenumber
      FROM suppliers
      ORDER BY name ASC;
    `;

    //const drug = data.rows

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch suppliers.');
  }
}

export async function fetchManufacturers() {
  noStore();
  try {
    const data = await sql<ManufacturersTable>`
      SELECT
        manufacturers.id,
        manufacturers.name,
        manufacturers.address
      FROM manufacturers
      ORDER BY name ASC;
    `;

    //const drug = data.rows

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch manufacturers.');
  }
}

export async function fetchManufacturersById(id: string) {
  noStore();
  try {
    const data = await sql<ManufacturersTable>`
      SELECT
        manufacturers.id,
        manufacturers.name,
        manufacturers.address
      FROM manufacturers
      WHERE manufacturers.id = ${id};
    `;

    //const drug = data.rows

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch manufacturers.');
  }
}

export async function fetchPrescriptionsByDate() {
  noStore();
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = await sql<VisitsTable>`
      SELECT
        visits.id,
        visits.patient_id,
        visits.prescription,
        visits.dispensed
      FROM visits
      WHERE DATE(visits.date) = ${today}
      ORDER BY id DESC;
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch prescriptions for today.');
  }
}

export async function fetchStocks() {
  noStore();
  try {
    const data = await sql<DrugStocksTable>`
      SELECT
        drugstocks.stock_id,
        drugstocks.drug_id,
        drugstocks.drug_brand,
        drugstocks.manufacturer_id,
        drugstocks.drug_dose,
        drugstocks.container_quantity,
        drugstocks.units_per_container,
        drugstocks.total_quantity,
        drugstocks.supplier_id,
        drugstocks.mfdate,
        drugstocks.expdate,
        drugstocks.buy_price,
        drugstocks.sell_price
      FROM drugstocks;
    `;

    //const drug = data.rows

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch drug stocks.');
  }
}

export async function fetchPatientsByVisit() {
  noStore();
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = await sql<PatientsTableType>`
      SELECT
        patientdetails.p_id,
        patientdetails.name
      FROM patientdetails
      JOIN visits ON patientdetails.p_id = visits.patient_id
      WHERE DATE(visits.date) = ${today}
      AND visits.prescription IS NOT NULL;
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch prescriptions for today.');
  }
}

export async function fetchVisitForPresById(id: string) {
  noStore();
  try {
    const data = await sql<VisitsTable>`
      SELECT
        visits.id,
        visits.patient_id,
        visits.date,
        visits.pcompl,
        visits.hpc,
        visits.examination,
        visits.investigations_sofar,
        visits.prescribed_med,
        visits.investigations_ordered,
        visits.prescription
      FROM visits
      WHERE visits.id = ${id};
    `;

    console.log(data);

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch patient visits.');
  }
}


export async function fetchPrescriptionsByVisitID(id: string) {
  noStore();
  try {
    const data = await sql<prescriptionTable>`
      SELECT
        prescriptions.id,
        prescriptions.stock_id,
        prescriptions.visit_id,
        prescriptions.servedquantity,
        prescriptions.billvalue,
        prescriptions.date
      FROM prescriptions
      WHERE prescriptions.visit_id = ${id};
    `;

    console.log(data);

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch patient visits.');
  }
}

