import sqlite3

database_path = 'C:/Users/17863/PycharmProjects/Phishing-Dashboard/quiz_data.db'

# enter the users email, using carlos as an example
user_email = 'ccarr022@fiu.edu'

conn = sqlite3.connect(database_path)
cursor = conn.cursor()

delete_statement = "DELETE FROM quiz_responses WHERE responder = ?;"

cursor.execute(delete_statement, (user_email,))

conn.commit()
cursor.close()
conn.close()

print("Deletion completed successfully.")
