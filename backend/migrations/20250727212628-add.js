module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

    await db
      .collection("houses")
      .updateMany(
        {},
        {
          $set: {
            houseDescription: "",
            houseBedrooms: 3,
            houseBathrooms: 2,
            houseSize: 950,
            houseAmenities: ["WiFi", "Parking", "Kitchen"],
          },
        },
      );
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});

    await db
      .collection("houses")
      .updateMany(
        {},
        {
          $unset: {
            houseBedrooms: 3,
            houseBathrooms: 2,
            houseSize: 950,
            houseAmenities: ["WiFi", "Parking", "Kitchen"],
          },
        },
      );
  },
};
