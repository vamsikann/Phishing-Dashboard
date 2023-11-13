import sqlite3
import random
import datetime
from faker import Faker

# Database path
db_path = 'quiz_data.db'

fake = Faker()


def generate_fiu_email():
    """Generates a random FIU email address using Faker."""
    first_name = fake.first_name().lower()
    last_name = fake.last_name().lower()
    number = random.randint(10, 999)
    email = f"{first_name}{last_name}{number}@fiu.edu"
    return email


def generate_submit_date(start_date, end_date):
    """Generates a random submission date within a specified range."""
    time_format = "%m/%d/%Y %I:%M:%S %p"
    start = datetime.datetime.strptime(start_date, time_format)
    end = datetime.datetime.strptime(end_date, time_format)
    random_date = start + (end - start) * random.random()
    return random_date.strftime(time_format)


def calculate_score(user_responses, correct_answers):
    """Calculates the score based on user responses and correct answers."""
    score = 0
    for question, answer in user_responses.items():
        if correct_answers.get(question) == answer:
            score += 10
    return score


def insert_quiz_response(db_path, responder, submit_date, responses, score):
    """Inserts a quiz response into the database."""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    data = (responder, submit_date, *responses, score)
    query = '''
    INSERT INTO quiz_responses (responder, submitDate, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, score)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    '''
    try:
        cursor.execute(query, data)
        conn.commit()
    except sqlite3.IntegrityError as e:
        print(f"Error inserting data: {e}")
    finally:
        conn.close()


# Fetch the correct answers from the database
def fetch_correct_answers():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    correct_answers = cursor.execute('SELECT * FROM correct_answers').fetchall()
    conn.close()
    return {row[0]: row[1] for row in correct_answers}


# Generate and insert 300 entries
correct_answers = fetch_correct_answers()
for _ in range(300):
    email = generate_fiu_email()
    date = generate_submit_date("10/10/2023 12:00:00 AM", "11/17/2023 11:59:59 PM")

    # Randomly generate user responses with 70% probability of being correct
    user_responses = {f'question{i + 1}': random.choices([correct_answers[f'question{i + 1}'], 'No'], weights=[70, 30])[0]
                      for i in range(10)}

    score = calculate_score(user_responses, correct_answers)
    insert_quiz_response(db_path, email, date, list(user_responses.values()), score)
