import sqlite3


def get_top_wrong_questions(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT question_id, correct_answer FROM correct_answers")
    correct_answers_data = cursor.fetchall()
    correct_answers = dict(correct_answers_data)

    cursor.execute("SELECT * FROM quiz_responses")
    all_responses = cursor.fetchall()

    columns = [column[0] for column in cursor.description]

    non_question_columns = ["id", "responder", "submitDate", "score"]
    question_columns = [col for col in columns if col not in non_question_columns]

    wrong_answer_counts = {}
    for response in all_responses:
        for i, question in enumerate(question_columns):
            user_answer = response[i + 3]
            if user_answer != correct_answers[question]:
                wrong_answer_counts[question] = wrong_answer_counts.get(question, 0) + 1

    sorted_wrong_counts = sorted(wrong_answer_counts.items(), key=lambda x: x[1], reverse=True)

    conn.close()

    return sorted_wrong_counts
