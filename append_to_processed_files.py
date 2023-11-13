import os

# Any manually created csv files should go to User_Data_Test

csv_directory = os.path.join(os.getcwd(), 'User_Data_Test')
processed_files_path = os.path.join(os.getcwd(), 'User_Data', 'processed_files.txt')


# List all files in the csv_directory
csv_files = [f for f in os.listdir(csv_directory) if f.endswith('.csv')]

# Open the processed_files.txt and append new file names
with open(processed_files_path, 'a') as processed_file:
    for csv_file in csv_files:
        processed_file.write(csv_file + '\n')

print("Processed files updated successfully.")
