from flask import Flask, jsonify
from get_scores_from_db import get_scores_from_db
from get_attempt_counts_from_db import get_attempt_counts_from_db
from top_wrong_answers import get_top_wrong_questions
from get_score_distribution import get_score_distribution_from_quiz_responses
from flask_cors import CORS
from bs4 import BeautifulSoup
import sqlite3

app = Flask(__name__)
CORS(app)


# API TEST endpoint to make sure Flask server is up and running
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})


# API endpoint for the raw scores for each user. Shown in a JSON array
@app.route('/api/scores', methods=['GET'])
def get_scores():
    data = get_scores_from_db("quiz_data.db")
    return jsonify(data)


# API endpoint to retrieve the score distribution for the quiz (Gaussian Distribution)
@app.route('/api/get-score-distribution', methods=['GET'])
def get_score_distribution():
    data = get_score_distribution_from_quiz_responses("quiz_data.db")
    return jsonify(data)


# API endpoint to retrieve how many attempts each user had. Duplicates are not allowed, there every attempt is 1
@app.route('/api/attempts', methods=['GET'])
def get_attempts():
    data = get_attempt_counts_from_db("quiz_data.db")
    return jsonify(data)


# API endpoint to retrieve the questions which were answered wrong most frequently
@app.route('/api/top-wrong-questions', methods=['GET'])
def top_wrong_questions():
    data = get_top_wrong_questions("quiz_data.db")
    return jsonify(data)


# API endpoint to retrieve the amount of people who have taken the quiz
@app.route('/api/quiz-takers-count', methods=['GET'])
def quiz_takers_count():
    conn = sqlite3.connect("quiz_data.db")
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(DISTINCT responder) FROM quiz_responses")
    count = cursor.fetchone()[0]

    conn.close()

    return jsonify({"count": count})


# API endpoint for average performance by specific date
@app.route('/api/average-scores-by-date', methods=['GET'])
def average_scores_by_date():
    data = get_average_scores_by_date()
    return jsonify(data)

def get_average_scores_by_date():
    conn = sqlite3.connect("quiz_data.db")
    cursor = conn.cursor()

    query = """
    SELECT SUBSTR(submitDate, 1, INSTR(submitDate, ' ')-1) AS just_date, AVG(score) as average_score
    FROM quiz_responses
    GROUP BY just_date
    ORDER BY just_date
    """
    cursor.execute(query)
    rows = cursor.fetchall()
    
    average_scores = [{"submitDate": row[0], "averageScore": row[1]} for row in rows]
    
    conn.close()
    
    return average_scores

# API endpoint for BullPhishID
@app.route('/bpid_data', methods=['GET'])
def bpid_data():
    with open('bpid.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')
    widgets = soup.select('.widget_area__stats')
    data = []

    for widget in widgets:
        count_div = widget.find('div', class_='widget_area__count')
        if count_div:
            percentage_text = " ".join(count_div.stripped_strings).split(' ')[0].replace('%', '')
            title = " ".join(widget.find('h3').stripped_strings) if widget.find('h3') else 'Unknown'
            data.append({title: percentage_text})

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
