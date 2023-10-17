import sqlite3


def get_scores_from_db(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT responder, score FROM quiz_responses")
    data = cursor.fetchall()

    conn.close()

    return data
