const { db } = require('@vercel/postgres');
const {
    drug_details, drug_stocks
  } = require('../app/lib/placeholder-data.js');


  // async function seedDrugs(client) {
  //   try {
  //     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
  //     // Create the "drugs" table if it doesn't exist
  //     const createTable = await client.sql`
  //     CREATE TABLE IF NOT EXISTS drugdetails (
  //     drug_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     drug_name_generic VARCHAR(100) NOT NULL,
  //     drug_brand VARCHAR(100),
  //     manufacturer VARCHAR(100),
  //     drug_dose VARCHAR(15),
  //     drug_form VARCHAR(20)
  //   );
  // `;
  
  //     console.log(`Created "drugs" table`);
  
  //     // Insert data into the "drugs" table
  //     const insertedDrugs = await Promise.all(
  //       drug_details.map(
  //         (drug) => client.sql`
  //         INSERT INTO drugdetails (drug_id, drug_name_generic, drug_brand, manufacturer, drug_dose, drug_form)
  //         VALUES (${ drug.drug_id}, ${drug.drug_name_generic}, ${drug.drug_brand}, ${drug.manufacturer}, ${drug.drug_dose}, ${drug.drug_form})
  //         ON CONFLICT (drug_id) DO NOTHING;
  //       `,
  //       ),
  //     );
  
  //     console.log(`Seeded ${insertedDrugs.length} drugs`);
  
  //     return {
  //       createTable,
  //       drugs: insertedDrugs,
  //     };
  //   } catch (error) {
  //     console.error('Error seeding drugs:', error);
  //     throw error;
  //   }
  // }

  async function seedDrugstocks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
        // Create the "drugs" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS drugstocks (
        stock_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        drug_id UUID NOT NULL,
        drug_brand VARCHAR(100),
        manufacturer VARCHAR(100),
        drug_dose VARCHAR(20),
        container_quantity INT,
        units_per_container INT,
        total_quantity INT,
        supplier VARCHAR(25),
        mfdate DATE,
        expdate DATE,
        batch_no VARCHAR(10),
        buy_price INT,
        sell_price INT
      );
    `;
    
        console.log(`Created "drugstocks" table`);
    
        // Insert data into the "drugstocks" table
        const insertedDrugstocks = await Promise.all(
          drug_stocks.map(
            (drug) => client.sql`
            INSERT INTO drugstocks (drug_id, drug_brand, manufacturer, drug_dose, container_quantity, units_per_container, total_quantity, supplier, mfdate, expdate, batch_no, buy_price, sell_price)
            VALUES (${drug.drug_id}, ${drug.drug_brand}, ${drug.manufacturer}, ${drug.drug_dose}, ${drug.container_quantity}, ${drug.units_per_container}, ${drug.total_quantity}, ${drug.supplier}, ${drug.mfdate}, ${drug.expdate}, ${drug.batch_no}, ${drug.buy_price}, ${drug.sell_price})
            ON CONFLICT (stock_id) DO NOTHING;
          `,
          ),
        );
    
        console.log(`Seeded ${insertedDrugstocks.length} drugstocks`);
    
        return {
          createTable,
          drugstocks: insertedDrugstocks,
        };
      } catch (error) {
        console.error('Error seeding drugs:', error);
        throw error;
      }
  }

  async function main() {
    const client = await db.connect();
  
    //await seedDrugs(client);
    await seedDrugstocks(client);
  
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });