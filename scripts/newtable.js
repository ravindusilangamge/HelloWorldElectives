const { db } = require('@vercel/postgres');
const {
    visits,
  } = require('../app/lib/placeholder-data.js');

//const bcrypt = require('bcrypt');

async function seedVisits(client) {
    try {
      await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  
      // Create the "visits" table if it doesn't exist
      const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS visits (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      patient_id VARCHAR(20) NOT NULL,
      date DATE NOT NULL,
      pCompl VARCHAR(255) NOT NULL,
      hpc TEXT NOT NULL,
      pmhx TEXT,
      allergy VARCHAR(255),
      examination TEXT,
      investigations_sofar TEXT,
      prescribed_med TEXT,
      investigations_ordered TEXT
    );
  `;
  
      console.log(`Created "Visits" table`);
  
      // Insert data into the "visits" table
      const insertedVisits = await Promise.all(
        visits.map(
          (visit) => client.sql`
          INSERT INTO visits (patient_id, date, pCompl, hpc, pmhx, allergy, examination, investigations_sofar, prescribed_med, investigations_ordered)
          VALUES (${visit.patient_id}, ${visit.date}, ${visit.pCompl}, ${visit.hpc}, ${visit.pmhx}, ${visit.allergy}, ${visit.examination}, ${visit.investigations_sofar}, ${visit.prescribed_med}, ${visit.investigations_ordered})
          ON CONFLICT (id) DO NOTHING;
        `,
        ),
      );
  
      console.log(`Seeded ${insertedVisits.length} visits`);
  
      return {
        createTable,
        visits: insertedVisits,
      };
    } catch (error) {
      console.error('Error seeding visits:', error);
      throw error;
    }
  }

  async function main() {
    const client = await db.connect();
  
    await seedVisits(client);
  
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });