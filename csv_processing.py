import sqlite3
import csv
import os

database_path = 'quiz_data.db'

output_directory = os.path.join(os.getcwd(), 'User_Data')

conn = sqlite3.connect(database_path)
cursor = conn.cursor()

query = "SELECT responder, submitDate, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10 FROM quiz_responses;"
cursor.execute(query)
entries = cursor.fetchall()

headers = ["responder", "submitDate", "r0f5036a8c67949be981582ee5359171f", "r1ce3bb4c82b7413a9518760318931831",
           "ra8c6feed45774005a4d108977d014fe7", "rabc89e36fb0d4b45a14898254f6b9e6c",
           "re7cdca2dcdf14530b24db50a3147dec5", "r06e82d4c8dd740458a2c9fb110b8cd81",
           "r7f3146e02c734733a74ee4328c37fc7f", "r08007b431fff4121b93e311fc9d825e3",
           "r225f4d3f7a8045e28be943c838808ec4", "r2633c17e9747419fb059dc350c22bc7e"]

for entry in entries:
    responder_email = entry[0]
    csv_filename = os.path.join(output_directory, f"{responder_email}.csv")

    with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(headers)
        writer.writerow(entry)

cursor.close()
conn.close()

print("CSV files generated successfully.")
