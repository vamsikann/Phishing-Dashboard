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


@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})


@app.route('/api/scores', methods=['GET'])
def get_scores():
    data = get_scores_from_db("quiz_data.db")
    return jsonify(data)


@app.route('/api/get-score-distribution', methods=['GET'])
def get_score_distribution():
    data = get_score_distribution_from_quiz_responses("quiz_data.db")
    return jsonify(data)


@app.route('/api/attempts', methods=['GET'])
def get_attempts():
    data = get_attempt_counts_from_db("quiz_data.db")
    return jsonify(data)


@app.route('/api/top-wrong-questions', methods=['GET'])
def top_wrong_questions():
    data = get_top_wrong_questions("quiz_data.db")
    return jsonify(data)


@app.route('/api/quiz-takers-count', methods=['GET'])
def quiz_takers_count():

    conn = sqlite3.connect("quiz_data.db")
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(DISTINCT responder) FROM quiz_responses")
    count = cursor.fetchone()[0]

    conn.close()

    return jsonify({"count": count})


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