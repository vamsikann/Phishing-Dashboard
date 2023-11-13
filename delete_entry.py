import sqlite3
import os

database_path = os.path.join(os.getcwd(), 'quiz_data.db')

conn = sqlite3.connect(database_path)
cursor = conn.cursor()

# Define the range of IDs to delete here
start_id = 10
end_id = 310

# SQL statement to delete rows based on ID range
delete_statement = "DELETE FROM quiz_responses WHERE id BETWEEN ? AND ?;"

# Execute the deletion
cursor.execute(delete_statement, (start_id, end_id))

# Commit the changes and close the connection
conn.commit()
cursor.close()
conn.close()

print(f"Deletion of entries from ID 10 to 252 completed successfully.")
