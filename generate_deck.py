#!/usr/bin/env python3
"""Parse rungchim.txt questions + answer key → flashcard JSON import file."""

import json
import re
import os

# ── Answer key from user ──
ANSWER_KEY = {
    1: 'a', 2: 'b', 3: 'a', 4: 'd', 5: 'a', 6: 'c', 7: 'b', 8: 'b', 9: 'a', 10: 'a',
    11: 'd', 12: 'b', 13: 'c', 14: 'b', 15: 'c', 16: 'b', 17: 'b', 18: 'b', 19: 'c', 20: 'a',
    21: 'a', 22: 'a', 23: 'b', 24: 'b', 25: 'c', 26: 'b', 27: 'c', 28: 'a', 29: 'c', 30: 'd',
    31: 'c', 32: 'b', 33: 'c', 34: 'a', 35: 'b', 36: 'b', 37: 'd', 38: 'a', 39: 'a', 40: 'b',
    41: 'a', 42: 'a', 43: 'b', 44: 'a', 45: 'b', 46: 'b', 47: 'a', 48: 'b', 49: 'c', 50: 'b',
    51: 'a', 52: 'b', 53: 'b', 54: 'a', 55: 'a', 56: 'd', 57: 'a', 58: 'a', 59: 'a', 60: 'a',
    61: 'a', 62: 'b', 63: 'c', 64: 'b', 65: 'b', 66: 'a', 67: 'a', 68: 'b', 69: 'a', 70: 'b',
    71: 'c', 72: 'b', 73: 'a', 74: 'a', 75: 'b', 76: 'b', 77: 'b', 78: 'a', 79: 'b', 80: 'a',
    81: 'c', 82: 'a', 83: 'a', 84: 'a', 85: 'b', 86: 'c', 87: 'a', 88: 'b', 89: 'b', 90: 'd',
    91: 'a', 92: 'c', 93: 'b', 94: 'd', 95: 'b', 96: 'c', 97: 'b', 98: 'b', 99: 'c', 100: 'a',
}

OPTION_LABELS = {0: 'A', 1: 'B', 2: 'C', 3: 'D'}
OPTION_MAP = {'a': 0, 'b': 1, 'c': 2, 'd': 3}

def parse_questions(filepath):
    """Parse rungchim.txt into a list of {number, question, options: [{label, text}], answer_index}."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Split into questions by "Câu N."
    blocks = re.split(r'(?=Câu \d+\.)', text)

    questions = []
    for block in blocks:
        block = block.strip()
        if not block:
            continue

        # Extract question number
        m = re.match(r'Câu (\d+)\.\s*(.*?)(?:\n|$)', block)
        if not m:
            continue
        num = int(m.group(1))
        if num < 1 or num > 100:
            continue

        # Get the question text (after "Câu N. " and before answer options)
        # Split by answer options pattern
        parts = re.split(r'\n([A-D])\.\s', block)

        # First part is the question header
        q_header = parts[0].strip()
        # Remove "Câu N. " prefix
        q_text = re.sub(r'^Câu \d+\.\s*', '', q_header).strip()

        # Extract options
        options = []
        # parts format: [header, 'A', 'text1', 'B', 'text2', 'C', 'text3', 'D', 'text4', ...]
        i = 1
        while i + 1 < len(parts):
            label = parts[i]
            text = parts[i + 1].strip()
            # Clean up text (remove trailing answer markers like "Đáp án B.")
            text = re.sub(r'Đáp án [A-D]\.\s*.*$', '', text).strip()
            text = re.sub(r'Độ khó:.*$', '', text).strip()
            options.append({'label': label, 'text': text})
            i += 2

        # Check if we have a "Đáp án" line in the block
        da_match = re.search(r'Đáp án\s+([A-D])', block)
        answer_index = None
        if da_match:
            da_label = da_match.group(1)
            for idx, opt in enumerate(options):
                if opt['label'] == da_label:
                    answer_index = idx
                    break

        # Fallback: use user-provided answer key
        if answer_index is None and num in ANSWER_KEY:
            answer_index = OPTION_MAP[ANSWER_KEY[num]]

        questions.append({
            'number': num,
            'question': q_text,
            'options': options,
            'answer_index': answer_index
        })

    return questions

def build_flashcards(questions):
    """Convert parsed questions to flashcard front/back pairs.

    Format:
      Front: "Câu N: [question text]"
      Back:  "Đáp án: [letter]. [correct answer text]"
    """
    cards = []
    for q in questions:
        # Front: just the question (no answer options — user should recall the answer)
        front = f"Câu {q['number']}: {q['question']}"

        # Back: only the correct answer (clean for quiz self-testing)
        correct_label = q['options'][q['answer_index']]['label'] if q['answer_index'] is not None else '?'
        correct_text = q['options'][q['answer_index']]['text'] if q['answer_index'] is not None else ''

        back = f"✅ Đáp án: {correct_label}. {correct_text}"

        cards.append({'front': front, 'back': back})

    return cards

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    txt_path = os.path.join(script_dir, '..', 'rungchim.txt')

    questions = parse_questions(txt_path)
    print(f"Parsed {len(questions)} questions")

    cards = build_flashcards(questions)
    print(f"Built {len(cards)} flashcards")

    # Verify answer coverage
    missing = [q['number'] for q in questions if q['answer_index'] is None]
    if missing:
        print(f"⚠️  Missing answers for questions: {missing}")
    else:
        print("✅ All questions have answers")

    # Build deck JSON for import
    deck = {
        "decks": [
            {
                "id": "d_lhc_100_" + str(abs(hash('lhctest')) % 10**6),
                "name": "100 Câu Luật Hành chính (Tháng 6/2026)",
                "description": "100 câu hỏi trắc nghiệm ôn thi môn Luật Hành chính - Có đáp án",
                "cards": cards
            }
        ]
    }

    output_path = os.path.join(script_dir, '100_cau_Luat_Hanh_Chinh.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(deck, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Exported to: {output_path}")
    print(f"   File size: {os.path.getsize(output_path):,} bytes")
    print(f"   Cards: {len(cards)}")
    print(f"\n📥 To import: Open Flashcard Quiz → Settings → Import JSON → select this file")

if __name__ == '__main__':
    main()