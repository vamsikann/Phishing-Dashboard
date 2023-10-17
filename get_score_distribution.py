import sqlite3
import numpy as np


def get_score_distribution_from_quiz_responses(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT score FROM quiz_responses")
    scores = [item[0] for item in cursor.fetchall()]

    conn.close()

    hist, bin_edges = np.histogram(scores, bins=[5] + list(range(15, 106, 10)))

    bin_labels = [str(int((bin_edges[i] + bin_edges[i + 1]) / 2)) for i in range(len(bin_edges) - 1)]

    return list(zip(bin_labels, hist.tolist()))
