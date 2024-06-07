const sql = require("mssql"); 
const dbConfig = require("../dbConfig"); 
class Food { 
constructor(id, name, category,available) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.available = available;
} 

      static async updateAvailability(id, newAvailability) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE Foods SET available = @available, WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        request.input("available", newAvailability.available)
    
        await request.query(sqlQuery);
    
        connection.close();
    
      }


      static async getAvailableByCategory(category) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Foods WHERE category = @category AND available = 'Y'`; // Parameterized query
    
        const request = connection.request();
        request.input("category", category);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
          ? new Food(
              result.recordset[0].id,
              result.recordset[0].name,
              result.recordset[0].category,
              result.recordset[0].available
            )
          : null; 
      }


      static async getFoodItemsInOrders() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Orders o INNER JOIN OrderFoods f
        ON o.ID = p.order_id WHERE complete = 'Y'`; // Replace with your actual table name
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
          ? new Food(
            result.recordset[0].id,
            result.recordset[0].name,
            result.recordset[0].category,
            result.recordset[0].available
            )
          : null; 
      }
     

}
module.exports = Food;