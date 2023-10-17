import sqlite3


def get_attempt_counts_from_db(db_path):

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT responder, COUNT(*) as attempt_count
        FROM quiz_responses
        GROUP BY responder
        ORDER BY attempt_count DESC
    """)

    data = cursor.fetchall()
    conn.close()

    return data


attempt_counts_data_updated = get_attempt_counts_from_db("/quiz_data.db")
attempt_counts_data_updated
