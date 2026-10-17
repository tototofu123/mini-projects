import cv2
import mediapipe as mp

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    max_num_hands=2,
    min_detection_confidence=0.7
)
mp_draw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

finger_tips_ids = [8, 12, 16, 20]

def count_fingers_on_hand(lm_list, hand_label):
    fingers = []

    if hand_label == "Right":
        if lm_list[4][0] < lm_list[3][0]:
            fingers.append(1)
        else:
            fingers.append(0)
    else:
        if lm_list[4][0] > lm_list[3][0]:
            fingers.append(1)
        else:
            fingers.append(0)

    for tip_id in finger_tips_ids:
        if lm_list[tip_id][1] < lm_list[tip_id - 2][1]:
            fingers.append(1)
        else:
            fingers.append(0)

    return fingers.count(1)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = hands.process(rgb_frame)

    if results.multi_hand_landmarks and results.multi_handedness:
        for hand_landmarks, hand_info in zip(results.multi_hand_landmarks, results.multi_handedness):

            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

            lm_list = []
            h, w, c = frame.shape
            for id, lm in enumerate(hand_landmarks.landmark):
                cx, cy = int(lm.x * w), int(lm.y * h)
                lm_list.append([cx, cy])

            hand_label = hand_info.classification[0].label

            count = count_fingers_on_hand(lm_list, hand_label)

            wrist_x, wrist_y = lm_list[0]

            cv2.putText(frame, f"{hand_label}: {count}", (wrist_x - 40, wrist_y + 30),
                        cv2.FONT_HERSHEY_PLAIN, 2, (0, 124, 245), 3) # Orange in BGR

    cv2.imshow("Dual Hand Counter", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()