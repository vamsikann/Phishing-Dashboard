import sqlite3
import csv
import os

print("Starting SQLdb.py script...")

PROCESSED_FILES_LIST = 'processed_files.txt'


def create_database():
    conn = sqlite3.connect('quiz_data.db')
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS quiz_responses (
        id INTEGER PRIMARY KEY,
        responder TEXT,
        submitDate TEXT,
        question1 TEXT,
        question2 TEXT,
        question3 TEXT,
        question4 TEXT,
        question5 TEXT,
        question6 TEXT,
        question7 TEXT,
        question8 TEXT,
        question9 TEXT,
        question10 TEXT,
        score INTEGER,
        UNIQUE(responder, submitDate)
    )
    ''')

    conn.commit()
    conn.close()


def create_correct_answers_table():
    conn = sqlite3.connect('quiz_data.db')
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS correct_answers (
        question_id TEXT PRIMARY KEY,
        correct_answer TEXT
    )
    ''')

    correct_answers_data = [
        ('question1', 'Call your bank directly using the number from their official website or your bank card'),
        ('question2', "The website's URL is slightly different from the known one"),
        ('question3', 'Log out of all accounts and clear cache'),
        ('question4', 'Potential insider threat activity'),
        ('question5', 'Disconnect from the internet, backup important data, and run a trusted malware scan'),
        ('question6', 'More risky than using work-supplied devices'),
        ('question7', 'Insider Threats'),
        ('question8', 'No'),
        ('question9', 'False'),
        ('question10', 'Redirect them to public relations or HR without giving any details'),

    ]
    cursor.executemany('INSERT OR IGNORE INTO correct_answers VALUES (?, ?)', correct_answers_data)

    conn.commit()
    conn.close()


def calculate_score(user_responses):
    conn = sqlite3.connect('quiz_data.db')
    cursor = conn.cursor()

    correct_answers = cursor.execute('SELECT * FROM correct_answers').fetchall()
    correct_answers_dict = {row[0]: row[1] for row in correct_answers}

    score = 0
    for question, answer in user_responses.items():
        if correct_answers_dict.get(question) == answer:
            score += 10

    conn.close()
    return score


def import_csv_to_sqlite(csv_file):
    conn = sqlite3.connect('quiz_data.db')
    cursor = conn.cursor()

    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            user_responses = {
                'question1': row['r0f5036a8c67949be981582ee5359171f'],
                'question2': row['r1ce3bb4c82b7413a9518760318931831'],
                'question3': row['ra8c6feed45774005a4d108977d014fe7'],
                'question4': row['rabc89e36fb0d4b45a14898254f6b9e6c'],
                'question5': row['re7cdca2dcdf14530b24db50a3147dec5'],
                'question6': row['r06e82d4c8dd740458a2c9fb110b8cd81'],
                'question7': row['r7f3146e02c734733a74ee4328c37fc7f'],
                'question8': row['r08007b431fff4121b93e311fc9d825e3'],
                'question9': row['r225f4d3f7a8045e28be943c838808ec4'],
                'question10': row['r2633c17e9747419fb059dc350c22bc7e'],
            }
            user_score = calculate_score(user_responses)
            try:
                print(f"Inserting data for {row['responder']} on {row['submitDate']}...")

                cursor.execute('''
                INSERT INTO quiz_responses (responder, submitDate, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, score)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (row['responder'], row['submitDate'], row['r0f5036a8c67949be981582ee5359171f'],
                      row['r1ce3bb4c82b7413a9518760318931831'], row['ra8c6feed45774005a4d108977d014fe7'],
                      row['rabc89e36fb0d4b45a14898254f6b9e6c'], row['re7cdca2dcdf14530b24db50a3147dec5'],
                      row['r06e82d4c8dd740458a2c9fb110b8cd81'], row['r7f3146e02c734733a74ee4328c37fc7f'],
                      row['r08007b431fff4121b93e311fc9d825e3'], row['r225f4d3f7a8045e28be943c838808ec4'],
                      row['r2633c17e9747419fb059dc350c22bc7e'], user_score))
            except sqlite3.IntegrityError:
                print(f"Duplicate entry for {row['responder']} on {row['submitDate']}. Skipping.")

    conn.commit()
    conn.close()


def import_all_csvs_in_directory(directory='.'):

    if os.path.exists(PROCESSED_FILES_LIST):
        with open(PROCESSED_FILES_LIST, 'r') as f:
            processed_files = f.read().splitlines()
    else:
        processed_files = []

    csv_files = [f for f in os.listdir(directory) if
                 os.path.isfile(os.path.join(directory, f)) and f.endswith('.csv') and f not in processed_files]
    for csv_file in csv_files:
        import_csv_to_sqlite(os.path.join(directory, csv_file))

        with open(PROCESSED_FILES_LIST, 'a') as f:
            f.write(csv_file + '\n')


if __name__ == "__main__":
    create_database()
    create_correct_answers_table()
    directory_path = os.getcwd()
    import_all_csvs_in_directory(directory_path)
